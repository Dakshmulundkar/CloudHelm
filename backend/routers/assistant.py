"""
CloudHelm Assistant API endpoints using Mistral AI.
"""
from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import Optional
from sqlalchemy.orm import Session

from backend.core.db import get_db
from backend.core.security import get_current_user
from backend.models.user import User
from backend.services.mistral_service import mistral_service

router = APIRouter(prefix="/api/assistant", tags=["assistant"])


class AssistantRequest(BaseModel):
    """Request model for assistant queries"""
    repository_id: Optional[str] = None
    repository_name: Optional[str] = None
    query: str
    code_snippet: Optional[str] = None
    context_type: Optional[str] = "general"  # general, incident, security


class AssistantResponse(BaseModel):
    """Response model for assistant queries"""
    response: str
    repository_name: Optional[str] = None


@router.post("/query", response_model=AssistantResponse)
async def query_assistant(
    request: AssistantRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Query the CloudHelm Assistant powered by Mistral AI.
    
    Supports different context types:
    - general: General code analysis and questions
    - incident: Incident analysis and solutions
    - security: Security vulnerability review
    """
    if not mistral_service.enabled:
        raise HTTPException(
            status_code=503,
            detail="Mistral AI service is not available. Please configure MISTRAL_API_KEY."
        )
    
    try:
        response_text = None
        
        if request.context_type == "incident":
            # Incident solution
            response_text = await mistral_service.suggest_incident_solution(
                repository_name=request.repository_name or "Unknown Repository",
                incident_description=request.query,
                error_logs=request.code_snippet
            )
        elif request.context_type == "security":
            # Security review
            response_text = await mistral_service.review_security(
                repository_name=request.repository_name or "Unknown Repository",
                code_snippet=request.code_snippet
            )
        else:
            # General code analysis
            response_text = await mistral_service.analyze_code(
                repository_name=request.repository_name or "Unknown Repository",
                code_snippet=request.code_snippet,
                question=request.query
            )
        
        if not response_text:
            raise HTTPException(
                status_code=500,
                detail="Failed to generate response from Mistral AI"
            )
        
        return AssistantResponse(
            response=response_text,
            repository_name=request.repository_name
        )
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error processing assistant query: {str(e)}"
        )


@router.get("/status")
async def get_assistant_status():
    """Check if the assistant service is available"""
    return {
        "enabled": mistral_service.enabled,
        "model": mistral_service.model if mistral_service.enabled else None,
        "service": "Mistral AI"
    }
