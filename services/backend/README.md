# Platform Telemetry Service

The **Platform Telemetry Service (PTS)** is an event-driven backend service responsible for ingesting, persisting, and processing structured platform events emitted by services in the home-lab ecosystem.

PTS acts as the authoritative system of record for:
• Deployment lifecycle events
• Service lifecycle events
• Image version tracking
• Operational state transitions
• Platform-level telemetry

It is designed to model production-grade ingestion, processing, and persistence patterns within a controlled single-node infrastructure.

## Design

### Architecture

The model for this service is entirely push-based. **It is not a metric collection service**, it tracks the operational lifecycle of deployments and services by inferring context from emitted events.

<img src="docs/architecture.drawio.svg" />

### ERD

This database serves three purposes at the moment: keeping a running, immutable history of all emitted events (`platform_events`), providing service registry (`services`), and tracking the status of current and past deployments (`deployments`).

The services table is currently unused as of 02/27/26.

<img src="docs/erd.drawio.svg" />

### File Structure

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
│   ├── repositories/           # Lifecycle Repositories
│   │   ├── deployment_repository.py
│   │   └── event_log_repository.py
│   │
│   ├── domain/                 # Business Logic
│   │   ├── enums.py
│   │   ├── handlers/           # Event Handlers
│   │   └── events/             # Event API Schemas
│   │
│   └── services/               # Application Logic
│       ├── event_bus.py
│       ├── handler_context.py
│       └── event_ingestion.py
└── docs/
```

## Application Layers

The following file structure separates components into the following layers:

- **API:** Inbound request validation and service orchestration
- **Service:** Application logic; Specific to frameworks/libraries
- **Domain:** Business logic; Agnostic to frameworks/libraries
- **Repository:** Database querying logic
- **Database:** Database connection and modeling

### API

The API Layer uses [FastAPI](https://fastapi.tiangolo.com/tutorial/first-steps/) to expose an [`/events`](app/api/v1/events.py) endpoint and an [`/admin`](app/api/v1/admin.py) endpoint.

The admin endpoint serves a [static Admin UI](app/static) for viewing the event log via interaction with the events API search functionality.

The search functionality for the events API performs a filtered query request using the [`EventLogRepository`](#repository) as an API dependency, returning the output as structured [`List[PlatormEventRecord]`](app/domain/schemas/platform.py).

When an event is emitted by a pipeline or a service, a [`POST /events`](app/api/v1/events.py#L41) request is made containing the event payload. This endpoint validates the incoming event to one of the [Domain Events](#domain) via schema union. This endpoint depends on a request-scoped ingestion service instance, which is passed the event payload after validation.

### Service

After validation, incoming requests are handled in the service layer. This layer consists of event ingestion and internal event publication (event bus).

The [Event Ingestion Service](app/services/event_ingestion.py) is responsible for pre-processing incoming events before they are published to the internal event bus. This pre-processing involves packaging the event with relevant context, persisting the event to the event log, and constructing the `HandlerContext` to be published alongside the event.

The [Event Bus](app/services/event_bus.py) is responsible for managing published internal events and subscribed [event handlers](#domain). This service is instantiated once upon application startup and registers all event handlers. On event publication, each handler subscribed to that event type is executed sequentially, being passed the event payload along with handler context.

The [Handler Context](app/services/handler_context.py) provides handlers with access to each [repository](#repository). It is constructed for each ingested event before publication and contains the repository access that the handlers require.

### Domain

The Domain Layer consists of domain events, event handlers, and event schemas. Ideally, this layer should represent the business logic without requiring any changes upon application changes (changes in frameworks, services, etc.)

The [Domain Events](app/domain/events) represent the emitted events' structures. These schemas are used for validating incoming events as well as publishing internal events. This sharing between the API and the Event Bus is intentional, as the handlers should be reacting to the same events published by sources. The reason that the API does not publish events directly to the event bus is because the event ingestion and pre-processing should take place first, providing a clear entry point for the application logic.

The [Event Handlers](app/domain/handlers) contain the domain-level response to event publication. These handlers are responsible for responding to particular event types, applying business logic, and utilizing the repositories to update the database accordingly.

### Repository

The Repository Layer contains domain-scoped database interactions. Each domain represents a conceptual database entity, and each repository abstracts the database interaction for it's respective domain. This makes it so that when a handler needs to update a deployment's status it doesn't have to write a SQL query. Instead, the handler can simply call the repository method that does what it needs to.

The [Event Log Repository](app/repositories/event_log_repository.py) provides read and append access to the `platform_events` table in the database. The purpose of this repository is for storing and querying all ingested events.

The [Deployments Repository](app/repositories/deployment_repository.py) provides read and write access to the `deployments` table in the database. The purpose of this repository is for maintaining a record of all active and past deployments.

### Database

[See ERD](#erd)

The Database Layer holds the responsibility of managing database layout, schema revisions, and database connections.

[Alembic](https://alembic.sqlalchemy.org/en/latest/tutorial.html) serves the purpose of managing database migrations. As the table schemas inevitably evolve, [alembic revisions](/alembic/versions/) are used to keep a running history of the layout and create future revisions for modification.

[SQLAlchemy](https://docs.sqlalchemy.org/en/20/) was chosen to manage the database table schemas using [ORM models](https://docs.sqlalchemy.org/en/21/orm/quickstart.html). These ORM models live in [app/db/models/](app/db/models/) and are registered by autogenerating alembic revisions based on the models.

The database connection is also managed using SQLAlchemy, which provides a simple object-oriented interface for interacting with the database. Any repository performing database queries sends/recieves ORM model instances rather than database rows as tuples. This makes ORM model -> Event Schema conversion much simpler.

## Docker

The docker image uses uv for installing dependencies, so you can either refactor the Dockerfile to use pip (easy but slower) or [install uv](https://docs.astral.sh/uv/getting-started/installation/).

Assuming you've installed uv, the Dockerfile assumes the `uv.lock` is up-to-date. So, after adding any dependencies and before building the image, make sure to run `uv lock` to update the lockfile.
