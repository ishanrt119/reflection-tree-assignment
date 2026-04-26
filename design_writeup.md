# Design Write-Up: Deterministic Reflection Tree

## 1. Why I Chose These Questions
The questions were deliberately designed to map directly to the three core behavioral axes (Locus, Orientation, and Radius) without feeling like a clinical evaluation.
* **Axis 1 (Locus):** I started with a broad, feeling-based question ("How did today feel overall?") because at the end of a long day, employees are often emotionally drained. Easing them in before asking targeted behavioral questions ("What was your initial instinct to a challenge?") reduces defensiveness while cleanly separating Victim and Victor mindsets.
* **Axis 2 (Orientation):** Questions here focus on social friction and unstated expectations. Asking how an employee reacted to "extra work" or whether they felt they got the "recognition they deserved" directly measures Entitlement versus Contribution without using corporate buzzwords.
* **Axis 3 (Radius):** I focused on cognitive scoping—who is in the user's mental frame. By asking who gets credit for a success or how they view interruptions, the system measures whether the user is operating in a purely self-preservation mode (Self) or thinking systematically (Others).

## 2. How the Branching Logic Works
The system operates as a **Directed Acyclic Graph (DAG)** rather than a strict geometric tree. 
When a user answers a question node, the input is passed to a decision node. The decision node branches out to targeted "Reflection Nodes" that provide immediate, highly personalized reframing based on that specific answer. 
Critically, after providing this personalized feedback, the paths **reconverge** at the next question or a "Bridge" node. This guarantees that every user progresses through all three axes sequentially without the node count expanding exponentially (which would happen if every branch permanently split).

## 3. Trade-offs Made
* **Deterministic DAG vs. LLM Chatbot:** By removing AI from the runtime, we guarantee 100% consistent, hallucination-free logic and zero privacy concerns. The trade-off is the loss of linguistic nuance (e.g., we cannot parse a free-text response about a highly specific traumatic event).
* **Fixed Options vs. Nuance:** Providing exactly 3 options forces the user to categorize their feelings, which might not capture the full complexity of their day. However, it ensures the system can definitively tally metrics and provide actionable reframing without deep NLP processing.
* **Immediate Reframing vs. End-of-Session Reports:** I opted to provide micro-reflections immediately after choices rather than saving all feedback for the end. This makes it feel like a "guided conversation" rather than an exam.

## 4. Psychological Concepts Used
* **Cognitive Behavioral Therapy (CBT) Reframing:** The reflection nodes don't judge; they take an "Automatic Negative Thought" (e.g., "Why is this happening to me?") and gently offer an alternative, healthier framing ("Reframing 'Why me' to 'What now' shifts energy into action").
* **Locus of Control (Rotter, 1966):** The first axis directly measures whether the individual believes they control their environment (Internal/Victor) or their environment controls them (External/Victim).
* **Organizational Citizenship Behavior (OCB):** The orientation axis is built on OCB constructs, measuring the shift from transactional entitlement to discretionary contribution.

## 5. How Determinism is Ensured
Determinism is guaranteed by the data schema. There are no language models operating at runtime. 
1. The engine simply reads `node_n` from a static JSON file.
2. It waits for a discrete integer/character input mapping to `options`.
3. It uses fixed `routing` conditions (e.g., `condition: "node_2.answer == 'A'"`) to determine the exact `next` pointer.
The same inputs will trace the exact same path and yield the exact same signals, every single time.

**Dynamic Interpolation Without AI:** 
The system stores both the selected option ID (for deterministic routing) and the corresponding `answer_text`. The reflection nodes and summary use `{node_n.answer_text}` placeholders to seamlessly inject the user's exact words back into the conversation. This drastically improves the feeling of personalization and empathetic framing while remaining a rigid, 100% deterministic state machine.

## 6. How Signals are Tracked
Instead of maintaining a massive state matrix of "Paths taken," the system uses a **Signal Accumulator**. 
Every option within a question node contains a `signal` object comprising three keys: `axis`, `value`, and `weight` (e.g., `{axis: "locus", value: "victor", weight: 1}`). 
As the user traverses the tree, a runtime script accumulates these weights into a state dictionary. By the time the user reaches the Summary Node, the script simply looks for the `value` with the highest `weight` in each `axis` dictionary and interpolates it into the final text string, allowing for dynamic summarization using purely deterministic arithmetic.
