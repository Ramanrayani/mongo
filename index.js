//create a rest api for the user with one route and one endpoint
  const express = require('express');

    const app = express();
    const bodyParser = require('body-parser');
    const mongoose = require('mongoose');
    const cors = require('cors');

    


    //create a mongo db
    mongoose.connect('mongodb://localhost/users', { useNewUrlParser: true , useUnifiedTopology: true});

    mongoose.connection.once('open', () => { 
        console.log('connected to mongo');
    }
    ).on('error', (error) => {
        console.log(error);
    }
    );
    
    



   

    //connect to mongod
    //use body parser
    app.use(bodyParser.json());
    //use cors
    app.use(cors());
    //create a schema for the user
    const userSchema = new mongoose.Schema({

        name: String,
        email: String,
        password: String,
        age: Number,
        

    });
    //create a model for the user
    const User = mongoose.model('User', userSchema);
    //create a route for the user
    app.get('/', (req, res) => {
        res.send('Hello World this is the server' );
    }
    );
    //create an endpoint for the user
    app.get('/users', (req, res) => {
        User.find({}, (err, users) => {
            if (err) {
                res.send(err);
            } else {
                res.json(users);
            }
        });
    }
    );

    //create a route for the user
    app.post('/users', (req, res) => {
        const user = new User(req.body);
        user.save((err, user) => {
            if (err) {
                res.send(err);
            } else {
                res.json(user);
            }
        });
    }
    );
    //create an endpoint for the user
    app.get('/users/:id', (req, res) => {
        User.findById(req.params.id, (err, user) => {
            if (err) {
                res.send(err);
            } else {
                res.json(user);
            }
        });
    }

    );

    //create an endpoint for the user
    app.put('/users/:id', (req, res) => {
        User.findById(req.params.id, (err, user) => {
            if (err) {
                res.send(err);
            } else {
                user.name = req.body.name;
                user.email = req.body.email;
                user.password = req.body.password;
                user.age = req.body.age;
                user.save((err, user) => {
                    if (err) {
                        res.send(err);
                    } else {
                        res.json(user);
                    }
                });
            }
        });
    }
    );

    //create an endpoint for the user
    app.delete('/users/:id', (req, res) => {
        User.findByIdAndRemove(req.params.id, (err, user) => {
            if (err) {
                res.send(err);
            } else {
                res.json(user);
            }
        });
    }
    );

    //create a port for the server
    const port = process.env.PORT || 3000;
    //start the server
    app.listen(port, () => {
        console.log(`Server started on port ${port}`);
    }
    );






