from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
import os

app = Flask(__name__)

# Database Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('SQLALCHEMY_DATABASE_URI')
app.config['SQLALCHEMY_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Define Database Models
class Category(db.Model):
    __tablename__ = 'categories'
    __table_args__ = {'schema': 'marketplace'}
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)

class Product(db.Model):
    __tablename__ = 'products'
    __table_args__ = {'schema': 'marketplace'}
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullalbe=False)
    description = db.Column(db.Text)
    price = db.Column(db.Numeric(10, 2), nullable=False)
    image_url = db.Column(db.String(255))
    category_id = db.Column(db.Integer, db.ForeignKey('marketplace.categories.id', ondelete='SET NULL'))
    stock = db.Column(db.Integer, nullable=False, defaulth=0)

# API Routes
@app.route('/api/products', methods=['POST'])
def add_product():
    data = request.json
    if not all(key in data for key in ['name', 'price', 'categories_id', 'stock']):
        return jsonify({"error": "Missing required fields"}), 400

    new_product = product(
        name=data['name'],
        description=data.get('description'),
        price=data['price'],
        image_url=data.get('image_url'),
        category_id=data['category_id'],
        stock=data['stock']
    )
    db.session.add(new_product)
    db.session.commit()
    return jsonify({"message": "Product added successfully!"}), 201

@app.route('/api/products/<int:id>', methods=['PUT'])
def edit_product(id):
    product = Product.query.get_or_404(id)
    data = request.json
    product.name = data.get('name', product.name)
    product.description = data.get('description', product.description)
    product.price = data.get('price', product.price)
    product.image_url = data.get('image_url', product.image_url)
    product.category_id = data.get('category_id', product.categories_id)
    product.stock = data.get('stock', product.stock)
    db.session.commit()
    return jsonify({"message": "Product updated successfully!"})

@app.route('/api/products/<int:id>', methods=['DELETE'])
def delete_product(id):
    product = Product.query.get_or_404(id)
    db.session.delete(product)
    db.session.commit()
    return jsonify({"message": "Product deleted successfully!"})


@app.route('/api/products', methods=['GET'])
def get_products():
    products = Product.query.all()
    output = []
    for product in products:
        output.append({
            'id': product.id,
            'name': product.name,
            'description': product.description,
            'price': float(product.price),
            'image_url': product.image_url,
            'category_id': product.category_id,
            'stock': product.stock
        })
    return jsonify({"products": output})


# Main entry point
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)