/* eslint-disable camelcase */
const sha256 = require('sha256');
const jwt_decode = require('jwt-decode');
const { User } = require('../../db/models');
const { adminUpdateFile } = require('../function/functionsFS');

const signUp = async (req, res) => {
  const { userName, password, email } = req.body;

  if (userName && password && email) {
    try {
      const newUser = await User.create({
        userName,
        password: sha256(password),
        email,
        status: false,
      });
      req.session.user = {
        id: newUser.id,
        name: newUser.name,
      };

      return res.json({ id: newUser.id, name: newUser.userName });
    } catch (error) {
      console.error(error);
      return res.sendStatus(500);
    }
  }

  return res.sendStatus(400);
};

const signIn = async (req, res) => {
  const { password, email } = req.body;

  if (password && email) {
    try {
      const currentUser = await User.findOne({ where: { email } });
      if (currentUser && currentUser.password === sha256(password)) {
        req.session.user = {
          id: currentUser.id,
          name: currentUser.userName,
        };

        return res.json({
          id: currentUser.id,
          userName: currentUser.userName,
          status: currentUser.status,
          adm: currentUser.adm,
          email: currentUser.email,
        });
      }
      return res.sendStatus(401);
    } catch (error) {
      console.error(error);
      return res.sendStatus(500);
    }
  }

  return res.sendStatus(400);
};

const signOut = async (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      console.error(error);
      return res.sendStatus(500);
    }

    res.clearCookie(req.app.get('cookieName'));

    return res.sendStatus(200);
  });
};

const checkAuth = async (req, res) => {
  try {
    const user = await User.findByPk(req.session.user.id);
    return res.json({
      id: user.id, userName: user.userName, email: user.email, status: user.status, adm: user.adm,
    });
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
};

const googleUser = async (req, res) => {
  try {
    const { data } = req.body;
    const userObject = jwt_decode(data.credential);
    const { name, email, sub } = userObject;
    const currentUser = await User.findOne({ where: { email } });
    if (!currentUser) {
      if (name && sub && email) {
        try {
          const newUser = await User.create({
            userName: name,
            password: sha256(sub),
            email,
          });
          req.session.user = {
            id: newUser.id,
            name: newUser.name,
          };
          return res.json({ id: newUser.id, name: newUser.userName });
        } catch (error) {
          console.error(error);
          return res.sendStatus(500);
        }
      }
      return res.sendStatus(400);
    }
    if (sub && email) {
      try {
        if (currentUser && currentUser.password === sha256(sub)) {
          req.session.user = {
            id: currentUser.id,
            name: currentUser.userName,
          };

          return res.json({
            id: currentUser.id,
            userName: currentUser.userName,
            status: currentUser.status,
            adm: currentUser.adm,
            email: currentUser.email,
          });
        }
        return res.sendStatus(401);
      } catch (error) {
        console.error(error);
        return res.sendStatus(500);
      }
    }
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
  return res.sendStatus(200);
};

module.exports = {
  signIn,
  signOut,
  signUp,
  checkAuth,
  googleUser,
};
