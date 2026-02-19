# Frontend Information Architecture & Content Strategy

This document defines the purpose, intent, and high-signal content requirements for each major UI surface of the application.

The goal is to ensure that every page increases engineering credibility, demonstrates operational ownership, and contributes to a cohesive architectural narrative.

---

# 1. Home Page

## Primary Purpose

**Positioning.**

The home page establishes engineering identity immediately. It answers:

> What kind of engineer is this person?

It is not a deep technical page. It is narrative control.

---

## Above the Fold (Hero Section)

### Objective

Clearly communicate systems-level ownership and production maturity.

### Required Content

- **Headline**
  - Clear, infrastructure-oriented positioning
  - Example structure:
    - “I design and operate production-grade systems.”
    - “I build secure, reproducible, containerized applications.”

- **Subtext**
  - Signals operational maturity:
    - Containerized deployments
    - Reverse proxy and TLS termination
    - CI/CD discipline
    - Secure remote access
    - Immutable image releases

- **Primary CTAs**
  - “View Projects”
  - “Explore Architecture”

The hero must signal:

- Builder mindset
- Operator discipline
- Architectural clarity

---

## Below the Fold

### Objective

Create cohesion across the entire platform.

Each section should surface high-signal content from deeper pages.

---

### Section 1 — Featured Project

- 1–2 flagship projects only
- Clear problem → architecture → tradeoffs summary
- Link to full breakdown

Avoid listing all projects here.

---

### Section 2 — Architecture Snapshot

Include a simplified system diagram (C4 container-level view) showing:

- DNS
- Cloudflare
- NGINX reverse proxy
- Docker Compose services
- Backend
- Frontend
- GitHub Actions
- GitHub Container Registry (GHCR)
- Secure admin access (Tailscale)

Purpose:

- Immediate operational credibility
- Visible infrastructure ownership

---

### Section 3 — Infrastructure Principles

Short, high-signal statements such as:

- Image-based deployments only
- No manual production edits
- TLS termination at the edge
- Reproducible builds
- Least privilege by default
- Explicit configuration over hidden state

These reinforce engineering philosophy.

---

### Section 4 — Recent Engineering Notes

- 3–4 recent technical posts
- Architecture insights
- Deployment lessons
- Security hardening notes
- CI/CD improvements

No generic tutorials.

---

## What to Avoid

- Inspirational fluff
- Buzzword-heavy messaging
- Generic developer branding
- Uncontextualized skill lists

---

# 2. About Page

## Primary Purpose

**Trust building.**

This is not a biography.  
This is a professional engineering narrative.

---

## Core Questions It Should Answer

- What problems do you enjoy owning?
- How do you think about systems?
- What engineering principles guide your decisions?
- What kind of responsibility do you seek?

---

## Recommended Structure

### Section 1 — Engineering Identity

Define:

- Systems thinker
- Infrastructure-minded engineer
- Ownership-driven mindset
- Production discipline

This section sets tone.

---

### Section 2 — What You Build

Clearly describe domains such as:

- Cloud-native applications
- Containerized systems
- CI/CD pipelines
- Agentic AI workflows
- Secure deployment infrastructure

Tie descriptions to real work where possible, without exposing proprietary details.

Focus on:

- Architectural patterns
- Abstractions
- Operational decisions
- Tradeoffs made

---

### Section 3 — Engineering Principles

Explicitly list guiding principles such as:

- Clarity over cleverness
- Boring and correct over impressive and fragile
- Operational ownership over abstraction
- Static-first unless dynamic is justified
- Security as default

This builds philosophical consistency across the platform.

---

## What to Avoid

- Life story
- Resume duplication
- Unstructured narrative
- Tool hype without implementation depth

---

# 3. Projects Page

## Primary Purpose

**Execution proof.**

This page demonstrates real system ownership.

Only include projects that can be documented deeply.

If you cannot explain:

- Architecture
- Tradeoffs
- Deployment model
- Failure modes

It does not belong.

---

## Project Card Requirements

Each project card should include:

- Title
- 1–2 sentence problem statement
- Compact stack summary (horizontal if space allows)
- “View Architecture” CTA

---

## Individual Project Page Structure

Each project must include:

1. Problem
2. Constraints
3. System Context
4. Architecture diagram
5. Deployment model
6. Tradeoffs accepted
7. Failure modes
8. What would change next time

This ensures staff-level thinking is visible.

---

## Enterprise / Client Work

Permitted:

- High-level architectural summaries
- Pattern descriptions
- Abstraction decisions
- Refactoring strategies
- Adapter patterns
- LLM configuration systems

Not permitted:

- Proprietary code
- Screenshots of internal systems
- Confidential data
- Internal metrics

Focus on engineering thinking, not branding.

---

# 4. Architecture Page

## Primary Purpose

**Demonstrate systems depth.**

This is the highest signal page on the platform.

It answers:

> Can this person be trusted with infrastructure?

---

## Required Sections

---

### 1. System Overview

High-level diagram showing:

- DNS
- Cloudflare
- Reverse proxy (NGINX)
- Docker Compose orchestration
- Backend service
- Frontend service
- CI pipeline
- GHCR image storage
- Secure admin access (Tailscale)

---

### 2. Deployment Model

Explicitly describe:

Push → CI build → Image push → Server pull → Container restart

Emphasize:

- Immutable releases
- No SSH patching
- No configuration drift
- Environment-specific compose files
- Image version tagging discipline

---

### 3. Security Model

Document:

- Firewall default deny
- Only necessary ports open
- TLS termination at edge
- Internal Docker network isolation
- No direct backend exposure
- Secrets stored outside repository
- Least privilege configuration

---

### 4. Failure Modes

Describe:

- Container crash handling
- Certificate expiration handling
- Failed deployment rollback strategy
- What happens if CI fails
- What happens if registry is unavailable

This level of documentation increases professional signal.

---

### Optional Sections

- CI/CD evolution log
- Incident log
- Architectural Decision Records (ADR)
- Environment separation strategy (dev / stage / prod)

---

# Cohesion Principles

To maintain a cohesive UI:

1. Every page reinforces systems ownership.
2. Projects link to architecture decisions.
3. Architecture references real deployments.
4. Home page surfaces the strongest signals from all sections.
5. No page introduces messaging that contradicts the others.

---

# Final Intent

This platform is not a personal blog.

It is:

- A production-minded infrastructure artifact
- A public architecture journal
- A deployment discipline showcase
- A credibility engine

Each UI surface must increase trust.

Each section must signal ownership.

Each decision must be documented with clarity.
