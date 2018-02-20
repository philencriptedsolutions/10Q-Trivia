module.exports = {
  addUser: (req, res) => {
    const { first_name, last_name, email, img, balance, uid } = req.body;
    const db = req.app.get("db");
    db
      .add_user([first_name, last_name, email, img, balance, uid])
      .then(user => {
        res.status(200).json(user);
      })
      .catch(err => {
        console.log(err)
        res.status(500).json(err)});
  },
  getUser: (req, res) => {
    const { uid } = req.body;
    const db = req.app.get("db");
    db
      .get_user([uid])
      .then(user => {
        res.status(200).json(user);
      })
      .catch(err => res.status(500).json(err));
  },
  updateUser: (req, res) => {
    const { first_name, last_name, img, uid } = req.body;
    const db = req.app.get("db");
    db
      .update_user([first_name, last_name, img, uid])
      .then(user => {
        res.status(200).json(user);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err)});
  }
};
