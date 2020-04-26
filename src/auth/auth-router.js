const express = require("express");
const AuthService = require("./auth-service");
const authRouter = express.Router();
const jsonBodyParser = express.json();

// JWT check for login.
authRouter.post("/login", jsonBodyParser, (req, res, next) => {
  const { email, password } = req.body;
  const loginUser = { email, password };

  for (const [key, value] of Object.entries(loginUser))
    if (value == null)
      return res.status(400).json({
        error: `Missing '${key}' in request body`,
      });

  AuthService.getUserWithUserName(req.app.get("db"), loginUser.email)
    .then((dbUser) => {
      if (!dbUser)
        return res.status(400).json({
          error: "Incorrect username",
        });

      return AuthService.comparePasswords(
        loginUser.password,
        dbUser.password
      ).then((compareMatch) => {
        if (!compareMatch) {
          return res.status(400).json({
            error: "Incorrect password",
          });
        }

        // Returns JWT token and user info to set front, so front end can then make another call for data
        const sub = dbUser.email;
        const payload = { userid: dbUser.id };
        res.send({
          dbUser,
          authToken: AuthService.createJwt(sub, payload),
          message: 200,
        });
      });
    })
    .catch(next);
});

module.exports = authRouter;
