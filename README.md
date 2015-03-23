Create a folder called mongodb in the project directory. From within that directory run 
    mongod --dbpath ./ 

A simple Node server implementation is included to serve static files from public/. Start a server with

    npm install
    node app.js

As users complete the survey, the database entry associated with each post is updated with the results of the surveys, under the fields cyberAggressionCount and cyberBullyingCount respectively.

From the mongo shell, the data can be retrieved by the following commands

    use cyberbullying
    db.data.find({})
