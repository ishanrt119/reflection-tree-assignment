# Design Write-Up: Deterministic Reflection Tree

## 1. Why I Chose These Questions
The questions were deliberately designed to map directly to the three core behavioral axes (Locus, Orientation, and Radius) without feeling like a clinical evaluation.

* **Axis 1 (Locus):** I started with a broad, feeling-based question ("Looking back at the rhythm of the day...") because at the end of a long day, employees are often emotionally drained. Easing them in before asking targeted behavioral questions reduces defensiveness while cleanly separating Victim and Victor mindsets.
* **Axis 2 (Orientation):** Questions here focus on social friction and unstated expectations. Asking how an employee reacted to unexpected requests directly measures Entitlement versus Contribution.
* **Axis 3 (Radius):** I focused on cognitive scoping—who is in the user's mental frame. By asking who gets credit for a success or how they view interruptions, the system measures whether the user is operating in a purely self-preservation mode (Self) or thinking systematically (Others).

## 2. Optimizing for the "7 PM User"
The system is explicitly crafted for a tired employee at the end of the day. Cognitive load is minimized by using short sentences, everyday "thinking language", and highly relatable options. The reflection nodes act as a "wise colleague" offering gentle, non-judgmental reframes (e.g., reminding the user that narrowing their focus isn't a flaw, but just the brain protecting itself when energy is low).

## 3. How the Branching Logic Works
The system operates as a **Directed Acyclic Graph (DAG)** rather than a strict geometric tree. 
When a user answers a question node, the input is passed to a decision node. The decision node branches out to targeted "Reflection Nodes" that provide immediate, highly personalized reframing based on that specific answer. 
Critically, after providing this personalized feedback, the paths **reconverge** at the next question or a "Bridge" node. This guarantees that every user progresses through all three axes sequentially without the node count expanding exponentially.

## 4. Deterministic Knowledge Engineering
The focus of this project is on Knowledge Engineering—converting behavioral psychology into structured, reusable, and interpretable decisions. Determinism is guaranteed by the data schema. There are no language models operating at runtime. 
1. The engine simply reads `node_n` from a static JSON file.
2. It waits for a discrete integer/character input mapping to `options`.
3. It uses fixed `routing` conditions (e.g., `condition: "node_2.answer == 'A'"`) to determine the exact `next` pointer.

The same inputs will trace the exact same path and yield the exact same signals, every single time. This makes the system robust, auditable, and completely free of hallucinations.

## 5. Psychological Concepts Used
* **Cognitive Behavioral Therapy (CBT) Reframing:** The reflection nodes don't judge; they take an "Automatic Negative Thought" and gently offer an alternative, healthier framing.
* **Locus of Control (Rotter, 1966):** The first axis directly measures whether the individual believes they control their environment (Internal/Victor) or their environment controls them (External/Victim).
* **Organizational Citizenship Behavior (OCB):** The orientation axis is built on OCB constructs, measuring the shift from transactional entitlement to discretionary contribution.

## 6. Dynamic Narrative Summary
Instead of categorizing the user with a clinical judgment at the end, the summary builds a personalized narrative. It uses string interpolation (e.g., `{node_2.answer_text}`) to inject the exact phrases the user selected back into a cohesive final thought. It reflects patterns rather than grades, emphasizing that the user shifts dynamically depending on the situation. This creates profound personalization while remaining a rigid, 100% deterministic state machine.
