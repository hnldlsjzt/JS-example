const sidebar = [
    { title: "快速开始", link: "/" },
    {
      title: "通用",
      children: [{ title: "Button 按钮", link: "/components/button/" }],
    },
    { title: "导航" },
    { title: "反馈" },
    { title: "数据录入" },
    { title: "数据展示" },
    { title: "布局" },
  ]
module.exports = {
  title: "vuepress",
  description: "just playing around",
  themeConfig: {
    logo: "/assets/logo.png",
    nav: [
      { text: "Home", link: "/" },
      { text: "Guide", link: "/guide/" },
      { text: "External", link: "https://www.baidu.com" },
      {
        text: "语言",
        ariaLabel: "Language Menu",
        items: [
          { text: "中文", link: "/language/chinese/" },
          { text: "英文", link: "/language/english/" },
        ],
      },
    ],
    sidebar
    // sidebar: [
    //   {
    //     title: "分组", // 必要的
    //     path: "/guide/", // 可选的, 标题的跳转链接，应为绝对路径且必须存在
    //     collapsable: false, // 可选的, 默认值是 true,
    //     sidebarDepth: 1, // 可选的, 默认值是 1
    //     children: ["/"],
    //   },
    //   {
    //     title: "emoji", // 必要的
    //     path: "/emoji/", // 可选的, 标题的跳转链接，应为绝对路径且必须存在
    //   },
    // ],
  },
  configureWebpack: {
    resolve: {
      alias: {
        "@alias": "public",
      },
    },
  },
};
