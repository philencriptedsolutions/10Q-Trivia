module.exports = {
  getQuestions: (req, res) => {
    const db = req.app.get("db");
    db
      .get_questions()
      .then(questions => {
        res.status(200).json(questions);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  }
};
