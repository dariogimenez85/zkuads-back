const { UserModel, WalletTransactionsModel, UserWalletModel } = require("../../data/models");
const { Responses, UserStatus, TransactionType, CurrencyType, TransactionStatus } = require("../../data/types");
const BaseTask = require("../src/BaseTask");

module.exports = class SetInitialSoftBalanceTask extends BaseTask {
    execute(params) {
        this.params = params;

        return new Promise((complete, cancel) => {

            //ToDo: Improve this approach creating one service to create pending transactions and another for running those transactions

            const welcomePackBonusValue = 10000;

            //create transaction
            WalletTransactionsModel.create({
                user: this.params.userId,
                transactionType: TransactionType.Credit,
                currencyType: CurrencyType.Soft,
                amount: welcomePackBonusValue,
                description: 'Welcome pack bonus',
                status: TransactionStatus.Completed
            }).then(res => {
                console.log('SetInitialSoftBalanceTask :: Transaction saved for user: ', this.params.userId);

                //update balance
                UserWalletModel.updateOne(
                    { user: this.params.userId },
                    {
                        $inc: { softCurrency: welcomePackBonusValue }
                    }).then(res => {
                        console.log('SetInitialSoftBalanceTask :: soft balance updated: ', this.params.userId);

                        complete();
                    }).catch(err => {
                        console.log('SetInitialSoftBalanceTask :: Error ' + err);

                        cancel();
                    });

            }).catch(err => {
                console.log('SetInitialSoftBalanceTask :: Error ' + err);

                cancel();
            });

        });
    }
}