const httpStatusCode = require('http-status-codes');
const User           = require('../models/user');   
const randomNumber   = require('random-number');
const accountSid     = 'AC16a96bac3150817628e072faeec83ca4'; //TWILIO
const authToken      = 'b19c1910b9b333fbbae76791e421c714';
const client         = require('twilio')(accountSid, authToken);
exports.createUser = async(req, res) => {
    const user = new User({
        img: req.body.img,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userType: req.body.userType,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        password: req.body.password,
        address: req.body.address
    });

    User.create(user, (err, user) => {
        if(err) {
            res.status(httpStatusCode.BAD_REQUEST).send({message: err});
        } else {
            res.status(httpStatusCode.OK).json(user);
        }
    });
};

exports.updateUser = async(req, res) => {
    const user  = new User({
        img: req.body.img,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        address: req.body.address
    });
    User.update(req.body.id, user, (err, user) => {
        if(err) {
            res.status(httpStatusCode.BAD_REQUEST).send({message: err});
        } else {
            res.status(httpStatusCode.OK).json(user);
        }
    });
};

exports.updateUserStoreId = async(req, res) => {
    User.udpateUserStoreId(req.body.id, req.body.storeId, (err, user) => {
        if(err) {
            res.status(httpStatusCode.BAD_REQUEST).send({message: err});
        } else {
            res.status(httpStatusCode.OK).json(user);
        }
    });
};

exports.findUserByEmailAndPass = async(req, res) => {
 
    User.findUserByEmailAndPass(req.body, (err, user)=> {
        if(err) {
            if (err.kind === "not_found"){
                res.status(httpStatusCode.NOT_FOUND).send({
                    message: `Not found user with email ${req.body.email} and password ${req.body.password}`
                });
            } else {
                res.status(httpStatusCode.BAD_REQUEST).send({
                    message: err
                });
            }
        } else {
            res.status(httpStatusCode.OK).json(user);
        }
    });
};

exports.getUser = async(req, res) => {
    User.getUser(req.body.userId, (err, user)=> {
        if(err) {
            if (err.kind === "not_found"){
                res.status(httpStatusCode.NOT_FOUND).send({
                    message: `Not found user with id: ${req.body.id}`
                });
            } else {
                res.status(httpStatusCode.BAD_REQUEST).send({
                    message: err
                });
            }
        } else {
            res.status(httpStatusCode.OK).json(user);
        }
    });
};

exports.getCouriers = async(req, res) => {
    User.getCouriers(null, (err, user)=> {
        if(err) {
            if (err.kind === "not_found"){
                res.status(httpStatusCode.NOT_FOUND).send({
                    message: `Not found user with type courier`
                });
            } else {
                res.status(httpStatusCode.BAD_REQUEST).send({
                    message: err
                });
            }
        } else {
            res.status(httpStatusCode.OK).json(user);
        }
    });
};

exports.getMobileNumAndEmail = async(req, res) => {
    User.getMobileNumAndEmail(req.body, (err, user)=> {
        
        if(err) {
            if (err.kind === "not_found"){
                res.status(httpStatusCode.NOT_FOUND).send({
                    message: `Not found user with type courier`
                });
            } else {
                res.status(httpStatusCode.BAD_REQUEST).send({
                    message: err
                });
            }
        } else {
            res.status(httpStatusCode.OK).json(user);
        }
    });
};

exports.sendVerificationCode = async(req, res) => {
    const phoneNum = `+63${req.body.phoneNum}`;
    const gen = randomNumber.generator({
        min: 1000,
        max: 9999,
        integer: true
    });
    const code = gen();
    //+17016383913
    client.messages
        .create({
            body: `Your Fish Tiangge verification code is ${code}`,
            from: '+17016383913',
            to: phoneNum
        }).then( msg => {
            res.status(httpStatusCode.OK).json(code);
        });
   
}




 