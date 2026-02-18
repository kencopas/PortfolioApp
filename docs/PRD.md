# PortfolioApp — Product Requirements Document

## 1. Product Overview

PortfolioApp is a self-hosted engineering platform designed to:

1. Demonstrate end-to-end ownership of real production systems
2. Serve as a canonical, public knowledge base for architectural thinking
3. Compound long-term engineering credibility through documented decisions
4. Act as a distribution hub for technical writing and embedded video content

PortfolioApp is not a typical personal website.  
It is a living systems portfolio that demonstrates architectural judgment, operational maturity, and long-term technical thinking.

---

## 2. Problem Statement

Most engineering portfolios fail to demonstrate real system ownership. Static portfolio sites do not communicate:

- Infrastructure competence
- Deployment strategy
- Security awareness
- Operational discipline
- Architectural reasoning

PortfolioApp exists to solve this by acting as a real, production-like system that visibly demonstrates:

- Infrastructure ownership
- Architectural clarity
- DevOps maturity
- Documentation rigor

---

## 3. Goals

The primary goals of PortfolioApp are:

- Showcase real-world system design and deployment capability
- Demonstrate production-level engineering judgment
- Provide a structured platform for technical writing
- Serve as a long-term career asset
- Enable sustainable evolution without architectural rewrites

Each feature added must increase at least one of:

- Career signal
- Skill compounding
- Architectural clarity

---

## 4. Non-Goals

PortfolioApp will NOT:

- Become a SaaS product
- Support multiple users
- Provide a CMS competitor
- Include social networking features
- Implement unnecessary microservices
- Introduce complexity without architectural justification
- Optimize for virality or vanity metrics

If a feature does not improve signal or long-term system quality, it does not belong.

---

## 5. Scope

### In Scope

PortfolioApp includes:

- Public-facing frontend (Next.js + TypeScript)
- Backend API (FastAPI)
- Reverse proxy layer (nginx)
- Secure exposure via Cloudflare Tunnel
- Containerized services
- Environment-aware deployments
- Structured documentation
- Technical blog
- Architecture diagrams
- Architecture Decision Records (ADRs)

It must function as:

- A production-like deployment
- A demonstration of infrastructure ownership
- A writing-first engineering platform

---

### Out of Scope (“Scopen’t”)

PortfolioApp will not include:

- User authentication systems
- Comment systems
- Payment processing
- Billing infrastructure
- Complex RBAC
- Multi-tenant architecture
- Kubernetes (until justified)
- Database clustering (until required)
- Heavy real-time features
- Over-engineered distributed systems
- Mobile applications
- Full analytics platforms

---

## 6. Functional Requirements

### 6.1 Infrastructure & Deployment

- All services must be containerized
- Environment-aware Docker Compose configurations (dev/stage/prod)
- Images stored in GHCR
- Deployment via SSH + pull + recreate workflow
- Reverse proxy routing via nginx
- Secure exposure using Cloudflare Tunnel
- Internal service networking via bridge network
- Environment variable separation per environment
- No public router port forwarding

---

### 6.2 Frontend Requirements

Frontend must include:

- Home page
- About page
- Blog index page
- Individual blog post pages
- Projects page
- Architecture overview page
- Clean navigation
- Static-first rendering strategy
- Minimal unnecessary client-side JavaScript

---

### 6.3 Backend Requirements

Backend must include:

- Health check endpoint
- Blog content API (if dynamic)
- Proper CORS configuration
- Structured logging
- Clear service boundaries
- Configurable adapter interface (future extensibility)

---

### 6.4 Documentation Requirements

Repository must include:

- `README.md`
- `ARCHITECTURE.md`
- `/docs/diagrams/architecture.drawio.svg`
- `/docs/adr/` directory
- Deployment documentation
- Local development guide

Documentation must clearly separate:

- Product intent
- Architecture
- Decisions
- Operational procedures

---

## 7. Non-Functional Requirements

### Security

- Backend must not be publicly exposed
- nginx must operate internally
- SSH access via secure tunnel (e.g., mesh VPN)
- No secrets committed to repository
- Separate, unversioned `.env` files
- Cloudflare edge protection

---

### Maintainability

- Clear service boundaries
- Minimal coupling between frontend and backend
- Explicit deployment process
- Justified architectural decisions
- System must be evolvable without structural rewrites

---

### Performance

- Fast initial page loads (static-first)
- Minimal server overhead
- Efficient container startup
- No unnecessary runtime services

---

## 8. Possible Future Requirements

### Infrastructure Enhancements

- Staging environment on separate VM
- Automated redeploy via webhook listener
- Self-hosted CI runner
- Observability stack (metrics + dashboards)
- Centralized logging
- Canary deployments

---

### Application Enhancements

- Blog search functionality
- Markdown content pipeline
- Project tagging system
- Email newsletter capture
- Admin-only dashboard
- System status page
- API documentation site
- AI-assisted content tooling

---

## 9. Explicit Exclusions

The following will not be included unless justified by clear architectural or career value:

- Multi-user authentication
- Social features
- Billing systems
- Payment processing
- Complex authorization models
- Distributed service mesh
- Kubernetes orchestration
- Database clusters
- Redis caching layer (unless required)
- Real-time streaming features
- Enterprise analytics stack

---

## 10. Definition of Success

PortfolioApp is successful when:

- A senior engineer can review it and understand its architectural maturity
- A hiring manager can see production-level judgment
- The system demonstrates real infrastructure ownership
- The architecture remains clean as it evolves
- It compounds credibility over years of iteration
- It can scale in complexity without requiring redesign

---

## 11. Product Philosophy

PortfolioApp follows these principles:

- Write first, distribute second
- Static-first, dynamic only when justified
- Infrastructure as signal
- Simplicity over cleverness
- Security over convenience
- Long-term maintainability over short-term novelty
