# ========================================
# Config
# ========================================

# Environment (default: dev)
ENV ?= dev

# SSH / Server
REMOTE_HOST=home-server
SERVER_REPO_PATH=~/PortfolioApp
SERVER_OS=linux/amd64

# Directories
ENV_DIR=./infra/env
COMPOSE_DIR=./infra/compose
SERVICES_DIR=./services

# Compose File
COMPOSE_FILE=$(COMPOSE_DIR)/docker-compose.$(ENV).yml

# Service Paths
BACKEND_PATH=$(SERVICES_DIR)/backend
FRONTEND_PATH=$(SERVICES_DIR)/frontend
NGINX_PATH=./infra/nginx

# Tagging
TAG := $(shell git rev-parse --short HEAD)

# Images (defined in env files)
ENV_PATH=./infra/env/.env.$(ENV)
include $(ENV_PATH)
export

# ========================================
# Local Testing
# ========================================

test:
	docker compose -f $(COMPOSE_FILE) up --build
	docker compose -f $(COMPOSE_FILE) down

delete-volumes:
	docker compose -f $(COMPOSE_FILE) down -v

# ========================================
# Database Administration
# ========================================

psql:
	docker exec -it postgres-$(ENV) psql -U ${POSTGRES_USER} -d ${POSTGRES_DB}

backend-exec:
	docker compose -f $(COMPOSE_FILE) exec backend /bin/bash

# ========================================
# Build + Push
# ========================================

build-push:
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

# ========================================
# Deploy
# ========================================

deploy:
	@echo "Deploying $(ENV) with tag $(DEPLOY_TAG)..."
	TAG=$(DEPLOY_TAG) docker compose --progress=plain -f $(COMPOSE_FILE) pull
	TAG=$(DEPLOY_TAG) docker compose --progress=plain -f $(COMPOSE_FILE) up -d --remove-orphans

deploy-stage:
	ssh $(REMOTE_HOST) "cd $(SERVER_REPO_PATH) && git pull origin main && ENV=stage DEPLOY_TAG=$(TAG) make deploy"

deploy-prod:
	ssh $(REMOTE_HOST) "cd $(SERVER_REPO_PATH) && git pull origin main && ENV=prod DEPLOY_TAG=$(TAG) make deploy"

deploy-env-vars:
	@echo "Removing previous backup and creating new infra/env-backup on server..."
	ssh $(REMOTE_HOST) "cd $(SERVER_REPO_PATH) && rm -rf infra/env-backup && mv infra/env infra/env-backup"

	@echo "Copying local environment files to infra/env on server..."
	scp -r $(ENV_DIR) $(REMOTE_HOST):$(SERVER_REPO_PATH)/infra/

# ========================================
# Maintenance
# ========================================

down:
	docker compose -f $(COMPOSE_FILE) down

stage-down:
	ssh $(REMOTE_HOST) "cd $(SERVER_REPO_PATH) && ENV=stage make down"
