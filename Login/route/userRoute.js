"use strict";
const express = require("express");
const {
  user_list_get,
  user_get,
  user_login,
  user_post,
  user_logout,
  user_info,
} = require("../controller/userController");
const router = express.Router();

const sessionChecker = (req, res, next) => {
  if (req.session) {
    console.log(req.session);
    console.log(`Found User Session: ${req.session.User}`);
    next();
  } else {
    console.log(`No User Session Found`);
    res.redirect("/login");
    res.status(401).json({ message: "Unauthorized" });
  }
};

router.get("/me", [sessionChecker], user_info);

router.post("/login", user_login);
router.get("/logout", [sessionChecker], user_logout);

router.post("", [sessionChecker], user_post);
router.get("", [sessionChecker], user_list_get);
router.get("/:id", [sessionChecker], user_get);

// router.put('/', (req, res) => {
//   res.send('From this endpoint you can edit users.');
// });

// router.delete('/', (req, res) => {
//   res.send('From this endpoint you can delete users.');
// });

module.exports = router;
