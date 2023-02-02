const getAllStudents = async (req, res) => {
  res.status(200).send("All students Retreived");
};
const getSingleStudent = async (req, res) => {
  res.status(200).send("Single students Retreived");
};
const addNewStudent = async (req, res) => {
  res.status(200).send("New Student Added");
};
const updateStudent = async (req, res) => {
  res.status(200).send("Student was updated");
};

const deleteStudent = async (req, res) => {
  res.status(200).send("Student was deleted");
};

module.exports = { getAllStudents, addNewStudent, getSingleStudent };
