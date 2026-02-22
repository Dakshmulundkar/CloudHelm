#!/usr/bin/env python3
"""
Startup script for Render deployment.
This script sets up the Python path and starts the FastAPI application.
"""
import sys
import os
from pathlib import Path

# Add the project root to Python path
project_root = Path(__file__).parent.parent
sys.path.insert(0, str(project_root))

# Now we can import and run the app
if __name__ == "__main__":
    import uvicorn
    from backend.main import app
    
    # Get port from environment (Render sets this)
    port = int(os.environ.get("PORT", 8000))
    
    # Run the app
    uvicorn.run(
        app,
        host="0.0.0.0",
        port=port,
        log_level="info"
    )