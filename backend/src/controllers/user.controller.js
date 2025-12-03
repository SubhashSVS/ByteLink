const userService = require("../services/user.service");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const result = await userService.register(name, email, password);

    res.json({ success: true, user: result });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await userService.login(email, password);

    res.json({ success: true, ...result });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
}

module.exports = { register, login };