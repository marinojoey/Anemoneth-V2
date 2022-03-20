from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    owner = User(username='demo', address='0xae90d6C1360d095a03c4AAf378Bf20cEcdB27630', password='passwordae8')
    joey = User(username='joey', address='0x5336648ed8E3Da9779Ba3346e087bb6F92f04c0D', password='password538')
    savanah = User(username='savanah', address='0x62347df93f34EfA81Bc6e3eDca077fCc4F5e6E6A', password='password628')
    satoshi = User(username='satoshi', address='0x5942a0571d5425698Ca19Cb2e0EfB5564a1240Ea', password='password598')
    aragorn = User(username='aragorn', address='0xB0123815791ab27513d6d2081C708E8768aaBf77', password='passwordb08')
    anakin = User(username='gavin', address='0x0bffe95D6fcb2998721E9907A42434CD4512eE4B', password='password0bf')
    bombadil = User(username='charles', address='0x8C2c1Fc67CaDbd4Fd5D45C3a6A013A80Ee4467D3', password='password8c8')

    db.session.add(owner)
    db.session.add(joey)
    db.session.add(savanah)
    db.session.add(satoshi)
    db.session.add(aragorn)
    db.session.add(anakin)
    db.session.add(bombadil)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
