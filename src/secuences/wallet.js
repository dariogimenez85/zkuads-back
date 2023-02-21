const SecuenceTask = require("./src/SecuenceTask");
const CreateAndRunTransaction = require("./wallet/CreateAndRunTransaction");
const GetBalanceTask = require("./wallet/GetBalanceTask");

//create transaction
const createTransactionTask = new SecuenceTask();
createTransactionTask.addTask(CreateAndRunTransaction);
exports.createTransactionTask = createTransactionTask;

//get user balance
const getBalanceSecuence = new SecuenceTask();
getBalanceSecuence.addTask(GetBalanceTask);
exports.getBalanceSecuence = getBalanceSecuence;