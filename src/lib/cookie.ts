
export function getCookie (
    name: string,
    cookie: string = document.cookie
) {
    if (cookie.length > 0 && name) {
        const reg = new RegExp('(^|; ?)' + name + '=([^&]*?)(;|$)', 'i');
        const r = cookie.match(reg);
        if (r != null) {
            return unescape(r[2]);
        }
        return '';
    }
    return '';
}

export function setCookie (
    name: string,
    value: string | null,
    expires?: number, // days
    path?: string
): string {
    if (value === null) {
        return setCookie(name, '', -1);
    } else {
        let c = name + '=' + escape(value);
        if (typeof expires !== 'undefined') {
            const h = new Date();
            h.setDate(h.getDate() + expires);
            c += ';expires=' + h.toUTCString();
        }
        if (typeof path !== 'undefined') {
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