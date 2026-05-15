---
title: "How to Connect AI Agents to Existing APIs Using a Python MCP Server"
date: "2026-05-15"
summary: "Here is my approach to building scalable Python MCP servers to provide authenticated, secure connections between AI Agents and service APIs."
tags: ["Model Context Protocol", "Python", "API"]
---

## Introduction

It's frequent that we need AI agents to be connected to specific services, which don't always have mcp servers, or aren't available due to authentication or other reasons. So, it's important to be able to stand up an MCP server for a service you want to connect on your own. This article will detail how to do this using Python.

## What is the Model Context Protocol?

According to the [official documentation](https://modelcontextprotocol.io/docs/getting-started/intro), the Model Context Protocol (MCP) is an open-source standard for connecting AI applications to external systems. A common application of this protocol is providing executable functions to the AI agent as tools, such that the agent is aware of what tools are available to it and is capable of calling them with any payload it specifies. An example of an MCP tool might be a "Web Search" tool that takes a "query" argument and returns a "results" output to the agent. These kinds of tools are what I will showcase.

## Creating a Python MCP Server for a Service API

When creating an MCP Server for an existing service with an API in any language, we have a few steps we need to take before developing the MCP server:

- Review the API Documentation
- Set Up the Project Environment
- Create API Client
- Create Service

Once we have these steps taken care of, we can create the MCP server, define any tools, resources, or prompts we would like to, and then test and deploy.

### Understand the API Documentation

To create an MCP server for a service, you should have a very solid understanding of the API. Skipping this part, or only skimming the documentation, **will lead to re-creating existing functionality**. Start to picture what actions you would like to provide the AI agent, and then ask yourself "How can I use this API to accomplish those actions?" You should be able to identify which endpoints you will need in your program.

### Setting Up the Project Environment

Now that we understand the service's API, which we'll call FooCloud for now, we can start creating our project environment. We can start by using uv or pip (we'll be using uv on linux) to create a virtual environment, then installing some dependencies:

```
uv init
uv venv
source .venv/bin/activate
uv add requests pydantic pydantic-settings mcp
```

Once we have our dependencies, we can start with a basic project structure:

```
mcp_server/
├── .env
├── main.py
├── config.py
├── foocloud
│   ├── client.py
│   └── service.py
└── mcp
    ├── server.py
    └── tools.py
```

Let's start by adding our configurations. For our API, we will need:

- API Base URL
- Credentials (we'll use a Personal Access Token)

We can add these to our `.env` file like so:

```env
FOOCLOUD_API="https://www.foocloud.com/api/v1"
FOOCLOUD_PAT=foo_59ce54b97ce1cbf018
```

Now that we have our environment variables, we can create our `config.py` file to set up basic logging and environment variable validation:

```python
# config.py

import logging
from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import HttpUrl, SecretStr

# Set up basic logging configurations
logging.basicConfig(
    filename="mcp_server.log",
    level=logging.INFO,
    format="%(asctime)s %(levelname)s %(message)s",
)

class Settings(BaseSettings):
    # This tells the Settings to read from the .env file
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
    )

    # These environment variables will be automatically read and validated with the type annotation
    FOOCLOUD_API: HttpUrl
    FOOCLOUD_PAT: SecretStr

settings = Settings()
```

It is important to set up some sort of file logging when using stdio as the transport. This is because the MCP server uses stdin and stdout for communication with the AI agent, and printing anything to the console will cause unexpected results. This is only the case for stdio, printing to the console is perfectly fine when using https transport.

To ensure that our configurations work, we can test it in our program entry point:

```python
# main.py

import logging
from config import settings

def main():
    logging.info(settings.FOOCLOUD_API)
    logging.info(settings.FOOCLOUD_PAT)
    logging.info(settings.FOOCLOUD_PAT.get_secret_value())

if __name__ == "__main__":
    main()
```

This should log something approximating the following to `mcp_server.log`:

```log
2026-05-15 14:27:01,505 INFO https://www.foocloud.com/api/v1
2026-05-15 14:27:01,505 INFO **********
2026-05-15 14:27:01,505 INFO foo_59ce54b97ce1cbf018
```

Notice that when we try to log the access token, it prints a bunch of asterisks. This is because we used `pydantic.SecretStr` as the type, which protects from leaking secrets like this. We use the `get_secret_value` method to verify that it did load the correct secret, but we should only use this during a log or print statement during development and testing.

### Creating an API Client

Now that we have our configurations and logging established, we can create our API client:

```python
# foocloud/client.py

from requests import Session, Response
from config import settings

class FooCloudClient:
    def __init__(self):
        self.base_url = str(settings.FOOCLOUD_API).rstrip("/")
        self.session = self._get_authenticated_session()

    def _get_authenticated_session(self) -> Session:
        """Creates an authenticated session for our service API."""
        session = Session()
        session.headers.update(
            {
                "Authorization": f"Bearer {settings.FOOCLOUD_PAT.get_secret_value()}",
                "Content-Type": "application/json",
            }
        )
        return session

    def get(self, endpoint: str) -> Response:
        """Makes a GET request using the base url and provided endpoint."""
        url = f"{self.base_url}/{endpoint.lstrip('/')}"
        return self.session.get(url)
```

This client will maintain an authenticated session with our service API and handle all of our requests. We can test this functionality by updating the program entrypoint:

```python
import json
import logging
from foocloud.client import FooCloudClient

def main():
    client = FooCloudClient()

    response = client.get("/health")
    status = response.status_code
    data = response.json()

    logging.info(f"/health {status}: {json.dumps(data)}")

if __name__ == "__main__":
    main()
```

This should result in an API response with a 200 status code present in the log file.

### Creating the Service

Once that works, we will move onto the next layer: Service layer. This is where we will use the API client to perform specific actions.

Now that we have the service layer, we can import the service instead and use that for our workflow.

### Setting Up the MCP Server

Once that works, we can start working on the MCP layer. At this point, we'll install the mcp dependency and create our file structure

We will create the server, create a tools and schemas directory, and run the server in the entry point

### Creating MCP Tools

Now that we have our structure, we can very easily create the tools that we need using specific input and output schemas

### MCP Inspector

Now, we can test using the MCP inspector, as long as we have node installed.

### Configuring Our MCP Server

Once all the tools are working as expected, we set up our agents to use them. This will depend on the agent, but they all follow this similar structure.

### Deploying an MCP Server Using HTTPS

Optionally, we can deploy this MCP server for usage over HTTPS. This is more involved regarding networking, so I will cover the containerization and usage over HTTP locally.

When switching to HTTPS, we will simply need to change the configuration in the MCP server and the registration of the MCP server in the client settings. We can test this using localhost.

Then, we will want to create a docker image from the project. Be careful with secrets.

Once this is done, we can run our docker container and register the MCP server to work the same.

## Conclusion

We made this simple and scalable. You could do this with much less code and less files, but sacrificing scalability, which is sometimes the correct option.

Next steps, make sure you are using AI securely and ethically. Ensure you aren't exposing any vulnerabilities in the underlying API, and be smart about what you are dumping into the AI context.

```

```
