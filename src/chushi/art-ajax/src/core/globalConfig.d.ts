import { IBaseRequestOptions, IMap, IRequestOptions, IResponse, IResponseData, IResponseErrData } from '../interfaces';
declare type reqHeader = IMap<string | (() => string)>;
declare type ajaxStartHandle = (url: string, data?: IMap<any> | string, options?: IRequestOptions) => {
    url: string;
    data?: IMap<any> | string;
    options?: IRequestOptions;
};
declare type successHandle = (data: {
    data: IResponseData<any, any>;
    res: IResponse;
}) => {
    data: IResponseData<any, any>;
    res: IResponse;
};
declare type errorHandle = (data: IResponseErrData) => IResponseErrData;
declare type completeHandle = {
    success: successHandle;
    error: errorHandle;
};
export declare class Config {
    private headerObj?;
    private globalOptions;
    private ajaxCompleteObj?;
    private ajaxStartFun?;
    headers: reqHeader;
    timeout: number;
    responseType: string;
    withCredentials: boolean;
    maxContentLength: number;
    private getHeadersData;
    getBaseOptions(): IBaseRequestOptions;
    ajaxComplete: completeHandle;
    ajaxStart: ajaxStartHandle;
}
declare const _default: Config;
export default _default;
