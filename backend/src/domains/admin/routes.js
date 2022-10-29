//Express Router
const express = require("express");
const router = express.Router();
const {
  adminRegisterValidation,
  adminLoginValidation,
} = require("./../../util/adminVerification");
const { createAdmin, authenticateAdmin } = require("./controller");
//Passport
const passport = require("passport");
const { strategy } = require("./../../security/strategy");
router.use(passport.initialize());
passport.use(strategy);

// Admin Inscription
router.post("/signup", async (req, res) => {
  const { username, firstName, lastName, email, password } = req.body;
  try {
    const { error } = adminRegisterValidation(req.body);
    if (error) {
      res.send({ status: "Failed", message: error["details"][0]["message"] });
    } else {
      const createdAdmin = await createAdmin({
        username,
        firstName,
        lastName,
        email,
        password,
      });
      res.json({
        status: "Success",
        message: "Admin created successfully",
        admin: createdAdmin,
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
    const { error } = adminLoginValidation(req.body);
    if (error) {
      res.send({ status: "Failed", message: error["details"][0]["message"] });
    } else {
      const authenticatedAdmin = await authenticateAdmin(email, password);
      res.json({
        status: "Success",
        message: "utilisateur trouvé",
        token: "Bearer " + authenticatedAdmin.token,
        admin: authenticatedAdmin,
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
