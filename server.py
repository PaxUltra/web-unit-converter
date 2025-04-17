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
    unit_strings = {
        "m": "meters",
        "ft": "feet",
        "lbs": "pounds",
        "kg": "kilograms",
        "f": "degrees Fahrenheit",
        "c": "degrees Celsius"
    }

    if conversion_type == 'length':
        if unit_from == 'm' and unit_to == 'ft':
            result = value * 3.28084
        elif unit_from == 'ft' and unit_to == 'm':
            result = value / 3.28084
        elif unit_from == unit_to:
            result = value
        else:
            return jsonify({'error': 'Unsupported length unit'}), 400
        
    if conversion_type == 'mass':
        if unit_from == 'lbs' and unit_to == 'kg':
            result = value / 2.205
        elif unit_from == 'kg' and unit_to == 'lbs':
            result = value * 2.205
        elif unit_from == unit_to:
            result = value
        else:
            return jsonify({'error': 'Unsupported mass unit'}), 400
        
    if conversion_type == 'temp':
        if unit_from == 'f' and unit_to == 'c':
            result = (value - 32) * (5/9)
        elif unit_from == 'c' and unit_to == 'f':
            result = (value * (9/5)) + 32
        elif unit_from == unit_to:
            result = value
        else:
            return jsonify({'error': 'Unsupported temperature unit'}), 400

    return jsonify({'result': result, 'units': unit_strings.get(unit_to, '')})

if __name__ == '__main__':
    app.run(debug=True)