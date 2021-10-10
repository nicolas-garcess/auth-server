const Joi = require('joi');

const schemaResearcherSignUp = Joi.object({
  id: Joi.string().min(3).max(15).required(),
  nombre: Joi.string().min(3).max(40).required(),
  idProyecto: Joi.string().min(3).max(20).required(),
  email: Joi.string().min(6).max(30).required()
    .email(),
  usuario: Joi.string().min(6).max(30).required(),
  contrasena: Joi.string().min(6).max(30).required(),
  horasDedicacion: Joi.number().min(8).max(40).required(),
  activo: Joi.boolean().required(),
});

const schemaStudentSignUp = Joi.object({
  id: Joi.string().min(3).max(15).required(),
  nombre: Joi.string().min(3).max(40).required(),
  carrera: Joi.string().min(3).max(30).required(),
  celular: Joi.string().min(10).max(10).required(),
  idProyecto: Joi.string().min(3).max(20).required(),
  email: Joi.string().min(6).max(30).required()
    .email(),
  usuario: Joi.string().min(6).max(30).required(),
  contrasena: Joi.string().min(6).max(30).required(),
  fechaIngreso: Joi.date().required(),
  activo: Joi.boolean().required(),
});

module.exports = {
  schemaResearcherSignUp,
  schemaStudentSignUp,
};
