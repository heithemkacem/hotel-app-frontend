//Express Router
const express = require("express");
const router = express.Router();
const {
  clientRegisterValidation,
  clientLoginValidation,
} = require("./../../util/clientVerification");
const { createClient, authenticateClient } = require("./controller");
//Passport
const passport = require("passport");
const { strategy } = require("./../../security/strategy");
router.use(passport.initialize());
passport.use(strategy);

// Client Inscription
router.post("/signup", async (req, res) => {
  const { username, firstName, lastName, email, phone, password } = req.body;
  try {
    const { error } = clientRegisterValidation(req.body);
    if (error) {
      res.send({ status: "Failed", message: error["details"][0]["message"] });
    } else {
      const createdClient = await createClient({
        username,
        firstName,
        lastName,
        email,
        phone,
        password,
      });
      res.json({
        status: "Success",
        message: "Client created successfully",
        client: createdClient,
      });
    }
  } catch (error) {
    res.json({
      status: "Failed",
      message: error.message,
    });
  }
});

// User Auth
router.post("/auth", async (req, res) => {
  const { email, password } = req.body;
  try {
    const { error } = clientLoginValidation(req.body);
    if (error) {
      res.send({ status: "Failed", message: error["details"][0]["message"] });
    } else {
      const authenticatedClient = await authenticateClient(email, password);
      res.json({
        status: "Success",
        message: "Client Found",
        token: "Bearer " + authenticatedClient.token,
        client: authenticatedClient,
      });
    }
  } catch (error) {
    res.json({
      status: "Failed",
      message: error.message,
    });
  }
});

module.exports = router;
