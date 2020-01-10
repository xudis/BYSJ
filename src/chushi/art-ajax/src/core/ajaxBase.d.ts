import { IMap, IRequestOptions, IResponse, IResponseErrData } from '../interfaces';
export declare function formatErrData(request?: XMLHttpRequest, opts?: {}): IResponseErrData;
export default function ajax(url: string, data: IMap<any> | string, options: IRequestOptions): Promise<IResponse>;
