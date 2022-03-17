from app.models import db, Post


# Adds a demo user, you can add other users here if you want
def seed_posts():
    post1 = Post(user_id=1, title='test1--', caption='This post should hav been made my address 111111')
    post2 = Post(user_id=2, title='test2-', caption='This post should hav been made my address 222222')
    post3 = Post(user_id=3, title='test3', caption='This post should hav been made my address 333333')
    post4 = Post(user_id=4, title='test4-', caption='This post should hav been made my address 444444')
    post5 = Post(user_id=5, title='test5--', caption='This post should hav been made my address 555555')
    post6 = Post(user_id=6, title='test6---', caption='This post should hav been made my address 666666')
    post7 = Post(user_id=7, title='test7-----', caption='This post should hav been made my address 777777')

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
