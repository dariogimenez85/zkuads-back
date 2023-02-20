const mongoose  = require("mongoose");
const { TransactionType, CurrencyType, TransactionStatus } = require("./types");
const Schema = mongoose.Schema;

/* -------------------------------------------------------------------------------------------------- */
//User 
//Schema
const UserSchema = Schema({
    externalId:         { type: String, required: true, unique: true },
    email:              { type: String, required: true, unique: true },
    nickname:           { type: String, required: true, unique: false },
    firstName:          { type: String, required: false },
    lastName:           { type: String, required: false },
    picture:            { type: String, required: false },
    provider:           { type: String, required: false },
    walletId:           { type: String, required: false }
});

//Model
exports.UserModel = mongoose.model('user', UserSchema);
/* -------------------------------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------------------------------- */
//User Wallet
//Schema
const UserWalletSchema = Schema({
    user:               { type: mongoose.Types.ObjectId, ref:'user', required: true, unique: true },
    hardCurrency:       { type: Number, default: 0 },
    softCurrency:       { type: Number, default: 0 }
});

//Model
exports.UserWalletModel = mongoose.model('userWallet', UserWalletSchema);
/* -------------------------------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------------------------------- */
//Wallet Transactions
//Schema
const WalletTransactionsSchema = Schema({
    user:               { type: mongoose.Types.ObjectId, ref:'user', required: true },
    transactionType:    { type: String, required: true, enum:TransactionType },
    currencyType:       { type: String, required: true, enum: CurrencyType },
    amount:            { type: Number, required: true },
    description:        { type: String, required: false},
    status:             { type: String, require: true, enum: TransactionStatus, default: TransactionStatus.Pending }
});

//Model
exports.WalletTransactionsModel = mongoose.model('walletTransactions', WalletTransactionsSchema);
/* -------------------------------------------------------------------------------------------------- */

