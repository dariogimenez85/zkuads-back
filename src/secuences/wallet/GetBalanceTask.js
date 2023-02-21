const { UserWalletModel } = require("../../data/models");
const { CurrencyType } = require("../../data/types");
const BaseTask = require("../src/BaseTask");

module.exports = class GetBalanceTask extends BaseTask {
    execute(params) {
        this.params = params;

        return new Promise((complete, cancel) => {

            UserWalletModel.findOne({ user: this.params.userId })
                .then(wallet => {
                    if (wallet != null) {
                        console.log('GetBalanceTask :: Looking wallet for user ' + this.params.userId);
                        console.log(wallet);
                        let balance = {
                            balance: this.params.currencyType == CurrencyType.Hard ? wallet.hardCurrency : wallet.softCurrency
                        }
                        this.params.resolve.status(200).send(balance);

                        complete()
                    } else {
                        console.log('GetBalanceTask :: Does not exist wallet for user ' + this.params.userId + ' in db');
                        this.params.resolve.status(400).send({ message: 'Wallet does not exist' });
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