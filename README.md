## To start...

1. Clone this repo
2. Install dependencies in root folder
   ```pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt```
3. ```cd``` into ```/react-app``` and install dependencies
   ```npm install```
4. Create a .env file based on the .env.example given
5.  Setup a PostgresSQL user + database in root folder psql (instructions in .env.example)
6. Start shell + upgrade / migrate db + seed db + run flask in the root folder
    ```javascript
    pipenv shell
    flask db upgrade
    flask db migrate
    flask db seed all
    flask run
    ```
6. Keeping flask running, start the app by running ```npm start``` in ```/react-app```

## Deploy to Heroku

1. Before deploying, run ```pipenv lock -r > requirements.txt```
2. Login to heroku ```heroku login```
3. Login to heroku container ```heroku container:login```
4. Push the docker container to heroku from the root folder
   ```heroku container:push web -a anemoneth```
5. Release the docker container to heroku
   ```heroku container:release web -a anemoneth```
6. Set up db (if making changes to db, remove Heroku Postgres add-on, re-add, THEN run these commands)
   ```heroku run -a anemoneth flask db upgrade```
   ```heroku run -a anemoneth flask seed all```
7. Update "Config Vars" under heroku settings if any .env variables added
