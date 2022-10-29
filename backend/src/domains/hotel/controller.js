const Hotel = require("./model");
const verifyHashedData = require("./../../util/verifyHashedData");
const { ROLES } = require("./../../security/role");
const jwt = require("jsonwebtoken");

const authenticateHotel = async (email, password) => {
  try {
    const fetchedHotel = await Hotel.find({ email });
    if (!fetchedHotel.length) {
      throw Error("Invalid Credentials");
    } else {
      if (!fetchedHotel[0].verified) {
        throw Error("Email Hasent Been Verified, Check Your Inbox");
      } else {
        const hashedPassword = fetchedHotel[0].password;
        const passwordMatch = await verifyHashedData(password, hashedPassword);
        if (passwordMatch === true) {
          //password match
          const token = jwt.sign(
            {
              id: fetchedHotel[0]._id,
              email: fetchedHotel[0].email,
              role: ROLES.HOTEL,
            },
            process.env.SECRET,
            {
              expiresIn: "7d",
            }
          );
          fetchedHotel[0].token = token;
          return fetchedHotel[0];
        } else {
          throw Error("Incorrect credentials match");
        }
      }
    }
  } catch (error) {
    throw error;
  }
};
module.exports = { authenticateHotel };
