const Admin = require("./model");
const Hotel = require("./../hotel/model");
const hashData = require("./../../util/hashData");
const verifyHashedData = require("./../../util/verifyHashedData");
const { ROLES } = require("./../../security/role");
const jwt = require("jsonwebtoken");

const createAdmin = async (data) => {
  try {
    const { username, firstName, lastName, email, password } = data;

    const existingAdmin = await Admin.find({ email });
    if (existingAdmin.length) {
      //A user aleady exist
      throw Error("Admin aleardy exist");
    } else {
      //User doesn't exist so we can save him as a new user
      //Hashing Password
      const hashedPassword = await hashData(password);
      const newAdmin = new Admin({
        username,
        firstName,
        lastName,
        email,
        password: hashedPassword,
        verified: false,
        role: ROLES.ADMIN,
      });
      //Save the organization
      const createdAdmin = await newAdmin.save();
      return createdAdmin;
    }
  } catch (error) {
    throw error;
  }
};

const authenticateAdmin = async (email, password) => {
  try {
    const fetchedAdmin = await Admin.find({ email });
    if (!fetchedAdmin.length) {
      throw Error("Invalid Credentials");
    } else {
      if (!fetchedAdmin[0].verified) {
        throw Error("Email Hasent Been Verified, Check Your Inbox");
      } else {
        const hashedPassword = fetchedAdmin[0].password;
        const passwordMatch = await verifyHashedData(password, hashedPassword);
        if (passwordMatch === true) {
          //password match
          const token = jwt.sign(
            {
              id: fetchedAdmin[0]._id,
              email: fetchedAdmin[0].email,
              role: ROLES.ADMIN,
            },
            process.env.SECRET,
            {
              expiresIn: "7d",
            }
          );
          fetchedAdmin[0].token = token;
          return fetchedAdmin[0];
        } else {
          throw Error("Incorrect credentials match");
        }
      }
    }
  } catch (error) {
    throw error;
  }
};

//Admin Create Hotel
const createHotel = async (data) => {
  try {
    const {
      hotelName,
      hotelAddress,
      hotelCity,
      hotelStars,
      hotelRooms,
      hotelPrice,
      hotelDescription,
      hotelImage,
      hotelPhone,
      hotelEmail,
      password,
    } = data;
    const existingHotel = await Hotel.find({ hotelEmail });
    if (existingHotel.length) {
      //A user aleady exist
      throw Error("Hotel email aleardy exist");
    } else {
      //Hotel doesn't exist so we can save him as a new user
      //Hashing Password
      const hashedPassword = await hashData(password);
      const newHotel = new Hotel({
        hotelName,
        hotelAddress,
        hotelCity,
        hotelStars,
        hotelRooms,
        hotelPrice,
        hotelDescription,
        hotelImage,
        hotelPhone,
        hotelEmail,
        password: hashedPassword,
        verified: false,
        role: ROLES.HOTEL,
      });
      //Save the organization
      const createdHotel = await newHotel.save();
      return createdHotel;
    }
  } catch (error) {
    throw error;
  }
};

//Admin delete Hotel by id
const deleteHotel = async (id) => {
  try {
    const deletedHotel = await Hotel.findByIdAndDelete(id);
    return deletedHotel;
  } catch (error) {
    throw error;
  }
};
//Admin update Hotel by id
const updateHotel = async (id, data) => {
  try {
    //find the hotel by id
    const hotel = await Hotel.findById(id);
    if (!hotel) {
      throw Error("Hotel not found");
    }
    //update the hotel
    const updatedHotel = await Hotel.findByIdAndUpdate(id, data, {
      new: true,
    });
    return updatedHotel;
  } catch (error) {
    throw error;
  }
};

//Admin get all hotels
const getAllHotels = async () => {
  try {
    const allHotels = await Hotel.find();
    return allHotels;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  authenticateAdmin,
  createAdmin,
  createHotel,
  getAllHotels,
  updateHotel,
  deleteHotel,
};
