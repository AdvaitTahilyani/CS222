from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from config import Config

db = SQLAlchemy()
migrate = Migrate()

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)
    
    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)
    CORS(app)
    
    # Register blueprints
    from app.routes.main import bp as main_bp
    from app.routes.tickets import bp as tickets_bp
    
    app.register_blueprint(main_bp)
    app.register_blueprint(tickets_bp, url_prefix='/api/tickets')
    
    return app

from app import models 