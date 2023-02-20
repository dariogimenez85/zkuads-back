module.exports = class SecuenceTask {

    allTask = [];
    currentIndex = 0;
    currentTask = null;
    params = null;
    onComplete = null;
    onCancel = null;

    constructor() {
    }

    addTask(classRef) {
        this.allTask.push(classRef);
    }

    execute(params, onComplete = null, onCancel = null) {
        this.params = params;
        this.currentIndex = 0;
        this.onComplete = onComplete;
        this.onCancel = onCancel;

        this.#nextTask();
    }

    #nextTask() {
        if (this.currentIndex >= this.allTask.length) {
            this.#sendComplete();

            return;
        }

        this.currentTask = new this.allTask[this.currentIndex]();
        this.currentTask.execute(this.params)
            .then((res) => {
                this.#nextTask();
            })
            .catch((err) => {
                console.log(err);
                this.#sendCancel(err);
            });

        this.currentIndex++;
    }

    #sendComplete() {
        if (this.onComplete != null) this.onComplete();
    }

    #sendCancel() {
        if (this.onCancel != null) this.onCancel(err);
    }
}
