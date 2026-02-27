# ARCHITECTURE.md

# 1. Overview

This repository defines a containerized web application deployed to a privately administered Ubuntu VM (“home server”). The system is designed with the following goals:

- Deterministic deployments via immutable container images
- Minimal exposed attack surface
- Clear separation of infrastructure and application concerns
- Reproducible local development
- CI-driven image builds
- Secure remote administration via private network overlay

Refer to the [Architecture Decision Records](docs/adr) for more details.

---

# 2. System Context

## 2.1 High-Level Architecture

<img src="./docs/diagrams/architecture.drawio.svg" />

---

# 3. Core Components

## 3.1 Ubuntu VM (Host)

Responsibilities:

- Runs Docker Engine
- Hosts Docker Compose stack
- Runs Tailscale daemon
- Enforces firewall rules
- Does **not** expose SSH publicly

The host machine does not run application code directly. All services run inside containers.

---

## 3.2 Docker Compose

Docker Compose orchestrates:

- `frontend` container
- `backend` container
- `nginx` container

Compose responsibilities:

- Defines service dependencies
- Defines container networking
- Defines restart policies
- Controls port exposure

Only nginx publishes ports to the host.

---

## 3.3 nginx Reverse Proxy

Purpose:

- Single public entry point
- Routes requests to frontend or backend
- Terminates HTTP traffic
- Shields backend from direct exposure

Why nginx is separate:

- Clear boundary between edge and services
- Simplified service scaling
- Replaceable without affecting app containers
- Explicit routing control

Only nginx binds to host ports (e.g., 80/443).

---

## 3.4 Frontend Container

- Built in CI
- Published to GHCR
- Stateless
- Serves static or client-rendered assets
- Communicates with backend via internal Docker network

No public port binding.

---

## 3.5 Backend Container

- Built in CI
- Published to GHCR
- Stateless API service
- Accessible only via Docker internal network
- Not exposed directly to host network

---

## 3.6 GHCR (GitHub Container Registry)

Purpose:

- Stores versioned immutable images
- Decouples build and deployment environments
- Enables deterministic deployments
- Allows rollback via image tags

Images are:

- Built via Makefile
- Tagged with commit SHA or version
- Pulled by VM during deployment

---

## 3.8 Tailscale (Private Admin Network)

Purpose:

- Secure SSH access to VM
- No public SSH exposure
- WireGuard-based encrypted mesh network

Only the Tailscale interface allows port 22 access.

Security model:

- VM not discoverable via public SSH scan
- Access controlled via Tailscale identity authentication
- Firewall denies inbound public SSH

---

# 4. Network Model

## 4.1 Public Exposure

Publicly exposed:

- nginx HTTP/HTTPS ports

Not publicly exposed:

- Backend ports
- Frontend ports
- SSH
- Docker internal services

---

## 4.2 Internal Docker Network

Docker Compose creates an isolated bridge network:

```
nginx  → frontend
nginx  → backend
frontend → backend (if needed)
```

Backend is unreachable from host unless explicitly mapped.

---

## 4.3 Administrative Network

```
Admin Laptop
│
▼
Tailscale Tunnel
│
▼
VM tailscale0 interface
│
▼
SSH daemon
```

Firewall rules:

- Deny all incoming by default
- Allow SSH only on tailscale0
- Allow HTTP/HTTPS publicly

---

# 5. Deployment Flow

## 5.1 Build Phase

1. Developer pushes to `main`
2. Developer runs `make deploy-prod` which does the following:
   - Builds images
   - Tags and pushes to GHCR
   - SSH into server
   - Pulls repo and images with deployment tag
   - Rebuilds and composes containers from images

---

## 5.2 Deploy Phase

On deployment:

1. VM pulls updated images from GHCR
2. `docker compose up -d`
3. Containers restart
4. nginx routes to updated services

nginx container may be:

- Rebuilt when config changes
- Otherwise remains stable

---

# 6. Security Model

## 6.1 Principles

- Minimal exposed surface
- Immutable infrastructure
- No manual code changes on server
- No public SSH
- Internal-only service networking

---

## 6.2 Attack Surface

Exposed:

- nginx ports

Not exposed:

- Docker daemon
- Services (Backend, frontend, database...)
- SSH (publicly)

---

## 6.3 Secrets Handling

Secrets:

- Stored in environment variables
- Not committed to repository
- Supplied via:
  - VM environment
  - GitHub Secrets (CI)

`.env.example` provided for reference only.

---

# 7. Failure & Recovery Model

## 7.1 Container Failure

- Docker restart policy handles crash
- `docker compose up -d` restores service

## 7.2 Image Rollback

Rollback by:

- Pulling previous image tag
- Redeploying via compose

## 7.3 nginx Failure

If upstream containers restart:

- nginx may require restart depending on networking state
- Configuration baked into image

---

# 8. Design Decisions Summary

| Decision               | Reason                                |
| ---------------------- | ------------------------------------- |
| Docker Compose         | Simple multi-service orchestration    |
| nginx Reverse Proxy    | Explicit routing and boundary control |
| GHCR                   | Integrated registry with GitHub CI    |
| Immutable Images       | Deterministic deployment              |
| Tailscale              | Zero-exposed SSH                      |
| No Public Backend Port | Reduced attack surface                |

---

# 9. Future Evolution

Potential next steps:

- Add HTTPS with certificate automation
- Add monitoring stack (Prometheus/Grafana)
- Add centralized logging
- Add healthcheck-based rolling updates
- Move from Compose to Kubernetes (if scale requires)
- Add container image signing (cosign)

---

# 10. Architectural Philosophy

This system prioritizes:

- Clarity over abstraction
- Explicit networking boundaries
- Deterministic builds
- Minimal exposure
- Operational reproducibility

It is intentionally simple, secure, and extensible.
