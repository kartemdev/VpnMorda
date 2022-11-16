
require('dotenv').config();
const fs = require('fs').promises;

const path = process.env.PATH_PPP;

// read file for admin
const adminReadFile = async () => {
  await fs.readFile(path, 'utf8');
};

// update file for admin
const adminUpdateFile = async (name, password) => {
  await fs.appendFile(path, `"${name}" l2tpd "${password}" *\n`);
};

// delete one line
const adminDeleteOneLine = async (name) => {
  const data = await fs.readFile(path, 'utf8');
  const arr = data.split('\n').filter((el) => !el.includes(name)).join('\n');
  await fs.writeFile(path, arr);
};

// change users name and password
const adminChangeUserData = async (name, newName, newPassword) => {
  const data = await fs.readFile(path, 'utf8');
  const arr = data.split('\n').map((el) => (el.includes(name) ? `"${newName}" l2tpd "${newPassword}" *` : el)).join('\n');
  await fs.writeFile(path, arr);
};

module.exports = {
  adminReadFile,
  adminUpdateFile,
  adminDeleteOneLine,
  adminChangeUserData,
};
