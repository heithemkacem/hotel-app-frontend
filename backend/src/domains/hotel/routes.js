//Express Router
const express = require("express");
const router = express.Router();
const { hotelLoginValidation } = require("./../../util/hotelVerification");
const { authenticateHotel } = require("./controller");
//Passport
const passport = require("passport");
const { strategy } = require("./../../security/strategy");
router.use(passport.initialize());
passport.use(strategy);

// Hotel Auth
router.post("/auth", async (req, res) => {
  const { email, password } = req.body;
  try {
    const { error } = hotelLoginValidation(req.body);
    if (error) {
      res.send({ status: "Failed", message: error["details"][0]["message"] });
    } else {
      const authenticatedHotel = await authenticateHotel(email, password);
      res.json({
        status: "Success",
        message: "Hotel Found",
        token: "Bearer " + authenticatedHotel.token,
        client: authenticatedHotel,
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
