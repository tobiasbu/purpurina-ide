
import { DOOM } from '../utils';
import ArrayUtils from '../../engine/utils/ArrayUtils';



enum TaskType {
    Measure,
    Mutate
}

interface ScheduledTask {
    readonly fn: Task;
    readonly type: TaskType;
};

interface ScheduledTaskList {
    readonly list: Array<ScheduledTask>;
    readonly type: TaskType;
}

type RequestAnimationFrame = (callback: FrameRequestCallback) => number;
type UpdaterFunction = () => void;
type Task = () => void;
//type UpdaterTypeFunction = (fn: UpdaterFunction, ctx?: any) => ScheduledTask;


class Updater {

    private _readTasks: ScheduledTaskList;
    private _writeTasks: ScheduledTaskList;
    private _raf: RequestAnimationFrame;
    private _scheduled: boolean;

    constructor() {
        this._readTasks = { type: TaskType.Measure, list: [] };
        this._writeTasks = { type: TaskType.Mutate, list: [] };
        this._scheduled = false;
        this._raf = DOOM.Utils.raf.bind(window);

    }

    private runTasks(taskList: Array<ScheduledTask>) {
        let task: ScheduledTask;
        while (task = taskList.shift()) {
            task.fn();
        }
    }

    private flush(updater: Updater) {

        const writes = updater._readTasks.list;
        const reads = updater._writeTasks.list;
        let error: Error;

        try {
            //debug('flushing reads', reads.length);
            updater.runTasks(reads);
            //debug('flushing writes', writes.length);
            updater.runTasks(writes);
        } catch (e) {
            error = e;
        }

        updater._scheduled = false;

        // If the batch errored we may still have tasks queued
        if (reads.length || writes.length) {
            updater.scheduleFlush();
        }

        if (error) {
            throw error;
        }
    }

    private scheduleFlush() {
        if (this._scheduled === true) {
            return;
        }

        this._scheduled = true;
        this._raf(this.flush.bind(null, this))
    }

    private bindTaskTo(taskList: ScheduledTaskList, fn: UpdaterFunction, ctx?: any): ScheduledTask {
        let task: Task;
        if (ctx) {
            task = fn.bind(ctx);
        } else {
            task = fn;
        }

        let scheduled: ScheduledTask = {
            fn: task,
            // once: ((once !== undefined) ? once : true),
            type: taskList.type
        }

        taskList.list.push(scheduled);
        this.scheduleFlush();
        return scheduled;
    }

    private createPromise(updaterFnType: TaskType, fn: UpdaterFunction, ctx?: any): Promise<any> {
        let task;
        let self = this;

        let promise = new Promise(function (resolve, reject) {
            const handler = () => {
                //tasks.delete(promise);
                try {
                    resolve(ctx ? fn.call(ctx) : fn());
                } catch (e) {
                    reject(e);
                }
            };

            if (updaterFnType === TaskType.Measure) {
                self.measure(handler, ctx);
            } else {
                self.mutate(handler, ctx);
            }

        });

        // var promise = new Promise(function(resolve, reject) {
        //     task = fastdom[type](function() {
        //       tasks.delete(promise);
        //       try { resolve(ctx ? fn.call(ctx) : fn()); }
        //       catch (e) { reject(e); }
        //     }, ctx);
        //   });
        

        return promise;
    }

    measurePromised(fn: UpdaterFunction, ctx?: any): Promise<{}> {
        return this.createPromise(TaskType.Measure, fn, ctx);
    }

    mutatePromised(fn: UpdaterFunction, ctx?: any): Promise<{}> {
        return this.createPromise(TaskType.Mutate, fn, ctx);
    }

    measure(fn: UpdaterFunction, ctx?: any): ScheduledTask {
        return this.bindTaskTo(this._readTasks, fn, ctx);
    }

    mutate(fn: UpdaterFunction, ctx?: any): ScheduledTask {
        return this.bindTaskTo(this._writeTasks, fn, ctx);
    }

    remove(scheduledTask: ScheduledTask): -1 | boolean {
        if (scheduledTask) {
            if (scheduledTask.type === TaskType.Measure) {
                return ArrayUtils.remove(this._readTasks.list, scheduledTask);
            } else if (scheduledTask.type === TaskType.Mutate) {
                return ArrayUtils.remove(this._writeTasks.list, scheduledTask);
            }
        }
        return -1;
    }

}

const DOOMUpdater = new Updater();

export default DOOMUpdater;