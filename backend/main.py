"""
Main FastAPI application entry point.
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.core.config import settings

# Create FastAPI app
app = FastAPI(
    title="CloudHelm API",
    description="FinOps + DevOps copilot API for Module A (Core Platform & Cost Radar)",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.frontend_origin],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Health check endpoint
@app.get("/health")
async def health_check():
    """Health check endpoint."""
    return {"status": "healthy", "environment": settings.app_env}

# Include routers
from backend.routers import auth, cost, overview, releases
app.include_router(auth.router)
app.include_router(cost.router)
app.include_router(overview.router)
app.include_router(releases.repos_router)
app.include_router(releases.releases_router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "backend.main:app",
        host=settings.app_host,
        port=settings.app_port,
        reload=settings.app_env == "dev"
    )
