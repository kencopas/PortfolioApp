#!/usr/bin/env bash
set -euo pipefail

cd ~/PortfolioApp/infra
docker compose -f docker-compose.yml pull
docker compose -f docker-compose.yml up -d --remove-orphans
