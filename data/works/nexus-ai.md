# Nexus AI

## Objective

Create an agent platform that can take a high-level product idea and turn it into a structured codebase through coordinated AI agents and asynchronous execution.

## Tech Stack

- Next.js
- FastAPI
- LangGraph

## Architecture

The frontend is built with Next.js and acts as the workspace where a user submits an idea and observes the generated workflow. FastAPI provides the backend API layer, while LangGraph coordinates the multi-agent workflow and the state shared between agents.

The architecture separates the interactive web experience from the long-running agent execution so the UI does not have to own the orchestration logic.

## Challenges

The main challenge was designing a workflow where multiple AI steps could operate with explicit state instead of becoming one large prompt. Long-running tasks also introduced questions around asynchronous execution, intermediate results, retries, and communicating progress back to the frontend.

## My Thoughts

Nexus AI pushed me to think about AI systems as software architecture rather than just API calls. The most interesting part was designing the boundaries between agents and deciding what context each step should receive.
