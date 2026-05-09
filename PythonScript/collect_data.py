import cv2
import os
from pathlib import Path

SAVE_DIR = Path(__file__).resolve().parent / "webcam_dataset"
CLASSES = ["awake", "drowsy"]

for cls in CLASSES:
    (SAVE_DIR / cls).mkdir(parents=True, exist_ok=True)

cap = cv2.VideoCapture(0)
if not cap.isOpened():
    raise RuntimeError("Could not open webcam.")

current_class = 0
counts = {cls: len(list((SAVE_DIR / cls).glob("*.jpg"))) for cls in CLASSES}

print("Controls:")
print("  SPACE  - capture image")
print("  TAB    - switch class (awake <-> drowsy)")
print("  Q      - quit")
print(f"\nCurrently capturing: {CLASSES[current_class].upper()}")

while True:
    success, frame = cap.read()
    if not success:
        break

    label = CLASSES[current_class]
    count = counts[label]
    cv2.putText(frame, f"Class: {label.upper()}  Saved: {count}", (10, 30),
                cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 255, 0) if label == "awake" else (0, 0, 255), 2)
    cv2.putText(frame, "SPACE=capture  TAB=switch  Q=quit", (10, 60),
                cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 1)
    cv2.imshow("Data Collection", frame)

    key = cv2.waitKey(1) & 0xFF
    if key == ord("q"):
        break
    elif key == ord("\t"):
        current_class = 1 - current_class
        print(f"Switched to: {CLASSES[current_class].upper()}")
    elif key == ord(" "):
        filename = SAVE_DIR / label / f"{label}_{count:04d}.jpg"
        cv2.imwrite(str(filename), frame)
        counts[label] += 1
        print(f"Saved: {filename}")

cap.release()
cv2.destroyAllWindows()
print(f"\nDone! Total captured — Awake: {counts['awake']}, Drowsy: {counts['drowsy']}")
print(f"Images saved to: {SAVE_DIR}")
