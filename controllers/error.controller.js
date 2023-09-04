const errorHandler = (req, res) => {
    if(req.error) {
        switch(req.error) {
            case 401:
                res.cookie("error", "Login to have full access.", {maxAge: 1000});
                res.redirect("/login");
            case 403:
                res.cookie("error", "Forbidden. Log out and try again.", {maxAge: 1000});
                res.redirect("/login");
        }
    } else {
        res.redirect("/");
    }
}

export default errorHandler;