---
name: mcp-builder
description: Build, test, and deploy MCP servers
---

## MCP Builder Skill

A comprehensive skill for building, testing, and deploying MCP servers. This skill allows you to create MCP servers from scratch, add custom tools and prompts, test them locally, and deploy them to cloud platforms.

## Tools

### 1. Create MCP Server
Create a new MCP server project.

```python
create_mcp_server(
    server_name: str, 
    server_type: str = 'python', 
    template: str = 'standard', 
    path: str = None
) -> dict
```

**Parameters:**
- `server_name`: Name of the server
- `server_type`: 'python', 'nodejs', 'go', 'rust', or 'custom' (default: 'python')
- `template`: 'standard' or 'custom_docker' (default: 'standard')
- `path`: Directory to create the server in (optional)

**Returns:**
- Server details including project path and configuration

### 2. Add Custom Tool
Add a custom tool to an existing MCP server.

```python
add_custom_tool(
    server_path: str, 
    tool_name: str, 
    tool_description: str, 
    tool_code: str, 
    execution_type: str = 'in_process'  # 'in_process', 'docker', 'http'
) -> dict
```

**Parameters:**
- `server_path`: Path to the MCP server directory
- `tool_name`: Name of the tool
- `tool_description`: Description of what the tool does
- `tool_code`: Actual code or command for the tool
- `execution_type`: How to run the tool

**Returns:**
- Tool configuration and status

### 3. Add Prompt
Add a custom prompt template to the server.

```python
add_prompt(
    server_path: str, 
    prompt_name: str, 
    prompt_content: str, 
    model: str = None
) -> dict
```

**Parameters:**
- `server_path`: Path to the MCP server directory
- `prompt_name`: Name of the prompt
- `prompt_content`: Prompt template with placeholders
- `model`: Target model for the prompt (optional)

**Returns:**
- Prompt details

### 4. Test MCP Server
Test the MCP server locally.

```python
test_mcp_server(
    server_path: str, 
    command: str, 
    max_tokens: int = 1000, 
    timeout: int = 30
) -> dict
```

**Parameters:**
- `server_path`: Path to the MCP server directory
- `command`: Command to execute (e.g., 'hello.greet', 'database.query')
- `max_tokens`: Maximum tokens to generate (optional)
- `timeout`: Command timeout in seconds (optional)

**Returns:**
- Command output and performance metrics

### 5. List Available Tools
List all tools available in an MCP server.

```python
list_tools(
    server_path: str
) -> dict
```

**Parameters:**
- `server_path`: Path to the MCP server directory

**Returns:**
- List of available tools and their descriptions

### 6. Package MCP Server
Package the MCP server for deployment.

```python
package_mcp_server(
    server_path: str, 
    output_path: str = None, 
    format: str = 'docker'  # 'docker', 'source', 'archive'
) -> dict
```

**Parameters:**
- `server_path`: Path to the MCP server directory
- `output_path`: Output path for the package (optional)
- `format`: Package format

**Returns:**
- Package details and download link

### 7. Deploy MCP Server
Deploy the MCP server to a cloud platform.

```python
deploy_mcp_server(
    server_path: str, 
    platform: str,  # 'aws', 'gcp', 'azure', 'flyio', 'render'
    region: str = None,
    environment: dict = None,
    auto_start: bool = True
) -> dict
```

**Parameters:**
- `server_path`: Path to the MCP server directory
- `platform`: Cloud platform
- `region`: Deployment region (optional)
- `environment`: Environment variables
- `auto_start`: Whether to start the server automatically

**Returns:**
- Deployment details including URL and status

### 8. Update MCP Server
Update an existing deployed MCP server.

```python
update_mcp_server(
    server_id: str, 
    updates: dict  # Contains new code, config, etc.
) -> dict
```

**Parameters:**
- `server_id`: ID of the server to update
- `updates`: Dictionary with updates (e.g., {'tool_code': 'new_code'})

**Returns:**
- Update status and new version info

### 9. Monitor Server Performance
Monitor the performance of a deployed MCP server.

```python
monitor_server_performance(
    server_id: str,
    time_range: str = 'last_hour'  # 'last_hour', 'last_24_hours', 'last_7_days'
) -> dict
```

**Parameters:**
- `server_id`: ID of the server
- `time_range`: Time range for monitoring

**Returns:**
- Performance metrics including response time, error rate, usage

## Usage Examples

### Example 1: Create a new Python MCP server

```python
create_mcp_server(server_name="MyDatabaseMCP", server_type="python")
```

### Example 2: Add a custom tool to query MySQL

```python
add_custom_tool(
    server_path="/path/to/MyDatabaseMCP",
    tool_name="query_mysql",
    tool_description="Query MySQL database",
    tool_code="SELECT * FROM users WHERE name = %s LIMIT %s",
    execution_type="docker"
)
```

### Example 3: Test the server

```python
test_mcp_server(
    server_path="/path/to/MyDatabaseMCP",
    command="query_mysql.run",
    max_tokens=1000
)
```

### Example 4: Deploy to AWS

```python
deploy_mcp_server(
    server_path="/path/to/MyDatabaseMCP",
    platform="aws",
    region="us-east-1",
    environment={"DATABASE_URL": "mysql://user:pass@host/db"}
)
```

### Example 5: Monitor performance

```python
monitor_server_performance(
    server_id="mcp-server-12345",
    time_range="last_24_hours"
)
```

## Deployment Platforms

This skill supports deployment to the following platforms:

- **AWS** (EC2, Lambda)
- **Google Cloud Platform (GCP)** (Cloud Run, Compute Engine)
- **Microsoft Azure** (Azure Functions, Container Apps)
- **Fly.io**
- **Render**

## Execution Types

### In-Process
The tool runs directly within the MCP server process (fast, simple).

### Docker
The tool runs in a separate Docker container (isolated, supports complex dependencies).

### HTTP
The tool makes HTTP requests to an external service (decoupled, scalable).

## Prerequisites

### For Python servers:
- Python 3.8+
- pip package manager

### For Node.js servers:
- Node.js 16+
- npm package manager

### For Docker-based deployment:
- Docker installed and running
- Docker Hub account (for public images)