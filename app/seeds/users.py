from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(username='demo', address='ax1234567890123456789123456789123456789123', password='password')
    joey = User(username='joey', address='0x2234567890123456789123456789123456789123', password='password')
    savanah = User(username='savanah', address='0x3234567890123456789123456789123456789123', password='password')
    satoshi = User(username='satoshi', address='0x4234567890123456789123456789123456789123', password='password')
    vitalik = User(username='vitalik', address='0x5234567890123456789123456789123456789123', password='password')
    gavin = User(username='gavin', address='0x6234567890123456789123456789123456789123', password='password')
    charles = User(username='charles', address='0x7234567890123456789123456789123456789123', password='password')

    db.session.add(demo)
    db.session.add(joey)
    db.session.add(savanah)
    db.session.add(satoshi)
    db.session.add(vitalik)
    db.session.add(gavin)
    db.session.add(charles)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
