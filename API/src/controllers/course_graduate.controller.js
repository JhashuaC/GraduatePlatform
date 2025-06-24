const { CourseGraduate, Course, Graduate, User } = require('../models');


const getAllCourseGraduates = async (req, res) => {
  try {
    const data = await CourseGraduate.findAll({
      include: [{
        model: Course,
      },
      {
        model: Graduate,
        include: [{
          model: User,
          attributes: ['first_name', 'last_name1', 'last_name2', 'identity_number', 'email',] // puedes ajustar los campos que necesites
        }]
      }
      ]
    });
    res.json(data);
  } catch (err) {
    console.error('Error al obtener asignaciones de cursos a graduados:', err);
    res.status(500).json({ message: 'Error al obtener asignaciones de cursos a graduados' });
  }
}


  const getAllCourseGraduatesById = async (req, res) => {
    const { id_graduate } = req.params;
    try {
      const data = await CourseGraduate.findAll({
        where: { id_graduate },
        include: [Course, Graduate],
      });
      if (!data) return res.status(404).json({ message: 'Relación no encontrada' });
      res.json(data);
    } catch (err) {
      res.status(500).json({ message: 'Error al buscar la relación' });
    }
  };


  const getCourseGraduate = async (req, res) => {
    const { id_course, id_graduate } = req.params;
    try {
      const data = await CourseGraduate.findOne({
        where: { id_course, id_graduate },
        include: [Course, Graduate],
      });
      if (!data) return res.status(404).json({ message: 'Relación no encontrada' });
      res.json(data);
    } catch (err) {
      res.status(500).json({ message: 'Error al buscar la relación' });
    }
  };

  const assignGraduateToCourse = async (req, res) => {
    const { id_course, id_graduate, completado, fecha_completado } = req.body;
    try {
      const created = await CourseGraduate.create({
        id_course,
        id_graduate,
        completado,
        fecha_completado,
      });
      res.status(201).json(created);
    } catch (err) {
      res.status(500).json({ message: 'Error al asignar graduado al curso' });
    }
  };

 const updateCompletionStatus = async (req, res) => {
  const { id_course, id_graduate } = req.params;
  try {
    const entry = await CourseGraduate.findOne({ where: { id_course, id_graduate } });
    if (!entry) return res.status(404).json({ message: 'Relación no encontrada' });

    entry.completado = true;
    entry.fecha_completado = new Date();
    await entry.save();

    res.json({ message: 'Estado actualizado', entry });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al actualizar la relación' });
  }
};


  const removeGraduateFromCourse = async (req, res) => {
    const { id_course, id_graduate } = req.params;
    try {
      const deleted = await CourseGraduate.destroy({ where: { id_course, id_graduate } });
      if (!deleted) return res.status(404).json({ message: 'Relación no encontrada' });
      res.json({ message: 'Relación eliminada correctamente' });
    } catch (err) {
      res.status(500).json({ message: 'Error al eliminar relación' });
    }
  };

  module.exports = {
    getAllCourseGraduates,
    getCourseGraduate,
    assignGraduateToCourse,
    updateCompletionStatus,
    removeGraduateFromCourse,
    getAllCourseGraduatesById
  }