from app.models import db, Post, User


# Adds a demo user, you can add other users here if you want
def seed_posts():
    post1 = Post(user_id=1, title='test1--', caption='This post should hav been made my address 111111')
    post2 = Post(user_id=2, title='test2-', caption='This post should hav been made my address 222222')
    post3 = Post(user_id=3, title='test3', caption='This post should hav been made my address 333333')
    post4 = Post(user_id=4, title='test4-', caption='This post should hav been made my address 444444')
    post5 = Post(user_id=5, title='test5--', caption='This post should hav been made my address 555555')
    post6 = Post(user_id=6, title='test6---', caption='This post should hav been made my address 666666')
    post7 = Post(user_id=7, title='test7-----', caption='This post should hav been made my address 777777')

    user1 = User.query.get(1)
    user2 = User.query.get(2)
    user3 = User.query.get(3)
    user4 = User.query.get(4)
    user5 = User.query.get(5)
    user6 = User.query.get(6)
    user7 = User.query.get(7)

    post1.user_upvotes.append(user1)
    post1.user_upvotes.append(user2)
    post1.user_upvotes.append(user3)
    post1.user_upvotes.append(user4)
    post1.user_upvotes.append(user5)
    post1.user_upvotes.append(user6)
    post1.user_upvotes.append(user7)

    post2.user_upvotes.append(user1)
    post2.user_upvotes.append(user2)
    post2.user_upvotes.append(user3)

    post3.user_upvotes.append(user1)
    post3.user_upvotes.append(user2)
    post3.user_upvotes.append(user3)

    post5.user_upvotes.append(user1)
    post5.user_upvotes.append(user2)

    post6.user_upvotes.append(user1)
    post7.user_upvotes.append(user1)


    db.session.add(post1)
    db.session.add(post2)
    db.session.add(post3)
    db.session.add(post4)
    db.session.add(post5)
    db.session.add(post6)
    db.session.add(post7)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_posts():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.commit()
