/**
 * Winston AI — Skills Loader
 * Discovers and loads all SKILL.md files from the skills directory
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const SKILLS_DIR = process.env.SKILLS_DIR || path.join(__dirname, '../../skills');

/**
 * Parse YAML frontmatter from a SKILL.md file
 */
function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return { metadata: {}, body: content };
  try {
    const metadata = yaml.load(match[1]);
    const body = content.slice(match[0].length).trim();
    return { metadata, body };
  } catch {
    return { metadata: {}, body: content };
  }
}

/**
 * Recursively walk a directory and find all SKILL.md files
 */
function walkSkills(dir, skills = [], baseDir = dir) {
  if (!fs.existsSync(dir)) return skills;
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkSkills(fullPath, skills, baseDir);
    } else if (entry.name === 'SKILL.md') {
      try {
        const content = fs.readFileSync(fullPath, 'utf-8');
        const { metadata, body } = parseFrontmatter(content);
        const relativePath = path.relative(baseDir, fullPath);
        const parts = relativePath.split(path.sep);

        skills.push({
          id: metadata.name || parts[parts.length - 2] || 'unknown',
          name: metadata.name || parts[parts.length - 2],
          description: metadata.description || 'No description provided.',
          category: parts.length > 2 ? parts.slice(0, -2).join('/') : 'general',
          path: fullPath,
          relativePath,
          body,
          tags: metadata.tags || [],
          version: metadata.version || '1.0.0',
          loadedAt: new Date().toISOString(),
        });
      } catch (err) {
        console.warn(`[Skills] Failed to parse: ${fullPath}`, err.message);
      }
    }
  }
  return skills;
}

/**
 * Load all skills from the configured directory
 */
function loadAllSkills() {
  const skills = walkSkills(SKILLS_DIR);
  console.log(`[Winston] Loaded ${skills.length} skills from ${SKILLS_DIR}`);
  return skills;
}

/**
 * Get a single skill by ID
 */
function getSkillById(skills, id) {
  return skills.find(s => s.id === id || s.name === id) || null;
}

/**
 * Search skills by keyword (name, description, body, tags)
 */
function searchSkills(skills, query) {
  const q = query.toLowerCase();
  return skills.filter(s =>
    s.name?.toLowerCase().includes(q) ||
    s.description?.toLowerCase().includes(q) ||
    s.body?.toLowerCase().includes(q) ||
    s.category?.toLowerCase().includes(q) ||
    (s.tags || []).some(t => t.toLowerCase().includes(q))
  );
}

/**
 * Get all unique categories
 */
function getCategories(skills) {
  return [...new Set(skills.map(s => s.category))].sort();
}

module.exports = { loadAllSkills, getSkillById, searchSkills, getCategories };
