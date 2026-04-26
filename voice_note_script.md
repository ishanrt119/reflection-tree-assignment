# Voice Note Script

Hey, so here’s my approach to designing the reflection decision tree.

From the start, I knew the biggest constraint was that we absolutely could not use AI at runtime—no LLMs, no natural language processing. The output had to be completely deterministic. To achieve that, I structured the whole system as a data-driven state machine using JSON. 

One of the big design decisions I made early on was formatting the logic as a Directed Acyclic Graph instead of a pure tree. If every question permanently split the path, a 25-node requirement would turn into hundreds of nodes almost instantly. By having branches split to offer a quick, personalized reflection and then immediately converge back to the main trunk, I kept the system tight at 38 nodes while still making the user feel like their specific answers were being heard.

To actually build out the content, I used AI as a brainstorming partner. I fed it the three axes: Victim vs Victor, Entitlement vs Contribution, and Self vs Others. But this is where I actually ran into a lot of hallucinations and disagreements with the AI. 

First, the AI kept trying to inject dynamic text generation or semantic analysis to parse the answers. I had to explicitly override it and force it to produce a rigid, node-based JSON structure with predefined pointers. 

Second, the AI naturally wanted to write questions that sounded like an HR compliance survey or a therapist diagnosing a patient. I strongly pushed back on that. I rewrote the nodes to sound natural—like a guided, empathetic conversation you'd actually want to engage with at the end of a long, tiring day. I focused on making sure the reflection nodes didn't moralize or judge; they just gently reframed the user’s perspective.

To track the user’s behavior deterministically, I built a signal accumulator into the schema. Each answer assigns a weight to an axis. As the user moves through the tree, these values add up behind the scenes. When they hit the summary node at the end, the system just reads which values scored the highest and drops them into a template. No black-box AI, just simple, traceable math.

Ultimately, the biggest challenge was making a rigid, deterministic machine feel empathetic. I think I achieved that by having the reflection nodes immediately address the emotional weight of the specific answer they just gave. It validates their feeling before shifting their perspective.
