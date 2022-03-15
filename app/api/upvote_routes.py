from flask import Blueprint, jsonify, session, request
from itsdangerous import json
from app.models import User, Post, db
from flask_login import current_user, login_required


upvote_routes = Blueprint('upvotes', __name__)


@upvote_routes.route('/post/<int:postId>')
# @login_required
def getUpvotes(postId):
    post = Post.query.get(postId)

    res = {}
    for user in post.user_saved:
        res[user.id] = user.to_dict()

    return res


@upvote_routes.route('/user/<username>')
# @login_required
def getUserUpvotes(username):
    user = User.query.filter(User.username == username).first_or_404()
    # userId = user.id

    res = {}
    for post in user.upvote_posts:
        res[post.id] = post.to_dict()

    return res


@upvote_routes.route('/post/<int:postId>/user/<username>', methods=["POST"])
# @login_required
def newUpvote(postId, username):
    post = Post.query.get(postId)
    user = User.query.filter(User.username == username).first_or_404()

    post.user_upvotes.append(user)
    db.session.commit()

    res = {}
    for user in post.user_upvotes:
        res[user.id] = user.to_dict()

    return res


# @upvote_routes.route('/post/<int:postId>/user/<username>', methods=["DELETE"])
# # @login_required
# def deleteUpvote(postId, username):
#     post = Post.query.get(postId)
#     user = User.query.filter(User.username == username).first_or_404()

#     post.user_upvotes.remove(user)
#     db.session.commit()

#     res = {}
#     for user in post.user_saved:
#         res[user.id] = user.to_dict()

#     return res
