# ===============================
# Config
# ===============================

# Include environment variables
include .env
export

# SSH / Server
SSH_COMMAND=ssh home-server
SERVER_REPO_PATH=~/PortfolioApp
SERVER_OS=linux/amd64

# Docker Compose
PROD_COMPOSE_FILE=./docker-compose.yml
DEV_COMPOSE_FILE=./docker-compose.dev.yml

# Docker Images
BACKEND_PATH=./backend
FRONTEND_PATH=./frontend
NGINX_PATH=./nginx
TAG:=$(shell git rev-parse --short HEAD)

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