---
name: pptx
description: Create and edit Microsoft PowerPoint presentations

---

## PPTX Skill

A comprehensive skill for creating, editing, and managing Microsoft PowerPoint presentations. This skill allows you to perform a wide range of operations including slide manipulation, text formatting, image insertion, and theme application.

## Tools

### 1. Create Presentation
Create a new PowerPoint presentation.

```python
create_presentation(title: str, author: str = None) -> dict
```

**Parameters:**
- `title`: Title of the presentation
- `author`: Author name (optional)

**Returns:**
- Presentation ID and title

### 2. Get Presentation
Get presentation details by ID.

```python
get_presentation(presentation_id: str) -> dict
```

**Parameters:**
- `presentation_id`: ID of the presentation

**Returns:**
- Presentation details including slides

### 3. Save Presentation
Save the presentation to a file.

```python
save_presentation(presentation_id: str, filename: str = None, format: str = 'pptx') -> dict
```

**Parameters:**
- `presentation_id`: ID of the presentation
- `filename`: Filename to save as (optional)
- `format`: Output format ('pptx', 'pdf', 'html') (optional)

**Returns:**
- File path and download link

### 4. Add Slide
Add a new slide to the presentation.

```python
add_slide(presentation_id: str, layout: str = 'title', slide_number: int = None) -> dict
```

**Parameters:**
- `presentation_id`: ID of the presentation
- `layout`: Slide layout type (title, content, two_content, title_only, blank)
- `slide_number`: Slide position (optional)

**Returns:**
- New slide details

### 5. Delete Slide
Delete a specific slide.

```python
delete_slide(presentation_id: str, slide_number: int) -> dict
```

**Parameters:**
- `presentation_id`: ID of the presentation
- `slide_number`: Slide number to delete

**Returns:**
- Success message

### 6. Reorder Slide
Reorder slides in the presentation.

```python
reorder_slides(presentation_id: str, slide_numbers: list) -> dict
```

**Parameters:**
- `presentation_id`: ID of the presentation
- `slide_numbers`: List of slide numbers in new order

**Returns:**
- New slide order

### 7. Get Slide Content
Get content of a specific slide.

```python
get_slide_content(presentation_id: str, slide_number: int) -> dict
```

**Parameters:**
- `presentation_id`: ID of the presentation
- `slide_number`: Slide number

**Returns:**
- Slide content including text, images, etc.

### 8. Update Slide Content
Update content of a specific slide.

```python
update_slide_content(presentation_id: str, slide_number: int, new_content: dict) -> dict
```

**Parameters:**
- `presentation_id`: ID of the presentation
- `slide_number`: Slide number
- `new_content`: Dictionary with content to update (text, images, etc.)

**Returns:**
- Updated slide details

### 9. Add Text Box
Add a text box to a slide.

```python
add_text_box(presentation_id: str, slide_number: int, text: str, left: int, top: int, width: int, height: int, style: dict = None) -> dict
```

**Parameters:**
- `presentation_id`: ID of the presentation
- `slide_number`: Slide number
- `text`: Text content
- `left`: X-coordinate
- `top`: Y-coordinate
- `width`: Width of text box
- `height`: Height of text box
- `style`: Text formatting style (font, size, color, etc.)

**Returns:**
- Text box details

### 10. Update Text Box
Update text content or formatting in a text box.

```python
update_text_box(presentation_id: str, slide_number: int, text_box_id: str, new_text: str = None, style: dict = None) -> dict
```

**Parameters:**
- `presentation_id`: ID of the presentation
- `slide_number`: Slide number
- `text_box_id`: ID of the text box
- `new_text`: New text content (optional)
- `style`: Formatting style (optional)

**Returns:**
- Updated text box details

### 11. Add Image
Add an image to a slide.

```python
add_image(presentation_id: str, slide_number: int, image_url: str, left: int, top: int, width: int, height: int) -> dict
```

