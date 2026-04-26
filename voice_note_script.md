# Voice Note Script

Hey, so here’s how I approached designing the reflection decision tree.

From the beginning, I treated this as a knowledge engineering problem, not an AI problem. The key constraint was that the final system had to be completely deterministic — no LLMs, no runtime intelligence. So instead of generating responses, I focused on encoding behavioral psychology directly into a structured, data-driven system using JSON.

One of the first design decisions I made was to model the system as a Directed Acyclic Graph instead of a pure tree. If every question created a permanent branch, the structure would grow exponentially. By allowing branches to split briefly for personalized reflections and then converge back, I was able to keep the system compact while still making each user feel heard.

While building the content, I used AI as a thinking partner, not as a generator. I started with the three axes — Locus of Control, Contribution vs Entitlement, and Radius of Concern — and used AI to explore possible question patterns. But I ran into a few issues where I had to actively push back.

First, the AI kept trying to introduce dynamic text generation and flexible flows, which breaks determinism. I explicitly constrained it to produce a fixed node-based structure with predefined routing. That was important because the system needs to be auditable — the same inputs should always lead to the same outputs.

Second, the AI naturally generated questions that sounded like a formal survey. I rejected that and rewrote most of the content with a focus on the “7 PM mental state.” At the end of the day, users are low on energy, so the questions needed to be simple, natural, and easy to respond to. I aimed for a tone that feels like a thoughtful colleague rather than a system analyzing you.

For behavior tracking, I implemented a signal accumulator. Each option contributes a small weight to an axis, and by the end of the flow, the system identifies dominant patterns using simple aggregation — no inference, just structured logic.

The most challenging part was making a deterministic system feel genuinely reflective. I solved that using interpolation — storing both the option ID and the actual text, and then feeding that text back into reflections and the summary. This creates a personalized narrative without generating anything new, so it stays fully deterministic.

Overall, the focus was on translating abstract psychological ideas into concrete, navigable decisions. The result is a system that is predictable, explainable, and still feels human.
