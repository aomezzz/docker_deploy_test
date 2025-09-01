import db from "../model/index.js";
const User = db.User;
const Role = db.Role;
import config from "../config/auth.config.js"; // Fixed import back to default import
import bcrypt from "bcryptjs"; //ใช้ในการเข้ารหัสรหัสผ่าน
import jwt from "jsonwebtoken"; //ใช้ในการแลกเปลี่ยนข้อมูลระหว่างเซิร์ฟเวอร์และไคลเอนต์
import { Op } from "sequelize"; //ใช้ในการจัดการกับการค้นหาข้อมูลในฐานข้อมูล

const authController = {};

authController.register = async (req, res) => {
  const { username, name, email, password } = req.body;
  if (!username || !name || !email || !password) {
    res
      .status(400)
      .send({ message: "Username, Name, Email or Password can not be empty!" });
    return;
  }
  // Select * from user where username = username
  await User.findOne({ where: { username } }).then((user) => {
    if (user) {
      res.status(400).send({ message: "Username already exists!" });
      return;
    }

    const newUser = {
      username,
      name,
      email,
      password : bcrypt.hashSync(password, 8) // เข้ารหัสรหัสผ่านด้วย bcrypt
    };
    User.create(newUser)
      .then((user) => {
        // send roles in reqiest body [ADMIN]
        if (req.body.roles) {
          // Select * from role where name = role1 OR name = role2
          Role.findAll({
            where: {
              name: { [Op.or]: req.body.roles },
            },
          }).then((roles) => {
            if (roles.length === 0) {
              res.status(400).send({ message: "Role not found!" });
              return;
            }
            user.setRoles(roles).then(() => {
              res.send({ message: "User was registered successfully!" });
            });
          });
        } else {
          user.setRoles([1]).then(() => {
            res.send({ message: "User was registered successfully!" });
          });
        }
      })
      .catch((error) => {
        res.status(500).send({
          message: error.message || "Something error while create the user",
        });
      });
  });
};

authController.login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).send({ message: "You Stupid Username or Password can not be empty!!!!!!!!" });
    return;
  }
  // Select * from user where username = username
  await User.findOne({ where: { username } })
  .then((user) => {
    if (!user) {
      res.status(404).send({ message: "You Stupid User not found!" });
      return;
    }
    // Compare password
    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) {
      res.status(401).send({message: "You Stupid Password is not Correct!",});
      return;
    }
    // Create token
    const token = jwt.sign({ id: user.id, username: user.username }, config.secret, {
      expiresIn: 86400, // 24 hours
    });
    // Get roles
    const authorities = [];
    user.getRoles().then((roles) => {
      console.log('User roles for', user.username, ':', roles.map(r => r.name));
      for(let i = 0; i < roles.length; i++) {
        authorities.push("ROLE_" + roles[i].name.toUpperCase());
      }
      res.status(200).send({
        accessToken: token,
        id: user.id,
        username: user.username,
        name: user.name,
        email: user.email,
        authorities: authorities,
        roleId: roles[0]?.id ?? null, // send first role id if exists
      });
    });
  })
  .catch((error) => {
    res.status(500).send({
      message: error.message || "Something error while login the user",
    });
  });

};

export default authController;