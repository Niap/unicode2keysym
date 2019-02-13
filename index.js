var keysyms  = require("./keysyms.js");
var events = require("./events.js");

exports.fromKeysym = function (keysym) {
    return keysyms.records[keysyms.keysyms[keysym]]
};

var a = 'a'.charCodeAt(0), z = 'z'.charCodeAt(0);
var A = 'A'.charCodeAt(0), Z = 'Z'.charCodeAt(0);

function lookup (e) {
    return e.length === 1
        ? exports.fromUnicode(e)[0].keysym
        : exports.fromName(e).keysym
    ;
}

exports.keyEvent = function (code, shiftMask) {
    if (A <= code && code <= Z) {
        return code + (shiftMask ? 0 : a - A);
    }
    else if (events.both[code]) {
        return lookup(events.both[code]);
    }
    else if (shiftMask && events.shifted[code]) {
        return lookup(events.shifted[code]);
    }
    else if (!shiftMask && events.unshifted[code]) {
        return lookup(events.unshifted[code]);
    }
    else {
        var c = exports.fromUnicode(code)[0];
        return c && c.keysym || code;
    }
};

exports.fromUnicode = function (code) {
    if (typeof code === 'string') {
        if (code.length !== 1) {
            throw new Error('String must be 1 character');
        }
        return exports.fromUnicode(code.charCodeAt(0));
    }
    else {
        return (keysyms.unicodes[code] || []).map(function (i) {
            return keysyms.records[i]
        });
    }
};
exports.fromName = function (name) {
    return keysyms.records[keysyms.names[name]]
};
console.log(exports.keyEvent(49,true))
