/* eslint-disable no-await-in-loop */
const sha256 = require('sha256');
const { Account, User } = require('../../db/models');
const { adminDeleteOneLine, adminUpdateFile, adminChangeUserData } = require('../function/functionsFS');

/// -------- изменение своего пользователя -------///

const editUser = async (req, res) => {
  let updatedFields = Object.entries(req.body).filter((el) => el[1]);
  if (updatedFields.length) {
    updatedFields = Object.fromEntries(updatedFields);
    if (updatedFields.password) {
      updatedFields = {
        ...updatedFields,
        password: sha256(updatedFields.password),
      };
    }
    try {
      // eslint-disable-next-line max-len
      const [, updatedUser] = await User.update(updatedFields, {
        where: { id: req.session.user.id },
        returning: true,
        plain: true,
        raw: true,
      });
      return res.json(updatedUser);
    } catch (error) {
      return res.sendStatus(500);
    }
  }
  return res.sendStatus(418);
};

/// -------- инфо пользователя, который зашел -------///

const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const currentUser = await User.findByPk(id);
    // const name = currentUser.User.dataValues.userName;
    // console.log('NAMMMMMMEEEEE', name);
    setTimeout(() => {
      res.json(currentUser);
    }, 2e3);
  } catch (error) {
    res.sendStatus(500);
  }
};

/// / ---- изменение аккаунта ---- ///

const editAcc = async (req, res) => {
  let updatedFields = Object.entries(req.body).filter((el) => el[1]);
  if (updatedFields.length) {
    updatedFields = Object.fromEntries(updatedFields);
    if (updatedFields.pass) {
      updatedFields = {
        ...updatedFields,
        pass: updatedFields.pass,
      };
    }
    try {
      // eslint-disable-next-line max-len
      const acc = await Account.findByPk(req.params.id);
      adminChangeUserData(acc.ac_name, updatedFields.ac_name, updatedFields.pass);

      const [, updatedUser] = await Account.update(updatedFields, {
        where: { id: req.params.id },
        returning: true,
        plain: true,
        raw: true,
      });
      return res.json(updatedUser);
    } catch (error) {
      return res.sendStatus(500);
    }
  }
  return res.sendStatus(418);
};

/// -------- все аккаунты одного пользователя -------///

const getAllAcc = async (req, res) => {
  const { id } = req.session.user;
  try {
    const allAccounts = await Account.findAll({ where: { user_id: id } });
    return res.json(allAccounts);
  } catch (error) {
    return res.sendStatus(500);
  }
};

/// -------- вывод одного аккаунта -------///

const getAccOne = async (req, res) => {
  const { id } = req.params;
  try {
    const currentAcc = await Account.findByPk(id);
    res.json(currentAcc);
  } catch (error) {
    res.sendStatus(500);
  }
};

/// ------- создание аккаунта ------///

const createAcc = async (req, res) => {
  const { id } = await req.session.user;
  try {
    const { acname, pass } = await req.body;
    const newAcc = await Account.create({
      ac_name: acname, pass, user_id: id, status: true,
    });
    adminUpdateFile(newAcc.ac_name, newAcc.pass);
    return res.json(newAcc);
  } catch (error) {
    return res.sendStatus(500);
  }
};

/// -----------удаление аккаунта -------///

const deleteAcc = async (req, res) => {
  const { id } = req.params;
  try {
    const acc = await Account.findByPk(id);
    adminDeleteOneLine(acc.ac_name);
    await Account.destroy({ where: { id } });
    return res.sendStatus(200);
  } catch (error) {
    return res.sendStatus(500);
  }
};

/// ----------чисто админ -----------///

/// ----- все пользователи ------///

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.findAll();
    return res.json(allUsers);
  } catch (error) {
    return res.sendStatus(500);
  }
};

/// --------изменение пользователей-------////

