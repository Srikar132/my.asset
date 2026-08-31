# LockIn

## Objective

Build a digital wellness platform that helps users stay focused by combining productivity assistance, real-time usage tracking, and system-level application controls.

## Tech Stack

- Flutter
- Kotlin
- Firebase

## Architecture

The application uses Flutter for the main cross-platform interface, Kotlin for Android system capabilities that require native access, and Firebase for application data and supporting services.

The important architectural decision was keeping the user-facing experience in Flutter while moving OS-level controls into the native Android layer.

## Challenges

The hardest part was working across the boundary between a cross-platform UI and Android system APIs. System-level blocking and usage information require permissions, lifecycle awareness, and native Android behavior that cannot be treated like a normal Flutter feature.

Another challenge was keeping the product experience simple while several background and system events were happening underneath it.

## My Thoughts

LockIn was a useful exercise in going beyond normal CRUD application development. It made me think about mobile architecture, platform capabilities, permissions, and how product ideas change once the operating system becomes part of the system you are building.
