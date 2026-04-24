---
name: frontend-design
description: creates a frontend design for a website
input_schema: {
  "type": "object",
  "properties": {
    "website_type": {
      "type": "string",
      "description": "The type of website to design"
    },
    "color_palette": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "The color palette to use"
    },
    "layout": {
      "type": "string",
      "description": "The layout to use"
    },
    "ui_elements": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "The UI elements to include"
    },
    "atmosphere": {
      "type": "string",
      "description": "The atmosphere of the website"
    }
  }
}
output_schema: {
    "type": "object",
    "properties": {
      "ui_design_prompt": {
        "type": "string",
        "description": "A detailed prompt for generating the UI design"
      }
    }
  }
---

I will generate all UI screens as detailed prompts, ready to be pasted directly into an image generation tool.

**Plan:**
1. Create a separate, high-quality prompt for each required screen:
    - Login / Authentication Page
    - Dashboard Overview Screen
    - Settings / Profile Page
    - Chat / Messaging Interface
    - Home Screen / Landing Page
2. Ensure each prompt includes:
    - **Visual Style:** Modern, premium, tech-focused, as defined in the prompt.
    - **Color Palette:** Use the defined blue and dark grey tones.
    - **Layout:** Clean, organized structure for each specific screen type.
    - **UI Elements:** Include necessary components like buttons, input fields, sidebars, cards, charts, etc., where appropriate.
    - **Atmosphere:** Professional yet inviting and user-friendly.
3. Design a modern dashboard interface:
    - Dashboard Overview Screen: A central hub displaying key metrics, recent activities, and navigation.
    - Profile / Account Settings: Comprehensive settings management for user profiles, security, and preferences.
    - Settings Page: Detailed configuration for application settings, notifications, and system preferences.
    - User Profile Page: Individual user profile view with personal information, stats, and activity history.
    - Project / Task Management: Tools for managing projects, tasks, progress tracking, and collaboration.
    - Analytics / Reports: Data visualization with charts, graphs, and insights.
