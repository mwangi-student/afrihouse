from flask import jsonify, request, Blueprint
from models import db, Users, Houses
from datetime import datetime
from werkzeug.security import generate_password_hash
from flask_jwt_extended import jwt_required, get_jwt_identity

user_bp = Blueprint("user_bp", __name__)

#===================================================== Registering Users =========================================================
@user_bp.route("/register", methods=["POST"])
def register_users():
    try:
        # Support both JSON and Form-Data input
        data = request.get_json() or request.form  

        username = data.get("username")
        email = data.get("email")
        about = data.get("about", "")
        phone_number = data.get("phone_number")
        is_agent = str(data.get("is_agent", "false")).lower() == "true"
        password = data.get("password")
        created_at = datetime.utcnow()  

        # Debugging logs to check received data
        print("Received Data:", data)

        # Validate required fields
        if not username or not email or not password or not phone_number:
            return jsonify({"error": "Missing required fields"}), 400

        # Hash the password
        hashed_password = generate_password_hash(password)

        # Check if username or email already exists
        if Users.query.filter((Users.username == username) | (Users.email == email)).first():
            return jsonify({"error": "Username or email already exists"}), 406

        # Create new user record
        new_user = Users(
            username=username,
            email=email,
            password=hashed_password,
            about=about,
            phone_number=phone_number,
            created_at=created_at,
            is_agent=is_agent
        )
        db.session.add(new_user)
        db.session.commit()

        return jsonify({"success": "User registered successfully"}), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500
    

#================================================ Fetch All Users =========================================================
@user_bp.route("/users", methods=["GET"])
def fetch_users():
    users = Users.query.all()

    user_list = [
        {
            'id': user.id,
            'email': user.email,
            'username': user.username,
            'created_at': user.created_at,
            "houses": [
                {
                    "id": house.id,
                    "name": house.name,
                    "description": house.description,
                    "location": house.location,
                    "size": house.size,
                    "rent": house.rent,
                } for house in user.houses  
            ]
        }
        for user in users
    ]

    return jsonify(user_list)


#================================================ Fetch One User =========================================================
@user_bp.route("/users/<int:user_id>", methods=["GET"])
def fetch_single_user(user_id):
    user = Users.query.get(user_id) 
    if not user:
        return jsonify({"error": "User not found"}), 404

    user_data = {
        'id': user.id,
        'email': user.email,
        'username': user.username,
        'created_at': user.created_at,
        "houses": [
            {
                "id": house.id,
                "name": house.name,
                "description": house.description,
                "location": house.location,
                "size": house.size,
                "rent": house.rent,
            } for house in user.houses  
        ]
    }

    return jsonify(user_data)


#================================================ Update User =========================================================
@user_bp.route("/users/<int:user_id>", methods=["PATCH"])
def update_users(user_id):
    user = Users.query.get(user_id)
    if not user:
        return jsonify({"error": "User doesn't exist!"}), 404

    data = request.get_json()
    username = data.get('username', user.username)
    email = data.get('email', user.email)
    password = data.get('password', user.password)

    # Validate username and email uniqueness
    check_username = Users.query.filter(Users.username == username, Users.id != user.id).first()
    check_email = Users.query.filter(Users.email == email, Users.id != user.id).first()

    if check_username or check_email:
        return jsonify({"error": "Username/email already exists"}), 406

    # Update user details
    user.username = username
    user.email = email
    user.password = generate_password_hash(password) if password != user.password else password
    
    db.session.commit()
    return jsonify({"success": "Updated successfully"}), 200


#================================================ Delete User =========================================================
@user_bp.route("/users/<int:user_id>", methods=["DELETE"])
def delete_users(user_id):
    user = Users.query.get(user_id)
    if not user:
        return jsonify({"error": "User you're trying to delete doesn't exist!"}), 404

    db.session.delete(user)
    db.session.commit()
    return jsonify({"success": "Deleted successfully"}), 200


#================================================ Delete Account (Authenticated User) =========================================================
@user_bp.route("/user/delete_account", methods=["DELETE"])
@jwt_required()
def delete_account():
    current_user_id = get_jwt_identity()
    user = Users.query.get(current_user_id)

    if not user:
        return jsonify({"error": "User not found"}), 404

    # Delete user's houses first
    houses = Houses.query.filter_by(user_id=current_user_id).all()
    for house in houses:
        db.session.delete(house)

    # Delete user
    db.session.delete(user)
    db.session.commit()
    return jsonify({"success": "User account and associated houses deleted successfully"}), 200
