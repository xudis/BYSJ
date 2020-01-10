/** @license art-ajax v2.2.1 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('art-util')) :
    typeof define === 'function' && define.amd ? define(['art-util'], factory) :
    (global.ArtAjax = factory(global.ArtUtil));
}(this, (function (artUtil) { 'use strict';

    // ajax请求默认参数设置
    var DEFALT_OPTIONS = {
        method: 'GET',
        timeout: 5000,
        responseType: 'json',
        withCredentials: false,
        maxContentLength: -1
    };
    // ajax请求默认Content-Type类型
    var DEFAULT_CONTENT_TYPE = "application/x-www-form-urlencoded;charset=utf-8";

    var Config = /** @class */ (function () {
        function Config() {
            this.globalOptions = {};
        }
        Object.defineProperty(Config.prototype, "headers", {
            get: function () {
                return this.headerObj;
            },
            set: function (value) {
                this.headerObj = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Config.prototype, "timeout", {
            get: function () {
                return this.globalOptions.timeout;
            },
            set: function (value) {
                this.globalOptions.timeout = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Config.prototype, "responseType", {
            get: function () {
                return this.globalOptions.responseType;
            },
            set: function (value) {
                this.globalOptions.responseType = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Config.prototype, "withCredentials", {
            get: function () {
                return this.globalOptions.withCredentials;
            },
            set: function (value) {
                this.globalOptions.withCredentials = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Config.prototype, "maxContentLength", {
            get: function () {
                return this.globalOptions.maxContentLength;
            },
            set: function (value) {
                this.globalOptions.maxContentLength = value;
            },
            enumerable: true,
            configurable: true
        });
        Config.prototype.getHeadersData = function () {
            var headerObj = this.headerObj;
            if (headerObj) {
                var result = {};
                for (var key in headerObj) {
                    if (artUtil.type.isFunction(headerObj[key])) {
                        result[key] = headerObj[key]();
                    }
                    else {
                        result[key] = headerObj[key];
                    }
                }
                return result;
            }
            else {
                return null;
            }
        };
        Config.prototype.getBaseOptions = function () {
            var headers = this.getHeadersData();
            return headers ? Object.assign(this.globalOptions, { headers: headers }) : this.globalOptions;
        };
        Object.defineProperty(Config.prototype, "ajaxComplete", {
            get: function () {
                return this.ajaxCompleteObj;
            },
            set: function (handle) {
                this.ajaxCompleteObj = handle;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Config.prototype, "ajaxStart", {
            get: function () {
                return this.ajaxStartFun;
            },
            set: function (handle) {
                this.ajaxStartFun = handle;
            },
            enumerable: true,
            configurable: true
        });
        return Config;
    }());
    var Config$1 = new Config();

    // 获取Content-Type并序列化待发送数据
    function transFrormData(data) {
        var result = {
            sendData: ''
        };
        if (artUtil.type.isFormData(data)) {
            result.sendData = data;
        }
        else if (artUtil.type.isURLSearchParams(data)) {
            result.contentType = 'application/x-www-form-urlencoded;charset=utf-8';
            result.sendData = data.toString();
        }
        else if (artUtil.type.isObject(data)) {
            result.contentType = 'application/json;charset=utf-8';
            result.sendData = JSON.stringify(data);
        }
        else {
            result.contentType = DEFAULT_CONTENT_TYPE;
            result.sendData = data;
        }
        return result;
    }
    function formatErrData(request, opts) {
        if (opts === void 0) { opts = {}; }
        return Object.assign({
            status: request ? request.status : 0,
            statusText: request ? request.statusText : 'unknow',
            returnCode: -999,
            returnMessage: 'unknow'
        }, opts);
    }
    function ajax(url, data, options) {
        //合并ajax默认参数和全局参数
        var globalOptions = Config$1.getBaseOptions();
        options = artUtil.util.mixin({}, DEFALT_OPTIONS, globalOptions, options);
        options.method = (options.method || 'GET').toUpperCase();
        var request = new XMLHttpRequest();
        var response = {
            data: null,
            statusCode: null,
            statusText: null
        };
        //增加跨域请求发送 cookie
        if (options.withCredentials) {
            request.withCredentials = true;
        }
        return new Promise(function (resolve, reject) {
            request.open(options.method || '', url, true);
            request.onerror = function (evt) {
                request.onreadystatechange = null;
                console.error('请求异常：', evt);
                reject(formatErrData(request));
            };
            request.onreadystatechange = function () {
                if (request.readyState === 4) {
                    if (response._timeoutHandler) {
                        // 调用完成清除超时定时器
                        clearTimeout(response._timeoutHandler);
                    }
                    if (request.status < 200 || request.status >= 400) {
                        // ajax请求响应状态码失败
                        reject(formatErrData(request));
                        return;
                    }
                    // ajax网络请求调用成功
                    if (options.responseType === 'xml') {
                        response.data = request.responseXML;
                    }
                    else {
                        var result = ('response' in request) ? request.response : request.responseText;
                        if (options.responseType === 'json') {
                            try {
                                //返回数据格式不是json类型
                                response.data = JSON.parse(result);
                            }
                            catch (e) {
                                console.error("result is not json " + result);
                                response.data = result;
                            }
                        }
                        else {
                            response.data = result;
                        }
                    }
                    response.statusCode = request.status;
                    response.statusText = request.statusText;
                    resolve(response);
                }
            };
            if (artUtil.type.isNumber(options.timeout) && options.timeout !== Infinity) {
                request.timeout = options.timeout || 0;
                response._timeoutHandler = setTimeout(function () {
                    request.onreadystatechange = null;
                    request.abort();
                    reject(formatErrData(request, {
                        status: 0,
                        statusText: 'time out!'
                    }));
                }, options.timeout);
            }
            var hasUserContentType = false; // 用户是否自定义contentType类型
            // 添加自定义请求头信息
            if (options.headers) {
                for (var header in options.headers) {
                    if (header === 'Content-Type') {
                        hasUserContentType = true;
                        if (artUtil.type.isFormData(data)) {
                            reject(formatErrData(request, {
                                status: 0,
                                statusText: 'FormData数据类型不能设定Content-Type'
                            }));
                        }
                        request.setRequestHeader(header, options.headers[header]);
                    }
                    else {
                        request.setRequestHeader(header, options.headers[header]);
                    }
                }
            }
            var _a = transFrormData(data), sendData = _a.sendData, contentType = _a.contentType;
            // tslint:disable-next-line:no-unused-expression
            !hasUserContentType && contentType ? request.setRequestHeader('Content-Type', contentType) : null;
            // Handle progress if needed
            if (typeof options.onDownloadProgress === 'function') {
                request.addEventListener('progress', options.onDownloadProgress);
            }
            // Not all browsers support upload events
            if (typeof options.onUploadProgress === 'function' && request.upload) {
                request.upload.addEventListener('progress', options.onUploadProgress);
            }
            // 添加唯一标识
            request.setRequestHeader('_log4xContextKey', artUtil.uuid());
            sendData ? request.send(sendData) : request.send();
        });
    }

    /**
     * 业务返回状态码
     */
    var codeType;
    (function (codeType) {
        codeType[codeType["success"] = 0] = "success";
        codeType[codeType["fail"] = -9999] = "fail";
    })(codeType || (codeType = {}));

    function requestHandle(url, ajaxData, options) {
        var ajaxHandle = ajax(url, ajaxData, options).then(function (res) {
            var data = res.data;
            //返回json格式数据
            if (artUtil.type.isObject(data)) {
                // @ts-ignore
                if (data.returnCode === codeType.success || data.returnCode === '0') {
                    return { data: data, res: res };
                }
                else {
                    throw formatErrData(undefined, {
                        status: res.statusCode,
                        statusText: res.statusText,
                        returnCode: data.returnCode,
                        returnMessage: data.returnMessage || 'request error!'
                    });
                }
            }
            else {
                console.warn("response " + data + " is not Object");
                return { data: data, res: res };
            }
        }, function (err) {
            console.error('request error!', err);
            throw err;
        });
        if (Config$1.ajaxComplete) {
            var _a = Config$1.ajaxComplete, success = _a.success, error_1 = _a.error;
            return ajaxHandle.then(success, function (err) {
                throw error_1(err);
            });
        }
        else {
            return ajaxHandle;
        }
    }

    function combine(url, data, options) {
        if (data === void 0) { data = {}; }
        if (options === void 0) { options = {}; }
        options.method = 'POST';
        var arrayToObj = [];
        for (var i = 0; i < data.length; i++) {
            var obj = {
                url: '',
                data: {},
                options: {}
            };
            if (data[i][0].indexOf("http:") > -1 || data[i][0].indexOf("https:") > -1) {
                obj.url = data[i][0];
            }
            else {
                obj.url = window.location.origin + data[i][0];
            }
            obj.data = data[i][1] ? data[i][1] : {};
            obj.options = data[i][2] ? data[i][2] : {};
            arrayToObj.push(obj);
        }
        return requestHandle(url, arrayToObj, options);
    }

    /**
     * ajax delete请求
     * `框架内部已经判断过returnCode`
     * Example:
     * -
     * ```
     * del<data.bean返回数据类型>('./testurl').then({data, res}=>{
     *  // returnCode为0 成功处理
     * },(err)=>{
     * // 失败错误处理
     * });
     * ```
     * -
     * ```
     * del<返回数据类型>('./testurl',{ p1: "v1" },{
     * 	headers: {"content-type": "json" };
     * 	responseType?: 'json';
     * 	timeout: 1000;
     * }).then({data, res}=>{});
     * ```
     */
    function del(url, data, options) {
        if (options === void 0) { options = {}; }
        options.method = 'DELETE';
        if (Config$1.ajaxStart) {
            var result = Config$1.ajaxStart(url, data, options);
            // tslint:disable:no-unused-expression
            result.url && (url = result.url);
            result.data && (data = result.data);
            result.options && (options = result.options);
        }
        return requestHandle(url, data || '', options);
    }

    /**
     * ajax get请求
     * `框架内部已经判断过returnCode`
     * Example:
     * -
     * ```
     * get<data.bean返回数据类型>('./testurl').then({data, res}=>{
     *  // returnCode为0 成功处理
     * },(err)=>{
     * // 失败错误处理
     * });
     * ```
     * -
     * ```
     * get<返回数据类型>('./testurl',{ p1: "v1" },{
     * 	headers: {"content-type": "json" };
     * 	responseType?: 'json';
     * 	timeout: 1000;
     * }).then({data, res}=>{});
     * ```
     */
    function get(url, data, options) {
        if (options === void 0) { options = {}; }
        options.method = 'GET';
        if (Config$1.ajaxStart) {
            var result = Config$1.ajaxStart(url, data, options);
            // tslint:disable:no-unused-expression
            result.url && (url = result.url);
            result.data && (data = result.data);
            result.options && (options = result.options);
        }
        return requestHandle(artUtil.url.mixinUrl(url, data), '', options);
    }

    /**
     * ajax post请求
     * `框架内部已经判断过returnCode`
     * Example:
     * -
     * ```
     * post<data.bean返回数据类型>('./testurl').then({data, res}=>{
     *  // returnCode为0 成功处理
     * },(err)=>{
     * // 失败错误处理
     * });
     * ```
     * -
     * ```
     * post<返回数据类型>('./testurl',{ p1: "v1" },{
     * 	headers: {"content-type": "json" };
     * 	responseType?: 'json';
     * 	timeout: 1000;
     * }).then({data, res}=>{});
     * ```
     */
    function post(url, data, options) {
        if (options === void 0) { options = {}; }
        options.method = 'POST';
        if (Config$1.ajaxStart) {
            var result = Config$1.ajaxStart(url, data, options);
            // tslint:disable:no-unused-expression
            result.url && (url = result.url);
            result.data && (data = result.data);
            result.options && (options = result.options);
        }
        return requestHandle(url, data || '', options);
    }

    /**
     * ajax put请求
     * `框架内部已经判断过returnCode`
     * Example:
     * -
     * ```
     * put<data.bean返回数据类型>('./testurl').then({data, res}=>{
     *  // returnCode为0 成功处理
     * },(err)=>{
     * // 失败错误处理
     * });
     * ```
     * -
     * ```
     * put<返回数据类型>('./testurls',{ p1: "v1" }, {
     * 	headers: {"content-type": "json" };
     * 	responseType?: 'json';
     * 	timeout: 1000;
     * }).then({data, res}=>{});
     * ```
     */
    function put(url, data, options) {
        if (options === void 0) { options = {}; }
        options.method = 'PUT';
        if (Config$1.ajaxStart) {
            var result = Config$1.ajaxStart(url, data, options);
            // tslint:disable:no-unused-expression
            result.url && (url = result.url);
            result.data && (data = result.data);
            result.options && (options = result.options);
        }
        return requestHandle(url, data || '', options);
    }

    var Ajax = {
        put: put, get: get, post: post, del: del, combine: combine, globalConfig: Config$1
    };

    return Ajax;

})));
