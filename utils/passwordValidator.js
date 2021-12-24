var passwordValidator = require("password-validator");
var schema = new passwordValidator();
schema
  .is()
  .min(8)
  .has()
  .uppercase() // Must have uppercase letters
  .has()
  .lowercase() // Must have lowercase letters
  .has()
  .digits(1) // Must have at least 1 digits
  .has()
  .not()
  .spaces();
const passwordvalidator = (password) => {
  //console.log(schema.validate(password));
  return schema.validate(password);
};

module.exports = passwordvalidator;
