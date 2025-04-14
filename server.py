from flask import Flask, request, jsonify, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/convert', methods=['POST'])
def convert():
    value = request.form.get('value')
    unit_from = request.form.get('from')
    unit_to = request.form.get('to')

    return { 'Value': value, 'From': unit_from, 'To': unit_to }

if __name__ == '__main__':
    app.run(debug=True)