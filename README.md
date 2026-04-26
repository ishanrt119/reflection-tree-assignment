# Deterministic Reflection Tree App

A clean, minimalist React web application designed to run a fully deterministic, JSON-driven decision tree. It guides users through an end-of-day reflection conversation without relying on any generative AI at runtime.

## 🎯 Architecture
This application is purely data-driven. The entire logic is stored in `reflection_tree.json`.
- **No AI / LLMs**: Fully deterministic flow ensuring consistent output.
- **Signal Accumulator**: Tracks psychological axes (Locus, Orientation, Radius) dynamically.
- **Safe Evaluation Engine**: Custom logic to evaluate deterministic conditions like `node_2.answer == 'A'` without using `eval()`.
- **Dynamic Interpolation**: Interpolates the exact text answers a user gave into the reflections (e.g., `{node_x.answer_text}`) for profound personalization.

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

## 📂 Project Structure
- `/reflection_tree.json`: The core data and logic.
- `/src/App.jsx`: Main container and state manager.
- `/src/utils/engine.js`: Safe evaluator and interpolator.
- `/src/components/`: Modular UI components for different node types.
