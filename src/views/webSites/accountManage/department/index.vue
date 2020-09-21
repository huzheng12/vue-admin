<template>
  <div class="department-container">
    <div class="left-box">
      <div class="department-text">组织机构</div>
      <div class="custom-tree-container">
        <div>
          <!-- :render-content="renderContent" -->
          <el-tree :data="data" node-key="id" accordion default-expand-all :expand-on-click-node="false" @node-click="treeNodeClick">
            <span class="custom-tree-node" slot-scope="{ node, data }" @mouseenter="mouseenter(node,data)" @mouseleave="mouseleave(node,data)">
              <span style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">
                <span>{{ node.label }}</span>
              </span>
              <span v-if="data.pid === 0">
                <i class="el-icon-edit hover" style="margin-right:6px" @click.stop="handleEdit(data)" v-if="$filterBtnRoute(1197)" v-show="node.edit"
                  title="编辑"></i>
                <i class="el-icon-plus hover" @click="handleAdd(node,data)" v-if="$filterBtnRoute(1196)" v-show="node.del" title="添加"></i>
              </span>
              <span v-else>
                <i class="el-icon-edit hover" style="margin-right:6px" @click.stop="handleEdit(data)" v-if="$filterBtnRoute(1198)" v-show="node.edit"
                  title="编辑"></i>
                <i class="el-icon-delete hover" @click="handleDel(node, data)" v-if="$filterBtnRoute(1199)" v-show="node.del" title="删除"></i>
              </span>
            </span>
            <!-- <div scoped-slot="scope">
              {{scope}}
            </div>-->
          </el-tree>
        </div>
      </div>
    </div>
    <div class="right-box" v-if="isClick">
      <div class="department-text">【{{title}}】</div>
      <div class="user-text">
        <div class="department-text user-management">用户管理</div>
        <el-tooltip content="刷新" placement="top">
          <span class="svg-container" @click="handleRefresh">
            <svg-icon icon-class="refreshes" />
          </span>
        </el-tooltip>
      </div>
      <!-- 按钮 -->
      <el-button icon="el-icon-folder-add" v-if="$filterBtnRoute(1189)" @click="handleAddUser">添加</el-button>
      <!-- 表格start -->
      <el-table ref="singleTable" :data="tableData" tooltip-effect="dark" style="width: 100%;margin-top: 20px">
        <!-- <el-table-column align="center" type="selection" width="55">
        </el-table-column>-->
        <el-table-column align="center" type="index" label="序号" width="120"></el-table-column>
        <el-table-column align="center" prop="username" label="账号" width="120">
          <template slot-scope="scope">{{ scope.row.username ? scope.row.username : '-' }}</template>
        </el-table-column>
        <el-table-column align="center" prop="roleName" label="角色" width="180">
          <template slot-scope="scope">{{ scope.row.roleName ? scope.row.roleName : '-' }}</template>
        </el-table-column>
        <el-table-column align="center" prop="departmentName" label="部门" show-overflow-tooltip width="120">
          <template slot-scope="scope">{{ scope.row.departmentName ? scope.row.departmentName : '-' }}</template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button v-if="$filterBtnRoute(1190)" @click="handleViewUser(scope.row)" type="text" size="small">查看</el-button>
            <el-button v-if="$filterBtnRoute(1191)" @click="handleEditUser(scope.row)" type="text" size="small">编辑</el-button>
            <el-button v-if="$filterBtnRoute(1192)" @click="handleRemoveUser(scope.row)" type="text" size="small">删除</el-button>
            <el-button v-if="$filterBtnRoute(1193)" @click="handleResetPassword(scope.row)" type="text" size="small">重置密码</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 表格end -->
      <!-- 分页start -->
      <div class="block">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageParam.pageCurrent"
          :page-sizes="pageParam.pageSizes" :page-size="pageParam.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pageParam.total">
        </el-pagination>
      </div>
      <!-- 分页end -->
      <!-- 编辑部门对话框start -->
      <el-dialog title="编辑" :visible.sync="dialogFormVisible">
        <el-form :model="editForm">
          <el-form-item label="名称" :label-width="formLabelWidth">
            <el-input v-model="editForm.name" autocomplete="off" class="inputs"></el-input>
          </el-form-item>
          <el-form-item label="排序号" :label-width="formLabelWidth">
            <el-input-number class="inputs" v-model="editForm.sortNum" controls-position="right" :min="0"></el-input-number>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" v-if="$filterBtnRoute(1202)" @click="handleEditDialogForm">提 交</el-button>
        </div>
      </el-dialog>
      <!-- 编辑部门对话框end-->
      <!-- 添加部门对话框start -->
      <el-dialog title="添加部门" :visible.sync="addDialogFormVisible">
        <el-form :model="addForm">
          <el-form-item label="名称" :label-width="formLabelWidth">
            <el-input v-model="addForm.name" autocomplete="off" class="inputs"></el-input>
          </el-form-item>
          <el-form-item label="排序号" :label-width="formLabelWidth">
            <el-input-number class="inputs" v-model="addForm.num" controls-position="right" :min="0"></el-input-number>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addDialogFormVisible = false">取 消</el-button>
          <el-button type="primary" v-if="$filterBtnRoute(1200)" @click="handleAddDialogForm">提 交</el-button>
        </div>
      </el-dialog>
      <!-- 添加部门对话框end-->
      <!-- 用户管理查看用户对话框start -->
      <el-dialog title="查看用户" :visible.sync="viewUserDialogFormVisible" class="dialogs">
        <el-form :model="viewForm">
          <el-form-item label="账号" :label-width="viewFormLabelWidth">
            <el-input v-model="viewForm.account" autocomplete="off" class="inputs" disabled></el-input>
          </el-form-item>
          <el-form-item label="部门" :label-width="viewFormLabelWidth">
            <el-input v-model="viewForm.department" class="inputs" disabled></el-input>
          </el-form-item>
          <el-form-item label="角色" :label-width="viewFormLabelWidth">
            <el-input v-model="viewForm.name" class="inputs" disabled></el-input>
          </el-form-item>
        </el-form>
      </el-dialog>
      <!-- 用户管理查看用户对话框end -->
      <!-- 用户管理编辑用户对话框start -->
      <el-dialog title="编辑用户" :visible.sync="editUserDialogFormVisible" class="dialogs">
        <el-form :model="editUserForm">
          <el-form-item label="账号" :label-width="viewFormLabelWidth">
            <el-input v-model="editUserForm.account" autocomplete="off" class="inputs" disabled></el-input>
          </el-form-item>
          <el-form-item label="部门" :label-width="viewFormLabelWidth">
            <el-select v-model="editUserForm.id" class="inputs">
              <el-option v-for="item in departmentListOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="角色" :label-width="viewFormLabelWidth">
            <el-select v-model="editUserForm.ids" placeholder="请选择" class="inputs" multiple>
              <el-option v-for="item in roleNameOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="editUserDialogFormVisible = false">取 消</el-button>
          <el-button type="primary" v-if="$filterBtnRoute(1205)" @click="handleEditUserDialogForm">提 交</el-button>
        </div>
      </el-dialog>
      <!-- 用户管理编辑用户对话框end -->
      <!-- 用户管理重置用户密码对话框start -->
      <el-dialog title="重置密码" :visible.sync="resetPwdDialogFormVisible" class="dialogs">
        <el-form :model="resetPwdForm">
          <el-form-item label="账号" :label-width="viewFormLabelWidth">
            <el-input v-model="resetPwdForm.account" autocomplete="off" class="inputs" disabled></el-input>
          </el-form-item>
          <el-form-item label="新密码" :label-width="viewFormLabelWidth">
            <el-input v-model="resetPwdForm.newPwd" class="inputs" show-password></el-input>
          </el-form-item>
          <el-form-item label="确认密码" :label-width="viewFormLabelWidth">
            <el-input v-model="resetPwdForm.rePwd" class="inputs" show-password></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="resetPwdDialogFormVisible = false">取 消</el-button>
          <el-button type="primary" v-if="$filterBtnRoute(1206)" @click="handleResetPwdDialogForm">提 交</el-button>
        </div>
      </el-dialog>
      <!-- 用户管理重置用户密码对话框end -->
      <!-- 用户管理添加用户对话框start -->
      <el-dialog title="添加用户" :visible.sync="addUserDialogFormVisible" class="dialogs">
        <el-form :model="addUserForm">
          <el-form-item label="账号" :label-width="viewFormLabelWidth">
            <el-input v-model="addUserForm.account" autocomplete="off" class="inputs"></el-input>
          </el-form-item>
          <el-form-item label="登录密码" :label-width="viewFormLabelWidth">
            <el-input v-model="addUserForm.password" class="inputs" show-password></el-input>
          </el-form-item>
          <el-form-item label="部门" :label-width="viewFormLabelWidth">
            <el-input v-model="organizationName" class="inputs" disabled></el-input>
          </el-form-item>
          <el-form-item label="角色" :label-width="viewFormLabelWidth">
            <el-select v-model="addUserForm.name" placeholder="请选择" class="inputs" multiple>
              <el-option v-for="item in addRoleListOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addUserDialogFormVisible = false">取 消</el-button>
          <el-button type="primary" v-if="$filterBtnRoute(1204)" @click="handleAddUserDialogForm">提 交</el-button>
        </div>
      </el-dialog>
      <!-- 用户管理添加用户对话框end -->
    </div>
  </div>
