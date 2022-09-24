module.exports = {
  title: '后台管理模版',

  name: 'background-management', // 英文，和page.json保持一致

  /**
   * @type {boolean} true | false
   * @description Whether fix the header
   */
  fixedHeader: false,

  /**
   * @type {boolean} true | false
   * @description Whether show the logo in sidebar
   */
  sidebarLogo: true,

  /**
   * @type {number}
   * @description 前端路由模式
   * @value 0 静态路由
   * @value 1 根据不同的角色
   * @value 2 后端返回路由
   */
  routingMode: 1
}
