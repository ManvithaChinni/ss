const { Schedule } = require('../../models');

exports.getSchedules = async (req, res) => {
  const schedules = await Schedule.findAll();
  res.json(schedules);
};
