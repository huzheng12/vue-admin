import {request as axios}  from "@/utils/request/index.js";

export default {
  // 站点配置》后台账号管理》角色权限管理》角色列表分页
  rolelist: params => {
    const { pageNo, pageSize } = params
    return axios.request({
      url: '/role/list',
      method: 'post',
      data: {
        pageNo, // 第几页
        pageSize // 每页几个
      }
    })
  },
  // 站点配置》后台账号管理》角色权限管理》角色查看详情
  checkdetail: params => {
    const { id } = params
    return axios.request({
      url: '/role/getone',
      method: 'post',
      data: {
        id // 角色id
      }
    })
  },
  // 站点配置》后台账号管理》角色权限管理》角色修改详情
  modifydetail: params => {
    const { id } = params
    return axios.request({
      url: '/role/modifysee',
      method: 'post',
      data: {
        id // 角色id
      }
    })
  },
  // 站点配置》后台账号管理》角色权限管理》角色删除
  roleremove: params => {
    const { ids } = params
    return axios.request({
      url: '/role/remove',
      method: 'post',
      data: {
        ids // 角色id
      }
    })
  },
  // 站点配置》后台账号管理》角色权限管理》角色添加
  roleadd: params => {
    const { name, permissionId, remark } = params
    return axios.request({
      url: '/role/add',
      method: 'post',
      data: {
        name, // 角色名称
        permissionId, // 权限id
        remark // 角色备注
      }
    })
  },
  // 站点配置》后台账号管理》角色权限管理》角色添加中菜单列表
  roleaddmenu: () => {
    return axios.request({
      url: '/role/addrolemenu',
      method: 'post'
    })
  },
  // 站点配置》后台账号管理》角色权限管理》角色修改
  rolemodify: params => {
    const { id, name, permissionId, remark } = params
    return axios.request({
      url: '/role/modify',
      method: 'post',
      data: {
        id, // 角色id
        name, // 角色名称
        permissionId, // 权限id
        remark // 角色备注
      }
    })
  },
  // 站点配置》后台账号管理》部门账号管理》部门树
  departlist: () => {
    return axios.request({
      url: '/organization/loadtree',
      method: 'post'
    })
  },
  // 站点配置》后台账号管理》部门账号管理》部门添加
  departadd: params => {
    const { name, pid, sortno } = params
    return axios.request({
      url: '/organization/add',
      method: 'post',
      data: {
        name, // 部门名称
        pid, // 父id
        sortno // 排序 默认写0
      }
    })
  },
  // 站点配置》后台账号管理》部门账号管理》部门删除
  departremove: params => {
    const { id } = params
    return axios.request({
      url: '/organization/remove',
      method: 'post',
      data: {
        id // 部门id
      }
    })
  },
  // 站点配置》后台账号管理》部门账号管理》部门详情
  departdetail: params => {
    const { id } = params
    return axios.request({
      url: '/organization/getone',
      method: 'post',
      data: {
        id // 部门id
      }
    })
  },
  // 站点配置》后台账号管理》部门账号管理》部门修改
  departmodify: params => {
    const { id, remark, name, sortno } = params
    return axios.request({
      url: '/organization/modify',
      method: 'post',
      data: {
        id, // 部门id
        remark, // 备注
        name, // 部门名称
        sortno // 排序 默认写0
      }
    })
  },
  // 站点配置》后台账号管理》部门账号管理》部门下用户列表
  userlist: params => {
    const { pageNo, pageSize, organizationId } = params
    return axios.request({
      url: '/user/list',
      method: 'post',
      data: {
        pageNo, // 第几页
        pageSize, // 每页几个
        organizationId // 组织ID
      }
    })
  },
  // 站点配置》后台账号管理》部门账号管理》部门下成员新增
  useradd: params => {
    const { username, password, email, mobile, truename, departmentId, roleIds } = params
    return axios.request({
      url: '/user/add',
      method: 'post',
      data: {
        username, // 用户名称
        password, // 用户加密密码
        email, // 邮箱
        mobile, // 手机
        truename, // 用户真实姓名
        departmentId, // 部门ID
        roleIds // 角色id 多个角色之间逗号分隔  传数组！
      }
    })
  },
  // 站点配置》后台账号管理》部门账号管理》部门下成员新增时的角色列表
  useraddroles: () => {
    return axios.request({
      url: '/role/all',
      method: 'post'
    })
  },
  // 站点配置》后台账号管理》部门账号管理》部门下成员详情
  userdetail: params => {
    const { id } = params
    return axios.request({
      url: '/user/getone',
      method: 'post',
      data: {
        id // 用户id 
      }
    })
  },
  // 站点配置》后台账号管理》部门账号管理》部门下成员修改
  usermodify: params => {
    const { username, email, mobile, truename, departmentId, roleIds, id } = params
    return axios.request({
      url: '/user/modify',
      method: 'post',
      data: {
        username, // 用户名称
        email, // 邮箱
        mobile, // 手机
        truename, // 用户真是姓名
        departmentId, // 部门ID
        roleIds, // 角色id 多个角色之间逗号分隔  传数组！
        id // 用户id
      }
    })
  },
  // 站点配置》后台账号管理》部门账号管理》部门下用户重置密码
  userresetpwd: params => {
    const { id, newPwd, rePwd } = params
    return axios.request({
      url: '/user/resetpwd',
      method: 'post',
      data: {
        id, // 用户id
        newPwd, // 用户新密码 加密
        rePwd // 用户再次输入密码 加密
      }
    })
  },
  // 站点配置》后台账号管理》部门账号管理》部门下用户删除
  userremove: params => {
    const { ids } = params
    return axios.request({
      url: '/user/remove',
      method: 'post',
      data: {
        ids // 用户id 可批量删除 逗号分隔
      }
    })
  },
}