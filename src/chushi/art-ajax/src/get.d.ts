import { IMap, IRequestOptions, IResponse, IResponseData } from './interfaces';
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
export default function get<T, U>(url: string, data?: IMap<any> | string, options?: IRequestOptions): Promise<{
    data: IResponseData<T, U>;
    res: IResponse;
}>;
