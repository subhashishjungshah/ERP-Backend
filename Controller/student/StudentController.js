// Retrieve a single student data
const getSingleStudent = async (req, res) => {
  res.status(200).send("Single students Retreived");
};

module.exports = { getSingleStudent };
