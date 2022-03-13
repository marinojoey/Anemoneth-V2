from app.models import db, Post


# Adds a demo user, you can add other users here if you want
def seed_posts():
    post1 = Post(user_id=1, title='test1', caption='This is the caption to the title TEST 1')
    post2 = Post(user_id=2, title='test2', caption='If you can see this, then the post is working really well')
    post3 = Post(user_id=3, title='test3', caption='This all but confirms that the functionality is there!!! hooray!')

    db.session.add(post1)
    db.session.add(post2)
    db.session.add(post3)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_posts():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.commit()
