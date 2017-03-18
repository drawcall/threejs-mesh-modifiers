export class EventEmitter {
    
    constructor() { }
    
    on(type: string, listener: any): any {
        if (!_listeners) _listeners = {};
        if (!_listeners[type]) _listeners[type] = []
        _listeners[type].push(listener);

        return listener;
    }

    emit(eventName: string, ...rest: any[]): boolean {
        let ret: boolean = false;

        if (eventName && _listeners) {
            var arr = _listeners[eventName];
            if (!arr) return ret;

            arr = arr.slice();

            var handler, i = arr.length;

            var args = Array.prototype.slice.call(arguments);
            args.shift();

            while (i--) {
                var handler = arr[i];
                ret = ret || handler.apply(null, args);
            }

        }

        return !!ret;
    }

    one(type: string, listener: () => any): any {
        var args = Array.prototype.slice.call(arguments, 2);
        let proxyListener = () => {
            this.off(type, proxyListener);
            listener.apply(null, args);
        }

        this.on(type, proxyListener);
    }

    has(type: string): boolean {
        return !!(_listeners && _listeners[type]);
    }

    off(type: string, listener: any): any {
        if (!_listeners || !_listeners[type]) return;

        var arr = _listeners[type];
        for (var i: number = 0, l = arr.length; i < l; i++) {
            if (arr[i].toString() == listener.toString()) {
                if (l == 1) {
                    delete (_listeners[type]);
                }

                else {
                    arr.splice(i, 1);
                }
                break;
            }
        }
    }

    offAll(type: string): void {
        if (!type)
            _listeners = null;
        else if (_listeners)
            delete (_listeners[type]);
    }
}

let _listeners: any;