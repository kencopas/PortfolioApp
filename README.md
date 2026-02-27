# PortfolioApp

This is an at-home server I created to as a home for my projects, the first of which is this Portfolio App. Because the server is running on my home network, security was the first priority for system design.

## Setup

If you'd like to set up an at-home server that won't compromise your network, here's your guide.

### Makefile

Configure the Makefile variables with the SSH command, repository path, and OS for your server. The rest of the configurations will change as you add/remove services.

### Environment Variables

Copy the `.env.example` from the root and create a `.env` file. You should only have to put your github username as the namespace, unless you want to change the image names.

## Project Structure

The following is the intended file structure:

```
.
├── Makefile
├── infra
│   ├── compose
│   │   ├── docker-compose.dev.yml
│   │   └── docker-compose.prod.yml
│   ├── env
│   │   ├── dev.env
│   │   └── prod.env
│   └── nginx
│       ├── Dockerfile
│       └── conf.d/
└── services
    ├── backend
    │   ├── .env
    │   ├── Dockerfile
    │   └── ...
    ├── frontend
    │   ├── .env
    │   ├── Dockerfile
    │   └── ...
    └── ...
```

Each service is self-contained and containerized. The Makefile handles all things CI/CD as a substitute for GitHub Actions ([see CI/CD section for why](#cicd)).

## Services

Each service is self-contained and containerized. Services should rarely expose ports unless it's a reverse proxy (like nginx), which should take all incoming requests and route to containers using container names (http://backend:8000).

## CI/CD

### Deployment

GitHub Actions is awesome, but nothing is free, secure AND convenient. In my setup, my server is only exposed to inbound SSH traffic from TailScale, a mesh vpn. GitHub runners would be unable to connect and self-hosted runners charge by the minute as of March 2026. So I used a Makefile with the following workflow:

```
Developer -> git push origin main && make deploy-prod

Makefile -> Build images and push to GHCR
Makefile -> SSH from local machine into server (TailScale)

(On Server via SSH)
Makefile -> git pull origin main && Pull images from GHCR
Makefile -> docker compose up
```

Once the changes are in main, you just run make deploy-prod and the rest happens for you. Your images are built and pushed to GHCR, the makefile connects to the server, pulls the repo and images, and redeploys.

### Testing

For containerized testing, simply use the `test` target in the Makefile. `make test` will `docker compose up` using the default environment (usually dev) docker-compose file.
