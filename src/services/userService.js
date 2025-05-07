const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../config'); // Asegúrate de tener una clave JWT en tu config

class UserService {
  async register(userData) {
    const { name, email, password } = userData;

    // Validar si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error('El correo ya está registrado');
    }

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    return await newUser.save();
  }

  async login({ email, password }) {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Contraseña incorrecta');
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      config.jwtSecret,
      { expiresIn: '1h' }
    );

    return { token, user: { name: user.name, email: user.email, role: user.role } };
  }

  async getAllUsers() {
    return await User.find();
  }

  async getUserById(id) {
    return await User.findById(id);
  }

  async deleteUser(id) {
    return await User.findByIdAndDelete(id);
  }

  async updateUser(id, updateData) {
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }
    return await User.findByIdAndUpdate(id, updateData, { new: true });
  }
}

module.exports = new UserService();
