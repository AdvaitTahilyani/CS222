from datetime import datetime
from app import db

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), index=True, unique=True)
    email = db.Column(db.String(120), index=True, unique=True)
    password_hash = db.Column(db.String(128))
    tickets_selling = db.relationship('Ticket', backref='seller', lazy='dynamic')
    tickets_purchased = db.relationship('Transaction', backref='buyer', lazy='dynamic')

    def __repr__(self):
        return f'<User {self.username}>'

class Ticket(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    event_name = db.Column(db.String(128), index=True)
    description = db.Column(db.Text)
    price = db.Column(db.Float)
    date = db.Column(db.DateTime, index=True)
    location = db.Column(db.String(128))
    quantity = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    seller_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    transactions = db.relationship('Transaction', backref='ticket', lazy='dynamic')
    
    def __repr__(self):
        return f'<Ticket {self.event_name}>'

class Transaction(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    quantity = db.Column(db.Integer)
    total_price = db.Column(db.Float)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    buyer_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    ticket_id = db.Column(db.Integer, db.ForeignKey('ticket.id'))
    
    def __repr__(self):
        return f'<Transaction {self.id}>' 