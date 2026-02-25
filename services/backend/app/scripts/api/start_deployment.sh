#!/usr/bin/env bash

EVENT_ID="$(uuidgen)"
DEPLOYMENT_ID="$1"
OCCURRED_AT="$(date -u +"%F %T")"

curl -X POST 0.0.0.0:8000/events \
-H "Content-Type: application/json" \
 -d "{
    \"id\": \"$EVENT_ID\",
    \"deployment_id\": \"$DEPLOYMENT_ID\",
    \"event_type\": \"deployment.started\",
    \"image_tag\": \"35jk45l\",
    \"occurred_at\": \"$OCCURRED_AT\"
 }"