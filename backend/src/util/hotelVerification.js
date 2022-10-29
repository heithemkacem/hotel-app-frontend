const joi = require("joi");

const hotelRegisterValidation = (data) => {
  const schemaValidation = joi.object({
    hotelName: joi.string().required().min(4).max(26).messages({
      "string.empty": `common:Enter_a_valid_hotel_name`,
      "string.min": `common:Enter_a_valid_hotel_name_of_min_4_characters`,
      "string.max": `common:Enter_a_valid_hotel_name_of_max_26_characters`,
    }),
    hotelAddress: joi.string().required().min(4).max(26).messages({
      "string.empty": `common:Enter_a_valid_hotel_address`,
      "string.min": `common:Enter_a_valid_hotel_address_of_min_4_characters`,
      "string.max": `common:Enter_a_valid_hotel_address_of_max_26_characters`,
    }),
    hotelCity: joi.string().required().min(4).max(26).messages({
      "string.empty": `common:Enter_a_valid_hotel_city`,
      "string.min": `common:Enter_a_valid_hotel_city_of_min_4_characters`,
      "string.max": `common:Enter_a_valid_hotel_city_of_max_26_characters`,
    }),
    hotelStars: joi.number().required().messages({
      "string.empty": `common:Enter_a_valid_hotel_stars`,
    }),
    hotelRooms: joi.number().required().messages({
      "string.empty": `common:Enter_a_valid_hotel_rooms`,
    }),
    hotelPrice: joi.number().required().messages({
      "string.empty": `common:Enter_a_valid_hotel_price`,
    }),
    hotelDescription: joi.string().required().messages({
      "string.empty": `common:Enter_a_valid_hotel_description`,
    }),
    hotelImage: joi.string().required().messages({
      "string.empty": `common:Enter_a_valid_hotel_image`,
    }),
    email: joi.string().required().email().messages({
      "string.empty": "common:Merci_d_entrer_un_email_valide",
      "string.email": "common:Merci_d_entrer_un_email_valide",
    }),
    password: joi.string().required().min(8).max(26).messages({
      "string.empty": "common:Merci_d_entrer_un_mot_de_passe_valide",
      "string.min": "common:Merci_d_entrer_un_mot_de_passe_de_min_8_caractères",
      "string.max":
        "common:Merci_d_entrer_un_mot_de_passe_de_max_26_caractères",
    }),
    confirmPassword: joi

      .string()
      .required()
      .valid(joi.ref("password"))
      .messages({
        "string.empty": "common:Merci_d_entrer_un_mot_de_passe_valide",
        "any.only": "common:Les_mots_de_passe_ne_correspondent_pas",
      }),
  });
  return schemaValidation.validate(data);
};
const hotelLoginValidation = (data) => {
  const schemaValidation = joi.object({
    email: joi.string().required().email().messages({
      "string.empty": "common:Enter_a_valid_email",
      "string.email": "common:Enter_a_valid_email",
    }),
    password: joi.string().required().min(8).max(26).messages({
      "string.empty": "common:Enter_a_valid_password",
      "string.min": "common:Enter_a_valid_password_of_min_8_characters",
      "string.max": "common:Enter_a_valid_password_of_max_26_characters",
    }),
  });
  return schemaValidation.validate(data);
};

module.exports.hotelRegisterValidation = hotelRegisterValidation;

module.exports.hotelLoginValidation = hotelLoginValidation;
