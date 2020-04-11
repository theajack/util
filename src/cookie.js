function get (name, cookie = document.cookie) {
    if (cookie.length > 0 && name) {
        let reg = new RegExp('(^|; ?)' + name + '=([^&]*?)(;|$)', 'i');
        let r = cookie.match(reg);
        if (r != null) {
            return unescape(r[2]);
        }
        return '';
    }
    return '';
}
function set (name, value, expires, path) {
    if (value == null) {
        set(name, '', -1);
    } else {
        var c = name + '=' + escape(value);
        if (expires != undefined) {
            var h = new Date();
            h.setDate(h.getDate() + expires);
            c += ';expires=' + h.toGMTString();
        }
        if (typeof path === 'undefined') {
            if (typeof path === 'boolean') {
                if (path) {
                    c += (';path=/');
                }
            } else {
                c += (';path=' + path);
            }
        }
        document.cookie = c;
        return name + '=' + value;
    }
}

export default {
    get, set
};