---
na  me: canvas-design
description: Create and edit high-quality visual designs

---

## Canvas Design Skill

A comprehensive skill for creating, editing, and managing visual designs using Canva. This skill allows you to perform a wide range of operations including template creation, element manipulation, image processing, and design export.

## Tools

### 1. Create Design
Create a new design from scratch.

```python
create_design(template: str, design_type: str = 'standard', name: str = 'New Design') -> dict
```

**Parameters:**
- `template`: Template name (e.g., 'presentation', 'instagram_post', 'poster')
- `design_type`: Type of design (standard, custom_dimensions)
- `name`: Name of the design

**Returns:**
- Design ID and title

### 2. Get Design
Retrieve a specific design by ID.

```python
get_design(design_id: str) -> dict
```

**Parameters:**
- `design_id`: ID of the design

**Returns:**
- Design details including elements and pages

### 3. Save Design
Save the design to a file.

```python
save_design(design_id: str, filename: str = None, format: str = 'png') -> dict
```

**Parameters:**
- `design_id`: ID of the design
- `filename`: Filename to save as (optional)
- `format`: Output format (png, jpeg, pdf, svg, transparent_png)

**Returns:**
- File path and download link

### 4. Add Page
Add a new page to the design.

```python
add_page(design_id: str, template: str = 'blank', page_number: int = None) -> dict
```

**Parameters:**
- `design_id`: ID of the design
- `template`: Page template type (blank, title_page, content_page, section_divider)
- `page_number`: Page position (optional)

**Returns:**
- New page details

### 5. Delete Page
Delete a specific page from the design.

```python
delete_page(design_id: str, page_number: int) -> dict
```

**Parameters:**
- `design_id`: ID of the design
- `page_number`: Page number to delete

**Returns:**
- Success message

### 6. Reorder Pages
Reorder pages within the design.

```python
reorder_pages(design_id: str, page_numbers: list) -> dict
```

**Parameters:**
- `design_id`: ID of the design
- `page_numbers`: List of page numbers in new order

**Returns:**
- New page order

### 7. Get Page Content
Retrieve content of a specific page.

```python
get_page_content(design_id: str, page_number: int) -> dict
```

**Parameters:**
- `design_id`: ID of the design
- `page_number`: Page number

**Returns:**
- Page content including elements, text, and images

### 8. Update Page Content
Update content on a specific page.

```python
update_page_content(design_id: str, page_number: int, new_content: dict) -> dict
```

**Parameters:**
- `design_id`: ID of the design
- `page_number`: Page number
- `new_content`: Dictionary with content updates

**Returns:**
- Updated page details

### 9. Add Text
Add text to a specific page.

```python
add_text(design_id: str, page_number: int, text: str, text_type: str = 'paragraph', position: dict = None, size: dict = None, style: dict = None) -> dict
```

**Parameters:**
- `design_id`: ID of the design
- `page_number`: Page number
- `text`: Text content
- `text_type`: 'heading', 'subheading', 'paragraph'
- `position`: {x, y} coordinates
- `size`: {width, height}
- `style`: {font_family, font_size, color, alignment}

**Returns:**
- Text element details

### 10. Update Text
Update text content or formatting.

```python
update_text(design_id: str, page_number: int, element_id: str, new_text: str = None, style: dict = None) -> dict
```

**Parameters:**
- `design_id`: ID of the design
- `page_number`: Page number
- `element_id`: Text element ID
- `new_text`: New text content (optional)
- `style`: Formatting style (optional)

**Returns:**
- Updated text details

### 11. Add Image
Add an image to a page.

```python
add_image(design_id: str, page_number: int, image_url: str, position: dict = None, size: dict = None, position_type: str = 'manual', fit_type: str = 'contain') -> dict
```

**Parameters:**
- `design_id`: ID of the design
- `page_number`: Page number
- `image_url`: URL of the image
- `position`: {x, y} coordinates (optional)
- `size`: {width, height} (optional)
- `position_type`: 'manual', 'center', 'top_left'
- `fit_type`: 'contain', 'cover', 'fill'

**Returns:**
- Image element details

### 12. Replace Image
Replace an existing image with a new one.

```python
replace_image(design_id: str, page_number: int, element_id: str, new_image_url: str) -> dict
```

