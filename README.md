# AI-Powered Driver Drowsiness Detection System

This project detects driver drowsiness from webcam/video input using a custom YOLOv8 model and includes a React/Vite frontend prototype.

## Project Structure

- `PythonScript/` - YOLOv8 training, dataset config, model testing, and data collection scripts.
- `PythonScript/data.yaml` - Dataset configuration for the `awake` and `drowsy` classes.
- `PythonScript/runs/detect/drowsiness_v1-2/weights/` - Trained model weights kept for inference.
- `FRONTEND/` - React frontend built with Vite.
- `FIGMA UI/` - UI design exports.

## Python Setup

```bash
cd PythonScript
pip install -r requirements.txt
```

Train the model:

```bash
python train.py
```

Run webcam inference:

```bash
python test.py
```

## Frontend Setup

```bash
cd FRONTEND
npm install
npm run dev
```

## Deploy to Render

This repo includes a Render Blueprint at `render.yaml` for deploying the Vite app as a Static Site.

1. Push this repository to GitHub/GitLab/Bitbucket.
2. In Render, choose **New +** > **Blueprint** and select this repo.
3. Render will use:
   - Root directory: `FRONTEND`
   - Build command: `npm ci && npm run build`
   - Publish directory: `dist`

If you create a Static Site manually instead of using the Blueprint, use the same settings above.

## Notes

Generated files such as `node_modules`, frontend builds, logs, webcam captures, demo videos, and full YOLO training outputs are ignored to keep the repository clean.
