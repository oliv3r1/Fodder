// userController
const {
  getUser,
  getAllUsers,
  addUser,
  checkUserCredentials,
  getInfo,
} = require("../model/userModel");

const user_list_get = async (req, res, next) => {
  res.json(await getAllUsers(next));
};

const user_get = async (req, res, next) => {
  const user = await getUser(req.params.id, next);
  res.json(user.pop());
};

const user_login = async (req, res) => {
  const { User, Password } = req.body;
  console.log("login data", User, Password);
  if (!User || !Password) {
    return res
      .status(401)
      .json({ message: "Käyttäjätunnus ja salasana ovat pakollisia." });
  }
  const loginSuccess = await checkUserCredentials(User, Password);
  if (loginSuccess) {
    req.session.User = User;
  }
  res.redirect("/");
};

const user_logout = async (req, res) => {
  req.session.destroy();
  res.redirect("/");
};

const user_info = async (req, res) => {
  const user = req.session.User;
  console.log("user getting info", user);
  if (!user) return res.status(404).json({ message: "User not found" });
  const userInfo = await getInfo(user);
  res.json(userInfo);
};

const user_post = async (req, res) => {
  console.log("user_post", req.body);

  // User, Email, Etunimi, Sukunimi, Password
  const data = [
    req.body.User,
    req.body.Email,
    req.body.Etunimi,
    req.body.Sukunimi,
    req.body.Password,
  ];
  //

  const result = await addUser(data);

  res.redirect("/");
};

module.exports = {
  user_list_get,
  user_get,
  user_post,
  user_login,
  user_logout,
  user_info,
};
