# ===============================
# Config
# ===============================

# SSH / Server
SSH_COMMAND=ssh home-server
SERVER_REPO_PATH=~/PortfolioApp
SERVER_OS=linux/amd64

# Docker Compose
COMPOSE_DIR=./infra/compose

PROD_COMPOSE_FILE=$(COMPOSE_DIR)/docker-compose.yml
DEV_COMPOSE_FILE=$(COMPOSE_DIR)/docker-compose.dev.yml

# Docker Images
SERVICES_DIR=./services

BACKEND_PATH=$(SERVICES_DIR)/backend
FRONTEND_PATH=$(SERVICES_DIR)/frontend
NGINX_PATH=./infra/nginx

TAG:=$(shell git rev-parse --short HEAD)

# Environment variables
ENV_PATH=./infra/env/.env

include $(ENV_PATH)
export

# ===============================
# Build
# ===============================

build:
	docker buildx build \
		--platform $(SERVER_OS) \
		-t ${BACKEND_IMAGE}:$(TAG) \
		--push $(BACKEND_PATH)

	docker buildx build \
		--platform $(SERVER_OS) \
		-t ${FRONTEND_IMAGE}:$(TAG) \
		--push $(FRONTEND_PATH)
	
	docker buildx build \
		--platform $(SERVER_OS) \
		-t ${NGINX_IMAGE}:$(TAG) \
		--push $(NGINX_PATH)

# ===============================
# Push
# ===============================

push:
	docker push ${BACKEND_IMAGE}:$(TAG)
	docker push ${FRONTEND_IMAGE}:$(TAG)
	docker push ${NGINX_IMAGE}:${TAG}

# ===============================
# Pull (Server Side)
# ===============================

pull:
	docker compose -f ${PROD_COMPOSE_FILE} pull

# ===============================
# Release
# ===============================

release:
	@echo "Building images..."
	make build

	@echo "Pushing images to GHCR..."
	make push

	@echo "Deploying to server..."
	$(SSH_COMMAND) "cd $(SERVER_REPO_PATH) && git pull origin main && DEPLOY_TAG=$(TAG) make deploy"

	@echo "Release complete."

# ===============================
# Deploy (Server Side)
# ===============================

deploy:

	@echo "Pulling updated images..."
	TAG=${DEPLOY_TAG} docker compose -f ${PROD_COMPOSE_FILE} pull

	@echo "Reconciling containers..."
	TAG=${DEPLOY_TAG} docker compose -f ${PROD_COMPOSE_FILE} up -d --remove-orphans

# ===============================
# Restart
# ===============================

restart:
	docker compose -f ${PROD_COMPOSE_FILE} down
	docker compose -f ${PROD_COMPOSE_FILE} up -d

# ===============================
# Dev
# ===============================

dev:
	docker compose -f $(DEV_COMPOSE_FILE) up --build

# ===============================
# Cleanup
# ===============================

prune:
	docker image prune -f