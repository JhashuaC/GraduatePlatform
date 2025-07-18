const User = require('./user.model');
const Role = require('./roles.model');
const Career = require('./career.model');
const Graduate = require('./graduate.model');
const Speaker = require('./speaker.model');
const Course = require('./course.model');
const CareerCourse = require('./career_course.model');
const CourseGraduate = require('./course_graduate.model');
const PreferenceOption = require('./preference_options.model');
const CourseCategory = require('./course_categories.model');
const GraduatePreference = require('./graduate_preferences.model');
const EmailHistory = require('./email_history.model');
const EmailRecipient = require('./email_recipients.model');
const SurveyQuestion = require('./survey_questions.model');
const SurveyResponse = require('./survey_responses.model');

User.belongsTo(Role, { foreignKey: 'id_role' });
Role.hasMany(User, { foreignKey: 'id_role' });

Graduate.belongsTo(User, { foreignKey: 'id_graduate', onDelete: 'CASCADE' });
User.hasOne(Graduate, { foreignKey: 'id_graduate', onDelete: 'CASCADE' });

Speaker.belongsTo(User, { foreignKey: 'id_speaker', onDelete: 'CASCADE' });
User.hasOne(Speaker, { foreignKey: 'id_speaker', onDelete: 'CASCADE' });

Graduate.belongsTo(Career, { foreignKey: 'id_career' });
Career.hasMany(Graduate, { foreignKey: 'id_career' });

Course.belongsTo(Speaker, { foreignKey: 'id_speaker' });
Speaker.hasMany(Course, { foreignKey: 'id_speaker' });

CourseGraduate.belongsTo(Course, { foreignKey: 'id_course', onDelete: 'CASCADE' });
CourseGraduate.belongsTo(Graduate, { foreignKey: 'id_graduate', onDelete: 'CASCADE' });


Career.belongsToMany(Course, {
    through: CareerCourse,
    foreignKey: 'id_career',
});
Course.belongsToMany(Career, {
    through: CareerCourse,
    foreignKey: 'id_course',
});


Course.belongsToMany(Graduate, {
    through: CourseGraduate,
    foreignKey: 'id_course',
});
Graduate.belongsToMany(Course, {
    through: CourseGraduate,
    foreignKey: 'id_graduate',
});


Course.belongsToMany(PreferenceOption, {
    through: CourseCategory,
    foreignKey: 'id_course',
});
PreferenceOption.belongsToMany(Course, {
    through: CourseCategory,
    foreignKey: 'id_option',
});


GraduatePreference.belongsTo(Graduate, { foreignKey: 'id_graduate', onDelete: 'CASCADE' });
GraduatePreference.belongsTo(PreferenceOption, { foreignKey: 'id_option', onDelete: 'CASCADE' });

Graduate.belongsToMany(PreferenceOption, {
    through: GraduatePreference,
    foreignKey: 'id_graduate',
});
PreferenceOption.belongsToMany(Graduate, {
    through: GraduatePreference,
    foreignKey: 'id_option',
});


EmailHistory.belongsTo(User, { foreignKey: 'id_admin', onDelete: 'CASCADE' });
User.hasMany(EmailHistory, { foreignKey: 'id_admin' });


EmailHistory.belongsToMany(Graduate, {
    through: EmailRecipient,
    foreignKey: 'id_email',
});
Graduate.belongsToMany(EmailHistory, {
    through: EmailRecipient,
    foreignKey: 'id_graduate',
});

EmailRecipient.belongsTo(EmailHistory, { foreignKey: 'id_email', onDelete: 'CASCADE' });
EmailRecipient.belongsTo(Graduate, { foreignKey: 'id_graduate', onDelete: 'CASCADE' });


SurveyResponse.belongsTo(Graduate, { foreignKey: 'id_graduate', onDelete: 'CASCADE' });
Graduate.hasMany(SurveyResponse, { foreignKey: 'id_graduate' });

SurveyResponse.belongsTo(Course, { foreignKey: 'id_course', onDelete: 'CASCADE' });
Course.hasMany(SurveyResponse, { foreignKey: 'id_course' });

SurveyResponse.belongsTo(SurveyQuestion, { foreignKey: 'id_question', onDelete: 'CASCADE' });
SurveyQuestion.hasMany(SurveyResponse, { foreignKey: 'id_question' });


module.exports = {
    User,
    Role,
    Career,
    Graduate,
    Speaker,
    Course,
    CareerCourse,
    CourseGraduate,
    PreferenceOption,
    CourseCategory,
    GraduatePreference,
    EmailHistory,
    EmailRecipient,
    SurveyQuestion,
    SurveyResponse,
};