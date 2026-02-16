# CloudHelm

**🚀 Quick Start - 100% Free Setup:**
1. [Neon Database](https://neon.tech) - Free serverless PostgreSQL (no credit card)
2. [GitHub OAuth](https://github.com/settings/developers) - Free authentication
3. [Google OAuth](https://console.cloud.google.com) - Free authentication (optional)
4. Generate JWT secret: `openssl rand -hex 32`

**Total Monthly Cost: $0** ✨

---

CloudHelm is a unified cloud operations platform designed to help engineering teams gain visibility and control over their multi-cloud infrastructure. It provides real-time insights into cloud spending, resource utilization, application performance, and operational incidents across AWS, GCP, and Azure environments, enabling proactive cost optimization and operational excellence.

## The Problem

Modern engineering teams face several critical challenges:

- **Unpredictable Cloud Costs**: Cloud spending often spirals out of control with no clear visibility into where money is being spent or why costs suddenly spike.

- **Fragmented Monitoring**: Teams juggle multiple tools to track costs, resources, application health, and incidents, leading to inefficiency and missed insights.

- **Reactive Operations**: Without proactive anomaly detection and forecasting, teams only discover issues after they've impacted the business.

- **Multi-Cloud Complexity**: Managing resources across AWS, GCP, and Azure requires navigating different billing formats, APIs, and monitoring approaches.

- **Budget Overruns**: Teams lack real-time budget tracking and alerts, making it difficult to stay within allocated spending limits.

## Our Solution

CloudHelm provides a unified platform that addresses these challenges:

**Cost Radar**
- Ingest and normalize cost data from AWS, GCP, and Azure billing exports
- Real-time cost aggregation by team, service, and environment
- ML-powered anomaly detection to identify unusual spending patterns
- Linear regression forecasting to predict future costs
- Budget tracking with status monitoring and alerts

**Resource Efficiency** (Planned)
- Track resource utilization across compute, storage, and network
- Identify underutilized resources and optimization opportunities
- Right-sizing recommendations based on actual usage patterns

**Application Health** (Planned)
- Monitor application performance metrics and SLOs
- Track error rates, latency, and availability
- Correlate application health with infrastructure changes

**Incident Management** (Planned)
- Centralized incident tracking and response coordination
- Integration with PagerDuty, Opsgenie, and other alerting systems
- Post-incident analysis and reporting

**Release Tracking** (Planned)
- Monitor deployment frequency and success rates
- Track DORA metrics (deployment frequency, lead time, MTTR, change failure rate)
- Correlate releases with cost and performance changes

## Getting Started

### Prerequisites

- Python 3.11 or higher
- Node.js 18 or higher
- **Neon PostgreSQL account (Free)** - [Sign up here](https://neon.tech)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd cloudhelm
   ```

2. **Setup Python virtual environment**
   ```bash
   python -m venv venv
   venv\Scripts\activate  # Windows
   source venv/bin/activate  # Linux/Mac
   ```

3. **Install backend dependencies**
   ```bash
   pip install -r backend/requirements.txt
   ```

4. **Install frontend dependencies**
   ```bash
   cd frontend
   npm install
   cd ..
   ```

5. **Setup Neon PostgreSQL Database (Free)**
   
   **Why Neon?** Serverless PostgreSQL with zero ops, perfect for development and small production apps.
   
   a. **Sign up for Neon (Free, no credit card)**
      - Go to [https://neon.tech](https://neon.tech)
      - Click "Sign Up" (use GitHub, Google, or email)
   
   b. **Create a project**
      - Project name: `cloudhelm`
      - PostgreSQL version: 16 (latest)
      - Region: Choose closest to you
      - Click "Create project"
   
   c. **Copy your connection string**
      - After creation, copy the connection string shown
      - It looks like: `postgresql://username:password@ep-xxx-xxx.region.aws.neon.tech/neondb?sslmode=require`
      - **Important**: Save this - you won't see the password again!
   
   d. **Modify for SQLAlchemy**
      - Add `+psycopg` after `postgresql`:
      - `postgresql+psycopg://username:password@ep-xxx-xxx.region.aws.neon.tech/neondb?sslmode=require`
   
   **Alternative**: See [SETUP_GUIDE.md](SETUP_GUIDE.md) for detailed Neon setup instructions.

6. **Configure environment variables**

   Backend configuration:
   ```bash
   cd backend
   copy .env.example .env  # Windows
   cp .env.example .env    # Linux/Mac
   ```

   Edit `backend/.env`:
   ```env
   # Neon PostgreSQL (Free Tier)
   DATABASE_URL=postgresql+psycopg://username:password@ep-xxx-xxx.region.aws.neon.tech/neondb?sslmode=require
   
   JWT_SECRET=your-super-secret-key-min-32-characters-long
   JWT_ALGORITHM=HS256
   JWT_ACCESS_TOKEN_EXPIRES_MINUTES=60
   FRONTEND_ORIGIN=http://localhost:5173
   
   # GitHub OAuth
   GITHUB_CLIENT_ID=your_github_client_id
   GITHUB_CLIENT_SECRET=your_github_client_secret
   GITHUB_REDIRECT_URI=http://localhost:8000/auth/github/callback
   
   # Google OAuth
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   GOOGLE_REDIRECT_URI=http://localhost:8000/auth/google/callback
   ```

   Frontend configuration:
   ```bash
   cd frontend
   copy .env.example .env  # Windows
   cp .env.example .env    # Linux/Mac
   ```

   Edit `frontend/.env`:
   ```env
   VITE_API_BASE_URL=http://localhost:8000
   ```

7. **Setup OAuth credentials**

   **GitHub OAuth:**
   - Go to https://github.com/settings/developers
   - Click "New OAuth App"
   - Application name: `CloudHelm Dev`
   - Homepage URL: `http://localhost:5173`
   - Authorization callback URL: `http://localhost:8000/auth/github/callback`
   - Copy Client ID and Client Secret to `backend/.env`

   **Google OAuth:**
   - Go to https://console.cloud.google.com/
   - Create a new project or select existing
   - Navigate to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth 2.0 Client ID"
   - Application type: Web application
   - Authorized redirect URI: `http://localhost:8000/auth/google/callback`
   - Copy Client ID and Client Secret to `backend/.env`

8. **Run database migrations**
   ```bash
   # Activate virtual environment first
   venv\Scripts\activate  # Windows
   source venv/bin/activate  # Linux/Mac
   
   # Navigate to backend directory
   cd backend
   
   # Run migrations
   alembic upgrade head
   
   # Return to project root
   cd ..
   ```

### Running the Application

#### Option 1: Using Docker (Recommended)

The easiest way to run CloudHelm is using Docker Compose:

```bash
# 1. Setup environment variables
copy .env.docker .env  # Windows
cp .env.docker .env    # Linux/Mac

# 2. Edit .env with your OAuth credentials

# 3. Start all services
docker-compose up -d

# 4. Access the application
# Frontend: http://localhost:5173
# Backend: http://localhost:8000
# API Docs: http://localhost:8000/docs
```

See [DOCKER.md](DOCKER.md) for detailed Docker deployment instructions.

#### Option 2: Manual Setup

1. **Start the backend server** (Terminal 1)
   ```bash
   cd backend
   venv\Scripts\activate  # Windows
   source venv/bin/activate  # Linux/Mac
   python -m backend.main
   ```
   
   Backend runs at: http://localhost:8000
   
   API documentation: http://localhost:8000/docs

2. **Start the frontend server** (Terminal 2)
   ```bash
   cd frontend
   npm run dev
   ```
   
   Frontend runs at: http://localhost:5173

3. **Access the application**
   
   Open http://localhost:5173 in your browser and log in using GitHub or Google OAuth.

### Testing with Sample Data

1. **Create a sample budget**
   ```bash
   psql -U postgres -d cloudhelm
   
   INSERT INTO budgets (team, service, monthly_budget_amount, currency)
   VALUES ('engineering', NULL, 10000.00, 'USD');
   
   \q
   ```

2. **Upload sample cost data**
   
   Create `sample_aws_costs.csv`:
   ```csv
   lineItem/UsageStartDate,lineItem/UnblendedCost,lineItem/UsageAccountId,product/region,lineItem/ProductCode,lineItem/CurrencyCode
   2024-01-01,150.50,123456789012,us-east-1,AmazonEC2,USD
   2024-01-02,175.25,123456789012,us-east-1,AmazonEC2,USD
   2024-01-03,200.00,123456789012,us-east-1,AmazonEC2,USD
   ```
   
   Navigate to the Cost Dashboard and upload the file.

## Architecture

### System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                         Frontend                             │
│  (React + TypeScript + Vite + Tailwind + Recharts)          │
│                                                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │  Login   │  │ Overview │  │   Cost   │  │Placeholder│   │
│  │   Page   │  │   Page   │  │Dashboard │  │  Pages    │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │            AuthContext (JWT Management)               │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ HTTPS/REST API
                            │
┌─────────────────────────────────────────────────────────────┐
│                         Backend                              │
│              (FastAPI + SQLAlchemy + Alembic)               │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │ Auth Router  │  │ Cost Router  │  │   Security   │     │
│  │  (OAuth +    │  │  (Upload +   │  │  (JWT Utils) │     │
│  │   JWT)       │  │   Query)     │  │              │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   Cost       │  │     Cost     │  │    Cost      │     │
│  │  Ingestion   │  │ Aggregation  │  │   Anomaly    │     │
│  │   Service    │  │   Service    │  │   Service    │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              SQLAlchemy Models & ORM                  │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ PostgreSQL Protocol
                            │
┌─────────────────────────────────────────────────────────────┐
│                    PostgreSQL Database                       │
│                                                              │
│  ┌──────┐  ┌──────────┐  ┌──────────┐  ┌────────┐         │
│  │Users │  │CloudCost │  │ CostAgg  │  │Budget  │         │
│  └──────┘  └──────────┘  └──────────┘  └────────┘         │
│                                                              │
│  ┌──────────────┐                                           │
│  │CostAnomaly   │                                           │
│  └──────────────┘                                           │
└─────────────────────────────────────────────────────────────┘

External Services:
┌──────────────┐  ┌──────────────┐
│   GitHub     │  │   Google     │
│    OAuth     │  │    OAuth     │
└──────────────┘  └──────────────┘
```

### Architecture Overview

CloudHelm follows a modern three-tier architecture with clear separation of concerns:

**Frontend Layer**
- React 18 with TypeScript for type-safe UI development
- Vite for fast development and optimized production builds
- Tailwind CSS for responsive, utility-first styling
- Recharts for interactive data visualizations
- React Router for client-side navigation
- AuthContext for global authentication state management

**Backend Layer**
- FastAPI framework for high-performance async API
- SQLAlchemy ORM for database interactions
- Alembic for database schema migrations
- JWT-based authentication with OAuth integration
- Service layer for business logic (ingestion, aggregation, anomaly detection)
- Auto-generated OpenAPI/Swagger documentation

**Database Layer**
- PostgreSQL for reliable, ACID-compliant data storage
- Normalized schema with optimized indexes
- Five core tables: Users, CloudCost, CostAggregate, Budget, CostAnomaly
- Unique constraints for efficient upsert operations

**External Integrations**
- GitHub OAuth for authentication
- Google OAuth for authentication
- AWS/GCP/Azure billing exports for cost data ingestion

## Technology Stack

### Backend
- FastAPI 0.104.1
- SQLAlchemy 2.0.23
- Psycopg 3.1.13 (PostgreSQL driver)
- Alembic 1.12.1
- Python-JOSE 3.3.0 (JWT)
- Passlib 1.7.4 (password hashing)
- HTTPX 0.25.1 (HTTP client)
- Pandas 2.1.3 (data processing)
- NumPy 1.26.2
- scikit-learn 1.3.2 (ML)
- PyOD 1.1.2 (anomaly detection)
- Pydantic 2.5.0 (validation)
- Uvicorn 0.24.0 (ASGI server)

### Frontend
- React 18
- TypeScript 5
- Vite 5
- Tailwind CSS 3
- React Router 6
- Recharts 2
- Axios (HTTP client)

### Database
- PostgreSQL 12+

### Development Tools
- Alembic (migrations)
- ESLint (linting)
- PostCSS (CSS processing)

## API Endpoints

### Authentication
- `GET /auth/github` - Initiate GitHub OAuth flow
- `GET /auth/github/callback` - GitHub OAuth callback
- `GET /auth/google` - Initiate Google OAuth flow
- `GET /auth/google/callback` - Google OAuth callback
- `GET /auth/me` - Get current authenticated user

### Cost Management
- `POST /api/cost/upload/aws` - Upload AWS Cost & Usage Report
- `POST /api/cost/upload/gcp` - Upload GCP billing export
- `POST /api/cost/upload/azure` - Upload Azure cost export
- `POST /api/cost/recompute-aggregates` - Recompute cost aggregations
- `POST /api/cost/recompute-anomalies` - Run anomaly detection
- `GET /api/cost/summary` - Get cost summary with filters
- `GET /api/cost/anomalies` - Get detected anomalies
- `GET /api/cost/budgets/status` - Get budget status
- `GET /api/cost/forecast` - Get cost forecast

## Project Structure

```
cloudhelm/
├── backend/
│   ├── core/
│   │   ├── config.py          # Environment configuration
│   │   ├── db.py              # Database connection
│   │   └── security.py        # JWT and OAuth utilities
│   ├── models/
│   │   ├── user.py            # User model
│   │   └── cost.py            # Cost-related models
│   ├── schemas/
│   │   ├── user.py            # User Pydantic schemas
│   │   └── cost.py            # Cost Pydantic schemas
│   ├── routers/
│   │   ├── auth.py            # Authentication endpoints
│   │   └── cost.py            # Cost management endpoints
│   ├── services/
│   │   ├── cost_ingestion.py  # Cost data parsing
│   │   ├── cost_aggregation.py # Aggregation logic
│   │   └── cost_anomaly.py    # Anomaly detection
│   ├── migrations/            # Alembic migrations
│   ├── main.py                # FastAPI application
│   └── requirements.txt       # Python dependencies
├── frontend/
│   ├── src/
│   │   ├── components/        # React components
│   │   ├── pages/             # Page components
│   │   ├── context/           # React context
│   │   ├── layout/            # Layout components
│   │   ├── lib/               # API client
│   │   ├── types/             # TypeScript types
│   │   ├── App.tsx            # Main app component
│   │   └── main.tsx           # Entry point
│   ├── package.json           # Node dependencies
│   └── vite.config.ts         # Vite configuration
└── venv/                      # Python virtual environment
```

## Troubleshooting

### Backend won't start
- Verify PostgreSQL is running: `pg_isready`
- Check DATABASE_URL in `backend/.env`
- Ensure all environment variables are set
- Check terminal for error messages

### Frontend won't start
- Ensure backend is running first
- Verify VITE_API_BASE_URL in `frontend/.env`
- Try reinstalling: `rm -rf node_modules && npm install`
- Clear browser cache

### OAuth authentication fails
- Verify callback URLs match exactly in OAuth app settings
- Check OAuth credentials in `backend/.env`
- Ensure backend is accessible at the callback URL
- Check browser console for errors

### Database connection errors
- Verify Neon database is active at [console.neon.tech](https://console.neon.tech)
- Check connection string includes `?sslmode=require`
- Ensure you added `+psycopg` after `postgresql` in DATABASE_URL
- Verify your IP isn't blocked (Neon free tier allows all IPs by default)
- Test connection: `python -c "from sqlalchemy import create_engine; engine = create_engine('your-url'); print('OK' if engine.connect() else 'Failed')"`

### CORS errors
- Verify FRONTEND_ORIGIN in `backend/.env` matches frontend URL
- Restart backend after changing environment variables

## Integration with Monitoring Tools

CloudHelm Module A currently provides its own cost monitoring and anomaly detection. However, it's designed to integrate with existing monitoring infrastructure:

### Prometheus Integration (Future)

If your infrastructure uses Prometheus for metrics collection, CloudHelm can be extended to:
- Export cost metrics in Prometheus format via `/metrics` endpoint
- Scrape application health metrics from existing Prometheus instances
- Correlate cost anomalies with performance metrics

**Integration approach:**
```python
# backend/routers/metrics.py (future module)
from prometheus_client import generate_latest, Counter, Gauge

cost_total = Gauge('cloudhelm_cost_total', 'Total cloud cost', ['cloud', 'team'])
anomaly_count = Counter('cloudhelm_anomalies_total', 'Total anomalies detected')

@router.get("/metrics")
async def metrics():
    return Response(generate_latest(), media_type="text/plain")
```

### Grafana Integration (Future)

CloudHelm can complement Grafana dashboards:
- Use CloudHelm's REST API as a Grafana data source
- Display cost data alongside infrastructure metrics in unified dashboards
- Create alerts based on budget thresholds and anomalies

**Integration approach:**
1. Install Grafana JSON API plugin
2. Configure CloudHelm API as data source
3. Create dashboards querying `/api/cost/summary` and `/api/cost/anomalies`

### Combining with Other Modules

If you have separate modules using Grafana/Prometheus:

**Option 1: Side-by-side deployment**
- Run CloudHelm independently
- Link to Grafana dashboards from CloudHelm UI
- Use CloudHelm API to enrich Grafana with cost context

**Option 2: Unified deployment**
- Add Prometheus exporter to CloudHelm backend
- Configure Prometheus to scrape CloudHelm metrics
- Build unified Grafana dashboards combining both sources

**Option 3: Data integration**
- Export CloudHelm data to Prometheus via pushgateway
- Query both systems from a unified frontend
- Correlate events across platforms

## Docker Deployment

CloudHelm includes full Docker support for easy deployment. See [DOCKER.md](DOCKER.md) for comprehensive documentation.

### Quick Start with Docker Compose

Create `docker-compose.yml` in the project root:

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: cloudhelm
      POSTGRES_USER: cloudhelm_user
      POSTGRES_PASSWORD: cloudhelm_pass
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U cloudhelm_user"]
      interval: 10s
      timeout: 5s
      retries: 5

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    environment:
      DATABASE_URL: postgresql+psycopg://cloudhelm_user:cloudhelm_pass@postgres:5432/cloudhelm
      JWT_SECRET: ${JWT_SECRET}
      GITHUB_CLIENT_ID: ${GITHUB_CLIENT_ID}
      GITHUB_CLIENT_SECRET: ${GITHUB_CLIENT_SECRET}
      GOOGLE_CLIENT_ID: ${GOOGLE_CLIENT_ID}
      GOOGLE_CLIENT_SECRET: ${GOOGLE_CLIENT_SECRET}
      FRONTEND_ORIGIN: http://localhost:5173
    ports:
      - "8000:8000"
    depends_on:
      postgres:
        condition: service_healthy
    command: >
      sh -c "alembic upgrade head && 
             python -m backend.main"

  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    environment:
      VITE_API_BASE_URL: http://localhost:8000
    ports:
      - "5173:5173"
    depends_on:
      - backend

volumes:
  postgres_data:
```

### Backend Dockerfile

Create `backend/Dockerfile`:

```dockerfile
FROM python:3.11-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    postgresql-client \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements and install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Expose port
EXPOSE 8000

# Run the application
CMD ["python", "-m", "backend.main"]
```

### Frontend Dockerfile

Create `frontend/Dockerfile`:

```dockerfile
FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application code
COPY . .

# Expose port
EXPOSE 5173

# Run development server
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
```

### Production Dockerfile (Frontend)

For production, use a multi-stage build:

```dockerfile
# Build stage
FROM node:20-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

### Running with Docker Compose

1. **Create `.env` file in project root:**
   ```env
   JWT_SECRET=your-super-secret-key-min-32-characters-long
   GITHUB_CLIENT_ID=your_github_client_id
   GITHUB_CLIENT_SECRET=your_github_client_secret
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   ```

2. **Start all services:**
   ```bash
   docker-compose up -d
   ```

3. **View logs:**
   ```bash
   docker-compose logs -f
   ```

4. **Stop services:**
   ```bash
   docker-compose down
   ```

5. **Reset database:**
   ```bash
   docker-compose down -v
   docker-compose up -d
   ```

### Docker with Grafana and Prometheus

To add monitoring stack, extend `docker-compose.yml`:

```yaml
  prometheus:
    image: prom/prometheus:latest
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
      - prometheus_data:/prometheus
    ports:
      - "9090:9090"
    command:
      - '--config.file=/etc/prometheus/prometheus.yml'

  grafana:
    image: grafana/grafana:latest
    environment:
      GF_SECURITY_ADMIN_PASSWORD: admin
    volumes:
      - grafana_data:/var/lib/grafana
    ports:
      - "3000:3000"
    depends_on:
      - prometheus

volumes:
  postgres_data:
  prometheus_data:
  grafana_data:
```

Create `prometheus.yml`:

```yaml
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'cloudhelm-backend'
    static_configs:
      - targets: ['backend:8000']
    metrics_path: '/metrics'  # Future endpoint
```

Access services:
- CloudHelm Frontend: http://localhost:5173
- CloudHelm Backend API: http://localhost:8000
- Prometheus: http://localhost:9090
- Grafana: http://localhost:3000

## Development Commands

### Backend
```bash
# Run development server
python -m backend.main

# Create new migration
alembic revision --autogenerate -m "description"

# Apply migrations
alembic upgrade head

# Rollback migration
alembic downgrade -1

# Check current migration
alembic current

# View migration history
alembic history
```

### Frontend
```bash
# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

### Database
```bash
# Connect to database
psql -U postgres -d cloudhelm

# Backup database
pg_dump cloudhelm > backup.sql

# Restore database
psql cloudhelm < backup.sql
```

## License

Copyright (c) 2024 Daksh Mulundkar. All rights reserved.

This software and associated documentation files are proprietary and confidential. Unauthorized copying, modification, distribution, or use of this software, via any medium, is strictly prohibited without explicit written permission from the copyright holder.

## Contact

For questions, issues, or collaboration inquiries, please contact Daksh Mulundkar.
