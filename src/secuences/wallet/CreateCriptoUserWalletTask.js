const BaseTask = require("../src/BaseTask");

module.exports = class CreateCriptoUserWalletTask extends BaseTask {
    execute(params) {
        this.params = params;

        //ToDo: call wallet creation endpoint
        return new Promise((complete, cancel) => {
            
            complete();
        });
    }
}