**Parameters:**
- `design_id`: ID of the design
- `page_number`: Page number
- `element_id`: Image element ID
- `new_image_url`: New image URL

**Returns:**
- Updated image details

### 13. Add Shape
Add a shape (rectangle, circle, line, etc.) to a page.

```python
add_shape(design_id: str, page_number: int, shape_type: str, position: dict = None, size: dict = None, style: dict = None) -> dict
```

**Parameters:**
- `design_id`: ID of the design
- `page_number`: Page number
- `shape_type`: 'rectangle', 'circle', 'line', 'star', 'heart', etc.
- `position`: {x, y} coordinates
- `size`: {width, height}
- `style`: {fill_color, border_color, border_width, opacity}

**Returns:**
- Shape element details

### 14. Format Page Background
Set the background for a page.

```python
format_page_background(design_id: str, page_number: int, background_type: str = 'color', color: str = None, image_url: str = None, gradient: dict = None) -> dict
```

**Parameters:**
- `design_id`: ID of the design
- `page_number`: Page number
- `background_type`: 'color', 'image', 'gradient', 'pattern'
- `color`: Background color (hex code)
- `image_url`: Background image URL
- `gradient`: Gradient colors and direction

**Returns:**
- Updated page details

### 15. Apply Template
Apply a template to the entire design or specific pages.

```python
apply_template(design_id: str, template: str, pages: list = None) -> dict
```

**Parameters:**
- `design_id`: ID of the design
- `template`: Template name
- `pages`: List of page numbers to apply template to (optional)

**Returns:**
- Updated design details

## Usage Examples

### Example 1: Create a new design

```python
create_design(template="presentation", design_type="standard", name="My Presentation")
```

### Example 2: Add a page to the design

add_page(design_id="12345", template="content_page")

### Example 3: Add text and an image

add_text_element(design_id="12345", page_number=1, text="Hello World", position={x: 100, y: 100}, size={width: 300, height: 100})
add_image_element(design_id="12345", page_number=1, image_url="https://example.com/image.jpg", position={x: 100, y: 200}, size={width: 200, height: 200})

### Example 4: Format a page background

format_page_background(design_id="12345", page_number=1, background_type="gradient", gradient={from_color: "#ff0000", to_color: "#0000ff", direction: "diagonal"})

### Example 5: Export design as PDF

export_design(design_id="12345", format="pdf", page_numbers=[1, 2, 3])

### Example 6: Apply a template to the design

apply_template(design_id="12345", template="modern_presentation")

### Exampl  e 7: Reorder pages

reorder_pages(design_id="12345", page_numbers=[3, 1, 2])

### Example 8: Add a shape

add_shape(design_id="12345", page_number=1, shape_type="circle", position={x: 200, y: 200}, size={width: 150, height: 150}, style={fill_color: "#ff0000"})

### Example 9: Update text content

update_text(design_id="12345", page_number=1, element_id="text_1", new_text="Updated Title", style={font_size: 36, color: "#000000"})

### Example 10: Replace an image

replace_image(design_id="12345", page_number=1, element_id="image_1", new_image_url="https://example.com/new_image.jpg")

### Example 11: Add a page divider

add_page(design_id="12345", template="section_divider", page_number=2)

### Example 12: Get page content

get_page_content(design_id="12345", page_number=1)

### Example 13: Delete a page

delete_page(design_id="12345", page_number=2)

### Example 14: Format page background

format_page_background(design_id="12345", page_number=1, background_type="gradient", gradient={from_color: "#ff0000", to_color: "#0000ff", direction: "diagonal"})

### Example 15: Export design as PNG

export_design(design_id="12345", format="png", page_numbers=[1, 2, 3])

### Example 16: Export design as transparent PNG

export_design(design_id="12345", format="transparent_png")

### Example 17: Export design as PDF

export_design(design_id="12345", format="pdf", page_numbers=[1, 2, 3])

### Example 18: Export design as SVG

export_design(design_id="12345", format="svg", page_numbers=[1, 2, 3])

### Example 19: Export design as JPEG

export_design(design_id="12345", format="jpeg", page_numbers=[1, 2, 3])

### Example 20: Export design as PNG with custom size

export_design(design_id="12345", format="png", page_numbers=[1, 2, 3], size={width: 1920, height: 1080})