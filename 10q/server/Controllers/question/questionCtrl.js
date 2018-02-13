let questionsList = [];

module.exports = {
  getQuestions: (req, res) => {
    const db = req.app.get("db");
    db
      .get_questions()
      .then(questions => {
        questionsList = questions.data;
        res.status(200).json(console.log("Questions: " + questionsList));
      })
      .catch(err => {
        res.status(500).json(err);
      });
  }
};
