const Client = require("./model");
const hashData = require("./../../util/hashData");
const verifyHashedData = require("./../../util/verifyHashedData");
const { ROLES } = require("./../../security/role");
const jwt = require("jsonwebtoken");

const createClient = async (data) => {
  try {
    const { username, firstName, lastName, email, phone, password } = data;

    const existingClient = await Client.find({ email });
    if (existingClient.length) {
      //A user aleady exist
      throw Error("Client aleardy exist");
    } else {
      //User doesn't exist so we can save him as a new user
      //Hashing Password
      const hashedPassword = await hashData(password);
      const newClient = new Client({
        username,
        firstName,
        lastName,
        email,
        phone,
        password: hashedPassword,
        verified: false,
        role: ROLES.CLIENT,
      });
      //Save the organization
      const createdClient = await newClient.save();
      return createdClient;
    }
  } catch (error) {
    throw error;
  }
};

const authenticateClient = async (email, password) => {
  try {
    const fetchedClient = await Client.find({ email });
    if (!fetchedClient.length) {
      throw Error("Invalid Credentials");
    } else {
      if (!fetchedClient[0].verified) {
        throw Error("Email Hasent Been Verified, Check Your Inbox");
      } else {
        const hashedPassword = fetchedClient[0].password;
        const passwordMatch = await verifyHashedData(password, hashedPassword);
        if (passwordMatch === true) {
          //password match
          const token = jwt.sign(
            {
              id: fetchedClient[0]._id,
              email: fetchedClient[0].email,
              role: ROLES.CLIENT,
            },
            process.env.SECRET,
            {
              expiresIn: "7d",
            }
          );
          fetchedClient[0].token = token;
          return fetchedClient[0];
        } else {
          throw Error("Incorrect credentials match");
        }
      }
    }
  } catch (error) {
    throw error;
  }
};
module.exports = { authenticateClient, createClient };
