import models from "../models/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getUsers = async (req, res) => {
  try {
    const users = await models.User.findAll({ attributes: ["id", "name", "email"] }); // findAll itu pengganti SELECT * FROM Users
    res.json(users);
  } catch (error) {
    console.log(error);
  }
};

export const Register = async (req, res) => {
  const { name, email, password, confPassword } = req.body; 

  // Periksa apakah nama sudah digunakan
  const userByName = await models.User.findOne({ name: name });
  if (userByName) return res.status(400).json({ msg: "Nama sudah terdaftar" });

  // Periksa apakah email sudah digunakan
  const userByEmail = await models.User.findOne({ email: email });
  if (userByEmail) return res.status(400).json({ msg: "Email sudah terdaftar" });
  if (password !== confPassword) {
    return res
      .status(400)
      .json({ msg: "Password and confirm password tidak sama" });
  }
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);
  try {
    await models.User.create({
      name: name,
      email: email,
      password: hashPassword,
    });
    res.json({ msg: "Register berhasil" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ 
            msg: "Gagal register karena kesalahan server.", 
            error: error.message 
        });
  }
};

export const Login = async (req, res) => {
  try {
    const user = await models.User.findAll({
      where: {
        email: req.body.email,
      },
    });
    if (!user[0]) {
      return res.json({ msg: "email tidak valid" });
    }
    const match = await bcrypt.compare(req.body.password, user[0].password);
    if (!match) {
      return res.status(400).json({ msg: "password salah" });
    }

    const userId = user[0].id;
    const name = user[0].name;
    const email = user[0].email;
    const accessToken = jwt.sign(
      { userId, name, email },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "10m",
      }
    );
    const refreshToken = jwt.sign(
      { userId, name, email },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );

    const isProduction = process.env.NODE_ENV === "production";

    await models.User.update(
      { refresh_token: refreshToken },
      {
        where: {
          id: userId,
        },
      }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      secure: isProduction,
      sameSite: isProduction ? 'None' : 'Lax'
    });
    res.json({ accessToken });
  } catch (error) {
    console.log(error); // Log error untuk debugging
    res.status(500).json({ msg: "Terjadi kesalahan server" });
  }
};

export const Logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(204);
  const user = await models.User.findAll({
    where: {
      refresh_token: refreshToken,
    },
  });
  if (!user[0]) return res.sendStatus(204);
  const userId = user[0].id;
  await models.User.update(
    { refresh_token: null },
    {
      where: {
        id: userId,
      },
    }
  );
  res.clearCookie(refreshToken);
  res.sendStatus(200);
};
