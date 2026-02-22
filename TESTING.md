# CloudHelm Testing Guide

This guide covers all testing aspects of CloudHelm, including unit tests, integration tests, and CLI command testing.

## Test Structure

```
CloudHelm/
├── backend/
│   ├── tests/
│   │   ├── __init__.py
│   │   ├── conftest.py          # Test configuration
│   │   ├── test_main.py         # Main app tests
│   │   ├── test_assistant.py    # Assistant API tests
│   │   └── test_mistral_service.py  # Mistral service tests
│   └── pytest.ini              # Pytest configuration
├── frontend/
│   ├── src/test/
│   │   ├── setup.ts             # Test setup
│   │   ├── Login.test.tsx       # Login component tests
│   │   ├── CloudHelmAssistant.test.tsx  # Assistant tests
│   │   └── api.test.ts          # API client tests
│   └── vitest.config.ts         # Vitest configuration
└── run_tests.py                 # Test runner script
```

## Backend Tests (Python/pytest)

### Setup

1. **Install test dependencies:**
   ```bash
   cd backend
   pip install pytest pytest-asyncio pytest-cov pytest-mock httpx
   ```

2. **Run tests:**
   ```bash
   # Run all tests
   pytest

   # Run with coverage
   pytest --cov=. --cov-report=html

   # Run specific test file
   pytest tests/test_assistant.py

   # Run with verbose output
   pytest -v
   ```

### Test Categories

#### 1. Main Application Tests (`test_main.py`)
- Health check endpoint
- CORS headers
- API documentation
- OpenAPI schema

#### 2. Assistant API Tests (`test_assistant.py`)
- Authentication requirements
- Service status endpoint
- Query processing
- Context handling (general, incident, security)
- CLI command processing
- Error handling

#### 3. Mistral Service Tests (`test_mistral_service.py`)
- Service initialization
- API key handling
- Code analysis
- CLI command execution
- Security restrictions
- Error handling

### Example Test Commands

```bash
# Test the /test CLI command
pytest tests/test_mistral_service.py::TestMistralService::test_cli_command_test -v

# Test assistant API
pytest tests/test_assistant.py::TestAssistantAPI::test_query_assistant_general_context -v

# Test with coverage
pytest --cov=services --cov-report=term-missing
```

## Frontend Tests (TypeScript/Vitest)

### Setup

1. **Install test dependencies:**
   ```bash
   cd frontend
   npm install @testing-library/react @testing-library/jest-dom @testing-library/user-event vitest jsdom @vitest/ui @vitest/coverage-v8
   ```

2. **Run tests:**
   ```bash
   # Run all tests
   npm run test

   # Run tests in watch mode
   npm run test:watch

   # Run tests with UI
   npm run test:ui

   # Run tests with coverage
   npm run coverage
   ```

### Test Categories

#### 1. Login Component Tests (`Login.test.tsx`)
- Component rendering
- GitHub login button
- Google login button removal
- OAuth redirects
- UI elements

#### 2. CloudHelm Assistant Tests (`CloudHelmAssistant.test.tsx`)
- Floating button behavior
- Popup opening/closing
- Repository context display
- CLI command buttons
- Message handling
- API integration

#### 3. API Client Tests (`api.test.ts`)
- Authentication headers
- Error handling
- Assistant endpoints
- HTTP status codes
- Token management

### Example Test Commands

```bash
# Test specific component
npm run test Login.test.tsx

# Test with coverage
npm run coverage

# Test in watch mode
npm run test:watch
```

## CLI Command Testing

The CloudHelm Assistant supports CLI commands that can be tested both programmatically and manually.

### Available CLI Commands

| Command | Description | Test Method |
|---------|-------------|-------------|
| `/help` | Show available commands | Unit test + Manual |
| `/test [path]` | Run tests | Integration test |
| `/lint [path]` | Run linter | Integration test |
| `/errors [path]` | Find errors | Integration test |
| `/build [target]` | Run build | Integration test |
| `/run <command>` | Execute safe commands | Unit test + Manual |

### Testing CLI Commands

#### 1. Unit Tests (Mocked)

```python
# Test /help command
async def test_cli_command_help():
    service = MistralService()
    result = await service.analyze_code("test-repo", question="/help")
    assert "CLI Commands" in result

# Test /test command (mocked)
async def test_cli_command_test():
    with patch('asyncio.create_subprocess_shell') as mock_subprocess:
        # Mock successful test run
        mock_process.communicate.return_value = (b"Tests passed", b"")
        result = await service.analyze_code("test-repo", question="/test")
        assert "Tests passed" in result
```

#### 2. Integration Tests (Real Commands)

```bash
# Test in CloudHelm Assistant
1. Open CloudHelm Assistant
2. Type: /help
3. Verify: Shows command list

4. Type: /test
5. Verify: Runs actual tests

6. Type: /lint
7. Verify: Runs linter

8. Type: /errors
9. Verify: Finds compilation errors
```

#### 3. Manual Testing Checklist

**Setup:**
- [ ] Backend running with Mistral API key
- [ ] Frontend running
- [ ] Repository selected in Releases page
- [ ] Assistant opened