</template>

<script>
// import { treeDataTranslate, convertTree, arrayToJson } from "@/utils/treeFormate";
import { convertTree, arrayToJson } from "@/utils/treeFormate";
let id = 1000;
export default {
  data() {
    return {
      resetPwdId: 0,
      organizationId: 0,
      organizationName: "",
      pid: 0,
      id: 0,
      title: "",
      isClick: false,
      data: [],
      tableData: [],
      multipleSelection: [],
      pageParam: {
        count: 0,
        total: 10,
        pageCurrent: 1, // 初始化为第一页
        pageSize: 5,
        pageSizes: [5, 10, 15, 20]
      },
      dialogFormVisible: false,
      addDialogFormVisible: false,
      viewUserDialogFormVisible: false,
      editUserDialogFormVisible: false,
      resetPwdDialogFormVisible: false,
      addUserDialogFormVisible: false,
      viewFormLabelWidth: "70px",
      formLabelWidth: "80px",
      editForm: {
        name: "",
        sortNum: 0
      },
      addForm: {
        name: "",
        num: 0
      },
      viewForm: {
        account: "",
        name: "",
        department: ""
      },
      editUserForm: {
        account: "",
        ids: [],
        id: ""
      },
      resetPwdForm: {
        account: "",
        newPwd: "",
        rePwd: ""
      },
      addUserForm: {
        account: "",
        password: "",
        name: "",
        department: ""
      },
      // 选择器
      roleNameOptions: [],
      departmentListOptions: [],
      currentDepartment: "",
      currentDepartmentId: "",
      addRoleListOptions: [],
      roleIdList: "",
      editUserId: 0
    };
  },
  methods: {
    // handle click refreshes icon
    handleRefresh() {
      this.userslist();
    },
    // treeNodeClick(node, data, store)
    treeNodeClick(node, data) {
      this.isClick = true;
      this.title = data.label;
      // console.log('treeNodeClickData',data)
      this.organizationId = data.data.value;
      this.organizationName = data.data.label;
      this.userslist();
    },
    // handleChange(value) {
    //   console.log(value);
    // },
    // 部门鼠标移入
    mouseenter(node) {
      this.$set(node, "edit", true);
      this.$set(node, "del", true);
    },
    // 部门鼠标移出
    mouseleave(node) {
      this.$set(node, "edit", false);
      this.$set(node, "del", false);
    },
    append(data) {
      const newChild = { id: id++, label: "testtest", children: [] };
      if (!data.children) {
        this.$set(data, "children", []);
      }
      data.children.push(newChild);
    },
    remove(node, data) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.id === data.id);
      children.splice(index, 1);
    },
    // 点击部门编辑icon
    handleEdit(data) {
      this.dialogFormVisible = true;
      // console.log('data11',data);
      this.id = data.value;
      this.editForm.name = data.label;
      this.editForm.sortNum = data.sortNum;
    },
    // 点击部门删除icon
    handleDel(node, data) {
      this.id = data.value;
      this.$confirm("确定删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$api.SiteConfiguration.departremove({
            id: this.id
          })
            .then(res => {
              // console.log('removeMessageRes', res)
              if (res.success) {
                this.$message({
                  type: "success",
                  message: res.msg
                });
                this.getDepartList();
              }else{
                this.$message({
                  type: "warning",
                  message: res.msg
                });
              }
            })
            .catch(e => {
              // Handle api request exception
              this.$handleError.handleApiRequestException(e);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 点击部门添加icon
    handleAdd(node, data) {
      this.addDialogFormVisible = true;
      this.pid = data.value;
      // console.log('nodenode',node);
    },
    // 点击添加提交按钮
    async handleAddDialogForm() {
      try {
        const res = await this.$api.SiteConfiguration.departadd({
          name: this.addForm.name,
          pid: this.pid,
          sortno: this.addForm.num
        });
        // console.log('departAddRes', res)
        if (res.success) {
          this.addDialogFormVisible = false;
          this.getDepartList();
        }
      } catch (e) {
        // Handle api request exception
        this.$handleError.handleApiRequestException(e);
      }
    },
    // 点击编辑部门提交按钮
    async handleEditDialogForm() {
      try {
        const res = await this.$api.SiteConfiguration.departmodify({
          name: this.editForm.name,
          id: this.id,
          sortno: this.editForm.sortNum
        });
        // console.log('departModifyRes', res)
        if (res.success) {
          this.dialogFormVisible = false;
          this.getDepartList();
        }
      } catch (e) {
        // Handle api request exception
        this.$handleError.handleApiRequestException(e);
      }
    },
    // 点击编辑用户提交按钮
    async handleEditUserDialogForm() {
      try {
        const res = await this.$api.SiteConfiguration.usermodify({
          username: this.editUserForm.account,
          id: this.id,
          departmentId: this.editUserForm.id,
          email: "",
          mobile: "",
          truename: "",
          roleIds: this.editUserForm.ids.join()
          // roleIds: JSON.stringify(this.editUserForm.ids)
        });
        // console.log('departModifyRes', res)
        if (res.success) {
          this.$message({
            type: "success",
            message: res.msg
          });
          this.editUserForm.ids = [];
          this.editUserForm.id = "";
          this.editUserDialogFormVisible = false;
          this.userslist();
        } else {
          this.$message({
            type: "warning",
            message: res.msg
          });
        }
      } catch (e) {
        // Handle api request exception
        this.$handleError.handleApiRequestException(e);
      }
    },
    // 点击编辑用户拉取select框数据
    async getEditUserSelect(data) {
      try {
        const res = await this.$api.SiteConfiguration.userdetail({
          id: data.id
        });
        // console.log('userdetailRes', res)
        if (res.success) {
          this.roleNameOptions = res.obj.rolelist;
          this.departmentListOptions = res.obj.organizationlist;
          this.editUserForm.id = res.obj.userInfo.organization.id;
          this.id = res.obj.userInfo.id;
          let roleIds = [];
          res.obj.userInfo.roleList.forEach(e => {
            roleIds.push(e.id);
          });
          this.editUserForm.ids = roleIds;
          // console.log('this.editUserForm.ids', this.editUserForm.ids);
        }
      } catch (e) {
        // Handle api request exception
        this.$handleError.handleApiRequestException(e);
      }
    },
    // 点击重置密码提交按钮
    async handleResetPwdDialogForm() {
      if (!this.resetPwdForm.newPwd) {
        return this.$message({
          type: "warning",
          message: "请输入新密码"
        });
      } else if (!this.resetPwdForm.rePwd) {
        return this.$message({
          type: "warning",
          message: "请确认新密码"
        });
      } else if (!/\w{5,}$/.test(this.resetPwdForm.newPwd)) {
        return this.$message({
          type: "warning",
          message: "密码可由大小写字母、数字、下划线任意组合，但不得少于5位"
        });
      } else if (this.resetPwdForm.newPwd !== this.resetPwdForm.rePwd) {
        return this.$message({
          type: "warning",
          message: "两次密码不一致"
        });
      }
      const mNewPwd = this.$md5.md5(this.resetPwdForm.newPwd);
      const mRePwd = this.$md5.md5(this.resetPwdForm.rePwd);
      try {
        const res = await this.$api.SiteConfiguration.userresetpwd({
          newPwd: mNewPwd,
          id: this.resetPwdId,
          rePwd: mRePwd
        });
        // console.log('resetPwdRes', res)
        if (res.success) {
          this.$message({
            type: "success",
            message: res.msg
          });
          this.resetPwdDialogFormVisible = false;
          this.$store.commit("UPDATE_USER_INFO", { userInfo: res.obj });
          // this.$store.commit('USER_LOGIN_OUT')
          // this.$router.push(`/login?redirect=${this.$route.fullPath}`)
        } else {
          this.$message({
            type: "warning",
            message: res.msg
          });
        }
      } catch (e) {
        // Handle api request exception
        this.$handleError.handleApiRequestException(e);
      }
    },
    // 点击添加用户提交按钮
    async handleAddUserDialogForm() {
      if (!this.addUserForm.account) {
        return this.$message({
          type: "warning",
          message: "请输入账号"
        });
      } else if (!this.addUserForm.password) {
        return this.$message({
          type: "warning",
          message: "请输入密码"
        });
      } else if (!/\w{5,}$/.test(this.addUserForm.password)) {
        return this.$message({
          type: "warning",
          message: "密码可由大小写字母、数字、下划线任意组合，但不得少于5位"
        });
      } else if (!this.addUserForm.name || this.addUserForm.name.length == 0) {
        return this.$message({
          type: "warning",
          message: "请选择角色"
        });
      }
      const mpassword = this.$md5.md5(this.addUserForm.password);
      try {
        const res = await this.$api.SiteConfiguration.useradd({
          username: this.addUserForm.account,
          password: mpassword,
          departmentId: this.organizationId,
          email: "",
          mobile: "",
          truename: "",
          roleIds: this.addUserForm.name.join()
        });
        // console.log('userAddRes', res)
        if (res.success) {
          this.$message({
            type: "success",
            message: res.msg
          });
          this.addUserDialogFormVisible = false;
          this.userslist();
        } else {
          this.$message({
            type: "warning",
            message: res.msg
          });
        }
      } catch (e) {
        // Handle api request exception
        this.$handleError.handleApiRequestException(e);
      }
    },
    // 点击添加用户拉取select框数据
    async getAddUserSelect() {
      try {
        const res = await this.$api.SiteConfiguration.useraddroles();
        if (res.success) {
          // console.log('useraddrolesRes', res)
          this.addRoleListOptions = res.obj;
          let roleIds = [];
          this.addRoleListOptions.forEach(e => {
            roleIds.push(e.id);
          });
          // this.roleIdList = roleIds.toString()
          this.roleIdList = roleIds;
          // console.log('roleIdList', this.roleIdList);
        }
      } catch (e) {
        // Handle api request exception
        this.$handleError.handleApiRequestException(e);
      }
    },
    // 取消选择
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    // 分页
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageParam.pageSize = Number(`${val}`);
      this.userslist();
    },
    handleCurrentChange(val) {
      this.pageParam.pageCurrent = Number(`${val}`);
      // console.log(`当前页: ${val}`);
      this.userslist();
    },
    // 获取部门树列表
    async getDepartList() {
      try {
        const res = await this.$api.SiteConfiguration.departlist();
        if (res.success) {
          // console.log('DepartListRes', res)
          let data = arrayToJson(JSON.parse(JSON.stringify(res.obj)));
          this.data = convertTree({
            treeArr: JSON.parse(JSON.stringify(data)),
            mapKey: {
              label: "name",
              value: "id",
              pid: "pid",
              children: "children",
              sortNum: "sortno"
            }
          });
          // this.messages = res.obj
          // this.propertys = res.obj.accountList
        }
      } catch (e) {
        // Handle api request exception
        this.$handleError.handleApiRequestException(e);
      }
    },
    // 部门下用户管理列表
    async userslist() {
      try {
        const res = await this.$api.SiteConfiguration.userlist({
          pageNo: this.pageParam.pageCurrent,
          pageSize: this.pageParam.pageSize,
          organizationId: this.organizationId
        });
        // console.log('userlistRes', res)
        if (res.success) {
          this.tableData = res.obj.records;
          // this.handleTableData(res.obj.records)
          this.pageParam.total = res.obj.total;
        }
      } catch (e) {
        // Handle api request exception
        this.$handleError.handleApiRequestException(e);
      }
    },
    // 表格数据列表
    handleTableData(listArr) {
      if (listArr && listArr.length) {
        const resArr = [];
        for (let i = 0; i < listArr.length; i++) {
          resArr.push({
            // 账号
            account: listArr[i].username,
            // 角色
            name: listArr[i].roleName,
            // 部门
            department: listArr[i].departmentName
          });
        }
        this.tableData = resArr;
        // console.log(resArr)
        return listArr;
      } else {
        return [];
      }
    },
    // 点击用户管理列表的编辑
    handleEditUser(row) {
      // console.log(row);
      this.editUserDialogFormVisible = true;
      this.editUserForm.account = row.username;
      this.getEditUserSelect(row);
      // this.editUserId = row.id
    },
    // 点击用户管理列表的删除
    handleRemoveUser(row) {
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$api.SiteConfiguration.userremove({
            ids: row.id
          })
            .then(res => {
              // console.log('removeMessageRes', res)
              if (res.success) {
                this.$message({
                  type: "success",
                  message: res.msg
                });
                // location.reload()
                this.userslist();
              }
            })
            .catch(e => {
              // Handle api request exception
              this.$handleError.handleApiRequestException(e);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 点击用户管理列表的查看
    handleViewUser(row) {
      // console.log('row', row);
      this.viewUserDialogFormVisible = true;
      // this.rowArr = row
      this.viewForm.account = row.username;
      this.viewForm.department = row.departmentName;
      this.viewForm.name = row.roleName;
    },
    // 点击用户管理列表的重置密码
    handleResetPassword(row) {
      // console.log('row', row);
      this.resetPwdDialogFormVisible = true;
      this.resetPwdForm.account = row.username;
      this.resetPwdId = row.id;
      this.resetPwdForm.newPwd = "";
      this.resetPwdForm.rePwd = "";
    },
    // 点击用户管理列表的添加
    handleAddUser() {
      this.addUserDialogFormVisible = true;
      this.getAddUserSelect();
    }
  },
  mounted() {
    this.getDepartList();
  }
};
</script>

<style lang="scss" scoped>
.block {
  margin-top: 35px;
}
.department-container {
  margin: 30px;
  .left-box {
    width: 20%;
    height: 500px;
    display: inline-block;
  }
  .department-text {
    margin: 0px 0 10px;
    line-height: 34px;
    border-bottom: 2px solid #ebebeb;
    position: relative;
    font-size: 18px;
    color: #3b96dc;
    &::after {
      content: '';
      width: 76px;
      height: 2px;
      background: #3b96dc;
      position: absolute;
      left: 0;
      bottom: -2px;
    }
  }
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
  .right-box {
    width: 77%;
    position: absolute;
    margin: 0 20px;
    height: 500px;
    display: inline-block;
    .user-text {
      display: flex;
      justify-content: space-between;
      .svg-container {
        display: inline-block;
      }
    }
    .user-management {
      font-size: 16px;
      display: inline-block;
    }
    .inputs {
      width: 300px;
    }
    .dialogs {
      width: 1000px;
      margin: 0 auto;
    }
  }
}
</style>