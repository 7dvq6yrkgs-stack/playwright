/**
 * Winston AI — API Routes
 * All REST endpoints for the Winston AI API
 */

const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { loadAllSkills, getSkillById, searchSkills, getCategories } = require('./skills-loader');
const winston = require('./winston-core');

const router = express.Router();

// In-memory session store (upgrade to Redis for production)
const sessions = new Map();
const requestLog = [];

// ─────────────────────────────────────────────
// MIDDLEWARE: API Key Auth
// ─────────────────────────────────────────────
router.use((req, res, next) => {
  // Skip auth for public docs + dashboard
  if (req.path === '/health' || req.path === '/docs') return next();

  const key = req.headers['x-api-key'] || req.query.api_key;
  const validKey = process.env.WINSTON_API_KEY || 'winston-dev-key';

  if (!key || key !== validKey) {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'Provide a valid API key via X-API-Key header or ?api_key= query param',
      hint: 'Default dev key: winston-dev-key',
    });
  }
  next();
});

// ─────────────────────────────────────────────
// HEALTH CHECK
// ─────────────────────────────────────────────
router.get('/health', (req, res) => {
  const skills = loadAllSkills();
  res.json({
    status: 'operational',
    version: '1.0.0',
    name: 'Winston AI API',
    skillsLoaded: skills.length,
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// ─────────────────────────────────────────────
// SKILLS ENDPOINTS
// ─────────────────────────────────────────────

/** GET /skills — List all skills */
router.get('/skills', (req, res) => {
  const skills = loadAllSkills();
  const { category, search, limit = 100, offset = 0 } = req.query;

  let results = skills;

  if (search) results = searchSkills(results, search);
  if (category) results = results.filter(s => s.category.includes(category));

  const total = results.length;
  const paginated = results.slice(Number(offset), Number(offset) + Number(limit));

  res.json({
    total,
    offset: Number(offset),
    limit: Number(limit),
    skills: paginated.map(s => ({
      id: s.id,
      name: s.name,
      description: s.description,
      category: s.category,
      tags: s.tags,
      version: s.version,
    })),
  });
});

/** GET /skills/categories — List all categories */
router.get('/skills/categories', (req, res) => {
  const skills = loadAllSkills();
  const categories = getCategories(skills);
  res.json({ total: categories.length, categories });
});

/** GET /skills/:id — Get a specific skill */
router.get('/skills/:id', (req, res) => {
  const skills = loadAllSkills();
  const skill = getSkillById(skills, req.params.id);
  if (!skill) return res.status(404).json({ error: 'Skill not found', id: req.params.id });
  res.json(skill);
});

// ─────────────────────────────────────────────
// INFERENCE ENDPOINTS
// ─────────────────────────────────────────────

/** POST /invoke — Invoke a skill by name with a prompt */
router.post('/invoke', async (req, res) => {
  const { skill: skillId, prompt, context, sessionId } = req.body;

  if (!prompt) return res.status(400).json({ error: 'prompt is required' });

  const skills = loadAllSkills();
  let activeSkills = skills;

  if (skillId) {
    const skill = getSkillById(skills, skillId);
    if (!skill) return res.status(404).json({ error: `Skill '${skillId}' not found` });
    activeSkills = [skill];
  }

  const requestId = uuidv4();
  const startTime = Date.now();

  try {
    const response = await winston.invoke({
      skills: activeSkills,
      prompt,
      context: context || '',
      sessionId,
    });

    const entry = {
      requestId,
      skill: skillId || 'auto',
      prompt: prompt.slice(0, 100),
      latencyMs: Date.now() - startTime,
      timestamp: new Date().toISOString(),
      status: 'success',
    };
    requestLog.unshift(entry);
    if (requestLog.length > 100) requestLog.pop();

    res.json({
      requestId,
      skill: skillId || 'auto-selected',
      response: response.text,
      skillsApplied: response.skillsApplied,
      latencyMs: entry.latencyMs,
      sessionId: response.sessionId,
      timestamp: entry.timestamp,
    });
  } catch (err) {
    res.status(500).json({ error: err.message, requestId });
  }
});

/** POST /chat — Multi-turn conversational endpoint */
router.post('/chat', async (req, res) => {
  const { message, sessionId, skills: requestedSkills } = req.body;

  if (!message) return res.status(400).json({ error: 'message is required' });

  const sid = sessionId || uuidv4();
  const history = sessions.get(sid) || [];

  history.push({ role: 'user', content: message, timestamp: new Date().toISOString() });

  const allSkills = loadAllSkills();
  let activeSkills = allSkills;

  if (requestedSkills && Array.isArray(requestedSkills)) {
    activeSkills = requestedSkills.map(id => getSkillById(allSkills, id)).filter(Boolean);
  }

  const requestId = uuidv4();
  const startTime = Date.now();

  try {
    const response = await winston.chat({
      skills: activeSkills,
      history,
      message,
      sessionId: sid,
    });

    history.push({ role: 'assistant', content: response.text, timestamp: new Date().toISOString() });
    sessions.set(sid, history);

    res.json({
      requestId,
      sessionId: sid,
      message: response.text,
      skillsApplied: response.skillsApplied,
      turnCount: history.length,
      latencyMs: Date.now() - startTime,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    res.status(500).json({ error: err.message, requestId });
  }
});

/** POST /compose — Chain multiple skills together */
router.post('/compose', async (req, res) => {
  const { pipeline, prompt } = req.body;

  if (!pipeline || !Array.isArray(pipeline)) {
    return res.status(400).json({ error: 'pipeline must be an array of skill IDs' });
  }
  if (!prompt) return res.status(400).json({ error: 'prompt is required' });

  const allSkills = loadAllSkills();
  const pipelineSkills = pipeline.map(id => {
    const skill = getSkillById(allSkills, id);
    if (!skill) throw new Error(`Skill not found: ${id}`);
    return skill;
  });

  const requestId = uuidv4();
  const startTime = Date.now();
  const steps = [];

  try {
    let current = prompt;

    for (const skill of pipelineSkills) {
      const stepStart = Date.now();
      const result = await winston.invoke({ skills: [skill], prompt: current, context: '' });
      steps.push({
        skill: skill.id,
        input: current.slice(0, 200),
        output: result.text.slice(0, 500),
        latencyMs: Date.now() - stepStart,
      });
      current = result.text;
    }

    res.json({
      requestId,
      pipeline,
      finalOutput: current,
      steps,
      totalLatencyMs: Date.now() - startTime,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    res.status(500).json({ error: err.message, requestId });
  }
});

// ─────────────────────────────────────────────
// SESSION MANAGEMENT
// ─────────────────────────────────────────────

/** GET /sessions/:id — Retrieve session history */
router.get('/sessions/:id', (req, res) => {
  const history = sessions.get(req.params.id);
  if (!history) return res.status(404).json({ error: 'Session not found' });
  res.json({ sessionId: req.params.id, turnCount: history.length, history });
});

/** DELETE /sessions/:id — Clear a session */
router.delete('/sessions/:id', (req, res) => {
  sessions.delete(req.params.id);
  res.json({ message: 'Session cleared', sessionId: req.params.id });
});

/** GET /sessions — List active sessions */
router.get('/sessions', (req, res) => {
  const list = [...sessions.entries()].map(([id, history]) => ({
    sessionId: id,
    turnCount: history.length,
    lastActive: history[history.length - 1]?.timestamp,
  }));
  res.json({ total: list.length, sessions: list });
});

// ─────────────────────────────────────────────
// ANALYTICS
// ─────────────────────────────────────────────

/** GET /analytics — Request logs & stats */
router.get('/analytics', (req, res) => {
  const total = requestLog.length;
  const avgLatency =
    total > 0
      ? Math.round(requestLog.reduce((s, r) => s + r.latencyMs, 0) / total)
      : 0;
  const skillUsage = requestLog.reduce((acc, r) => {
    acc[r.skill] = (acc[r.skill] || 0) + 1;
    return acc;
  }, {});

  res.json({
    totalRequests: total,
    avgLatencyMs: avgLatency,
    activeSessions: sessions.size,
    skillUsage,
    recentRequests: requestLog.slice(0, 20),
  });
});

module.exports = router;
