# Heal Verse

## Objective

Build a mobile wellness experience for medication tracking, diet planning, and daily health routines while keeping the backend ready for scalable API-driven features.

## Tech Stack

- React Native
- Spring Boot
- AI

## Architecture

The mobile client is separated from the backend API layer. React Native handles the user experience, while Spring Boot provides the application services and API boundaries. AI capabilities sit behind the application layer so they can evolve independently from the mobile interface.

This separation keeps the client focused on presentation and user interaction while the backend owns business logic and data workflows.

## Challenges

The main challenge was balancing a simple mobile experience with a growing set of health-related workflows. Designing clear API boundaries was important because medication, diet, and routine features can easily become tightly coupled if their responsibilities are not separated early.

## My Thoughts

Heal Verse helped me understand how mobile applications benefit from a disciplined backend architecture. It also reinforced the importance of treating AI as a feature inside a larger product system rather than the entire product itself.
