# Pseudocode & Example Runs

This pseudocode demonstrates how the JSON state machine is executed deterministically without any AI logic, relying purely on string interpolation to create dynamic narrative summaries.

## Runtime Engine (Pseudocode)

```python
import json

def run_reflection_tree(tree_file_path):
    # 1. Load the deterministic data structure
    with open(tree_file_path, 'r') as f:
        data = json.load(f)
        
    nodes = {n['id']: n for n in data['nodes']}
    
    # 2. Initialize the State Accumulator & Answer Store
    state = {
        "locus": {"victim": 0, "victor": 0, "situational": 0},
        "orientation": {"entitlement": 0, "contribution": 0, "balanced": 0},
        "radius": {"self": 0, "others": 0, "balanced": 0}
    }
    answers = {} # Stores chosen option text for interpolation
    
    current_id = "node_1"
    
    # 3. Main Event Loop
    while current_id:
        node = nodes[current_id]
        
        # Display Nodes (Start, Bridge, End)
        if node['type'] in ['start', 'bridge', 'end']:
            print(node['text'])
            current_id = node.get('next')
            
        # Reflection Nodes
        elif node['type'] == 'reflection':
            # Interpolate any {node_X.answer_text} placeholders
            text = interpolate_text(node['text'], answers)
            print("\n-> [Reframing Insight]:", text)
            current_id = node['next']
            
        # Question Nodes
        elif node['type'] == 'question':
            print("\n" + node['text'])
            for opt in node['options']:
                print(f"  {opt['id']}. {opt['text']}")
                
            # Simulate deterministic user input
            choice_id = get_user_input(valid_options=[opt['id'] for opt in node['options']])
            selected_option = next(opt for opt in node['options'] if opt['id'] == choice_id)
            
            # Accumulate Signals
            sig = selected_option['signal']
            state[sig['axis']][sig['value']] += sig['weight']
            
            # Save answer text for dynamic interpolation
            answers[node['id']] = selected_option['text']
            node['answer'] = choice_id 
            current_id = node['next']
            
        # Decision Nodes (Invisible routing logic)
        elif node['type'] == 'decision':
            parent_node = nodes[node['parentIds'][0]] 
            for route in node['routing']:
                # Safely evaluate string condition (e.g. "node_2.answer == 'A'")
                if evaluate_condition(route['condition'], parent_node['answer']):
                    current_id = route['next']
                    break
                    
        # Summary Node (Data Interpolation)
        elif node['type'] == 'summary':
            # String interpolation creates the narrative
            summary_text = interpolate_text(node['text'], answers)
            print("\n--- DAILY SYNTHESIS ---")
            print(summary_text)
            current_id = node['next']

def interpolate_text(text, answers):
    # Regex replacement for {node_x.answer_text}
    for node_id, answer_text in answers.items():
        text = text.replace(f"{{{node_id}.answer_text}}", answer_text)
    return text
```

---

## Example Journeys

### Example 1: The High-Friction Path
* **Inputs:** 
  * Node 2: **A** ("I spent most of my energy responding to what came my way")
  * Node 6: **A** ("I wondered why this had to land on my plate right now")
  * Node 11: **A** ("Getting the answers and support I needed to keep moving")
  * Node 15: **A** ("As an interruption that pulled me away from my main work")
  * Node 19: **A** ("I felt pretty drained when my hard work went unnoticed")
  * Node 24: **A** ("Protecting my own workflow and keeping things simple for myself")
  * Node 29: **A** ("It was mostly down to my own focus and hard work")
  * Node 33: **A** ("As a distraction that threw off my momentum")
* **Summary Output:** Replays the user's exact answers back to them in a cohesive narrative showing that their sense of agency set the tone for the day, and they were trying to protect themselves by cutting out noise.

### Example 2: The High-Contribution Path
* **Inputs:** 
  * Node 2: **B** ("I was able to shape how things unfolded")
  * Node 6: **B** ("I immediately started figuring out how to fix it")
  * Node 11: **B** ("Looking for ways I could unblock someone else")
  * Node 15: **B** ("As a sign that my input or skills were valued")
  * Node 19: **B** ("I felt fine—I knew I did good work, regardless of the praise")
  * Node 24: **B** ("Making sure the team or the end-user got the best outcome")
  * Node 29: **B** ("It was really a mix of collaboration and team support")
  * Node 33: **B** ("As the actual work—keeping the team moving forward")
* **Summary Output:** The narrative highlights their focus on the team, how they viewed unexpected requests as signs of trust, and how their mindset naturally operated as the exact glue keeping the team together.
