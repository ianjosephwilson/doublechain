function doubleChain(calls, onComplete) {
    /* Calls functions from a list of function descriptions, passing each one
    an argument that is a function that must be called when the function is
    done.

    This allows functions to have asynchronous portions but still be called
    in order and the completion of all functions to be acted on.
    */
    function callNext(j) {
        var next, bind, args;
        if (j + 1 == calls.length) {
            next = onComplete;
        } else {
            next = callNext.bind(null, j + 1);
        }
        if (calls[j].hasOwnProperty('bind')) {
            bind = calls[j].bind;
        } else {
            bind = null;
        }
        if (calls[j].hasOwnProperty('args')) {
            args = calls[j].args.concat(next);
        } else {
            args = [next];
        }
        calls[j].func.apply(bind, args);
    }
    if (calls.length === 0) {
        onComplete();
    } else {
        callNext(0);
    }
}
