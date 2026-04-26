# Voice Note Script

Hey, so here’s my approach to designing the reflection decision tree.

From the start, I knew the biggest constraint was that we absolutely could not use AI at runtime—no LLMs, no natural language processing. The output had to be completely deterministic. To achieve that, I structured the whole system as a data-driven state machine using JSON. I wanted to focus entirely on knowledge engineering—encoding actual behavioral psychology into a structured, interpretable tree instead of relying on a prompt to generate text.

One of the big design decisions I made early on was formatting the logic as a Directed Acyclic Graph instead of a pure tree. If every question permanently split the path, a small questionnaire would turn into hundreds of nodes almost instantly. By having branches split to offer a quick, personalized reflection and then immediately converge back to the main trunk, I kept the system tight and linear while still making the user feel like their specific answers were being heard.

To actually build out the content, I used AI as a brainstorming partner. I fed it the three axes: Victim vs Victor, Entitlement vs Contribution, and Self vs Others. But this is where I actually ran into a lot of hallucinations and disagreements with the AI. 

First, the AI kept trying to inject dynamic text generation. I had to explicitly override it and force it to produce a rigid, node-based JSON structure with predefined pointers. Determinism matters because it makes the system completely reliable and auditable. Same inputs, same outputs.

Second, the AI naturally wanted to write questions that sounded like an HR compliance survey. I strongly pushed back on that. I rewrote the nodes for the "7 PM mental state." When you're tired at the end of the day, you don't want to parse corporate jargon. I made it sound natural—like a guided, empathetic conversation with a wise colleague. I focused on making sure the reflection nodes didn't moralize or judge; they just gently reframed the user’s perspective.

To track the user’s behavior deterministically, I built a signal accumulator into the schema. Each answer assigns a weight to an axis. As the user moves through the tree, these values add up behind the scenes. 

Ultimately, the biggest challenge was making a rigid, deterministic machine feel empathetic. I achieved that by dynamically interpolating the user's exact text choices back into the summary to build a narrative. It validates their feeling and reflects their patterns back to them without ever using probabilistic AI models.
