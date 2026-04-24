---
name: docx
description: Create and edit Microsoft Word documents

--- 

## DOCX Skill

A comprehensive skill for creating, editing, and managing Microsoft Word documents. This skill allows you to perform a wide range of operations including text manipulation, table creation, image insertion, and document formatting.

## Tools

### 1. Create Document
Create a new Word document.

```python
create_document(title: str, author: str = None) -> dict
```

**Parameters:**
- `title`: Document title
- `author`: Author name (optional)

**Returns:**
- Document ID and title

### 2. Get Document
Get document details by ID.

```python
get_document(document_id: str) -> dict
```

**Parameters:**
- `document_id`: ID of the document

**Returns:**
- Document details including content

### 3. Save Document
Save the document to a file.

```python
save_document(document_id: str, filename: str = None, format: str = 'docx') -> dict
```

**Parameters:**
- `document_id`: ID of the document
- `filename`: Filename to save as (optional)
- `format`: Output format ('docx', 'pdf', 'txt') (optional)

**Returns:**
- File path and download link

### 4. Add Heading
Add a heading to the document.

```python
add_heading(document_id: str, text: str, level: int = 1, style: str = 'normal') -> dict
```

**Parameters:**
- `document_id`: ID of the document
- `text`: Heading text
- `level`: Heading level (1-9)
- `style`: Heading style (normal, heading_1, heading_2, etc.)

**Returns:**
- Heading details

### 5. Add Paragraph
Add a paragraph to the document.

```python
add_paragraph(document_id: str, text: str, style: str = 'normal') -> dict
```

**Parameters:**
- `document_id`: ID of the document
- `text`: Paragraph text
- `style`: Paragraph style

**Returns:**
- Paragraph details

### 6. Format Text
Format text within a paragraph.

```python
format_text(document_id: str, paragraph_id: str, start_index: int, end_index: int, style: dict) -> dict
```

**Parameters:**
- `document_id`: ID of the document
- `paragraph_id`: ID of the paragraph
- `start_index`: Start index of text to format
- `end_index`: End index of text to format
- `style`: Formatting style (font, size, color, bold, italic, etc.)

**Returns:**
- Updated paragraph details

### 7. Insert Image
Insert an image into the document.

```python
insert_image(document_id: str, image_url: str, position: str = 'end', width: int = None, height: int = None) -> dict
```

**Parameters:**
- `document_id`: ID of the document
- `image_url`: URL of the image
- `position`: 'start', 'end', or specific paragraph/section ID
- `width`: Image width (optional)
- `height`: Image height (optional)

**Returns:**
- Image details

### 8. Add Table
Add a table to the document.

```python
add_table(document_id: str, rows: int, columns: int, position: str = 'end') -> dict
```

**Parameters:**
- `document_id`: ID of the document
- `rows`: Number of rows
- `columns`: Number of columns
- `position`: 'start', 'end', or specific paragraph/section ID

**Returns:**
- Table details

### 9. Format Table Cell
Format specific cells in a table.

```python
format_table_cell(document_id: str, table_id: str, row: int, column: int, style: dict) -> dict
```

**Parameters:**
- `document_id`: ID of the document
- `table_id`: ID of the table
- `row`: Row number
- `column`: Column number
- `style`: Formatting style (background, border, font, etc.)

**Returns:**
- Updated table cell details

### 10. Insert Hyperlink
Insert a hyperlink into the document.

```python
insert_hyperlink(document_id: str, text: str, url: str, position: str = 'end', style: dict = None) -> dict
```

**Parameters:**
- `document_id`: ID of the document
- `text`: Hyperlink text
- `url`: URL to link to
- `position`: 'start', 'end', or specific paragraph/section ID
- `style`: Formatting style (optional)

**Returns:**
- Hyperlink details

### 11. Apply Page Format
Set page formatting for the document.

```python
apply_page_format(document_id: str, orientation: str = 'portrait', margins: dict = None, page_size: str = 'A4') -> dict
```

**Parameters:**
- `document_id`: ID of the document
- `orientation`: 'portrait' or 'landscape'
- `margins`: Dictionary with 'top', 'bottom', 'left', 'right' values
- `page_size`: Page size (A4, Letter, etc.)

**Returns:**
- Updated page format details

### 12. Set Document Theme
Apply a visual theme to the document.