**Test Commands:**
- [ ] `/help` - Shows command list
- [ ] `/test` - Runs tests (npm test or pytest)
- [ ] `/test backend/` - Runs backend tests only
- [ ] `/lint` - Runs linter (ESLint or Pylint)
- [ ] `/lint src/` - Lints specific directory
- [ ] `/errors` - Finds TypeScript/Python errors
- [ ] `/errors backend/` - Checks backend only
- [ ] `/build` - Runs build command
- [ ] `/run git status` - Shows git status
- [ ] `/run npm --version` - Shows npm version
- [ ] `/run rm -rf /` - Should be blocked (security)

**Expected Results:**
- [ ] Commands execute within timeout (30-120s)
- [ ] Output is formatted with code blocks
- [ ] Errors are handled gracefully
- [ ] Security restrictions work
- [ ] Long output is truncated

## Test Runner

Use the provided test runner to run all tests:

```bash
# Run all tests (backend + frontend)
python run_tests.py
```

The test runner will:
1. Check for required dependencies
2. Run backend tests with pytest
3. Run frontend tests with vitest
4. Generate coverage reports
5. Provide summary of results

## Continuous Integration

### GitHub Actions (Example)

```yaml
name: Tests
on: [push, pull_request]

jobs:
  backend-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-python@v4
        with:
          python-version: '3.12'
      - run: cd backend && pip install -r requirements.txt
      - run: cd backend && pytest --cov=. --cov-report=xml
      
  frontend-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: cd frontend && npm install
      - run: cd frontend && npm run test:run
```

## Test Coverage Goals

### Backend Coverage Targets
- [ ] Overall: >80%
- [ ] Services: >90%
- [ ] Routers: >85%
- [ ] Models: >70%

### Frontend Coverage Targets
- [ ] Overall: >75%
- [ ] Components: >80%
- [ ] API Client: >90%
- [ ] Utils: >85%

## Testing Best Practices

### Backend (Python)
1. **Use fixtures** for common test data
2. **Mock external services** (Mistral AI, GitHub API)
3. **Test error conditions** not just happy paths
4. **Use async/await** for async functions
5. **Isolate database** with test database

### Frontend (TypeScript)
1. **Test user interactions** not implementation details
2. **Mock API calls** with realistic responses
3. **Test error states** and loading states
4. **Use semantic queries** (getByRole, getByText)
5. **Test accessibility** with screen readers

### CLI Commands
1. **Mock subprocess calls** in unit tests
2. **Test security restrictions** thoroughly
3. **Test timeout handling**
4. **Test output formatting**
5. **Verify command patterns** with regex

## Debugging Tests

### Backend Debugging
```bash
# Run single test with debugging
pytest tests/test_assistant.py::test_query_assistant -v -s

# Run with pdb debugger
pytest tests/test_assistant.py --pdb

# Show print statements
pytest tests/test_assistant.py -s
```

### Frontend Debugging
```bash
# Run tests in debug mode
npm run test -- --reporter=verbose

# Run specific test
npm run test Login.test.tsx

# Open test UI
npm run test:ui
```

## Performance Testing

### Load Testing Assistant API
```python
import asyncio
import aiohttp

async def load_test_assistant():
    async with aiohttp.ClientSession() as session:
        tasks = []
        for i in range(100):
            task = session.post('/api/assistant/query', json={
                'query': '/help',
                'context_type': 'general'
            })
            tasks.append(task)
        
        responses = await asyncio.gather(*tasks)
        return responses
```

### Frontend Performance
```typescript
// Test component render time
import { performance } from 'perf_hooks';

const start = performance.now();
render(<CloudHelmAssistant />);
const end = performance.now();
console.log(`Render time: ${end - start}ms`);
```

## Test Data

### Sample Test Data
```python
# Backend test data
SAMPLE_USER = {
    "id": 1,
    "username": "testuser",
    "email": "test@example.com"
}

SAMPLE_REPOSITORY = {
    "id": "repo-123",
    "name": "test-repo",
    "full_name": "testuser/test-repo"
}
```

```typescript
// Frontend test data
const mockApiResponse = {
  response: "Test AI response",
  repository_name: "test-repo"
};

const mockUser = {
  id: 1,
  username: "testuser",
  email: "test@example.com"
};
```

## Troubleshooting Tests

### Common Issues

1. **Tests timeout**
   - Increase timeout in test configuration
   - Mock slow operations
   - Use async/await properly

2. **Database conflicts**
   - Use test database
   - Clean up after each test
   - Use transactions

3. **API mocking issues**
   - Verify mock setup
   - Check mock call counts
   - Reset mocks between tests

4. **CLI command tests fail**
   - Check if commands are available
   - Mock subprocess calls
   - Test on different platforms

### Getting Help

1. Check test logs for specific errors
2. Run tests individually to isolate issues
3. Verify test environment setup
4. Check mock configurations
5. Review test data and fixtures

## Test Metrics

Track these metrics to ensure test quality:

- **Test Coverage**: >80% overall
- **Test Speed**: <30s for full suite
- **Test Reliability**: <1% flaky tests
- **Test Maintenance**: Regular updates with code changes

## Conclusion

Comprehensive testing ensures CloudHelm works reliably across all features. The test suite covers:

- ✅ Backend API endpoints
- ✅ Frontend components
- ✅ CLI command execution
- ✅ Error handling
- ✅ Security restrictions
- ✅ Integration scenarios

Run tests regularly during development and before deployment to catch issues early.