module.exports = class BaseTask {

    static MESSAGE = 'message';

    params = null;
    errorCode = null;
    errorMessage = null;

    execute(params) {
        this.params = params;
    }

    addParam(name, data) {
        if (!this.params) return;

        this.params[name] = data;
    }

    addMessage(data) {
        this.addParam(BaseTask.MESSAGE, data);
    }

    getMessage() {
        return this.params[BaseTask.MESSAGE];
    }

}