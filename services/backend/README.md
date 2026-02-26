# Backend Service

## File Structure

The following file structure separates components into the following layers:

- **API:** Inbound request validation and service orchestration
- **Service:** Application logic; Specific to frameworks/libraries
- **Domain:** Business logic; Agnostic to frameworks/libraries
- **Database:** Database connection and modeling
- **Core:** Components frequently used by most other services (config, logging, etc.)

```
.
├── Dockerfile
├── alembic/                    # Database Migrations
│   ├── README.md
│   ├── env.py                  # Alembic Configurations
│   └── versions/               # Alembic Revisions
├── app/
│   ├── main.py
│   │
│   ├── api/
│   │   ├── router.py           # Consolidates API Routers
│   │   ├── deps.py             # API Dependencies
│   │   └── v1/
│   │       └── events.py       # `/events` routes
│   │
│   ├── core/                   # Frequently Used Application Components
│   │   ├── config.py
│   │   └── logger.py
│   │
│   ├── db/                     # Database Interaction Components
│   │   ├── models/             # SQLAlchemy ORM Models
│   │   └── session.py
│   │
│   ├── domain/                 # Business Logic
│   │   ├── event_bus.py
│   │   ├── enums.py
│   │   ├── handlers/           # Event Handlers
│   │   └── events/             # Event API Schemas
│   │
│   └── services/               # Application Logic
│       └── event_ingestion.py
└── docs/
```

## Docker

The docker image uses uv for installing dependencies, so you can either refactor the Dockerfile to use pip (easy but slower) or [install uv](https://docs.astral.sh/uv/getting-started/installation/).

Assuming you've installed uv, the Dockerfile assumes the `uv.lock` is up-to-date. So, after adding any dependencies and before building the image, make sure to run `uv lock` to update the lockfile.
