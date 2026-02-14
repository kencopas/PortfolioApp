# ========================================
# Config
# ========================================

# Environment (default: prod)
ENV ?= prod

# SSH / Server
SSH_COMMAND=ssh home-server
SERVER_REPO_PATH=~/PortfolioApp
SERVER_OS=linux/amd64

# Directories
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

build-local:
	docker build \
		-t ${BACKEND_IMAGE}-$(ENV):$(TAG) \
		$(BACKEND_PATH)

	docker build \
		-t ${FRONTEND_IMAGE}-$(ENV):$(TAG) \
		$(FRONTEND_PATH)

	docker build \
		-t ${NGINX_IMAGE}-$(ENV):$(TAG) \
		$(NGINX_PATH)

test-local:
	@echo "Running local test with tag $(TAG)..."
	TAG=$(TAG) docker compose -f $(COMPOSE_FILE) up --remove-orphans

	@echo "Stopping local testing containers..."
	TAG=$(TAG) docker compose -f $(COMPOSE_FILE) down

# ========================================
# Build + Push
# ========================================

build:
	docker buildx build \
		--platform $(SERVER_OS) \
		-t ${BACKEND_IMAGE}-$(ENV):$(TAG) \
		--push $(BACKEND_PATH)

	docker buildx build \
		--platform $(SERVER_OS) \
		-t ${FRONTEND_IMAGE}-$(ENV):$(TAG) \
		--push $(FRONTEND_PATH)

	docker buildx build \
		--platform $(SERVER_OS) \
		-t ${NGINX_IMAGE}-$(ENV):$(TAG) \
		--push $(NGINX_PATH)

# ========================================
# Deploy (server side)
# ========================================

deploy:
	@echo "Deploying $(ENV) with tag $(DEPLOY_TAG)..."
	TAG=$(DEPLOY_TAG) docker compose -f $(COMPOSE_FILE) pull
	TAG=$(DEPLOY_TAG) docker compose -f $(COMPOSE_FILE) up -d --remove-orphans

deploy-stage:
	ENV=stage make build
	$(SSH_COMMAND) "cd $(SERVER_REPO_PATH) && git pull origin main && ENV=stage DEPLOY_TAG=$(TAG) make deploy"

deploy-prod:
	$(SSH_COMMAND) "cd $(SERVER_REPO_PATH) && git pull origin main && ENV=prod DEPLOY_TAG=$(TAG) make deploy"
