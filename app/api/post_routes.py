from flask import Blueprint, jsonify, redirect, session, request
from flask_login import current_user, login_required
from app.models import User, Post, db
from sqlalchemy.orm import joinedload, selectinload
from app.forms.post_form import PostForm
from datetime import datetime


post_routes = Blueprint('posts', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@post_routes.route('/all')
@login_required
def getAllPosts():
    """
    Route that returns all posts
    """
    res = {}
    posts = Post.query.all()

    print('-----------inside /all route...', posts)

    for post in posts:
        # user = User.query.get(post.user_id)
        res[post.id] = post.to_dict()

    return res


@post_routes.route('/<int:postId>')
@login_required
def getPost(postId):
    """
    Route that returns single post
    """
    post = Post.query.get(postId)

    # user = User.query.get(post.user_id)
    # username = user.username

    res = post.to_dict()

    return res


@post_routes.route('/user/<username>/posts')
@login_required
def getUserPosts(username):
    """
    Route that returns a user's post
    """
    res = {}

    user = User.query.filter(User.username == username).first_or_404()
    userId = user.id

    # print('++++++backend routes', user, userId)

    posts = Post.query.filter(userId == Post.user_id).all()

    # print('========backend routes', posts)

    for post in posts:
        res[post.id] = post.to_dict()

    return res


@post_routes.route('/<int:userId>/create', methods=["POST"])
@login_required
def createPost():
    """
    Route that allows user to create a post
    """
    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        newPost = Post(
            # user_id = current_user.id,
            user_id = userId,
            title = form.data['title'],
            caption = form.data['caption'],
            created_at = datetime.now()
        )

        db.session.add(newPost)
        db.session.commit()
        return newPost.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@post_routes.route('/<int:postId>', methods=["PUT"])
@login_required
def editPost(postId):
    """
    Route that allows a user to edit a post
    """
    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        post = Post.query.get(postId)
        post.title = form.data['title']
        post.caption = form.data['caption']
        post.updated_at = datetime.now()

        db.session.commit()
        return post.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401



@post_routes.route('/<int:postId>', methods=["DELETE"])
@login_required
def deletePosting(postId):
    """
    Route that allows a user to delete a post
    """
    post = Post.query.get(postId)
    data = post.to_dict()
    db.session.delete(post)
    db.session.commit()
    return data
