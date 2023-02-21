const { TransactionType, CurrencyType } = require("../data/types");
const { getUserDataSecuence } = require("../secuences/users");
const { createTransactionTask, getBalanceSecuence } = require("../secuences/wallet");

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

router.get("/soft/balance/:userId", (req, res) => {
    getBalanceSecuence.execute({
        request: req,
        resolve: res,
        userId: req.params.userId,
        currencyType: CurrencyType.Soft
    });
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

router.get("/hard/balance/:userId", (req, res) => {
    getBalanceSecuence.execute({
        request: req,
        resolve: res,
        userId: req.params.userId,
        currencyType: CurrencyType.Hard
    });
});

module.exports = router;

//user data
router.get("/user/:userId", (req, res) => {
    getUserDataSecuence.execute({
        request: req,
        resolve: res,
        userId: req.params.userId
    });
});