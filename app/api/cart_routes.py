from flask import Blueprint, jsonify, request, redirect
from flask_login import login_required, current_user

cart_routes = Blueprint('cart', __name__)
