from ultralytics import YOLO

# Load base model (lightweight & fast)
model = YOLO("yolov8n.pt")

# Train on custom data
model.train(
    data="data.yaml",
    epochs=50,
    imgsz=640,
    batch=8,
    device="cpu",   # change to "cpu" since AMD uses DirectML (no CUDA)
    workers=2,
    name="drowsiness_v1"
)

# Export model to ONNX for better AMD GPU support
model.export(format="onnx")
