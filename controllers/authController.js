const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const pool = require('../config/dbConfig');

// Register User
exports.registerUser = async (req, res) => {
  const { username, password, email } = req.body;

  try {
    // Check if username or email already exists
    const existingUser = await pool.query(
      'SELECT * FROM users WHERE username = $1 OR email = $2',
      [username, email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: 'Username or email already exists.' });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert new user into the database
    const newUser = await pool.query(
      'INSERT INTO users (username, email, hashed_password) VALUES ($1, $2, $3) RETURNING id',
      [username, email, hashedPassword]
    );

    // Generate a JWT token
    const token = jwt.sign({ userId: newUser.rows[0].id }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '1h',
    });

    res.json({ token });
  } catch (error) {
    console.error('Error occurred during registration:', error);
    res.status(500).json({ error: 'An error occurred during registration.' });
  }
};

// Login User
exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

    if (user.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid username or password.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.rows[0].hashed_password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid username or password.' });
    }

    const token = jwt.sign({ userId: user.rows[0].id }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '1h',
    });

    res.json({ token });
  } catch (error) {
    console.error('Error occurred during login:', error);
    res.status(500).json({ error: 'An error occurred during login.' });
  }
};

// Forgot Password
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required.' });
  }

  try {
    // Check if user exists
    const userResult = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
    if (userResult.rowCount === 0) {
      return res.status(404).json({ error: 'User not found.' });
    }

    const userId = userResult.rows[0].id;

    // Generate a reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpires = new Date(Date.now() + 1 * 60 * 60 * 1000); // 1 hour

    // Update the database with the reset token
    await pool.query(
      'UPDATE users SET reset_token = $1, reset_token_expires = $2 WHERE id = $3',
      [resetToken, resetTokenExpires, userId]
    );

    // Send email with reset link
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD,
      },
    });

    const resetUrl = `http://localhost:3001/auth/reset-password?token=${resetToken}`;
    await transporter.sendMail({
      to: email,
      subject: 'Password Reset Request',
      text: `You can reset your password using the following link: ${resetUrl}`,
    });

    res.json({ message: 'Password reset link sent to your email.' });
  } catch (error) {
    console.error('Error occurred during forgot password:', error);
    res.status(500).json({ error: 'Something went wrong.' });
  }
};

// Reset Password
exports.resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  if (!token || !newPassword) {
    return res.status(400).json({ error: 'Token and new password are required.' });
  }

  try {
    // Validate reset token
    const userResult = await pool.query(
      'SELECT id FROM users WHERE reset_token = $1 AND reset_token_expires > $2',
      [token, new Date()]
    );

    if (userResult.rowCount === 0) {
      return res.status(400).json({ error: 'Invalid or expired token.' });
    }

    const userId = userResult.rows[0].id;

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the password and clear reset token
    await pool.query(
      'UPDATE users SET hashed_password = $1, reset_token = NULL, reset_token_expires = NULL WHERE id = $2',
      [hashedPassword, userId]
    );

    res.json({ message: 'Password reset successful.' });
  } catch (error) {
    console.error('Error occurred during reset password:', error);
    res.status(500).json({ error: 'Something went wrong.' });
  }
};

// // Get all posts
// exports.getPosts = async (req, res) => {
//   try {
//     const result = await pool.query('SELECT * FROM posts ORDER BY created_at DESC');
//     res.json(result.rows);
//   } catch (error) {
//     console.error('Error fetching posts:', error);
//     res.status(500).json({ error: 'An error occurred while fetching posts.' });
//   }
// };
