from flask import Flask, request, jsonify, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/convert', methods=['POST'])
def convert():
    data = request.get_json()
    value = float(data['value'])
    unit_from = data['unitFrom']
    unit_to = data['unitTo']
    conversion_type = data['type']

    if conversion_type == 'length':
        if unit_from == 'm' and unit_to == 'ft':
            result = value * 3.28084
        elif unit_from == 'ft' and unit_to == 'm':
            result = value / 3.28084
        else:
            return jsonify({'error': 'Unsupported length unit'}), 400

    return jsonify({'result': result})

if __name__ == '__main__':
    app.run(debug=True)