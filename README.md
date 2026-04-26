# Deterministic Reflection Tree

A clean, minimalist React web application designed to run a fully deterministic, JSON-driven decision tree. It guides users through an end-of-day reflection conversation without relying on any generative AI at runtime.

This project demonstrates how structured decision systems can deliver consistent, explainable, and psychologically grounded insights without relying on probabilistic AI models.

## 🎯 Architecture & Determinism
This application is purely data-driven. The entire logic is stored in `reflection_tree.json`.
- **No AI / LLMs**: The system ensures 100% predictable, hallucination-free output. The same inputs will always trace the exact same path and yield the exact same signals. This makes the system reliable and auditable.
- **Signal Accumulator**: Tracks psychological axes (Locus, Orientation, Radius) dynamically in the background.
- **Safe Evaluation Engine**: Custom logic to evaluate deterministic conditions like `node_2.answer == 'A'` without using `eval()`.
- **Dynamic Interpolation**: Instead of using generative text, the engine interpolates the exact text answers a user gave into the reflections (e.g., `{node_x.answer_text}`). This builds a personalized narrative through strict string replacement.

## 🧠 Knowledge Engineering & "7 PM" UX
The system converts behavioral psychology (Cognitive Behavioral Therapy framing, Locus of Control, Organizational Citizenship Behavior) into structured decisions. The focus is on encoding expert knowledge into an interpretable tree, rather than generating text on the fly. 

The UX and copy are explicitly designed for the "7 PM Mental State"—when a user is tired and has low cognitive bandwidth. Questions are easy to answer, and reflections act as a non-judgmental, "wise colleague" rather than an academic evaluation.

## 🛠️ Tech Stack
- **Framework:** React + Vite
- **Styling:** Tailwind CSS
- **Icons:** Lucide React

## 🚀 Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run the Development Server**
   ```bash
   npm run dev
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```
