const { UserModel } = require("../../data/models");
const BaseTask = require("../src/BaseTask");

module.exports = class GetUserDataTask extends BaseTask {
    execute(params) {
        this.params = params;

        return new Promise((complete, cancel) => {

            UserModel.findOne({ _id: this.params.userId })
                .then(user => {
                    if (user != null) {
                        console.log('GetUserDataTask :: Looking for User ' + this.params.userId);

                        let userData = {
                            name: user.nickname,
                            picture: user.picture
                        }
                        this.params.resolve.status(200).send(userData);

                        complete()
                    } else {
                        console.log('GetUserDataTask :: User ' + this.params.userId + ' does not exist in db');
                        this.params.resolve.status(400).send({ message: 'User does not exist' });
                        cancel();
                    }
                })
                .catch(err => {
                    this.params.resolve.status(400).send({ message: err });
                    cancel();
                });
        });
    }
}