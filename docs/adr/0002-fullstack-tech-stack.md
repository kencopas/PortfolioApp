# Fullstack Tech Stack

**ADR-ID:** 0002

**Date:** 02/13/2026

## Context

Before building out the backend and frontend services for this application, the language and framework(s) need to be decided on.

For the backend, the following options are viable:

- Python (simple, flexible)
    - Flask (general-purpose, lightweight)
    - FastAPI (production, fast)
- Java (robust, fast)
    - Spring Boot (production, standard)
- Golang (procedural, fast)

Most options are production-grade, and the main decision will be simplicity and ease-of-use or robustness and speed.

For the frontend, the following options are viable:

- JavaScript (simple, flexible)
    - React (flexible)
    - Vite + React (lightweight)
- TypeScript (typed, modern)
    - React (flexible)
    - Next.js (production)

Not a huge difference between the two languages considering that all JavaScript code is valid TypeScript, however there are a few questions of compatibility with JavaScript-native features or systems.

## Decision

The following tech stack was decided on for flexibility and production-grade usage:

**Backend:** Python + FastAPI

**Frontend:** TypeScript + Next.js

I will most likely be adding other services leveraging different languages in order to highlight their strengths, but for the main application this tech stack is the most fitting because both languages are highly adopted and flexible and the frameworks are production-ready.

## Consequences

Modern languages were chosen over older languages, sacrificing robustness for newer functionality. The frameworks were chosen to create a production-grade and flexible system rather than specialized services.