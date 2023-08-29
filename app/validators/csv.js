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
  date_of_birth: Joi.date()
    .iso()
    .max("now")
    .message(
      "Date of birth must be a valid ISO date and cannot be in the future"
    )
    .required(),
});

module.exports = {
  createRecordCsv,
};