const adminEditUser = async (req, res) => {
  let updatedFields = Object.entries(req.body).filter((el) => el[1]);
  if (updatedFields.length) {
    updatedFields = Object.fromEntries(updatedFields);
    if (updatedFields.password) {
      updatedFields = {
        ...updatedFields,
        password: sha256(updatedFields.password),
      };
    }
    try {
      // eslint-disable-next-line max-len
      const [, updatedUser] = await User.update(updatedFields, {
        where: { id: req.params.id },
        returning: true,
        plain: true,
        raw: true,
      });
      return res.json(updatedUser);
    } catch (error) {
      return res.sendStatus(500);
    }
  }
  return res.sendStatus(418);
};

/// -----------удаление пользователя -------///

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const accs = await Account.findAll({ where: { user_id: req.params.id }, raw:true })
    if (accs.length !== 0) {
      for (let i = 0; i < accs.length; i = i + 1) {
        await adminDeleteOneLine(accs[i].ac_name);
      }
      await Account.destroy({where: {user_id: id}})
    }
    await User.destroy({ where: { id } });
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

/// -----------все аккаунты всех юзеров -------///

const getAllAccAdm = async (req, res) => {
  const { id } = req.params;
  try {
    const allAccounts = await Account.findAll({ where: { user_id: id } });
    return res.json(allAccounts);
  } catch (error) {
    return res.sendStatus(500);
  }
};

/// / ------------ FS -------------///

/// --------------блокировка юзера и всех его аккаунтов ------///

const blockUser = async (req, res) => {
  const { status } = req.body;
  const accs = await Account.findAll({ where: { user_id: req.params.id }, raw: true });
  try {
    if (!status) {
      try {
        await User.update(req.body, {
          where: { id: req.params.id },
          returning: true,
          plain: true,
          raw: true,
        });
      } catch (error) {
        console.error('false user --->',error);
      }
      try {
        if ( accs.length !== 0) {
          await Account.update(req.body, {
            where: { user_id: req.params.id },
            returning: true,
            plain: true,
            raw: true,
          });
          for (let i = 0; i < accs.length; i = i + 1) {
            await adminDeleteOneLine(accs[i].ac_name);
          }
        }
      } catch (error) {
        console.error('false fs&accs --->',error);
      }
      return res.json(req.body);
    }
    try {
      await User.update(req.body, {
        where: { id: req.params.id },
        returning: true,
        plain: true,
        raw: true,
      });
    } catch (error) {
      console.error('true user --->',error);
    }
    try {
      if (accs.length !== 0) {
        await Account.update(req.body, {
          where: { user_id: req.params.id },
          returning: true,
          plain: true,
          raw: true,
        });
        for (let i = 0; i < accs.length; i = i + 1) {
          await adminUpdateFile(accs[i].ac_name, accs[i].pass);
        }
      }
    } catch (error) {
      console.error('true fs&accs --->',error);
    }
    return res.json(req.body);
  } catch (error) {
    return res.sendStatus(400);
  }
};

const blockAcc = async(req, res) => {
  const { status } = req.body;
  const acc = await Account.findOne({ where: { id: req.params.id }, raw: true });
  try {
    if (!status) {
      await Account.update(req.body, {
        where: { id: req.params.id },
        returning: true,
        plain: true,
        raw: true,
      });
      await adminDeleteOneLine(acc.ac_name)
      return res.json(req.body)
    }
    await Account.update(req.body, {
      where: { id: req.params.id },
      returning: true,
      plain: true,
      raw: true,
    });
    await adminUpdateFile(acc.ac_name, acc.pass)
    return res.json(req.body)
  } catch (error) {
    console.error('blockAcc ----->', error);
  }
}

/// -------------разблокировка юзера и добавление новых  ------///
// надо спросить
// const addNewUser = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const curUser = await User.findByPk(id);
//     const name = curUser.dataValues.userName;
//     adminUpdateFile(name, pass);
//     return res.sendStatus(200);
//   } catch (error) {
//     return res.sendStatus(400);
//   }
// };

module.exports = {
  editUser, //
  editAcc, //
  getUser, //
  getAllUsers, //
  getAllAcc, //
  createAcc, //
  deleteAcc, //
  deleteUser, //
  getAllAccAdm, //
  adminEditUser, //
  getAccOne, //
  blockUser, //
  blockAcc, //
  // addNewUser, //
};
