const Joi = require('Joi');

const StudentValidation = (data) => {
    const schema = {
        roll_number: Joi.string().min(2).required(),
        first_name: Joi.string().min(3).required(),
        last_name: Joi.string().min(3).required(),
        b_form: Joi.string().min(13),
        class: Joi.string().min(1).required(),
        previous_school: Joi.string(),
        country: Joi.string().min(3).required(),
        city: Joi.string().min(3).required(),
        mohallah: Joi.string().min(3).required(),
        street: Joi.string().min(1).required(),
        house_number: Joi.string().min(1).required(),
        father_name: Joi.string().min(3).required(),
        father_cnic: Joi.string().min(13).required(),
        phone_number: Joi.string().min(11).max(13).required(),
    }
    return Joi.object(schema).validate(data);
}

const TeacherValidation = (data) => {
    const schema = {
        teacher_id: Joi.string().min(2).required(),
        first_name: Joi.string().min(3).required(),
        last_name: Joi.string().min(3).required(),
        email: Joi.string().min(3).required().email(),
        cnic: Joi.string().min(13).required(),
        phone_number: Joi.string().min(11).max(13).required(),
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

const FeeValidation = (data) => {
    const schema = {
        roll_number: Joi.string().min(2).required(),
        computer_number: Joi.string().min(2).required(),
        name: Joi.string().min(2).required(),
        class: Joi.string().min(1).required(),
        month: Joi.string().min(1).required(),
        amount: Joi.number().min(1).required(),
        remaining_amount: Joi.number().min(0).required(),
        status: Joi.string().min(4).max(6).required(),
    }
    return Joi.object(schema).validate(data);
}

module.exports.StudentValidation = StudentValidation;
module.exports.TeacherValidation = TeacherValidation;
module.exports.FeeValidation = FeeValidation;
