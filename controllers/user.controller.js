import UserAccessor from "../db_accessor/user.accessor.js";
import bcrypt from "bcryptjs";

export default class UserController {
    static async getAllUsers(req, res) {
        const users = await UserAccessor.getAllUsers();
        console.log(users);
        res.render("index", { users: users } );
    }

    static async followUser(req, res, next) {
        if(!req.error) {
            res.json(req.body);
        } else {
            return next();
        }
    }

    static getExample(req, res) {
        if(req.cookies.token) {
            res.redirect('/profile');
        } else {
            res.render('example', {error: req.cookies.error});
        }
    }

    static getLoginPage(req, res) {
        if(req.cookies.token) {
            res.redirect('/profile');
        } else {
            res.render('login_page', {error: req.cookies.error});
        }
    }

    static async postLogin(req, res, next) {
        try {
            if(!req.cookies.token) {
                const user = await UserAccessor.getUser(req.body.username);
                if(user) {
                    const result = await bcrypt.compare(req.body.password, user.password);
                    if(result) {
                        const token = jwt.sign(
                            {
                                username: user.username,
                                role: user.role,
                                information: user.information
                            },
                            process.env.TOKEN_KEY
                        );
                      
                        res.cookie('token', token, {httpOnly: true, maxAge: 60 * 60 * 1000});
                        res.redirect('/profile');
                    }
                }
            }
        } catch(e) {
            //req.error = ???;
            return next();
        }
    }

    static getProfile(req, res, next) {
        if(!req.error) {
            const user = req.user;
            res.render('profile',
            {
                name: user.username,
                email: user.email,
                bio: user.bio,
                followers: user.followers,
                following: user.following,
            });
        } else {
            return next();
        }
    }

    static getLogout(req, res) {
        res.clearCookie("token");
        res.redirect('/');
        console.log("Signed out");
    }
}