const BaseTask = require("../src/BaseTask");

module.exports = class TestTask extends BaseTask {
    execute(params) {
        this.params = params;

        return new Promise((complete, cancel) => {
            
            

            complete();
            
        });
    }
}