import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* Layout */
import Layout from "@/layout/index.vue";

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: "/login",
      component: () => import("@/views/login/index"),
      hidden: true,
    },
    {
      path: "/404",
      component: () => import("@/views/404"),
      hidden: true,
    },
  ],
});
export const common = [
  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: () => import("@/views/dashboard/index"),
        meta: { title: "仪表盘", icon: "dashboard" },
      },
    ],
  },
];
//404
export const notFind = [
  // 404 page must be placed at the end !!!
  { path: "*", redirect: "/404", hidden: true },
];
export const website = [
  {
    path: "/authorityManage",
    component: Layout,
    redirect: "/authorityManage/index",
    meta: { title: "菜单管理", icon: "dashboard", id: 808 },
    children: [
      {
        path: "index",
        name: "AuthorityManage",
        component: () => import("@/views/webSites/authorityManage/index"),
        meta: { title: "菜单管理", icon: "dashboard", id: 813 },
      },
    ],
  },
  {
    path: "/accountManage",
    component: Layout,
    name: "AccountManage",
    redirect: "/accountManage/department",
    meta: { title: "后台账号管理", icon: "example", id: 814 },
    children: [
      {
        path: "department",
        name: "Department",
        component: () => import("@/views/webSites/accountManage/department"),
        meta: { title: "部门账号管理", icon: "form", id: 816 },
      },
      {
        path: "rolePower",
        name: "RolePower",
        component: () => import("@/views/webSites/accountManage/rolePower"),
        meta: { title: "角色权限管理", icon: "form", id: 815 },
      },
    ],
  },
  {
    path: "/systemConfig",
    component: Layout,
    name: "SystemConfig",
    redirect: "/systemConfig/dataDictionary",
    meta: { title: "系统配置管理", icon: "example", id: 842 },
    children: [
      {
        path: "dataDictionary",
        name: "DataDictionary",
        component: () => import("@/views/webSites/systemConfig/dataDictionary"),
        meta: { title: "数据字典管理", icon: "form", id: 843 },
      },
    ],
  },
];

export const customerService = [
  // 注册用户管理
  // {
  //   path: "/registeredUsers",
  //   component: Layout,
  //   name: "RegisteredUsers",
  //   redirect: "/registeredUsers/unnamedUser",
  //   meta: { title: "注册用户管理", icon: "example", id: 806 },
  //   children: [
  //     {
  //       path: "realNameUser",
  //       name: "RealNameUser",
  //       component: () =>
  //         import("@/views/customerservice/registeredUsers/realNameUser"),
  //       meta: { title: "已实名用户管理", icon: "form", id: 1010 },
  //     },
  //     {
  //       path: "unnamedUser",
  //       name: "UnnamedUser",
  //       component: () =>
  //         import("@/views/customerservice/registeredUsers/unnamedUser"),
  //       meta: { title: "未实名用户管理", icon: "form", id: 1009 },
  //     },
  //     {
  //       path: "whitelistUser",
  //       name: "WhitelistUser",
  //       component: () =>
  //         import("@/views/customerservice/registeredUsers/whitelistUser"),
  //       meta: { title: "白名单用户管理", icon: "form", id: 1018 },
  //     },
  //     {
  //       path: "deviceWhitelist",
  //       name: "DeviceWhitelist",
  //       component: () =>
  //         import("@/views/customerservice/registeredUsers/deviceWhitelist"),
  //       meta: { title: "设备白名单管理", icon: "form", id: 1095 },
  //     },
  //   ],
  // },
  // 客户工单管理
  {
    path: "/customerTickets",
    component: Layout,
    name: "CustomerTickets",
    redirect: "/customerTickets/ticketCategory",
    meta: { title: "客户工单管理", icon: "example", id: 807 },
    children: [
      {
        path: "ticketCategory",
        name: "TicketCategory",
        component: () =>
          import("@/views/customerservice/customerTickets/ticketCategory"),
        meta: { title: "工单类别管理", icon: "form", id: 1033 },
      },
      {
        path: "ticketProcessing",
        name: "TicketProcessing",
        component: () =>
          import("@/views/customerservice/customerTickets/ticketProcessing"),
        meta: { title: "工单任务处理", icon: "form", id: 1034 },
      },
    ],
  },
];

