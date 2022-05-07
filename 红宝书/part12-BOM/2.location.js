/**
 * @name location
 * @description 最有用的 BOM 之一，用于获取当前窗口的信息，已经通用的导航功能。
 * 独特之处：它既是 window 对象，也是 document 的对象。window.location 和 document.location 是同一个指向
 */

// 常用属性
const {
  host, // 服务器名与端口名：1
  hostname, // 服务器名
  search, // URL 查询参数，通常以问号开头
  origin, // 带协议的服务器名,
  pathname, // 路径
  port, // 端口
  protocol, // 协议
} = location;

console.log(
  "location 上常见的字段：",
  host,
  hostname,
  search,
  origin,
  pathname,
  port,
  protocol
);
// 查询 search 中的字符串
void (function () {
  // 1.手动实现
  let getQueryStringArgs = () => {
    const { search } = location;
    let qs = search?.length > 0 ? search.substring(1) : "";
    let args = {};
    for (const keys of qs.split("&")?.map((kv) => kv.split("="))) {
      console.log("keys", keys);
      // 解析参数
      const key = decodeURIComponent(keys[0]);
      const value = decodeURIComponent(keys[1]);
      if (key.length) {
        args[key] = value;
      }
    }
    return args;
  };
  const args = getQueryStringArgs();
  console.log("args", args, args["id"], args["a"]);
  // 2.借助原生方法实现 URLSearchParams 构造函数
  const search = new URLSearchParams(location.search);
  console.log("search", search.toString());
  console.log(search.has("id"));
  console.log(search.get("id"), search.set("zt", 18),search.toString());
})();
