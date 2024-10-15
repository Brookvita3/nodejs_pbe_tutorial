const data = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const fsPromise = require("fs").promises;
const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const handleRegister = async (req, res) => {
  const { name, password } = req.body;

  if (!name || !password) {
    return res.status(400).json({ message: "Name and password are required." });
  }

  const foundUser = data.users.find((user) => user.name === name);
  if (!foundUser) {
    return res.status(401).json({ message: "User not Authorization." });
  }
  const match = await bcrypt.compare(password, foundUser.password);
  if (match) {
    //jwt here
    const accessToken = jwt.sign(
      { username: foundUser.name },
      process.env.ACCESS_TOKEN_SECRET,
      {expiresIn: "1m"}
    );
    const refreshToken = jwt.sign(
      { username: foundUser.name },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1d" }
    );
    // saving refresh token for new user
    const otherUser = data.users.filter((user) => user.name !== foundUser.name);
    const currentUser = { ...foundUser, refreshToken };
    data.setUsers([...otherUser, currentUser]);
    await fsPromise.writeFile(
      path.join(__dirname, "..", "model", "users.json"),
      JSON.stringify(data.users)
    );
    res.json({ accessToken });

    res.cookie('jwt', refreshToken, {httpOnly: true, maxAge: 24 * 60 * 60 * 1000})
    
  }

  return res.status(401).json({ message: "wrong password" });
};

module.exports = { handleRegister };
