from flask import Blueprint, jsonify, request
from app import db
from app.models import Ticket, Transaction, User
from datetime import datetime

bp = Blueprint('tickets', __name__)

@bp.route('/', methods=['GET'])
def get_tickets():
    tickets = Ticket.query.filter(Ticket.quantity > 0).all()
    return jsonify({
        'tickets': [
            {
                'id': ticket.id,
                'event_name': ticket.event_name,
                'description': ticket.description,
                'price': ticket.price,
                'date': ticket.date.isoformat() if ticket.date else None,
                'location': ticket.location,
                'quantity': ticket.quantity,
                'seller': ticket.seller.username if ticket.seller else None
            } for ticket in tickets
        ]
    })

@bp.route('/<int:id>', methods=['GET'])
def get_ticket(id):
    ticket = Ticket.query.get_or_404(id)
    return jsonify({
        'id': ticket.id,
        'event_name': ticket.event_name,
        'description': ticket.description,
        'price': ticket.price,
        'date': ticket.date.isoformat() if ticket.date else None,
        'location': ticket.location,
        'quantity': ticket.quantity,
        'seller': ticket.seller.username if ticket.seller else None
    })

@bp.route('/', methods=['POST'])
def create_ticket():
    data = request.get_json() or {}
    
    # In a real app, we would get the seller_id from the authenticated user
    # For demo purposes, we'll use a default user or create one if it doesn't exist
    user = User.query.filter_by(username='demo_user').first()
    if not user:
        user = User(username='demo_user', email='demo@example.com')
        db.session.add(user)
        db.session.commit()
    
    ticket = Ticket(
        event_name=data.get('event_name'),
        description=data.get('description'),
        price=data.get('price'),
        date=datetime.fromisoformat(data.get('date')) if data.get('date') else None,
        location=data.get('location'),
        quantity=data.get('quantity', 1),
        seller_id=user.id
    )
    
    db.session.add(ticket)
    db.session.commit()
    
    return jsonify({
        'id': ticket.id,
        'event_name': ticket.event_name,
        'message': 'Ticket created successfully'
    }), 201

@bp.route('/<int:id>/purchase', methods=['POST'])
def purchase_ticket(id):
    ticket = Ticket.query.get_or_404(id)
    data = request.get_json() or {}
    
    quantity = data.get('quantity', 1)
    
    if quantity > ticket.quantity:
        return jsonify({'error': 'Not enough tickets available'}), 400
    
    # In a real app, we would get the buyer_id from the authenticated user
    # For demo purposes, we'll use a default user or create one if it doesn't exist
    user = User.query.filter_by(username='buyer_user').first()
    if not user:
        user = User(username='buyer_user', email='buyer@example.com')
        db.session.add(user)
        db.session.commit()
    
    transaction = Transaction(
        quantity=quantity,
        total_price=ticket.price * quantity,
        buyer_id=user.id,
        ticket_id=ticket.id
    )
    
    ticket.quantity -= quantity
    
    db.session.add(transaction)
    db.session.commit()
    
    return jsonify({
        'message': 'Ticket purchased successfully',
        'transaction_id': transaction.id,
        'total_price': transaction.total_price
    }) 