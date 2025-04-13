const express = require('express');
const router = express.Router();

let user = null;

router.post('/', (req, res) => {
  const { studentId, email, password } = req.body;
  user = { studentId, email, password };

  res.json({ success: true, message: 'Login successful' });
});

module.exports = router;
module.exports.getUser = () => user;
