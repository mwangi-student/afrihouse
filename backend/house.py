from flask import jsonify, request, Blueprint
from models import db, Users, Houses
from datetime import datetime
from flask_jwt_extended import jwt_required, get_jwt_identity

house_bp = Blueprint("house_bp", __name__)

# ==================================adding houses======================================
@house_bp.route("/houses/add", methods=["POST"])
@jwt_required()
def add_house():
    data = request.json  

    current_user_id = get_jwt_identity()

    name = data['name']
    description = data['description']
    size = data['size']
    location = data['location']
    rent = data['rent']
    is_vacant = data['is_vacant']  
    is_deposit = data['is_deposit']
    created_at = datetime.fromisoformat(data['created_at'])

    check_user_id = Users.query.get(current_user_id)  # Ensure the user exists

    if not check_user_id:
        return jsonify({"error": "User doesn't exist"}), 406

    new_house = Houses(
        name=name,
        description=description,
        user_id=current_user_id, 
        location=location,
        size=size,
        rent=rent,
        is_vacant=is_vacant,  
        is_deposit=is_deposit,
        created_at=created_at
    )
    db.session.add(new_house)
    db.session.commit()
    return jsonify({"success": "House added successfully"}), 201


#========================================================fetching houses============================================================
@house_bp.route("/houses", methods=["GET"])
def get_houses():  
    houses = Houses.query.all()  

    if not houses:
        return jsonify({"error": "No houses found"}), 404

    houses_data = [
        {
            "id": house.id,
            "name": house.name,
            "description": house.description,
            "size": house.size,
            "location": house.location,
            "rent": house.rent,
            "is_vacant": house.is_vacant,
            "is_deposit": house.is_deposit,
            "user_id": house.user_id,
            "created_at": house.created_at.isoformat()
        }
        for house in houses
    ]

    return jsonify(houses_data), 200

#=================================================fetching a single house===========================
@house_bp.route("/houses/<int:house_id>", methods=["GET"])
@jwt_required()
def get_house(house_id):
    house = Houses.query.get(house_id)

    if not house:
        return jsonify({"error": "House not found"}), 404

    house_data = {
        "id": house.id,
        "name": house.name,
        "description": house.description,
        "size": house.size,
        "location": house.location,
        "rent": house.rent,
        "is_vacant": house.is_vacant,
        "is_deposit": house.is_deposit,
        "user_id": house.user_id,
        "created_at": house.created_at.isoformat()
    }
    
    return jsonify(house_data), 200


    
#=====================================================update house===============================
@house_bp.route("/houses/update/<int:house_id>", methods=["PATCH"])
@jwt_required()
def update_house(house_id):
    data = request.get_json()
    current_user_id = get_jwt_identity()
    house = Houses.query.get(house_id)

    if not house:
        return jsonify({"error": "House not found"}), 404

    if house.user_id != current_user_id:
        return jsonify({"error": "Unauthorized to update this house"}), 403

    # Update fields if provided in request
    house.name = data.get("name", house.name)
    house.description = data.get("description", house.description)
    house.size = data.get("size", house.size)
    house.location = data.get("location", house.location)
    house.rent = data.get("rent", house.rent)
    house.is_vacant = data.get("is_vacant", house.is_vacant)
    house.is_deposit = data.get("is_deposit", house.is_deposit)

    db.session.commit()
    return jsonify({"success": "House updated successfully"}), 200



#=================================delete house===================================================
@house_bp.route("/houses/delete/<int:house_id>", methods=["DELETE"])
@jwt_required()
def delete_house(house_id):
    current_user_id = get_jwt_identity()
    house = Houses.query.get(house_id)

    if not house:
        return jsonify({"error": "House not found"}), 404

    if house.user_id != current_user_id:
        return jsonify({"error": "Unauthorized to delete this house"}), 403

    db.session.delete(house)
    db.session.commit()
    return jsonify({"success": "House deleted successfully"}), 200