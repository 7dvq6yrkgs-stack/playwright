---
name: webapp_testing
description: automated web application testing using Playwright

---

## WebApp Testing Skill

Automated web application testing using Playwright. This skill allows you to create, manage, and run test scenarios for web applications.

## Tools

### 1. Create Test Suite
Create a new test suite for web application testing.

```python
create_test_suite(
    suite_name: str,
    description: str = None,
    test_type: str = 'ui',  # 'ui', 'api', 'performance', 'accessibility'
    browsers: list = None
) -> dict
```

**Parameters:**
- `suite_name`: Name of the test suite
- `description`: Description of the test suite (optional)
- `test_type`: Type of testing to perform
- `browsers`: List of browsers to test on (e.g., ['chrome', 'firefox', 'webkit'])

**Returns:**
- Test suite ID and details

### 2. Add Test Case
Add a new test case to a test suite.

```python
add_test_case(
    test_suite_id: str,
    test_case_name: str,
    description: str = None,
    steps: list = None,
    expected_result: str = None
) -> dict
```

**Parameters:**
- `test_suite_id`: ID of the test suite
- `test_case_name`: Name of the test case
- `description`: Description of the test case (optional)
- `steps`: List of test steps to perform
- `expected_result`: Expected result of the test (optional)

**Returns:**
- Test case ID and details

### 3. Define Test Step
Define a single test step with action and target.

```python
define_test_step(
    action: str,  # 'click', 'type', 'navigate', 'assert', 'get_text', etc.
    target: str,  # CSS selector, XPath, or URL
    value: str = None,  # Value to enter or expected value
    description: str = None
) -> dict
```

**Parameters:**
- `action`: Action to perform
- `target`: Target element or URL
- `value`: Value to use in action
- `description`: Description of the step (optional)

**Returns:**
- Test step definition

### 4. Create API Test
Create an API test case with request and response definitions.

```python
create_api_test(
    test_suite_id: str,
    test_case_name: str,
    method: str,  # GET, POST, PUT, DELETE
    endpoint: str,
    headers: dict = None,
    payload: dict = None,
    expected_status_code: int = 200,
    expected_response_body: dict = None
) -> dict
```

**Parameters:**
- `test_suite_id`: ID of the test suite
- `test_case_name`: Name of the test case
- `method`: HTTP method
- `endpoint`: API endpoint URL
- `headers`: Request headers (optional)
- `payload`: Request body (for POST/PUT)
- `expected_status_code`: Expected HTTP status code
- `expected_response_body`: Expected response body (optional)

**Returns:**
- API test case details

### 5. Run Test Suite
Run a test suite on specified browsers.

```python
run_test_suite(
    test_suite_id: str,
    browsers: list = None,
    headless: bool = True,
    output_dir: str = None
) -> dict
```

**Parameters:**
- `test_suite_id`: ID of the test suite
- `browsers`: Browsers to run on (default: all configured browsers)
- `headless`: Run browsers in background (default: True)
- `output_dir`: Directory to save test reports

**Returns:**
- Test results with pass/fail status and detailed reports

### 6. Get Test Results
Get detailed results for a test execution.

```python
get_test_results(
    test_suite_id: str,
    test_run_id: str = None,
    output_dir: str = None
) -> dict
```

**Parameters:**
- `test_suite_id`: ID of the test suite
- `test_run_id`: Specific test run ID (optional)
- `output_dir`: Directory to load results from (optional)

**Returns:**
- Test results with screenshots, videos, and detailed reports

### 7. Export Test Results
Export test results to different formats.

```python
export_test_results(
    test_suite_id: str,
    test_run_id: str,
    format: str = 'html',  # 'html', 'json', 'pdf', 'csv'
    output_path: str
) -> dict
```

**Parameters:**
- `test_suite_id`: ID of the test suite
- `test_run_id`: ID of the test run
- `format`: Output format
- `output_path`: File path to save results

**Returns:**
- Export status and file path

### 8. Schedule Test Execution
Schedule a test suite to run at specified intervals.

```python
schedule_test_execution(
    test_suite_id: str,
    schedule: str,  # Cron expression or interval string (e.g., 'daily', 'hourly')
    time: str = None,  # Time in HH:MM format
    browsers: list = None,
    headless: bool = True
) -> dict
```

**Parameters:**
- `test_suite_id`: ID of the test suite
- `schedule`: Cron expression or interval
- `time`: Specific time for execution
- `browsers`: Browsers to test on
- `headless`: Run in background

**Returns:**
- Schedule ID and configuration

### 9. Get Test Coverage
Generate test coverage report for the application.

```python
get_test_coverage(
    test_suite_id: str,
    output_dir: str = None
) -> dict
```

**Parameters:**
- `test_suite_id`: ID of the test suite
- `output_dir`: Directory to save coverage report

**Returns:**
- Coverage report with metrics and statistics

## Usage Examples

### Example 1: Create and run a UI test suite

```python
# Create a new test suite
test_suite = create_test_suite(
    suite_name="Login Page Tests",
    description="Test login functionality across different browsers",
    test_type="ui",
    browsers=["chrome", "firefox"]
)

# Define test steps
login_steps = [
    define_test_step("navigate", "https://example.com/login"),
    define_test_step("type", "#username", "testuser"),
    define_test_step("type", "#password", "password123"),
    define_test_step("click", "#login-btn"),
    define_test_step("assert", "h1", "Welcome"),
    define_test_step("get_text", "#user-menu")
]

# Add test case
test_case = add_test_case(
    test_suite["id"],
    "Successful Login",
    steps=login_steps,
    expected_result="User should be redirected to dashboard"
)

# Run the test suite
results = run_test_suite(test_suite["id"])
print(results)
```

### Example 2: Create and run an API test

```python
api_test = create_api_test(
    "12345",
    "Get User Profile",
    "GET",
    "https://api.example.com/users/1",
    expected_status_code=200,
    expected_response