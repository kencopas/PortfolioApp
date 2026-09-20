# Velvet Paw Bakery

Independent Next.js UI, initially a coming-soon page. Build with `npm ci && npm run build` or its Dockerfile. The production container runs as the unprivileged node user on port 3000.

Production: Cloudflare Tunnel -> localhost:8080 -> Nginx hostname routing -> bakery:3000.
Staging: http://100.106.47.103:8082 serves bakery directly through Nginx; port 8081 retains the portfolio default and supports bakery Host headers. Both published staging ports bind only to the Tailscale address. Override STAGE_BIND_IP if the server address changes.
Development: `docker compose -f infra/compose/docker-compose.dev.yml up --build bakery` from the repository root, then visit http://localhost:3001.

Deployment from the repository root (after committing):

```sh
git push origin main
ENV=stage make build-push
make deploy-stage
```

BAKERY_IMAGE defaults to ghcr.io/kencopas/portfolio-bakery and can be overridden in infra/env/.env.stage or .env.prod. Existing server environment files do not need replacement. Production deployment is a separate explicit step; staging does not change the public tunnel destination.
