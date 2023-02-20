const { UserModel, UserWalletModel } = require("../../data/models");
const BaseTask = require("../src/BaseTask");

module.exports = class CreateLocalUserWalletTask extends BaseTask {
    execute(params) {
        this.params = params;

        //ToDo: call wallet creation endpoint
        return new Promise((complete, cancel) => {

            UserWalletModel.create({
                user: this.params.userId
            }).then(res => {
                console.log('CreateLocalUserWalletTask :: Wallet created for user ' + this.params.userId);

                complete();
            }).catch(err => {
                console.log('CreateLocalUserWalletTask :: Error ' + err);
                
                cancel();
            });

            complete();
        });
    }
}