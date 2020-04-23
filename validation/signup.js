const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = validateSignup = data =>{

    let errors ={}

   let {user_name,email,password} = data;

   // here we are converting empty filed into string as validator does only work for string

   user_name = !isEmpty(user_name)?user_name :"";
   email = !isEmpty(email)?email : "";
   password = !isEmpty(password)?password:"";

   if(Validator.isEmpty(user_name)){
       errors.user_name = "Enter user name";
   }else if(!Validator.isLength(user_name,{min:6,max:30})){
       error.user_name =" User name should be minimum of 6 character";
   }

   if(Validator.isEmpty(email)){
       errors.email = "Enter Email";
   }else if(Validator.isEmail(email)){
       errors.email = "Enter valid emails";
   }

   if(Validator.isEmpty(password)){
       errors.password = "Enter password";
   }else if (Validator.isLength(password,{min:6,max:20})){
       errors.password ="Password must be atleast 6 character long";
   }

   return   {
    errors,
    isValid:isEmpty(errors)
   };
    
};
