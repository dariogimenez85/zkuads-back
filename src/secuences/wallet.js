const SecuenceTask = require("./src/SecuenceTask");
const CreateAndRunTransaction = require("./wallet/CreateAndRunTransaction");

const createTransactionTask = new SecuenceTask();
createTransactionTask.addTask(CreateAndRunTransaction);
exports.createTransactionTask = createTransactionTask;