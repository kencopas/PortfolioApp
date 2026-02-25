#!/usr/bin/env bash

#!/usr/bin/env bash

EVENT_ID="$(uuidgen)"
DEPLOYMENT_ID="$1"

curl -X POST 0.0.0.0:8000/events \
-H "Content-Type: application/json" \
 -d "{
    \"id\": \"$(EVENT_ID)\",
    \"deployment_id\": \"$(DEPLOYMENT_ID)\",
    \"event_type\": \"deployment.finished\",
    \"image_tag\": \"35jk45l\"
 }"