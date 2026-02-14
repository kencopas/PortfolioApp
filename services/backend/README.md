# Backend Service

## API

As of right now, this backend is pretty basic. Here's the file structure:

```
.
├── main.py
├── Dockerfile
└── api
    ├── routes.py  # Root endpoints
    ├── schemas.py
    ├── prefix1
    │   ├── routes.py
    │   └── schemas.py
    └── prefix2
        ├── routes.py
        └── schemas.py
```

Any root endpoints reside in `api/routes.py` and any prefixes with multiple endpoints reside in their respective `api/prefix/routes.py` file, along with their local `schemas.py`.

## Docker

The docker image uses uv for installing dependencies, so you can either refactor the Dockerfile to use pip (easy but slower) or [install uv](https://docs.astral.sh/uv/getting-started/installation/).

Assuming you've installed uv, the Dockerfile assumes the `uv.lock` is up-to-date. So, after adding any dependencies and before building the image, make sure to run `uv lock` to update the lockfile.
