from flask import Flask, render_template, jsonify
return jsonify(data), 200, {'Content-Type': 'application/json'}

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/conditions')
def get_conditions():
    try:
        with open('data/conditions.json') as f:
            data = json.load(f)
        return jsonify(data)
    except FileNotFoundError:
        return jsonify({'error': 'Conditions file not found'}), 404
    except json.JSONDecodeError:
        return jsonify({'error': 'Invalid JSON data'}), 400



if __name__ == '__main__':
    app.run(debug=True) 

