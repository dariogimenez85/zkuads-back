const jwt = require('jsonwebtoken');
const BaseTask = require('../src/BaseTask');

module.exports = class SendResponseTask extends BaseTask {
    execute(params) {
        this.params = params;

        return new Promise((complete, cancel) => {
            const message = this.getMessage();
            this.params.resolve.send(message);

            complete();
        });
    }
}