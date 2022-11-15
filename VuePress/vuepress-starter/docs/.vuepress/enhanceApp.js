/**
 * @name enhanceApp
 * @description
 * 当该文件存在的时候，会被导入到应用内部
 * 使用这个钩子来安装一些附加的 Vue 插件、注册全局组件，或者增加额外的路由钩子等
 */

// 使用异步函数也是可以的
export default ({
  Vue, // VuePress 正在使用的 Vue 构造函数
  options, // 附加到根实例的一些选项
  router, // 当前应用的路由实例
  siteData, // 站点元数据
  isServer, // 当前应用配置是处于 服务端渲染 或 客户端
}) => {
  // ...做一些其他的应用级别的优化
  console.log(
    " enhanceApp:Vue, options, router, siteData, isServer: ",
    Vue,
    options,
    router,
    siteData,
    isServer
  );
};
