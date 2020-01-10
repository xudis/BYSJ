import { IMap, IRequestOptions, IResponse, IResponseData } from './interfaces';
export default function combine<T, U>(url: string, data?: IMap<any>, options?: IRequestOptions): Promise<{
    data: IResponseData<T, U>;
    res: IResponse;
}>;
