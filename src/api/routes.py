"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from .models import db, User, Player
from .utils import generate_sitemap, APIException
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from cloudinary.uploader import upload
import cloudinary

api_key = 149282995566597
api_secret = 'fYx2Ip4ZfW7e6gBQcAYXwMT6JpM'
cloud_name = 'gamacloud'

cloudinary.config(
    cloud_name=cloud_name,
    api_key=api_key,
    api_secret=api_secret
)

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api, resources={r"/api/*": {"origins": "*", "allow_headers": ["Content-Type", "Authorization", "X-Requested-With",
                                                                   "application/json"]}})


@api.route('/register', methods=['POST'])
def register_user():  # FUNCIONA
    data = request.get_json()
    user = User(
        email=data['email'],
        user_name=data['user_name'],
        password=generate_password_hash(data['password'])
    )
    access_token = create_access_token(identity=user.user_id)
    db.session.add(user)
    db.session.commit()
    return jsonify({
        'user_id': user.user_id,
        'email': user.email,
        'user_name': user.user_name,
        'success': True,
        'response': 'User created successfully',
        'token': access_token
    }), 201


@api.route('/login', methods=['POST'])
def login_user():  # OK
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()
    access_token = create_access_token(identity=user.user_id)
    if user and check_password_hash(user.password, data['password']):
        return jsonify({
            'user_id': user.user_id,
            'email': user.email,
            'user_name': user.user_name,
            'token': access_token
        }), 200
    return jsonify({'message': 'Invalid email or password'}), 401


@api.route('/validate-token', methods=['GET'])
@jwt_required()
def validate_token():
    current_user = get_jwt_identity()
    auth_header = request.headers.get('Authorization', None)
    print(f"Authorization Header: {auth_header}")
    return jsonify(logged_in_as=current_user), 200


@api.route('/user', methods=['POST'])
def create_user():  # FUNCIONA
    data = request.get_json()
    user = User(
        email=data['email'],
        user_name=data['user_name']
    )
    user.password = data['password']
    db.session.add(user)
    db.session.commit()
    return jsonify({
        'user_id': user.user_id,
        'email': user.email,
        'user_name': user.user_name
    }), 201


@api.route('/user', methods=['GET'])
def get_user():
    try:
        user_id = request.args.get('user_id')
        if user_id:
            user = User.query.get(user_id)
            if user is None:
                return jsonify({'message': 'User not found'}), 404
            else:
                return jsonify({
                    'user_id': user.user_id,
                    'email': user.email,
                    'user_name': user.user_name
                }), 200
        else:
            users = User.query.all()
            return jsonify([user.to_dict() for user in users]), 200

    except APIException as e:
        return jsonify({'message': 'Error getting user: ', 'error': str(e)}), 500


@api.route('/user/profile-pic', methods=['POST'])
def upload_profile_pic():
    if 'image' not in request.files:
        return jsonify({'message': 'No image part'}), 400

    image = request.files['image']
    user_id = request.form.get('user_id')

    if not user_id:
        return jsonify({'message': 'user_id is missing'}), 400

    user = User.query.get(user_id)

    if user is None:
        return jsonify({'message': 'User not found'}), 404

    upload_result = upload(image)
    if 'url' not in upload_result:
        return jsonify({'message': 'Image upload failed'}), 500

    user.profilePic = upload_result['url']
    db.session.commit()
    return jsonify({'profilePic': user.profilePic}), 200


@api.route('/user/update-profile-pic', methods=['PUT'])
def update_profile_pic():
    data = request.get_json()
    user_id = data.get('user_id')
    new_profile_pic_url = data.get('profilePic')

    if not user_id or not new_profile_pic_url:
        return jsonify({'message': 'user_id or profilePic is missing'}), 400

    user = User.query.get(user_id)

    if user is None:
        return jsonify({'message': 'User not found'}), 404

    user.profilePic = new_profile_pic_url
    db.session.commit()

    return jsonify({'profilePic': user.profilePic}), 200


@api.route('/user', methods=['DELETE'])
def delete_user():  # FUNCIONA
    data = request.get_json()
    user_id = data.get('user_id')
    user = User.query.get(user_id)
    if user is None:
        return jsonify({'message': 'User not found'}), 404
    db.session.delete(user)
    db.session.commit()
    return jsonify({'message': 'User deleted'}), 200


@api.route('/player', methods=['POST'])
def create_player():
    data = request.get_json()
    player = Player(
        name=data['name'],
        type=data['type'],
        score=data['score'],
        level=data['level']
    )
    db.session.add(player)
    db.session.commit()
    return jsonify({
        'player_id': player.player_id,
        'name': player.name,
        'type': player.type,
        'score': player.score,
        'level': player.level
    }), 201


@api.route('/player/updateScore', methods=['PUT'])
def update_score():
    data = request.get_json()
    player_id = data.get('player_id')
    user_id = data.get('user_id')
    score = data.get('score')
    player = Player.query.filter_by(player_id=player_id, user_id=user_id).first()
    if player is None:
        return jsonify({'message': 'Player not found'}), 404
    player.score = score
    db.session.commit()
    return jsonify({'message': 'Score updated'}), 200


@api.route('/player/updateLevel', methods=['PUT'])
def update_level():
    data = request.get_json()
    player_id = data.get('player_id')
    user_id = data.get('user_id')
    level = data.get('level')
    player = Player.query.filter_by(player_id=player_id, user_id=user_id).first()
    if player is None:
        return jsonify({'message': 'Player not found'}), 404
    player.level += 1
    db.session.commit()
    return jsonify({'message': 'Score updated'}), 200


@api.route('/player', methods=['GET'])
def get_players():
    players = Player.query.all()
    if players is None:
        return jsonify({'message': 'Players not found'}), 404
    else:
        return jsonify([player.serialize() for player in players]), 200


@api.route('/player', methods=['DELETE'])
def delete_player():
    data = request.get_json()
    player_id = data.get('player_id')
    player = Player.query.get(player_id)
    if player is None:
        return jsonify({'message': 'Player not found'}), 404
    db.session.delete(player)
    db.session.commit()
    return jsonify({'message': 'Player deleted'}), 200
