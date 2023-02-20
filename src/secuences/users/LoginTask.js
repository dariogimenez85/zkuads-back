const { UserModel } = require("../../data/models");
const { Responses, UserStatus } = require("../../data/types");
const BaseTask = require("../src/BaseTask");

module.exports = class LoginTask extends BaseTask {
    execute(params) {
        this.params = params;

        console.log(this.params.externalId);

        return new Promise((complete, cancel) => {

            UserModel.aggregate([
                {
                    $lookup: {
                        from: 'userwallets',
                        localField: '_id',
                        foreignField: 'user',
                        as: 'wallet'
                    }
                },
                {
                    $match: {
                        externalId: this.params.externalId
                    }
                }
            ]).then(data => {
                let user = {
                    name: data[0].nickname,
                    picture: data[0].picture,
                    balance: {
                        soft: data[0].wallet[0].softCurrency,
                        hard: data[0].wallet[0].hardCurrency
                    },
                    loggedIn: true
                }

                console.log('LoginTask :: user login: ', user);
                this.params.resolve.status(200).send(user);

                complete();
            }).catch(err => {
                console.log('LoginTask :: error: ', err);
                this.params.resolve.status(401).send(err);

                cancel();
            })
        });
    }
}