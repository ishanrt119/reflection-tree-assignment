# Pseudocode & Example Runs

This pseudocode demonstrates how the JSON state machine is executed deterministically without any AI logic.

## Runtime Engine (Pseudocode)

```python
import json

def run_reflection_tree(tree_file_path):
    # 1. Load the deterministic data structure
    with open(tree_file_path, 'r') as f:
        data = json.load(f)
        
    nodes = {n['id']: n for n in data['nodes']}
    
    # 2. Initialize the State Accumulator
    state = {
        "locus": {"victim": 0, "victor": 0, "neutral": 0},
        "orientation": {"entitlement": 0, "contribution": 0, "neutral": 0},
        "radius": {"self": 0, "others": 0, "balanced": 0}
    }
    
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
            print("\n-> [Reframing Insight]:", node['text'])
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
            
            # Save answer for routing logic
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
            # Calculate dominant trait for each axis
            loc = max(state['locus'], key=state['locus'].get)
            ori = max(state['orientation'], key=state['orientation'].get)
            rad = max(state['radius'], key=state['radius'].get)
            
            # String interpolation
            summary_text = node['text'].format(
                state=type('StateDummy', (object,), {
                    'locus_summary': loc,
                    'orientation_summary': ori,
                    'radius_summary': rad
                })
            )
            print("\n--- SUMMARY ---")
            print(summary_text)
            current_id = node['next']
```

---

## Example Journeys

### Example 1: The Burnout Path (Victim + Entitlement + Self-focused)
* **Inputs:** 
  * Node 2: **A** ("Things kept happening to me.")
  * Node 6: **C** ("Who can deal with this for me?")
  * Node 11: **A** ("Getting what I need from them.")
  * Node 15: **C** ("I did it, but felt a bit resentful.")
  * Node 19: **A** ("No, people rarely appreciate my effort.")
  * Node 24: **A** ("Mainly my own ease and comfort.")
  * Node 29: **C** ("I'm not sure there were any notable successes.")
  * Node 33: **A** ("As annoying distractions from my real work.")
* **Accumulated State:** Locus (Victim: 2), Orientation (Entitlement: 3), Radius (Self: 3)
* **Final Summary Output:** "Thank you for reflecting. Today, your Locus leaned towards victim, your Orientation was more towards entitlement, and your Radius focused on self."

### Example 2: The Leadership Path (Victor + Contribution + Others-focused)
* **Inputs:** 
  * Node 2: **B** ("I made things happen.")
  * Node 6: **B** ("How can I solve this?")
  * Node 11: **B** ("Providing value and helping out.")
  * Node 15: **B** ("I saw it as an opportunity to add value.")
  * Node 19: **B** ("I focus on the work, not the applause.")
  * Node 24: **B** ("The needs of the team or our end-users.")
  * Node 29: **B** ("It was a collaborative team effort.")
  * Node 33: **B** ("As part of the job, helping the collective move forward.")
* **Accumulated State:** Locus (Victor: 2), Orientation (Contribution: 3), Radius (Others: 3)
* **Final Summary Output:** "Thank you for reflecting. Today, your Locus leaned towards victor, your Orientation was more towards contribution, and your Radius focused on others."
