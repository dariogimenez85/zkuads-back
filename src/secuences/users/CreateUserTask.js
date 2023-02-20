const { UserModel } = require("../../data/models");
const { Responses, UserStatus } = require("../../data/types");
const BaseTask = require("../src/BaseTask");

module.exports = class CreateUserTask extends BaseTask {
    execute(params) {
        this.params = params;

        return new Promise((complete, cancel) => {

            UserModel.create({
                externalId: this.params.externalId,
                provider: this.params.provider,
                email: this.params.email,
                nickname: this.params.nickname,
                firstName: this.params.firstName,
                lastName: this.params.lastName,
                picture: this.params.picture
            }).then(res => {
                console.log('CreateUserTask :: User ' + res._id + ' (external id: ' + this.params.externalId + ') has been created');

                this.addParam('userId', res._id);
                complete();
            }).catch(err => {
                console.log('CreateUserTask :: Error ' + err);

                cancel();
            });

        });
    }
}