**Parameters:**
- `presentation_id`: ID of the presentation
- `slide_number`: Slide number
- `image_url`: URL of the image
- `left`: X-coordinate
- `top`: Y-coordinate
- `width`: Width of image
- `height`: Height of image

**Returns:**
- Image details

### 12. Format Slide Background
Set background for a slide.

```python
format_slide_background(presentation_id: str, slide_number: int, background_type: str = 'color', color: str = None, image_url: str = None) -> dict
```

**Parameters:**
- `presentation_id`: ID of the presentation
- `slide_number`: Slide number
- `background_type`: 'color' or 'image'
- `color`: Background color (hex code)
- `image_url`: Background image URL

**Returns:**
- Updated slide details

### 13. Apply Theme
Apply a visual theme to the presentation.

```python
apply_theme(presentation_id: str, theme_name: str) -> dict
```

**Parameters:**
- `presentation_id`: ID of the presentation
- `theme_name`: Theme name (modern, corporate, creative, minimal)

**Returns:**
- Success message

### 14. Set Slide Master
Set a master slide for specific slides.

```python
set_slide_master(presentation_id: str, slide_number: int, master_layout: str) -> dict
```

**Parameters:**
- `presentation_id`: ID of the presentation
- `slide_number`: Slide number
- `master_layout`: Master layout type

**Returns:**
- Updated slide details

### 15. Get Available Themes
Get list of available presentation themes.

```python
get_available_themes() -> dict
```

**Returns:**
- List of theme names

## Usage Examples

### Example 1: Create a new presentation

```python
create_presentation(title="Quarterly Sales Report", author="John Doe")
```

### Example 2: Add a content slide

```python
add_slide(presentation_id="12345", layout="content")
```

### Example 3: Add text and image to a slide

```python
add_text_box(presentation_id="12345", slide_number=1, text="Key Highlights", left=50, top=50, width=500, height=100)
add_image(presentation_id="12345", slide_number=1, image_url="https://example.com/chart.png", left=50, top=200, width=500, height=300)
```

### Example 4: Apply a theme and save as PDF

```python
apply_theme(presentation_id="12345", theme_name="modern")
save_presentation(presentation_id="12345", filename="sales_report", format="pdf")
```

### Example 5: Format a slide with custom background

```python
format_slide_background(presentation_id="12345", slide_number=2, background_type="image", image_url="https://example.com/background.jpg")
```

## Available Colors

The following colors are supported:
- Red
- Green
- Blue
- Yellow
- Cyan
- Magenta
- White
- Black
- Gray
- Orange
- Purple
- Brown

## Authentication

This skill uses Google OAuth2 for authentication with Google Slides. User authentication is handled automatically by the runtime environment.

## Error Handling

The skill includes error handling for the following scenarios:
- Invalid presentation ID
- Slide number out of range
- Missing required parameters
- Invalid color values
- Theme not found
- File save errors

## Rate Limits

- Maximum 50 presentations can be created per user
- Maximum 100 slides per presentation
- Maximum 20 text boxes per slide
- Maximum 10 images per slide
- Maximum 10 theme applications per presentation

## Security

- All authentication is handled through OAuth2
- No direct file system access
- All operations are performed within the Google Slides API sandbox

## Performance

- Operations are optimized for speed
- Large presentations may take longer to process
- Image loading is asynchronous

## Best Practices

- Provide clear presentation titles and descriptions
- Use descriptive slide titles
- Optimize image sizes for web
- Keep presentations organized
- Use themes for consistent formatting
- Validate inputs before calling the skill
- Handle errors gracefully

## Troubleshooting

**Issue:** Presentation not created
**Solution:** Check that presentation_id and title are provided

**Issue:** Slide not found
**Solution:** Verify slide_number is within range

**Issue:** Color not applied
**Solution:** Use one of the available color names or hex codes

**Issue:** Theme not applied
**Solution:** Check that theme_name is valid

**Issue:** Permission errors
**Solution:** Ensure OAuth2 authentication is properly configured

## Support

For issues or questions, please contact the skill administrator.