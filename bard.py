import cv2
import numpy as np

# Load the YOLOv3 weights and configuration file
net = cv2.dnn.readNet("yolov3.weights", "yolov3.cfg")

# Load the class names
classes = np.loadtxt("coco.names", str, delimiter=",")

# Read the input image
image = cv2.imread("image.jpg")

# Convert the image to a blob
blob = cv2.dnn.blobFromImage(image, 1/255.0, (416, 416), (0, 0, 0), True, crop=False)

# Set the input blob for the network
net.setInput(blob)

# Run the forward pass of the network
outs = net.forward()

# Get the bounding boxes and confidence scores
boxes = outs[0]
confidences = outs[1]

# Filter out the bounding boxes with low confidence scores
indices = np.where(confidences > 0.5)[0]

# Draw the bounding boxes and labels on the image
for i in indices:
    # Get the bounding box coordinates
    box = boxes[i]
    x, y, w, h = box[0], box[1], box[2], box[3]

    # Get the class name and confidence score
    class_id = np.argmax(confidences[i])
    confidence = confidences[i][class_id]

    # Draw the bounding box
    cv2.rectangle(image, (x, y), (x + w, y + h), (0, 255, 0), 2)

    # Draw the label
    label = classes[class_id] + " " + str(round(confidence, 2))
    cv2.putText(image, label, (x, y - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)

# Display the image
cv2.imshow("Image", image)
cv2.waitKey(0)
