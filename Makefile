# ===============================
# Config
# ===============================

REGISTRY=ghcr.io
NAMESPACE=kencopas
BACKEND_IMAGE=$(REGISTRY)/$(NAMESPACE)/portfolio-backend
FRONTEND_IMAGE=$(REGISTRY)/$(NAMESPACE)/portfolio-frontend
TAG=latest

COMPOSE_FILE=infra/docker-compose.yml

# ===============================
# Build
# ===============================

build:
	docker build -t $(BACKEND_IMAGE):$(TAG) ./backend
	docker build -t $(FRONTEND_IMAGE):$(TAG) ./frontend

# ===============================
# Push
# ===============================

push:
	docker push $(BACKEND_IMAGE):$(TAG)
	docker push $(FRONTEND_IMAGE):$(TAG)

# ===============================
# Pull (Server Side)
# ===============================

pull:
	docker compose -f $(COMPOSE_FILE) pull

# ===============================
# Deploy (Server Side)
# ===============================

deploy:
	git pull origin main
	docker compose -f $(COMPOSE_FILE) pull
	docker compose -f $(COMPOSE_FILE) up -d --remove-orphans

# ===============================
# Restart
# ===============================

restart:
	docker compose -f $(COMPOSE_FILE) down
	docker compose -f $(COMPOSE_FILE) up -d

# ===============================
# Dev
# ===============================

dev:
	docker compose -f infra/docker-compose.dev.yml up --build

# ===============================
# Cleanup
# ===============================

prune:
	docker image prune -f
