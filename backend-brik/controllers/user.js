const { User } = require("../models/index");
const { comparePassword } = require("../helper/bcrypt");
const { createToken } = require("../helper/jwt");

class UserController {
    static async registerUser(req, res, next) {
        try {
            let { name, email, password } = req.body;
            let data = {
                nama: name,
                email: email,
                password: password,
                group: "user",
            };
            const user = await User.create(data);
            res.status(201).json({
                status: true,
                message: "Success register user",
                data: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                },
            });
        } catch (err) {
            next(err);
        }
    }

    static async loginUser(req, res, next) {
        try {
            let input = {
                email: req.body.email,
                password: req.body.password,
            };
            if (!input.email) {
                throw {
                    name: "Email is required",
                };
            }
            if (!input.password) {
                throw {
                    name: "Password is required",
                };
            }
            const user = await User.findOne({
                where: {
                    email: input.email,
                },
            });
            if (!user) {
                throw {
                    name: "Invalid Username/Password",
                };
            }
            if (!comparePassword(input.password, user.password)) {
                throw {
                    name: "Invalid Username/Password",
                };
            }
            let dataToken = {
                id: user.id,
                name: user.name,
                email: user.email,
                group: user.group,
            };
            const token = createToken(dataToken);
            if (!token) {
                throw {
                    name: "JsonWebTokenError",
                };
            }
            res.status(200).json({
                status: true,
                message: "Success login user",
                data: {
                    ...dataToken,
                    access_token: token,
                },
            });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = UserController;
