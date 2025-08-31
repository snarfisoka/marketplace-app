from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
import os

app = Flask(__name__)

# Database Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('SQLALCHEMY_DATABASE_URI')
app.config['SQLALCHEMY_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Define Database Models


# API Routes
@app.route('/api/products', methods=['GET'])
def get_products():
    return jsonify({'message': 'Product management API is running!'})

# Main entry point
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)