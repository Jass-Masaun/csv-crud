const Joi = require("joi");

const createRecordCsv = Joi.object({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  age: Joi.string().required(),
  date_of_birth: Joi.string()
    .pattern(/^([0-2][0-9]|3[0-1])-(0[1-9]|1[0-2])-\d{4}$/)
    .message("Date of birth must be in the format DD-MM-YYYY")
    .required(),
});

module.exports = {
  createRecordCsv,
};
