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

## Notes

Generated files such as `node_modules`, frontend builds, logs, webcam captures, demo videos, and full YOLO training outputs are ignored to keep the repository clean.
