from flask import Flask, render_template, request
from io import BytesIO
import base64

app = Flask(__name__)

@app.route('/health')
def health():
    return 'ok', 200

@app.route('/', methods=['GET', 'POST'])
def home():
    image_dd = None
    if request.method == 'POST':
        from PIL import Image
        from rembg import remove

        file = request.files["image"]
        image = Image.open(file)
        image = remove(image)


        imgOut = BytesIO()
        image.save(imgOut, "PNG")
        imgOut.seek(0)

        image_dd = base64.b64encode(imgOut.getvalue()).decode("utf-8")

    return render_template("index.html", image_data=image_dd)

if __name__ == "__main__":
    import os
    port = int(os.environ.get("PORT", 5000))
    debug = os.environ.get("FLASK_DEBUG", "false").lower() == "true"
    app.run(host="0.0.0.0", port=port, debug=debug)