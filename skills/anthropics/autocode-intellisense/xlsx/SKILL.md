---
name: xlsx
description: Create, edit, and analyze Excel spreadsheets
---

## XLSX Skill

A comprehensive skill for working with Microsoft Excel spreadsheets. This skill allows you to create, edit, analyze, and visualize data in Excel files.

## Tools

### 1. Create Spreadsheet
Create a new Excel spreadsheet.

```python
create_spreadsheet(title: str, author: str = None) -> dict
```

**Parameters:**
- `title`: Title of the spreadsheet
- `author`: Author name (optional)

**Returns:**
- Spreadsheet ID and title

### 2. Get Spreadsheet
Get spreadsheet details by ID.

```python
get_spreadsheet(spreadsheet_id: str) -> dict
```

**Parameters:**
- `spreadsheet_id`: ID of the spreadsheet

**Returns:**
- Spreadsheet details including sheets

### 3. Save Spreadsheet
Save the spreadsheet to a file.

```python
save_spreadsheet(spreadsheet_id: str, filename: str = None, format: str = 'xlsx') -> dict
```

**Parameters:**
- `spreadsheet_id`: ID of the spreadsheet
- `filename`: Filename to save as (optional)
- `format`: Output format ('xlsx', 'pdf', 'csv') (optional)

**Returns:**
- File path and download link

### 4. Add Sheet
Add a new sheet to the spreadsheet.

```python
add_sheet(spreadsheet_id: str, sheet_name: str, position: int = None) -> dict
```

**Parameters:**
- `spreadsheet_id`: ID of the spreadsheet
- `sheet_name`: Name of the sheet
- `position`: Sheet position (1-based index) (optional)

**Returns:**
- New sheet details

### 5. Delete Sheet
Delete a specific sheet.

```python
delete_sheet(spreadsheet_id: str, sheet_name: str) -> dict
```

**Parameters:**
- `spreadsheet_id`: ID of the spreadsheet
- `sheet_name`: Name of the sheet to delete

**Returns:**
- Success message

### 6. Rename Sheet
Rename a sheet.

```python
rename_sheet(spreadsheet_id: str, old_name: str, new_name: str) -> dict
```

**Parameters:**
- `spreadsheet_id`: ID of the spreadsheet
- `old_name`: Current sheet name
- `new_name`: New sheet name

**Returns:**
- Success message

### 7. Add Data
Add data to cells in a sheet.

```python
add_data(spreadsheet_id: str, sheet_name: str, data: list, start_cell: str = 'A1') -> dict
```

**Parameters:**
- `spreadsheet_id`: ID of the spreadsheet
- `sheet_name`: Name of the sheet
- `data`: List of lists representing rows and columns
- `start_cell`: Starting cell (e.g., 'A1') (optional)

**Returns:**
- Summary of added data

### 8. Get Data
Get data from cells in a sheet.

```python
get_data(spreadsheet_id: str, sheet_name: str, range: str = None) -> dict
```

**Parameters:**
- `spreadsheet_id`: ID of the spreadsheet
- `sheet_name`: Name of the sheet
- `range`: Cell range (e.g., 'A1:C10') (optional)

**Returns:**
- Data from specified range

### 9. Update Data
Update data in specific cells.

```python
update_data(spreadsheet_id: str, sheet_name: str, cell: str, value: any) -> dict
```

**Parameters:**
- `spreadsheet_id`: ID of the spreadsheet
- `sheet_name`: Name of the sheet
- `cell`: Cell to update (e.g., 'B2')
- `value`: New value

**Returns:**
- Updated cell value

### 10. Format Cells
Format cells with styles.

```python
format_cells(spreadsheet_id: str, sheet_name: str, range: str, format_options: dict) -> dict
```

**Parameters:**
- `spreadsheet_id`: ID of the spreadsheet
- `sheet_name`: Name of the sheet
- `range`: Cell range to format
- `format_options`: Dictionary with format options (font, size, color, bold, italic, etc.)

**Returns:**
- Success message

### 11. Add Chart
Add a chart to a sheet.

```python
add_chart(spreadsheet_id: str, sheet_name: str, chart_type: str, data_range: str, position: str = 'C3', title: str = None) -> dict
```

**Parameters:**
- `spreadsheet_id`: ID of the spreadsheet
- `sheet_name`: Name of the sheet
- `chart_type`: Type of chart (bar, column, pie, line, scatter)
- `data_range`: Data range for the chart
- `position`: Position of the chart (top-left cell) (optional)
- `title`: Chart title (optional)

**Returns:**
- Chart details

### 12. Apply Filter
Apply a filter to a range of cells.

```python
apply_filter(spreadsheet_id: str, sheet_name: str, range: str, filter_criteria: dict) -> dict
```

**Parameters:**
- `spreadsheet_id`: ID of the spreadsheet
- `sheet_name`: Name of the sheet
- `range`: Range to apply filter to
- `filter_criteria`: Filter criteria (column, operator, value)

**Returns:**
- Success message

### 13. Sort Data
Sort data in a range.

```python
sort_data(spreadsheet_id: str, sheet_name: str, range: str, sort_column: str, sort_order: str = 'ascending') -> dict
```

**Parameters:**
- `spreadsheet_id`: ID of the spreadsheet
- `sheet_name`: Name of the sheet
- `range`: Range to sort
- `sort_column`: Column to sort by
- `sort_order`: 'ascending' or 'descending' (optional)

**Returns:**
- Success message

### 14. Add Pivot Table
Add a pivot table to summarize data.

```python
add_pivot_table(spreadsheet_id: str, sheet_name: str, data_range: str, pivot_sheet: str, row_fields: list, column_fields: list, value_fields: list) -> dict
```

**Parameters:**
- `spreadsheet_id`: ID of the spreadsheet
- `sheet_name`: Sheet containing the data
- `data_range`: Data range for pivot table
- `pivot_sheet`: Name of sheet to create pivot table on
- `row_fields`: Fields to use as rows
- `column_fields`: Fields to use as columns
- `value_fields`: Fields to summarize

**Returns:**
- Pivot table details

### 15. Calculate Formula
Calculate values in cells using formulas.

```python
calculate_formula(spreadsheet_id: str, sheet_name: str, cell: str, formula: str) -> dict
```

**Parameters:**
- `spreadsheet_id`: ID of the spreadsheet
- `sheet_name`: Name of the sheet
- `cell`: Cell to apply formula to
- `formula`: Formula to use (e.g., '=A1+B1')

**Returns:**
- Calculated value

### 16. Get Summary Statistics
Get statistical summary of data.

```python
get_summary_statistics(spreadsheet_id: str, sheet_name: str, range: str)