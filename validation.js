const Joi = require('Joi');

const StudentValidation = (data) => {
    const schema = {
        roll_number: Joi.string().min(2).required(),
        first_name: Joi.string().min(3).required(),
        last_name: Joi.string().min(3).required(),
        b_form: Joi.string().min(11),
        class: Joi.string().min(1).required(),
        previous_school: Joi.string(),
        country: Joi.string().min(3).required(),
        city: Joi.string().min(3).required(),
        mohallah: Joi.string().min(3).required(),
        street: Joi.string().min(1).required(),
        house_number: Joi.string().min(1).required(),
        father_name: Joi.string().min(3).required(),
        father_cnic: Joi.string().min(13).max(15).required(),
        phone_number: Joi.string().min(11).required(),
    }
    return Joi.object(schema).validate(data);
}

const TeacherValidation = (data) => {
    const schema = {
        teacher_id: Joi.string().min(2).required(),
        first_name: Joi.string().min(3).required(),
        last_name: Joi.string().min(3).required(),
        email: Joi.string().min(3).required().email(),
        cnic: Joi.string().min(13).max(15).required(),
        phone_number: Joi.string().min(11).required(),
        qualification: Joi.string().min(1).required(),
        experience: Joi.string().min(1).required(),
        country: Joi.string().min(3).required(),
        city: Joi.string().min(3).required(),
        mohallah: Joi.string().min(3).required(),
        street: Joi.string().min(1).required(),
        house_number: Joi.string().min(1).required(),
    }
    return Joi.object(schema).validate(data);
}

module.exports.StudentValidation = StudentValidation;
module.exports.TeacherValidation = TeacherValidation;
