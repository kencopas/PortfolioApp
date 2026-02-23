# Backend Service

## File Structure

```
.
├── Dockerfile
├── alembic/                # Database Migrations
│   ├── README.md
│   ├── env.py              # Alembic Configurations
│   └── versions/           # Alembic Revisions
├── app/
│   ├── main.py
│   ├── api/
│   │   ├── router.py       # Consolidates API Routers
│   │   └── v1/
│   │       └── events.py   # `/events` routes
│   ├── core/               # Frequently Used Application Components
│   │   ├── config.py
│   │   └── logger.py
│   ├── db/                 # Database Interaction Components
│   │   └── data_client.py
│   ├── models/             # SQLAlchemy ORM Models
│   ├── schemas/            # FastAPI Pydantic models
│   └── services/           # Application Logic
└── docs/
```

## Docker

The docker image uses uv for installing dependencies, so you can either refactor the Dockerfile to use pip (easy but slower) or [install uv](https://docs.astral.sh/uv/getting-started/installation/).

Assuming you've installed uv, the Dockerfile assumes the `uv.lock` is up-to-date. So, after adding any dependencies and before building the image, make sure to run `uv lock` to update the lockfile.
