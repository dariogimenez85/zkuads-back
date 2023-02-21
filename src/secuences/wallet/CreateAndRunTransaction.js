const { WalletTransactionsModel, UserWalletModel } = require("../../data/models");
const { TransactionType, CurrencyType, TransactionStatus } = require("../../data/types");
const BaseTask = require("../src/BaseTask");

module.exports = class CreateAndRunTransaction extends BaseTask {
    execute(params) {
        this.params = params;

        return new Promise((complete, cancel) => {

            //ToDo: Improve this approach creating one service to create pending transactions and another for running those transactions

            //create transaction
            WalletTransactionsModel.create({
                user: this.params.userId,
                transactionType: this.params.transactionType,
                currencyType: this.params.currencyType,
                amount: this.params.transactionValue,
                description: this.params.description,
                status: TransactionStatus.Completed
            }).then(res => {
                console.log('CreateAndRunTransaction :: transaction created (' + this.params.transactionType + ': $' + this.params.transactionValue + ') for user: ', this.params.userId);

                let multiplier = this.params.transactionType == TransactionType.Credit ? 1 : -1;
                let value = this.params.transactionValue * multiplier;
                let field = this.params.currencyType == CurrencyType.Hard ? { hardCurrency: value } : { softCurrency: value }


                console.log({ user: this.params.userId },
                    {
                        $inc: field
                    })
                //update balance
                UserWalletModel.updateOne(
                    { user: this.params.userId },
                    {
                        $inc: field
                    }).then(res => {
                        console.log('CreateAndRunTransaction :: balance updated (' + field + ') for user: ', this.params.userId);
                        this.params.resolve.status(200).send({ status: 'ok', message: 'transaction saved' });

                        complete();
                    }).catch(err => {
                        console.log('CreateAndRunTransaction :: Error ' + err);
                        this.params.resolve.status(401).send({ status: 'error', message: err });

                        cancel();
                    });
            }).catch(err => {
                console.log('CreateAndRunTransaction :: Error ' + err);
                this.params.resolve.status(400).send({ status: 'error', message: err });

                cancel();
            });

        });
    }
}