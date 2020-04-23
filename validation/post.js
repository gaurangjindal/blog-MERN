const Validator = require('validator');
const isEmpty = require('is-empty');


module.exports = valiadatePost = data =>{
    let errors ={}

    let {title,body} = data;

    title = !isEmpty(title) ? title: "";
    body = !isEmpty(body) ? body : "";

    if(Validator.isEmpty(title)){
        errors.title = " Title cannot be empty";
    }

    if(Validator.isEmpty(body)){
        errors.body = "Body cannot be empty";
    }
    return{
        errors,
            isValid:isEmpty(errors)
    };
    
}