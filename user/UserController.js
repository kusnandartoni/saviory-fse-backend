var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var User = require('./User');

// CREATES A NEW USER
router.post('/', function (req, res) {
    User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            phone: req.body.phone,
            country: req.body.country,
            isAdmin: req.body.isAdmin,
            birthday: req.body.birthday
        }, 
        function (err, user) {
            if (err) return res.status(500).send("terjadi kesalahan di sisi server, silahkan kontak admin");
            res.status(200).send(user);
        });
});

// RETURNS ALL THE USERS IN THE DATABASE
router.get('/', function (req, res) {
    const name = '^'+req.query.name;
    const email = '^'+req.query.email;
    const country = '^'+req.query.country;
    if(req.query.name) {
        User.find({
            $or:[{firstName: {$regex: name, $options: 'i'}}, {lastName:{$regex: name, $options: 'i'}}]
        }, function (err, users) {
            if (err) return res.status(500).send("terjadi kesalahan di sisi server, silahkan kontak admin");
            res.status(200).send(users);
        });
    }else if(req.query.email){
        User.find({email: {$regex: email, $options: 'i'}}, function(err, users) {
            if (err) return res.status(500).send("terjadi kesalahan di sisi server, silahkan kontak admin");
            res.status(200).send(users);
        });
    }else if(req.query.country){
        User.find({country: {$regex: country, $options: 'i'}}, function(err, users) {
            if (err) return res.status(500).send("terjadi kesalahan di sisi server, silahkan kontak admin");
            res.status(200).send(users);
        });
    }else{
        User.find({}, function (err, users) {
            if (err) return res.status(500).send("terjadi kesalahan di sisi server, silahkan kontak admin");
            res.status(200).send(users);
        });
    }
    
});

// GETS A SINGLE USER FROM THE DATABASE
router.get('/:id', function (req, res) {
    User.findById(req.params.id, function (err, user) {
        if (err) return res.status(500).send("terjadi kesalahan di sisi server, silahkan kontak admin");
        if (!user) return res.status(404).send("User tidak ditemukan");
        res.status(200).send(user);
    });
});

// DELETES A USER FROM THE DATABASE
router.delete('/:id', function (req, res) {
    User.findByIdAndRemove(req.params.id, function (err, user) {
        if (err) return res.status(500).send("terjadi kesalahan di sisi server, silahkan kontak admin");
        res.status(200).send("User: "+ user.name +" was deleted.");
    });
});

// UPDATES A SINGLE USER IN THE DATABASE
router.put('/:id', function (req, res) {
    User.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, user) {
        if (err) return res.status(500).send("terjadi kesalahan di sisi server, silahkan kontak admin");
        res.status(200).send(user);
    });
});


module.exports = router;