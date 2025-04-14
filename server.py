from flask import Flask, request, jsonify, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/convert', methods=['POST'])
def convert():
    data = request.get_json()

    print(data)

    return jsonify({"received": data})

if __name__ == '__main__':
    app.run(debug=True)