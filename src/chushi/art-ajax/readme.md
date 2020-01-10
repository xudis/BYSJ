# `Art`
Art框架是中移在线服务有限公司前端组开发，对前端ajax请求进行封装，统一API接口。包括`get`、`post`、`put`、`delete`方法    


## Example 使用

```ts
import { post } from 'art-ajax';
interface IBean{}
interface IBeans{}

post<data.bean返回数据类型,data.beans返回数据格式类型>('./testurl').then({data, res}=>{
 // returnCode为0 成功处理
 },(err)=>{
 // 失败错误处理
 });
  
post<IBean,IBeans>('./testurl',{ p1: "v1" },{
  	headers: {"content-type": "json" };
  	responseType?: 'json';
  	timeout: 1000;
}).then({data, res}=>{});
```