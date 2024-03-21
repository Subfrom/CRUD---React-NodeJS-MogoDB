const express = require("express");
const router = express.Router();

const { list, updateRole } = require("../Controllers/user");

const { auth, adminCheck } = require("../Middlewares/auth");


router.get("/users", auth, adminCheck, list);
router.post("/updaterole", auth, adminCheck, updateRole);

module.exports = router;
