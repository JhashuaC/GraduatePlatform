const sequelize = require('../config/db');
const Career = require('./career.model');
const Graduate = require('./graduate.model');
const Role = require('./role.model');
const User = require('./user.model');
const Category = require('./category.model');
const Course = require('./course.model');
const Speaker = require('./speaker.model');
const Course_Graduate = require('./course_graduate.model');
const Course_Speaker = require('./course_speaker.model');



Role.hasMany(User, { foreignKey: 'id_role' });
User.belongsTo(Role, { foreignKey: 'id_role' });


Career.hasMany(Graduate, { foreignKey: 'id_career' });
Graduate.belongsTo(Career, { foreignKey: 'id_career' });


Category.hasMany(Course, { foreignKey: 'id_category' });
Course.belongsTo(Category, { foreignKey: 'id_category' });

Course.belongsToMany(Graduate, {
  through: Course_Graduate,
  foreignKey: 'course_id',
  otherKey: 'graduate_id'
});
Graduate.belongsToMany(Course, {
  through: Course_Graduate,
  foreignKey: 'graduate_id',
  otherKey: 'course_id'
});


Course.belongsToMany(Speaker, {
  through: Course_Speaker,
  foreignKey: 'course_id',
  otherKey: 'speaker_id'
});
Speaker.belongsToMany(Course, {
  through: Course_Speaker,
  foreignKey: 'speaker_id',
  otherKey: 'course_id'
});


module.exports = {
  sequelize,
  Career,
  Graduate,
  Role,
  User,
  Category,
  Course,
  Speaker,
  Course_Graduate,
  Course_Speaker
};
