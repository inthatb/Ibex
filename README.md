# Ibex Data

- Pushing changes to github wil trigger heroku to rebuild the app
- App will attempt to run 'npm run start' script / or any script in the Procfile
- in the app logs (on heroku) you should see `app listening on port 873645`
- this server will listen for post requests to `ibex-data.herokuapp.com`
- after tests are complete and data is sent to server
- open your terminal and enter command: (example) `heroku pg:psql postgresql-cubed-55212 --app ibex-data`
- you can find this string in the settings of your heroku app

- run this command to download csv file to the CURRENT DIRECTORY:

```bash
 \copy (SELECT * from Results) TO dump.csv CSV DELIMITER ',';
```