import jwt from "jsonwebtoken";
import config from "../config/auth.config.js";
import db from "../model/index.js";

const User = db.User;

const verifytoken = (req, res, next) => {
    let token = req.headers["authorization"];
    if (!token) {
        return res.status(403).send({ message: "No Token Provide!" });
    }
    
    // Extract token from "Bearer TOKEN_VALUE"
    if (token.startsWith('Bearer ')) {
        token = token.slice(7); // Remove "Bearer " prefix
    }
    
    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: "Unauthorized!" });
        }
        req.username = decoded.username;
        next();
    });
};

const isAdmin = (req, res, next) => {
    User.findOne({ where: { username: req.username } }).then((user) => {
        if (!user) {
            return res.status(404).send({ message: "User not found!" });
        }
        
        user.getRoles().then((roles) => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "admin") {
                    next();
                    return;
                }
            }
            res.status(403).send({ message: "Require Admin Role!" });
            return;
        });
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
};

const ModOrAdmin = (req, res, next) => {
    User.findOne({ where: { username: req.username } }).then((user) => {
        if (!user) {
            return res.status(404).send({ message: "User not found!" });
        }
        
        user.getRoles().then((roles) => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "admin" || roles[i].name === "moderator") {
                    next();
                    return;
                }
            }
            res.status(403).send({ message: "Require Moderator or Admin Role!" });
            return;
        });
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
};

const authJwt = { verifytoken, isAdmin, ModOrAdmin };

export default authJwt;