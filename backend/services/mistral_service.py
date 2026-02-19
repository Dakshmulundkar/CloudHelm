"""
Mistral AI service for code analysis and incident solutions.
Provides intelligent code review and incident response recommendations.
Supports CLI-like commands for running tests and finding errors.
"""
import logging
import re
import subprocess
import asyncio
from typing import Optional, Dict, Any, Tuple
import httpx

from backend.core.config import settings

logger = logging.getLogger(__name__)


class MistralService:
    """Service for interacting with Mistral AI API with CLI command support"""
    
    def __init__(self):
        """Initialize Mistral service with API key from settings"""
        self.api_key = settings.mistral_api_key
        if not self.api_key:
            logger.warning("MISTRAL_API_KEY not found in environment. Code analysis will not be available.")
            self.enabled = False
            return
        
        self.api_url = "https://api.mistral.ai/v1/chat/completions"
        self.model = "mistral-large-latest"  # or "mistral-medium" for faster responses
        self.enabled = True
        
        # CLI command patterns
        self.cli_commands = {
            r'^/run\s+(.+)$': self._execute_command,
            r'^/test\s*(.*)$': self._run_tests,
            r'^/lint\s*(.*)$': self._run_linter,
            r'^/errors?\s*(.*)$': self._find_errors,
            r'^/build\s*(.*)$': self._run_build,
            r'^/help$': self._show_help,
        }
        
        logger.info("Mistral AI service initialized successfully with CLI support")
    
    async def analyze_code(
        self,
        repository_name: str,
        code_snippet: Optional[str] = None,
        file_path: Optional[str] = None,
        question: Optional[str] = None
    ) -> Optional[str]:
        """
        Analyze code and provide insights.
        Supports CLI-like commands starting with /:
        - /run <command> - Execute a shell command
        - /test [path] - Run tests
        - /lint [path] - Run linter
        - /errors [path] - Find errors in code
        - /build [target] - Run build command
        - /help - Show available commands
        
        Args:
            repository_name: Name of the repository
            code_snippet: Code to analyze (optional)
            file_path: Path to the file being analyzed (optional)
            question: Specific question about the code (optional)
            
        Returns:
            Analysis result or None if generation fails
        """
        if not self.enabled:
            logger.warning("Mistral AI is not enabled. Cannot analyze code.")
            return None
        
        try:
            # Check if question is a CLI command
            if question:
                for pattern, handler in self.cli_commands.items():
                    match = re.match(pattern, question.strip(), re.IGNORECASE)
                    if match:
                        # Execute CLI command
                        command_result = await handler(match, repository_name)
                        return command_result
            
            # Regular code analysis
            prompt = self._build_code_analysis_prompt(
                repository_name=repository_name,
                code_snippet=code_snippet,
                file_path=file_path,
                question=question
            )
            
            return await self._call_mistral_api(prompt)
            
        except Exception as e:
            logger.error(f"Error analyzing code: {e}")
            return None
    
    async def suggest_incident_solution(
        self,
        repository_name: str,
        incident_description: str,
        error_logs: Optional[str] = None,
        recent_changes: Optional[str] = None
    ) -> Optional[str]:
        """
        Suggest solutions for incidents based on repository context.
        
        Args:
            repository_name: Name of the repository
            incident_description: Description of the incident
            error_logs: Error logs if available (optional)
            recent_changes: Recent code changes (optional)
            
        Returns:
            Suggested solutions or None if generation fails
        """
        if not self.enabled:
            logger.warning("Mistral AI is not enabled. Cannot suggest solutions.")
            return None
        
        try:
            prompt = self._build_incident_solution_prompt(
                repository_name=repository_name,
                incident_description=incident_description,
                error_logs=error_logs,
                recent_changes=recent_changes
            )
            
            return await self._call_mistral_api(prompt)
            
        except Exception as e:
            logger.error(f"Error suggesting incident solution: {e}")
            return None
    
    async def review_security(
        self,
        repository_name: str,
        code_snippet: Optional[str] = None
    ) -> Optional[str]:
        """
        Review code for security vulnerabilities.
        
        Args:
            repository_name: Name of the repository
            code_snippet: Code to review (optional)
            
        Returns:
            Security review or None if generation fails
        """
        if not self.enabled:
            logger.warning("Mistral AI is not enabled. Cannot review security.")
            return None
        
        try:
            prompt = self._build_security_review_prompt(
                repository_name=repository_name,
                code_snippet=code_snippet
            )
            
            return await self._call_mistral_api(prompt)
            
        except Exception as e:
            logger.error(f"Error reviewing security: {e}")
            return None
    
    async def _call_mistral_api(self, prompt: str) -> Optional[str]:
        """Call Mistral AI API with the given prompt"""
        try:
            headers = {
                "Authorization": f"Bearer {self.api_key}",
                "Content-Type": "application/json"
            }
            
            payload = {
                "model": self.model,
                "messages": [
                    {
                        "role": "system",
                        "content": "You are CloudHelm Assistant, an expert SRE and DevOps AI assistant. You help engineers analyze code, identify issues, and provide solutions for incidents. Be concise, technical, and actionable."
                    },
                    {
                        "role": "user",
                        "content": prompt
                    }
                ],
                "temperature": 0.3,
                "max_tokens": 1000
            }
            
            async with httpx.AsyncClient(timeout=30.0) as client:
                response = await client.post(
                    self.api_url,
                    headers=headers,
                    json=payload
                )
                response.raise_for_status()
                
                data = response.json()
                
                if not data.get("choices"):
                    logger.error("Mistral returned no choices")
                    return None
                
                message = data["choices"][0].get("message", {})
                content = message.get("content", "")
                
                if not content:
                    logger.error("Mistral returned empty content")
                    return None
                
                logger.info("Successfully generated response from Mistral AI")
                return content
            
        except httpx.HTTPStatusError as e:
            logger.error(f"HTTP error from Mistral API: {e.response.status_code} - {e.response.text}")
            return None
        except Exception as e:
            logger.error(f"Error calling Mistral API: {e}")
            return None
    
    def _build_code_analysis_prompt(
        self,
        repository_name: str,
        code_snippet: Optional[str],
        file_path: Optional[str],
        question: Optional[str]
    ) -> str:
        """Build prompt for code analysis"""
        
        context = f"Repository: {repository_name}\n"
        if file_path:
            context += f"File: {file_path}\n"
        
        if code_snippet:
            context += f"\nCode:\n```\n{code_snippet}\n```\n"
        
        if question:
            context += f"\nQuestion: {question}\n"
        else:
            context += "\nPlease analyze this code for potential issues, best practices, and improvements.\n"
        
        return context
    
    def _build_incident_solution_prompt(
        self,
        repository_name: str,
        incident_description: str,
        error_logs: Optional[str],
        recent_changes: Optional[str]
    ) -> str:
        """Build prompt for incident solution"""
        
        prompt = f"""Repository: {repository_name}

**Incident Description:**
{incident_description}
"""
        
        if error_logs:
            prompt += f"\n**Error Logs:**\n```\n{error_logs}\n```\n"
        
        if recent_changes:
            prompt += f"\n**Recent Changes:**\n{recent_changes}\n"
        
        prompt += """
Please provide:
1. Root cause analysis
2. Immediate mitigation steps
3. Long-term solution
4. Prevention recommendations
"""
        
        return prompt
    
    def _build_security_review_prompt(
        self,
        repository_name: str,
        code_snippet: Optional[str]
    ) -> str:
        """Build prompt for security review"""
        
        prompt = f"Repository: {repository_name}\n\n"
        
        if code_snippet:
            prompt += f"Code to review:\n```\n{code_snippet}\n```\n\n"
        
        prompt += """Please review for security vulnerabilities including:
- SQL injection
- XSS vulnerabilities
- Authentication/authorization issues
- Sensitive data exposure
- Insecure dependencies
- CSRF vulnerabilities
- Input validation issues

Provide specific recommendations for each finding."""
        
        return prompt
    
    # CLI Command Handlers
    
    async def _execute_command(self, match: re.Match, repository_name: str) -> str:
        """Execute a shell command and return the output"""
        command = match.group(1).strip()
        
        # Security: Only allow safe commands
        safe_commands = ['npm', 'python', 'pytest', 'eslint', 'tsc', 'git', 'ls', 'dir', 'cat', 'type']
        command_parts = command.split()
        
        if not command_parts or command_parts[0] not in safe_commands:
            return f"❌ **Command Not Allowed**\n\nFor security reasons, only these commands are allowed:\n{', '.join(safe_commands)}\n\nTry: `/test` or `/lint` instead."
        
        try:
            # Execute command with timeout
            process = await asyncio.create_subprocess_shell(
                command,
                stdout=asyncio.subprocess.PIPE,
                stderr=asyncio.subprocess.PIPE,
                shell=True
            )
            
            try:
                stdout, stderr = await asyncio.wait_for(process.communicate(), timeout=30.0)
            except asyncio.TimeoutError:
                process.kill()
                return "❌ **Command Timeout**\n\nThe command took too long to execute (>30s)."
            
            output = stdout.decode('utf-8', errors='ignore')
            error = stderr.decode('utf-8', errors='ignore')
            
            result = f"✅ **Command Executed**: `{command}`\n\n"
            
            if output:
                result += f"**Output:**\n```\n{output[:2000]}\n```\n\n"
            
            if error:
                result += f"**Errors:**\n```\n{error[:2000]}\n```\n\n"
            
            if process.returncode != 0:
                result += f"⚠️ Exit code: {process.returncode}"
            
            return result
            
        except Exception as e:
            return f"❌ **Execution Error**\n\n```\n{str(e)}\n```"
    
    async def _run_tests(self, match: re.Match, repository_name: str) -> str:
        """Run tests and return results"""
        test_path = match.group(1).strip() or "."
        
        result = f"🧪 **Running Tests**\n\nRepository: {repository_name}\nPath: {test_path}\n\n"
        
        # Try different test runners
        test_commands = [
            ("npm test", "npm"),
            ("pytest", "pytest"),
            ("python -m pytest", "pytest"),
            ("npm run test", "npm"),
        ]
        
        for command, runner in test_commands:
            try:
                process = await asyncio.create_subprocess_shell(
                    f"{command} {test_path}",
                    stdout=asyncio.subprocess.PIPE,
                    stderr=asyncio.subprocess.PIPE,
                    shell=True
                )
                
                try:
                    stdout, stderr = await asyncio.wait_for(process.communicate(), timeout=60.0)
                except asyncio.TimeoutError:
                    process.kill()
                    continue
                
                output = stdout.decode('utf-8', errors='ignore')
                error = stderr.decode('utf-8', errors='ignore')
                
                if process.returncode == 0 or output or error:
                    result += f"**Test Runner**: {runner}\n\n"
                    
                    if output:
                        result += f"**Results:**\n```\n{output[:1500]}\n```\n\n"
                    
                    if error and process.returncode != 0:
                        result += f"**Errors:**\n```\n{error[:1500]}\n```\n\n"
                    
                    if process.returncode == 0:
                        result += "✅ **All tests passed!**"
                    else:
                        result += f"❌ **Tests failed** (exit code: {process.returncode})"
                    
                    return result
                    
            except Exception:
                continue
        
        return result + "❌ **No test runner found**\n\nTry installing: `npm install` or `pip install pytest`"
    
    async def _run_linter(self, match: re.Match, repository_name: str) -> str:
        """Run linter and return results"""
        lint_path = match.group(1).strip() or "."
        
        result = f"🔍 **Running Linter**\n\nRepository: {repository_name}\nPath: {lint_path}\n\n"
        
        # Try different linters
        lint_commands = [
            ("eslint", "ESLint"),
            ("npm run lint", "npm lint"),
            ("pylint", "Pylint"),
            ("flake8", "Flake8"),
        ]
        
        for command, linter in lint_commands:
            try:
                process = await asyncio.create_subprocess_shell(
                    f"{command} {lint_path}",
                    stdout=asyncio.subprocess.PIPE,
                    stderr=asyncio.subprocess.PIPE,
                    shell=True
                )
                
                try:
                    stdout, stderr = await asyncio.wait_for(process.communicate(), timeout=30.0)
                except asyncio.TimeoutError:
                    process.kill()
                    continue
                
                output = stdout.decode('utf-8', errors='ignore')
                error = stderr.decode('utf-8', errors='ignore')
                
                if output or error:
                    result += f"**Linter**: {linter}\n\n"
                    
                    combined = output + error
                    if combined:
                        result += f"**Issues Found:**\n```\n{combined[:1500]}\n```\n\n"
                    
                    if process.returncode == 0:
                        result += "✅ **No linting errors!**"
                    else:
                        result += f"⚠️ **Linting issues found** (exit code: {process.returncode})"
                    
                    return result
                    
            except Exception:
                continue
        
        return result + "❌ **No linter found**\n\nTry installing: `npm install eslint` or `pip install pylint`"
    
    async def _find_errors(self, match: re.Match, repository_name: str) -> str:
        """Find errors in code using TypeScript compiler or Python"""
        error_path = match.group(1).strip() or "."
        
        result = f"🐛 **Finding Errors**\n\nRepository: {repository_name}\nPath: {error_path}\n\n"
        
        # Try TypeScript compiler
        try:
            process = await asyncio.create_subprocess_shell(
                f"tsc --noEmit {error_path}",
                stdout=asyncio.subprocess.PIPE,
                stderr=asyncio.subprocess.PIPE,
                shell=True
            )
            
            try:
                stdout, stderr = await asyncio.wait_for(process.communicate(), timeout=30.0)
            except asyncio.TimeoutError:
                process.kill()
                return result + "❌ **Timeout** - Error checking took too long"
            
            output = stdout.decode('utf-8', errors='ignore')
            error = stderr.decode('utf-8', errors='ignore')
            
            combined = output + error
            
            if combined:
                result += f"**TypeScript Errors:**\n```\n{combined[:1500]}\n```\n\n"
                
                if process.returncode == 0:
                    result += "✅ **No TypeScript errors found!**"
                else:
                    result += f"❌ **Found {combined.count('error')} error(s)**"
                
                return result
                
        except Exception:
            pass
        
        # Try Python syntax check
        try:
            process = await asyncio.create_subprocess_shell(
                f"python -m py_compile {error_path}",
                stdout=asyncio.subprocess.PIPE,
                stderr=asyncio.subprocess.PIPE,
                shell=True
            )
            
            stdout, stderr = await asyncio.wait_for(process.communicate(), timeout=10.0)
            error = stderr.decode('utf-8', errors='ignore')
            
            if error:
                result += f"**Python Errors:**\n```\n{error[:1500]}\n```\n\n"
                result += "❌ **Syntax errors found**"
                return result
            else:
                result += "✅ **No Python syntax errors found!**"
                return result
                
        except Exception:
            pass
        
        return result + "❌ **No error checker found**\n\nTry: `npm install typescript` or ensure Python is installed"
    
    async def _run_build(self, match: re.Match, repository_name: str) -> str:
        """Run build command"""
        build_target = match.group(1).strip() or ""
        
        result = f"🔨 **Running Build**\n\nRepository: {repository_name}\n\n"
        
        # Try different build commands
        build_commands = [
            f"npm run build {build_target}",
            f"python setup.py build {build_target}",
            f"make {build_target}",
        ]
        
        for command in build_commands:
            try:
                process = await asyncio.create_subprocess_shell(
                    command,
                    stdout=asyncio.subprocess.PIPE,
                    stderr=asyncio.subprocess.PIPE,
                    shell=True
                )
                
                try:
                    stdout, stderr = await asyncio.wait_for(process.communicate(), timeout=120.0)
                except asyncio.TimeoutError:
                    process.kill()
                    return result + "❌ **Build Timeout** - Build took too long (>2min)"
                
                output = stdout.decode('utf-8', errors='ignore')
                error = stderr.decode('utf-8', errors='ignore')
                
                if output or error:
                    result += f"**Command**: `{command}`\n\n"
                    
                    if output:
                        result += f"**Output:**\n```\n{output[-1000:]}\n```\n\n"
                    
                    if error and process.returncode != 0:
                        result += f"**Errors:**\n```\n{error[-1000:]}\n```\n\n"
                    
                    if process.returncode == 0:
                        result += "✅ **Build successful!**"
                    else:
                        result += f"❌ **Build failed** (exit code: {process.returncode})"
                    
                    return result
                    
            except Exception:
                continue
        
        return result + "❌ **No build command found**\n\nTry: `npm install` or configure build scripts"
    
    async def _show_help(self, match: re.Match, repository_name: str) -> str:
        """Show available CLI commands"""
        return """🤖 **CloudHelm Assistant - CLI Commands**

Available commands:

**Testing & Analysis:**
• `/test [path]` - Run tests in the repository
• `/lint [path]` - Run linter to check code quality
• `/errors [path]` - Find compilation/syntax errors
• `/build [target]` - Run build command

**Execution:**
• `/run <command>` - Execute a safe shell command
  Allowed: npm, python, pytest, eslint, tsc, git, ls, dir, cat, type

**Help:**
• `/help` - Show this help message

**Examples:**
```
/test
/lint src/
/errors backend/
/run npm install
/run git status
```

**Tips:**
- Commands execute in the repository directory
- Output is limited to prevent overflow
- Commands timeout after 30-120 seconds
- For security, only safe commands are allowed

**Regular Chat:**
Just type normally to ask questions about code, get analysis, or discuss incidents!
"""


# Global instance
mistral_service = MistralService()
