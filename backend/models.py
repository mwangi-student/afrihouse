from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from datetime import datetime

metadata = MetaData()
db = SQLAlchemy(metadata=metadata)


class Users(db.Model):
    __tablename__ = "users"  
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    about = db.Column(db.String(120), nullable=True)
    phone_number = db.Column(db.String(15), unique=True, nullable=False) 
    password = db.Column(db.String(512), nullable=False) 
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable = True)
    is_agent = db.Column(db.Boolean, nullable=False, default=False) 

    # Relationship
    houses = db.relationship("Houses", backref="user", cascade="all, delete", lazy=True)


class Houses(db.Model):
    __tablename__ = "houses" 
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(80), nullable=False)
    description = db.Column(db.String(255), nullable=False)  
    size = db.Column(db.String(50), nullable=False) 
    location = db.Column(db.String(120), nullable=False)
    rent = db.Column(db.Integer, nullable=False)
    is_vacant = db.Column(db.Boolean, nullable=False, default=False)
    is_deposit = db.Column(db.Boolean, nullable=False, default=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)


class TokenBlocklist(db.Model):
    __tablename__ = "token_blocklist"
    id = db.Column(db.Integer, primary_key=True)
    jti = db.Column(db.String(36), nullable=False, unique=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)