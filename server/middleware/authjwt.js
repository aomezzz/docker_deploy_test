import jwt from "jsonwebtoken";
import config from "../config/auth.config.js";

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
    User.findByPk(req.username).then((user) => {
        user.getRoles().then((roles) => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "admin") {
                    next();
                    return;
                }
            }
            res.status(401).send({ message: "Unauthorized!" });
            return;
        });
    });
};

const ModOrAdmin = (req, res, next) => {
    User.findByPk(req.username).then((user) => {
        user.getRoles().then((roles) => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "admin " || roles[i].name === "moderator") {
                    next();
                    return;
                }
            }
            res.status(401).send({ message: "Unauthorized!" });
            return;
        });
    });
};

const authJwt = { verifytoken, isAdmin, ModOrAdmin };

export default authJwt;