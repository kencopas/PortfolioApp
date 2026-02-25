#!/usr/bin/env bash

#!/usr/bin/env bash

EVENT_ID="$(uuidgen)"
DEPLOYMENT_ID="$1"

curl -X POST 0.0.0.0:8000/events \
-H "Content-Type: application/json" \
 -d "{
    \"id\": \"$(EVENT_ID)\",
    \"deployment_id\": \"$(DEPLOYMENT_ID)\",
    \"event_type\": \"deployment.failed\",
    \"image_tag\": \"35jk45l\",
    \"reason\": \"Testing fail_deployment.sh script was run on a test deployment\",
    \"data\": {
        \"error\": \"Testing exception.\"
    }
 }"