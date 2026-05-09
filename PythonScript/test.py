from ultralytics import YOLO
import cv2
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent

# Load trained model
model_path = BASE_DIR / "runs" / "detect" / "drowsiness_v1-2" / "weights" / "best.pt"
if not model_path.exists():
    raise FileNotFoundError(f"Model file not found: {model_path}")

model = YOLO(model_path)

# Open webcam (0 = default camera)
cap = cv2.VideoCapture(0)
if not cap.isOpened():
    raise RuntimeError("Could not open webcam. Make sure it is connected.")

print("Webcam started. Press 'q' to quit.")

while True:
    success, frame = cap.read()
    if not success:
        print("Failed to grab frame.")
        break

    results = model.predict(frame, conf=0.25, verbose=False)
    annotated_frame = results[0].plot()

    cv2.imshow("Drowsiness Detection - Press Q to quit", annotated_frame)

    if cv2.waitKey(1) & 0xFF == ord("q"):
        break

cap.release()
cv2.destroyAllWindows()
print("Webcam closed.")
