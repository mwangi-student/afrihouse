from flask import Flask, jsonify
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from datetime import timedelta
from models import db, TokenBlocklist
from user import user_bp
from house import house_bp
from auth import auth_bp
from flask_cors import CORS


def create_app():
    app = Flask(__name__)

    CORS(app, supports_credentials=True, allow_headers=["Authorization", "Content-Type"])

    @app.route("/api/data", methods=["GET"])
    def get_data():
        return jsonify({"message": "Flask is working!"})

    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///afrihouse.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    app.config["JWT_SECRET_KEY"] = "htgwsfsdgwujksmsidg6ysz"
    app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)

    db.init_app(app)
    migrate = Migrate(app, db)
    jwt = JWTManager(app)

    app.register_blueprint(user_bp)
    app.register_blueprint(house_bp)
    app.register_blueprint(auth_bp)

    @jwt.token_in_blocklist_loader
    def check_if_token_revoked(jwt_header, jwt_payload: dict) -> bool:
        jti = jwt_payload["jti"]
        token_exists = db.session.query(TokenBlocklist.id).filter_by(jti=jti).scalar()
        return token_exists is not None

    return app 

app = create_app()

if __name__ == "__main__":
    app.run(debug=True)
