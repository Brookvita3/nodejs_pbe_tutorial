const data = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const fsPromise = require("fs").promises;
const path = require("path");
const bcrypt = require("bcrypt");

const handleRegister = async (req, res) => {
  const { name, password } = req.body;

  if (!name || !password) {
    return res.status(400).json({ message: "Name and password are required." });
  }

  const duplicate = data.users.find((user) => user.name === name);

  if (duplicate) {
    return res.status(409).json({ message: "User already exists." });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      name: name,
      password: hashedPassword,
    };

    data.setUsers([...data.users, newUser]);
    await fsPromise.writeFile(
      path.join(__dirname, "..", "model", "users.json"),
      JSON.stringify(data.users)
    );
    console.log(data.users);
    res.status(201).json({ "new user": `${newUser} created `});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleRegister };
