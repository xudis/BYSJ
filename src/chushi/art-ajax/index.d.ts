import combine from './src/combine';
import { Config as _Config } from './src/core/globalConfig';
import del from './src/delete';
import get from './src/get';
import { IResponseErrData } from './src/interfaces';
import post from './src/post';
import put from './src/put';
declare const Ajax: {
    put: typeof put;
    get: typeof get;
    post: typeof post;
    del: typeof del;
    combine: typeof combine;
    globalConfig: _Config;
};
export default Ajax;
declare namespace Ajax {
    type errInfo = IResponseErrData;
}
