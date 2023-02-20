const { TransactionType, CurrencyType } = require("../data/types");
const { createTransactionTask } = require("../secuences/wallet");

const router = require("express").Router();

//soft currency wallet
router.post("/soft/debit", (req, res) => {
    createTransactionTask.execute({
        request: req,
        resolve: res,
        userId: req.body.userId,
        transactionType: TransactionType.Debit,
        currencyType: CurrencyType.Soft,
        transactionValue: req.body.amount,
        description: req.body.description
    });
});
router.post("/soft/credit", (req, res) => {
    createTransactionTask.execute({
        request: req,
        resolve: res,
        userId: req.body.userId,
        transactionType: TransactionType.Credit,
        currencyType: CurrencyType.Soft,
        transactionValue: req.body.amount,
        description: req.body.description
    });
});

router.get("/soft/balance", (req, res) => {

});

//hard currency wallet
router.post("/hard/debit", (req, res) => {
    createTransactionTask.execute({
        request: req,
        resolve: res,
        userId: req.body.userId,
        transactionType: TransactionType.Debit,
        currencyType: CurrencyType.Hard,
        transactionValue: req.body.amount,
        description: req.body.description
    });
});
router.post("/hard/credit", (req, res) => {
    createTransactionTask.execute({
        request: req,
        resolve: res,
        userId: req.body.userId,
        transactionType: TransactionType.Credit,
        currencyType: CurrencyType.Hard,
        transactionValue: req.body.amount,
        description: req.body.description
    });
});

router.get("/hard/balance", (req, res) => {

});

module.exports = router;

//user data
router.get("/user/:userId", (req, res) => {

});