```python
set_document_theme(document_id: str, theme_name: str) -> dict
```

**Parameters:**
- `document_id`: ID of the document
- `theme_name`: Theme name (modern, corporate, creative, minimal)

**Returns:**
- Success message

### 13. Get Available Styles
Get list of available document styles.

```python
get_available_styles(document_id: str) -> dict
```

**Parameters:**
- `document_id`: ID of the document

**Returns:**
- List of available styles

### 14. Set Document Properties
Set document metadata and properties.

```python
set_document_properties(document_id: str, properties: dict) -> dict
```

**Parameters:**
- `document_id`: ID of the document
- `properties`: Dictionary with properties (title, author, subject, keywords, etc.)

**Returns:**
- Updated document properties

## Usage Examples

### Example 1: Create a new document

```python
create_document(title="Project Proposal", author="Jane Smith")
```

### Example 2: Add headings and paragraphs

```python
add_heading(document_id="12345", text="Introduction", level=1)
add_paragraph(document_id="12345", text="This document outlines the project proposal details.")
```

### Example 3: Format text and insert an image

```python
format_text(document_id="12345", paragraph_id="para1", start_index=0, end_index=10, style={'bold': True})
insert_image(document_id="12345", image_url="https://example.com/logo.png", position="start")
```

### Example 4: Apply a theme and save as PDF

```python
set_document_theme(document_id="12345", theme_name="modern")
save_document(document_id="12345", filename="project_proposal_modern.pdf", format="pdf")
```
### Example 5: Add a table and format a cell

```python
add_table(document_id="12345", rows=3, columns=2)
format_table_cell(document_id="12345", table_id="table1", row=1, column=1, style={'background': '#f0f0f0'})
```
### Example 6: Insert a hyperlink

```python
insert_hyperlink(document_id="12345", text="Click here", url="https://example.com", position="end")
```
### Example 7: Apply page format

```python
apply_page_format(document_id="12345", orientation="landscape", margins={'top': 25, 'bottom': 25, 'left': 25, 'right': 25})
```
### Example 8: Set document theme

```python
set_document_theme(document_id="12345", theme_name="modern")
```
### Example 9: Get available styles

```python
get_available_styles(document_id="12345")
```
### Example 10: Set document properties

```python
set_document_properties(document_id="12345", properties={'title': 'New Title', 'author': 'New Author'})
```
### Example 11: Add a watermark

```python
add_watermark(document_id="12345", text="CONFIDENTIAL")
```
### Example 12: Track changes

```python
track_changes(document_id="12345", enable=True)
```
### Example 13: Accept all changes

```python
accept_all_changes(document_id="12345")
```
### Example 14: Reject all changes

```python
reject_all_changes(document_id="12345")
```
### Example 15: Insert page break

```python
insert_page_break(document_id="12345", position="end")
```
### Example 16: Add page numbers

```python
add_page_numbers(document_id="12345", format="decimal", position="bottom_center")
```
### Example 17: Add header

```python
add_header(document_id="12345", content="Document Header", style="different_first_page")
```
### Example 18: Add footer

```python
add_footer(document_id="12345", content="Document Footer", style="different_first_page")
```
### Example 19: Set section breaks

```python
set_section_break(document_id="12345", position="end", break_type="next_page")
```
### Example 20: Set page orientation

```python
set_page_orientation(document_id="12345", orientation="landscape")
```

## Error Handling

### Common Errors

- Invalid document ID
- Invalid page/paragraph/element ID
- Invalid format or style parameters
- Network or file system errors

### Error Handling

```python
try:
    result = create_document(title="Report")
except Exception as e:
    print(f"Error creating document: {e}")
```

## Best Practices

- Always use descriptive names for documents and elements
- Save documents frequently during editing
- Use templates to maintain consistent formatting
- Validate inputs before performing operations
- Handle errors gracefully and provide user feedback
- Clean up temporary files after export

## Customization

You can customize this skill by adding new tools for specific document operations such as:

- Inserting charts and graphs
- Working with bookmarks and cross-references
- Adding comments and track changes
- Creating document summaries
- Converting to other formats (e.g., HTML, Markdown)
- Working with templates and styles

## Usage Notes

- Ensure you have the necessary permissions to access and modify the document
- For large documents, operations may take longer to complete
- Always verify the results after performing operations
- Keep a backup of important documents before making major changes