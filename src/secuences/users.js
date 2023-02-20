const SecuenceTask = require('./src/SecuenceTask');
const CheckExternalUserAvailableTask = require('./users/CheckExternalUserAvailableTask');
const CreateUserTask = require('./users/CreateUserTask');
const CreateCriptoUserWalletTask = require('./wallet/CreateCriptoUserWalletTask');
const CreateLocalUserWalletTask = require('./wallet/CreateLocalUserWalletTask');
const SetInitialSoftBalanceTask = require('./wallet/SetInitialSoftBalanceTask');
const LoginTask = require('./users/LoginTask');

//create user
const createNewUserSecuence = new SecuenceTask();
createNewUserSecuence.addTask(CheckExternalUserAvailableTask);
createNewUserSecuence.addTask(CreateUserTask);
createNewUserSecuence.addTask(CreateCriptoUserWalletTask);
createNewUserSecuence.addTask(CreateLocalUserWalletTask);
createNewUserSecuence.addTask(SetInitialSoftBalanceTask)
exports.createNewUserSecuence = createNewUserSecuence;

//login user
const loginSecuence = new SecuenceTask();
loginSecuence.addTask(LoginTask);
exports.loginSecuence = loginSecuence;

//edit user