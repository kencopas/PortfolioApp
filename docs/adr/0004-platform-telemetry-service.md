# Platform Telemetry Service

**ADR-ID:** 0004

**Date:** 02/20/2025

## Context

The next service to be developed for this system is a Platform Telemetry Service (PTS). This service will serve the purpose of ingesting platform events, tracking system lifecycle, and providing a static admin UI for telemetry insight. There are a few areas that have to be clarified before documentation can begin, and the final decision will address each of these areas with a **first draft** and **future state**.

The following questions need to be answered:

- Should the PTS provide live metrics?
- Pull-based, push-based, or hybrid?
- What permissions will be given to the container?
- Who are the end-users? Just developers?

## Decision

For the first draft of this service, the Platform Telemetry Service will be a **push-based, minimally-privileged event processor**.

The following functionalities are expected:

- Internal system event ingestion
- Deployment event emission from Makefile CI/CD
- Platform event emission from internal services
- Event processing and persistence to database
- Provide filtered event querying
- Serving a static, internal admin telemetry UI

This solution is completely push-based with **no need for polling**. If any active probing or data collection is required, it will happen in response to an event being published that requires additional context before being persisted.

## Consequences

Using a push-based solution for this service reflects a tighter scope of responsibilities. Specifically, the polling and live metrics have been dropped from the responsibilities list. These functionalities should be addressed by a system monitoring service in the future, not by this service.

As a direct consequence of this, the PTS will not have any live data and will particularly useful for investigating system failures or other events after they have happened.

However, this gap of reponsibilities from the original list leaves room for another use-case that fits perfect with a push-based event processor: system status alerts. If a secure method for sending notifications is established, there can be pattern detection and specific event-triggers that will send push notifications to configured devices on service or system failure.
