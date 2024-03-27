const express = require("express");
const router = express.Router();

const { list, updateRole, updateprofile } = require("../Controllers/user");

const { auth, adminCheck } = require("../Middlewares/auth");


router.get("/users", auth, adminCheck, list);
router.post("/updaterole", auth, adminCheck, updateRole);
router.post("/updateprofile", auth, updateprofile);

module.exports = router;
