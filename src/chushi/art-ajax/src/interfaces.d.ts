import { codeType } from './core/codeType';
export interface IMap<T> {
    [name: string]: T;
}
export interface IBaseRequestOptions {
    headers?: IMap<string>;
    method?: string;
    timeout?: number;
    responseType?: string;
    withCredentials?: boolean;
    maxContentLength?: number;
}
/**
 * ajax请求参数
 */
export interface IRequestOptions extends IBaseRequestOptions {
    onUploadProgress?: EventListener | EventListenerObject;
    onDownloadProgress?: EventListener | EventListenerObject;
}
/**
 * ajax 请求响应参数
 */
export interface IResponse {
    data: any;
    statusCode: number | null;
    statusText?: string | null;
    _timeoutHandler?: any;
}
export interface IResponseData<T, U> {
    returnCode: codeType;
    returnMessage: string;
    bean: T;
    beans: U[];
    object: any;
}
export interface IResponseErrData {
    status: number;
    statusText: string;
    returnCode: number;
    returnMessage: string;
}
