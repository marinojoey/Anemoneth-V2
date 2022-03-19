from app.models import db, Post, User


# Adds a demo user, you can add other users here if you want
def seed_posts():
    post1 = Post(user_id=1, title='Chainshot is owesome!', caption='I am about to finish their bootcamp and I have learned SO MUCH!')
    post2 = Post(user_id=2, title='Lord of the Rings?', caption='The best ENT-ertainment around!')
    post3 = Post(user_id=3, title='Is Rinkeby down again?', caption='If it is, this presentation could be tough...')
    post4 = Post(user_id=4, title='I found a new fav drink', caption='Has anyone else tried Anarchy Cola?')
    post5 = Post(user_id=5, title='The Eagles', caption='Frodo\'s savior or Gandalf\'s favorite band?')
    post6 = Post(user_id=6, title='My friend', caption='Just told me that he thinks Dumbledore is more powerful than Gandalf...')
    post7 = Post(user_id=7, title='Is Vitalik on AnemonETH?', caption='I was just chatting with Satoshi, but I wasn\'t sure if Vitalik was also on here.')

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
