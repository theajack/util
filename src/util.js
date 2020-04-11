
function getUrlParam (name, defVal) {
    return parseUrlParam(window.location.search, name, defVal);
}

function parseUrlParam (search, name, defVal) {
    if (search === true) {
        search = decodeURIComponent(window.location.search);
    }
    if (search[search.length - 1] === '/') {
        search = search.substr(0, search.length - 1);
    }
    if (typeof name !== 'undefined') {
        if (search !== '') {
            let reg = new RegExp('(^|&)' + name + '=([^&]*?)(&|$)', 'i');
            let r = search.substr(1).match(reg);
            if (r != null) {
                return unescape(r[2]);
            }
        }
        return (typeof defVal !== 'undefined') ? defVal : null;
    }
    if (search === '') { return {}; }
    let arr = search.substr(1).split('&');
    let param = {};
    arr.forEach(item => {
        let pArr = item.split('=');
        param[pArr[0]] = pArr[1];
    });
    return param;
}

function copy (str) {
    var input = document.getElementById('_copy_input_');
    if (!input) {
        input = document.createElement('input');
        input.setAttribute('type', 'text');
        input.setAttribute(
            'style',
            'height:10px;position:fixed;top:-100px;opacity:0;'
        );
        input.setAttribute('id', '_copy_input_');
        document.body.appendChild(input);
    }
    input.value = str;
    input.select();

    try {
        if (document.execCommand('Copy')) {
            return true;
        } else {
            return false;
        }
    } catch (err) {
        return false;
    }
};

function type (obj) {
    var type = typeof obj;
    if (type == 'object') {
        if (obj === null) {
            return 'null';
        } else {
            var con = obj.constructor;
            switch (con) {
                case Object:type = 'json'; break;
                case Array:type = 'array'; break;
                case HTMLCollection:type = 'htmlcollection'; break;
                case NodeList:type = 'nodelist'; break;
                case FormData:type = 'formdata'; break;
                case Error:type = 'error'; break;
                case Date:type = 'date'; break;
                default:if (obj.nodeType === 1 && typeof obj.nodeName === 'string') {
                    type = 'htmlelement';
                } else {
                    type = 'object';
                };break;
            }
        }
    }
    return type;
};

function random (a, b) {
    return (a + Math.round(Math.random() * (b - a)));
};

let downloadLink = null;

function download (str, filename = 'tc-util-file', type = 'text/plain') {
    if (!downloadLink) {
        let downloadLink = document.createElement('a');
        downloadLink.setAttribute('style', 'position: fixed;top: -100px');
        document.body.appendChild(downloadLink);
    }
    downloadLink.setAttribute('download', filename);
    let blob = new Blob([str], {type: type});
    let url = URL.createObjectURL(blob);
    downloadLink.href = url;
    downloadLink.click();
}

function execute ({
    code = '',
    onload,
    onerror,
    ontimeout,
    timeout = 6000
}) {
    if (code.trim() === '') {
        console.warn('execute code 参数不可为空');
        return;
    }
    let blob = new Blob([code], {type: 'application/text'});
    let objectURL = window.URL.createObjectURL(blob);
    let script = document.createElement('script');
    let timer = null;
    if (ontimeout) {
        timer = setTimeout(() => {
            ontimeout();
            document.body.removeChild(script);
        }, timeout);
    }
    script.onload = function () {
        if (onload) {
            onload();
        }
        clearTimeout(timer);
        document.body.removeChild(script);
    };
    script.onerror = function (err) {
        if (onerror) {
            onerror(err);
        }
        clearTimeout(timer);
        document.body.removeChild(script);
    };
    document.body.appendChild(script);
    script.src = objectURL;
}

let fileInput = null;
function readFile (success, accept) {
    if (!fileInput) {
        fileInput = document.createElement('input');
        fileInput.setAttribute('type', 'file');
        fileInput.setAttribute('style', 'position: fixed;top: -100px');
        document.body.appendChild(fileInput);
    }
    if (accept) {
        fileInput.setAttribute('accept', accept);
    }
    fileInput.onchange = function () {
        let file = this.files[0];
        if (!file) {
            return;
        }
        if (typeof FileReader == 'undefined') {
            alert('你的浏览器暂不支持该功能');
            return;
        }
        var reader = new FileReader();
        reader.readAsText(file);
        reader.onload = function () {
            success(this.result);
        };
    };
    fileInput.click();
}

export default {
    getUrlParam,
    parseUrlParam,
    copy,
    type,
    random,
    download,
    execute,
    readFile
};