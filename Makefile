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
# Release
# ===============================

release:
	@echo "Building images..."
	make build

	@echo "Pushing images to GHCR..."
	make push

	@echo "Pushing git to origin/main..."
	git push origin main

	@echo "Deploying to server..."
	ssh home-server "cd ~/PortfolioApp && make deploy"

	@echo "Release complete."

# ===============================
# Deploy (Server Side)
# ===============================

deploy:
	@echo "Pulling latest infra config..."
	git pull origin main

	@echo "Pulling updated images..."
	docker compose -f $(COMPOSE_FILE) pull

	@echo "Reconciling containers..."
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