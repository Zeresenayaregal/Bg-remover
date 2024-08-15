from flask import Flask, render_template, request
from rembg import remove
from PIL import Image
from io import BytesIO
import base64

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def home():
    image_dd = None
    if request.method == 'POST':
        file = request.files["image"]
        image = Image.open(file)
        image = remove(image)


        imgOut = BytesIO()
        image.save(imgOut, "PNG")
        imgOut.seek(0)

        image_dd = base64.b64encode(imgOut.getvalue()).decode("utf-8")

    return render_template("index.html")

if __name__ == "__main__":
    app.run(debug=True)