
class Performance {

    private _last: number;
    private _spend: number;
    private _mutation: MutationObserver;

    start(): number {
        const now = performance.now();
        this._last = now;
        return now;
    }

    stop(): number {
        const now = performance.now();
        this._spend = now - this._last;
        return this._spend;
    }

    observe() {

        let mutation;
        try {
            mutation = new MutationObserver(function (mutations: MutationRecord[]) {
                
                // var length = records.length;
                // for (var i = 0; i < length; i++) {
                //     var record = records[i];
                //     dispatchAll(record.removedNodes, DISCONNECTED);
                //     dispatchAll(record.addedNodes, CONNECTED);
                // }
            });

        } catch (o_O) {
            document.addEventListener('DOMNodeRemoved', function (event: Event) {

            }, false);
            document.addEventListener('DOMNodeInserted', function (event: Event) {
                ;
            }, false);
        }

        if (mutation) {
            mutation.observe(document, { subtree: true, childList: true });
            this._mutation = mutation;

        }
    }

}

const DOOMPerformance = new Performance();

export default DOOMPerformance;