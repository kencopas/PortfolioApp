# UI Rendering Approach

**ADR-ID:** 0003

**Date:** 02/19/26

## Context

It was previously decided that for the scope of this project the frontend would be rendered statically with as to close to pure Server-Side Rendering (SSR) as possible. At this point in time, this decision needs to be reconsidered. With static rendering, files must be served as-is without dynamically fetching data. This minimizes the need for backend-integration, but also minimizes the flexibility. Pure SSR would cause the fastest load times, but the least visually asthetic UI, as it eliminates the option for even subtle animations and transitions.

## Decision

For the scope of this project, Client-Side Rendering (CSR) will be used where necessary for animations and transitions while still prioritizing SSR wherever possible. Dynamic rendering will also be preffered for live updates, still incorporating static rendering wherever possible.

CSR was chosen for this project because signal takes priority over speed. The downside of pure SSR are lower percieved website quality, and the downside of CSR is slower initial page loads. The page loading speed can be mitigated with optimization of client components, but lower percieved website quality is not an option when designing for capability signal.

For data retrieval, static rendering simply makes more sense. Adding an API for Projects and Blogs is not necessary and would add overhead to the system. Project and blog information will be stored in static files within the frontend service, and the only data that will be fetched dynamically as of right now will be live system metrics.

## Consequences

Choosing CSR and static rendering provide the benefit of a smooth and simple UI, and the downsides of slower page loading and lack of fully live data. Animations and transitions are now viable with CSR, causing slower initial page loads but a smoother viewer experience. Using static rendering for project and blog information has a resounding effect on the overall architecture of the system. This means that the project and blog information now lives in the frontend service as static files. In the future, simple developer UIs can be created, if deemed necessary, for creating and managing this content, but the backend API will **not serve as the management system for this content and will be repurposed**.
