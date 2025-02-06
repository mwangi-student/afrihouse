from flask import jsonify, request, Blueprint
from models import db, Users, TokenBlocklist
from werkzeug.security import check_password_hash, generate_password_hash
from datetime import datetime, timedelta, timezone
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, get_jwt
import os

auth_bp = Blueprint("auth_bp", __name__)


#======================================== LOGIN USER ========================================
@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    user = Users.query.filter_by(email=email).first()

    if not user:
        return jsonify({"error": "User not found in DB"}), 401

    print(f"Stored password: {user.password}")  # Debugging line
    print(f"Entered password: {password}")  # Debugging line

    if not check_password_hash(user.password, password):
        return jsonify({"error": "Password mismatch"}), 401

    access_token = create_access_token(identity=user.id, expires_delta=timedelta(hours=24))

    return jsonify({
        "message": "Login successful",
        "access_token": access_token,
        "user": {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "is_agent": user.is_agent
        }
    }), 200


#======================================== GET CURRENT USER ========================================
@auth_bp.route("/current_user", methods=["GET"])
@jwt_required()
def current_user():
    current_user_id = get_jwt_identity()
    
    user = Users.query.get(current_user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    return jsonify({
        "id": user.id,
        "username": user.username,
        "email": user.email,
        "phone": user.phone_number,   
        "created_at": user.created_at,
        "houses":[]
    }), 200



#======================================== LOGOUT USER ========================================
@auth_bp.route("/logout", methods=["DELETE"])
@jwt_required()
def logout():
    jti = get_jwt()["jti"]  # Unique JWT identifier
    now = datetime.now(timezone.utc)

    # Add token to blocklist
    db.session.add(TokenBlocklist(jti=jti, created_at=now))
    db.session.commit()

    return jsonify({"success": "Logged out successfully"}), 200