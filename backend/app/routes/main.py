from flask import Blueprint, jsonify

bp = Blueprint('main', __name__)

@bp.route('/')
def index():
    return jsonify({'message': 'Welcome to the Ticket Marketplace API'})

@bp.route('/health')
def health():
    return jsonify({'status': 'healthy'}) 