export const global_management = [
  // 多语种短信管理
  {
    path: "/globalMessge",
    component: Layout,
    name: "GlobalMessge",
    redirect: "/globalMessge",
    meta: { title: "多语种短信管理", icon: "example", id: 847 },
    children: [
      {
        path: "/messageTemplate",
        name: "messageTemplate",
        component: () =>
          import("@/views/global_management/global_message/message-template"),
        meta: { title: "短信模板管理", icon: "dashboard", id: 848 },
      },
      {
        path: "/messageRecord",
        name: "messageRecord",
        component: () =>
          import("@/views/global_management/global_message/message-record"),
        meta: { title: "短信发送记录", icon: "dashboard", id: 849 },
      },
    ],
  },
  // {
  //   path: '/globalMap',
  //   component: Layout,
  //   name: 'GlobalMap',
  //   redirect: '/globalMap',
  //   meta: { title: '多语种配图管理', icon: 'example', id: 880 },
  //   children: [
  //     {
  //       path: '/mapBanner',
  //       name: 'mapBanner',
  //       component: () =>
  //         import('@/views/global_management/global_map/map_banner'),
  //       meta: { title: 'banner管理', icon: 'dashboard', id: 881 },
  //     },
  //   ],
  // },
  // // 多语种信件管理
  // {
  //   path: "/globalLetter",
  //   component: Layout,
  //   name: "GlobalLetter",
  //   redirect: "/globalLetter",
  //   meta: { title: "多语种信件管理", icon: "example", id: 1002 },
  //   children: [
  //     {
  //       path: "/letterTemplate",
  //       name: "letterTemplate",
  //       component: () =>
  //         import("@/views/global_management/global-letter/letter-template"),
  //       meta: { title: "系统信件模板", icon: "dashboard", id: 1003 },
  //     },
  //     {
  //       path: "/letterRecord",
  //       name: "letterRecord",
  //       component: () =>
  //         import("@/views/global_management/global-letter/letter-record"),
  //       meta: { title: "系统信件记录", icon: "dashboard", id: 1004 },
  //     },
  //   ],
  // },
  // // 文稿
  // {
  //   path: "/draft",
  //   component: Layout,
  //   name: "Draft",
  //   redirect: "/draft/draftContent",
  //   meta: { title: "多语种文稿管理", icon: "example", id: 839 },
  //   children: [
  //     {
  //       path: "draftContent",
  //       name: "DraftContent",
  //       component: () => import("@/views/global_management/draft/draftContent"),
  //       meta: { title: "文稿内容管理", icon: "form", id: 856 },
  //     },
  //     {
  //       path: "draftCategory",
  //       name: "DraftCategory",
  //       component: () =>
  //         import("@/views/global_management/draft/draftCategory"),
  //       meta: { title: "文稿类别管理", icon: "form", id: 854 },
  //     },
  //   ],
  // },
];

//按钮路由
export const btnRoute = [
  {
    path: "/addRole",
    name: "AddRole",
    hidden: true,
    component: () => import("@/views/webSites/accountManage/rolePower/addRole"),
    meta: { title: "添加角色", icon: "form", id: 818 },
  },
  {
    path: "/viewRole",
    name: "ViewRole",
    hidden: true,
    component: () =>
      import("@/views/webSites/accountManage/rolePower/viewRole"),
    meta: { title: "角色详情", icon: "form", id: 817 },
  },
  {
    path: "/messageAddition",
    name: "messageAddition",
    hidden: true,
    component: () =>
      import("@/views/global_management/global_message/message-addition"),
    meta: { title: "添加模板", icon: "form", id: 850 },
  },
  {
    path: "/messageModify/:id/:lang",
    name: "messageModify",
    hidden: true,
    component: () =>
      import("@/views/global_management/global_message/message-modify"),
    meta: { title: "修改模板", icon: "form", id: 851 },
  },
  // 站内信
  {
    path: "/letterAddition",
    name: "letterAddition",
    hidden: true,
    component: () =>
      import("@/views/global_management/global-letter/letter-addition"),
    meta: { title: "添加站内信模板", icon: "form", id: 1005 },
  },
  {
    path: "/letterModify/:id",
    name: "letterModify",
    hidden: true,
    component: () =>
      import("@/views/global_management/global-letter/letter-modify"),
    meta: { title: "修改站内信模板", icon: "form", id: 1006 },
  },
  {
    path: '/draftCategory/addCategory',
    name: 'AddCategory',
    hidden: true,
    component: () =>
      import('@/views/global_management/draft/draftCategory/addCategory'),
    meta: { title: '添加分类', icon: 'form', id: 869 },
  },
  {
    path: '/draftCategory/editCategory/:id',
    name: 'EditCategory',
    hidden: true,
    component: () =>
      import('@/views/global_management/draft/draftCategory/editCategory'),
    meta: { title: '编辑分类', icon: 'form', id: 870 },
  },
  {
    path: '/draftContent/addContent',
    name: 'AddContent',
    hidden: true,
    component: () =>
      import('@/views/global_management/draft/draftContent/addContent'),
    meta: { title: '添加文章', icon: 'form', id: 861 },
  },
  {
    path: '/editRole/:id',
    name: 'EditRole',
    hidden: true,
    component: () =>
      import('@/views/webSites/accountManage/rolePower/editRole'),
    meta: { title: '角色编辑详情', icon: 'form', id: 821 },
  },
  {
    path: '/addRole',
    name: 'AddRole',
    hidden: true,
    component: () => import('@/views/webSites/accountManage/rolePower/addRole'),
    meta: { title: '添加角色', icon: 'form', id: 818 },
  },
  {
    path: '/viewRole',
    name: 'ViewRole',
    hidden: true,
    component: () =>
      import('@/views/webSites/accountManage/rolePower/viewRole'),
    meta: { title: '角色详情', icon: 'form', id: 817 },
  },
  {
    path: '/draftContent/editContent/:id',
    name: 'EditContent',
    hidden: true,
    component: () =>
      import('@/views/global_management/draft/draftContent/editContent'),
    meta: { title: '编辑文章', icon: 'form', id: 863 },
  },
  {
    path: '/draftContent/infoContent/:id',
    name: 'InfoContent',
    hidden: true,
    component: () =>
      import('@/views/global_management/draft/draftContent/infoContent'),
    meta: { title: '查看文章', icon: 'form', id: 862 },
  }, {
    path: '/addBanner',
    name: 'addBanner',
    hidden: true,
    component: () => import('@/views/global_management/global_map/add_banner'),
    meta: { title: '添加', icon: 'form', id: 882 },
  },
  {
    path: '/modifyBanner/:id',
    name: 'modifyBanner',
    hidden: true,
    component: () =>
      import('@/views/global_management/global_map/modify_banner'),
    meta: { title: '编辑', icon: 'form', id: 883 },
  }
];
//layout路由
export const layout = [
  {
    path: "/btnRouter",
    component: Layout,
    children: [],
  },
];
