from flask import Flask, request, g, send_file
from pyzbar import pyzbar
import barcode as bc
from PIL import Image
import sqlite3
from io import BytesIO

bc.base.Barcode.default_writer_options['write_text'] = False
DATABASE = 'data/barcodeStore.db'

# base flask app
app = Flask(__name__)

# create db connection
def get_db():
    if 'db' not in g:
        g.db = sqlite3.connect(DATABASE)
    return g.db

# teardown bd connection
@app.teardown_appcontext
def teardown_db(exception):
    db = g.pop('db', None)
    if db is not None:
        db.close()

# converts user's image to a string and stores barcode in database
@app.route("/barcode/save", methods=['POST'])
def save_barcode():
    barcode_image = request.files['barcode_image']
    cur = get_db().cursor()

    # barcode image to numeric string
    barcode_data = pyzbar.decode(Image.open(barcode_image))
    if not barcode_data:
        return '<p>No barcode detected. Please use a different image<p>', 400
    code_value = barcode_data[0].data.decode("utf-8")
    code_type = barcode_data[0].type
    
    try:
        cur.execute('INSERT INTO barcodes VALUES (?, ?, ?, ?)', (request.form['business'], request.form['description'], code_value, code_type))
        get_db().commit()
    except sqlite3.IntegrityError:
        return '<p>Please enter a unique description for this tag<p>', 400
    return f"<p>{code_value}</p>", 200

@app.route("/barcode/display", methods=['GET'])
def display_barcode():
    cur = get_db().cursor()
    rv = BytesIO()
    res = cur.execute('SELECT barcode_num, barcode_type FROM barcodes WHERE business = ? AND description = ?;', (request.json['business'], request.json['description']))
    barcode = res.fetchone()
    if barcode is None:
        return "No membership card found for that business and description", 404
    # string to svg
    barcode_svg = bc.get(barcode[1], barcode[0])
    barcode_svg.write(rv)
    rv.seek(0)  # must seek before sending
    return send_file(rv, download_name='barcode.svg')

if __name__ == '__main__':
    app.run(debug=True)

