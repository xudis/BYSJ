import { IMap, IRequestOptions, IResponse, IResponseData } from '../interfaces';
export default function requestHandle<T, U>(url: string, ajaxData: IMap<any> | string, options: IRequestOptions): Promise<{
    data: IResponseData<T, U>;
    res: IResponse;
}>;
