const { Router } = require('express');
const usersController = require('../controllers/lk.controller');
const checkAuth = require('../middlewares/checkAuth');
const checkAuthor = require('../middlewares/checkAuthor');

const lkRouter = Router();

/// ----- пользователи-------///

lkRouter.route('/allusers')
  .get(checkAuth, usersController.getAllUsers);// админ

lkRouter.route('/allusers/:id')
  .patch(checkAuth, usersController.adminEditUser);

lkRouter.route('/user/:id')
  .patch(checkAuth, checkAuthor, usersController.editUser)
  .get(checkAuth, usersController.getUser)
  .delete(checkAuth, usersController.deleteUser);
lkRouter.patch('/blockuser/:id', checkAuth, usersController.blockUser); /// не уверена насчет patch (всё верно, патч)

/// / ---- аккаунты ---///

lkRouter.post('/newacc', checkAuth, usersController.createAcc);
lkRouter.get('/myaccs', usersController.getAllAcc);
lkRouter.delete('/accs/:id', checkAuth, usersController.deleteAcc);
lkRouter.patch('/accs/:id', checkAuth, usersController.editAcc);
lkRouter.get('/allaccs/:id', checkAuth, usersController.getAllAccAdm);
lkRouter.get('/oneacc/:id', checkAuth, usersController.getAccOne);
lkRouter.patch('/oneacc/:id', checkAuth, usersController.blockAcc)

module.exports = lkRouter;
