const { UserModel } = require("../../data/models");
const { Responses } = require("../../data/types");
const BaseTask = require("../src/BaseTask");

module.exports = class CheckExternalUserAvailableTask extends BaseTask {
    execute(params) {
        this.params = params;

        return new Promise((complete, cancel) => {
            UserModel.find({ $or: [{ externalId: this.params.externalId }] })
                .then(users => {
                    if (users.length > 0) {
                        console.log('CheckExternalUserAvailableTask :: External User '+ this.params.externalId +'already exist in db');
                        cancel();
                    } else {
                        console.log('CheckExternalUserAvailableTask :: External User '+ this.params.externalId +' does not exist in db');
                        complete();
                    }
                })
                .catch(err => {
                    cancel(err);
                });
        });
    }
}