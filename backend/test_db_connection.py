"""
Quick script to test database connection.
Run this to verify your DATABASE_URL is configured correctly.

Usage:
    python backend/test_db_connection.py
"""

import sys
from pathlib import Path

# Add backend to path
sys.path.insert(0, str(Path(__file__).parent))

def test_connection():
    print("=" * 60)
    print("CloudHelm Database Connection Test")
    print("=" * 60)
    print()
    
    # Step 1: Check if .env file exists
    print("Step 1: Checking .env file...")
    env_file = Path(__file__).parent / ".env"
    if not env_file.exists():
        print("❌ ERROR: backend/.env file not found!")
        print("   Please copy backend/.env.example to backend/.env")
        return False
    print("✅ .env file found")
    print()
    
    # Step 2: Load environment variables
    print("Step 2: Loading environment variables...")
    try:
        from dotenv import load_dotenv
        load_dotenv(env_file)
        print("✅ Environment variables loaded")
    except Exception as e:
        print(f"❌ ERROR loading .env: {e}")
        return False
    print()
    
    # Step 3: Check DATABASE_URL
    print("Step 3: Checking DATABASE_URL...")
    import os
    db_url = os.getenv("DATABASE_URL")
    if not db_url:
        print("❌ ERROR: DATABASE_URL not set in .env file")
        return False
    
    # Check if it's still the placeholder
    if "username:password@ep-xxx" in db_url:
        print("❌ ERROR: DATABASE_URL still has placeholder values!")
        print()
        print("You need to:")
        print("1. Create a Neon account at https://neon.tech")
        print("2. Create a project named 'cloudhelm'")
        print("3. Copy the connection string")
        print("4. Update DATABASE_URL in backend/.env")
        print()
        print("OR use SQLite for quick testing:")
        print("   DATABASE_URL=sqlite:///./cloudhelm.db")
        return False
    
    # Mask password for display
    masked_url = db_url
    if "@" in db_url and "://" in db_url:
        parts = db_url.split("://")
        if len(parts) == 2:
            protocol = parts[0]
            rest = parts[1]
            if "@" in rest:
                creds, host = rest.split("@", 1)
                if ":" in creds:
                    user, _ = creds.split(":", 1)
                    masked_url = f"{protocol}://{user}:****@{host}"
    
    print(f"✅ DATABASE_URL is set: {masked_url}")
    print()
    
    # Step 4: Test database connection
    print("Step 4: Testing database connection...")
    try:
        from core.db import engine
        
        # Try to connect
        with engine.connect() as conn:
            result = conn.execute("SELECT 1")
            result.fetchone()
        
        print("✅ Database connection successful!")
        print()
        
        # Step 5: Check tables
        print("Step 5: Checking database tables...")
        from sqlalchemy import inspect
        inspector = inspect(engine)
        tables = inspector.get_table_names()
        
        if not tables:
            print("⚠️  WARNING: No tables found in database")
            print("   You need to run migrations:")
            print("   cd backend && alembic upgrade head")
        else:
            print(f"✅ Found {len(tables)} tables:")
            for table in sorted(tables):
                print(f"   - {table}")
        
        print()
        print("=" * 60)
        print("✅ DATABASE CONNECTION TEST PASSED!")
        print("=" * 60)
        print()
        print("Your database is configured correctly.")
        print("You can now start the backend server:")
        print("   python -m backend.main")
        print()
        return True
        
    except Exception as e:
        print(f"❌ ERROR: Database connection failed!")
        print(f"   Error: {e}")
        print()
        print("Common issues:")
        print("1. Invalid connection string format")
        print("2. Database server not accessible")
        print("3. Wrong credentials")
        print("4. Network/firewall issues")
        print()
        print("For Neon database:")
        print("- Make sure connection string has '+psycopg' after 'postgresql'")
        print("- Verify the connection string is correct in Neon console")
        print()
        print("For SQLite:")
        print("- Use: DATABASE_URL=sqlite:///./cloudhelm.db")
        print()
        return False

if __name__ == "__main__":
    success = test_connection()
    sys.exit(0 if success else 1)
