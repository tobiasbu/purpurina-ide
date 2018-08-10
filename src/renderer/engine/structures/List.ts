

import mergeSort from './useful/MergeSort'


export default class List<T>
{
    private unique: boolean;
    private list: T[];


    constructor(elements?: T[], unique?: boolean) {

        this.unique = unique || true;
        this.list = [];

        if (elements !== null && Array.isArray(elements)) {
            for (let i = 0; i < elements.length; i++)
                this.push(elements[i]);
        }

    }

    // [n: number]: T; = this.list[n];

    get size(): number { return this.list.length; }
    get length(): number { return this.list.length; }
    get contents(): T[] { return this.list; }

    first(): T {
        if (this.list.length > 0)
            return this.list[0];
        else
            return null;

    }

    last(): T {
        if (this.list.length > 0) {
            let idx = this.list.length - 1;
            return this.list[idx];
        } else
            return null;
    }

    push(child: T): T {

        if (this.unique) {
            if (this.indexOf(child) === -1)
                this.list.push(child);
        } else {
            this.list.push(child);
        }

        return child;
    }

    pushFront(child: T): T {
        if (this.unique) {
            if (this.indexOf(child) === -1)
                this.list.unshift(child);
        } else {
            this.list.unshift(child);
        }
        return child;
    }

    insert(child: T, index?: number) {

        if (index === undefined)
            index = 0;

        if (this.list.length === 0)
            return this.push(child);

        if (index >= 0 && index <= this.list.length) {

            if (this.unique) {
                if (this.indexOf(child) === -1)
                    this.list.splice(index, 0, child);
            } else {
                this.list.splice(index, 0, child);
            }

        }

        return child;

    }

    indexOf(child: T): number {
        return this.list.indexOf(child);
    }

    get(index: number): T {
        return this.list[index];
    }

    at(index: number): T {
        return this.list[index];
    }

    erase(child: T): T {

        const idx = this.list.indexOf(child);
        let childToErase = null;

        if (idx !== -1)
            childToErase = this.list.splice(idx, 1);

        return childToErase;
    }

    eraseAt(index: number): T {
        let child = this.list[index];

        if (child)
            this.list.splice(index, 1);

        return child;
    }

    eraseList(listToRemove: T[] | List<T>, size?: number, destroy?: boolean) {

        if (destroy === undefined) destroy = false;

        if (Array.isArray(listToRemove)) {
            if (size === undefined) size = listToRemove.length;

            for (let i = 0; i < size; i++) {
                let child = listToRemove[i];
                this.erase(child);
            }

        } else {
            if (size === undefined) size = listToRemove.size;

            for (let i = 0; i < size; i++) {
                let child = listToRemove.at(i);
                this.erase(child);
            }
        }
    }

    eraseIndexedList(listToRemove: number[] | List<number>): List<T> {

        let size = listToRemove.length;

        if (Array.isArray(listToRemove)) {

            for (let i = 0; i < size; i++) {
                let index = listToRemove[i];
                this.eraseAt(index);
            }

        } else {
            for (let i = 0; i < size; i++) {
                let index = listToRemove.at(i);
                this.eraseAt(index);
            }
        }
        return this;
    }

    pop(): T {
        return this.list.pop();
    }

    popFront(): T {
        return this.list.shift();
    }

    has(child: T): boolean {
        return (this.list.indexOf(child) > -1);
    }

    hasAt(index: number): boolean {
        return this.list[index] !== undefined;
    }

    empty(): boolean {
        return (this.list.length === 0);
    }

    clear(): List<T> {
        /*let i = this.list.length;

        while(i--) {
            this.erase(this.list[i]);
        }*/

        this.list.length = 0;

        return this;
    }

    splice(start: number, count: number, items?: T[]) {
        if (items === undefined)
            return this.list.splice(start, count);
        else
            return this.list.splice(start, count, ...items);
    }

    destroy(): void {
        this.clear();
        this.list = [];
        // this.parent = null;
    }

    concat(otherList: List<T>, clearOther?: boolean): List<T> {
        if (clearOther === undefined)
            clearOther = false;

        if (clearOther) {
            this.list = this.list.concat(otherList.contents.splice(0));
        } else {
            this.list = this.list.concat(otherList.contents);
        }


        return this;
    }

    each(callback: ListEachFunction<T>, context?: any, ...args: any[]): T {
        //let params = [];

        let content = this.list;
        let r;
        // let istart = (context === undefined) ? 1 : 2;

        // for (let i = istart; i < arguments.length; i++)
        //     params.push(arguments[i]);

        for (let i = 0; i < content.length; i++) {

            if (context === undefined) {
                r = callback(content[i], i, args);
            } else {
                r = callback.call(context, content[i], i, args);
            }

            if (r !== undefined) {
                return r;
            }
            //break;
        }

        return r;
    }

    sort(predicate?: MergeSortFunction<T>) {
        if (predicate === undefined)
            return undefined;
        return mergeSort(this.list, predicate);

        //childs.sort(predicate);
    }

    find(predicate?: FindPredicate<T>) {
        if (predicate === undefined)
            return undefined;

        let size = this.list.length;

        for (let i = 0; i < size; i++) {
            if (predicate(this.list[i])) {
                return this.list[i];
            }
        }

        return null;
    }

    swap(childA: T, childB: T): List<T> {

        if (childA === childB)
            return undefined;

        let idx0 = this.indexOf(childA);
        let idx1 = this.indexOf(childB);

        if (idx0 < 0 || idx1 < 0) {
            throw new Error('DataList.swap: Could not swap childrens. The objects are not in the list.');
        }

        this.list[idx0] = childA;
        this.list[idx1] = childB;

        return this;

    }

    swapByIndex(indexA: number, indexB: number): List<T> {
        if (indexA === indexB)
            return undefined;

        var cA = this.at(indexA);
        var cB = this.at(indexB);

        if (cA === undefined || cB === undefined) {
            throw new Error('DataList.swapByIndex: Could not swap childrens by index. The objects are not in the list.');
        }

        this.list[indexA] = cA;
        this.list[indexB] = cB;

        return this;
    }

    reverse(): List<T> {
        this.list.reverse();
        return this;
    }





}