from flask import Flask, request
from pyzbar import pyzbar
import barcode
from PIL import Image

# image to string
barcode_data = pyzbar.decode(Image.open('../test_images/image1.jpeg'))
code_value = barcode_data[0].data.decode("utf-8")
code_type = barcode_data[0].type


# string to svg
barcode_svg = barcode.get(code_type, code_value)
barcode_svg.save('barcode1')


# app = Flask(__name__)

# @app.route("/barcode/save", methods=['POST'])
# def save_barcode():
#     print(request.data)
#     return "<p>Home</p>"

# @app.route("/barcode/display", methods=['GET'])
# def display_barcode():
#     return "<p>Hello World!</p>"

# if __name__ == '__main__':
#     app.run(debug=True)

