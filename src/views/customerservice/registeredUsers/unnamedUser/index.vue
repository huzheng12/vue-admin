<template>
  <div class="mailConfig">
    <div class="title text-blue text-size18">
      <span class="border">未实名用户管理</span>
      <el-button class="refresh-btn" size="mini" @click="refresh">
        <i class="el-icon-refresh"></i>
      </el-button>
    </div>
    <!-- 表单 -->
    <el-form ref="queryform" class="form" label-position="top" :inline="true" :model="queryForm">
      <el-form-item label="实名状态">
        <el-select v-model="queryForm.states" placeholder="请选择">
          <el-option label="请选择" value=""></el-option>
          <el-option v-for="item in isrealnameChangeArr" :key="item.text" :label="item.text" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="queryForm.email"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="queryForm.mobilePhone"></el-input>
      </el-form-item>
      <el-form-item label="真实姓名">
        <el-input v-model="queryForm.trueName"></el-input>
      </el-form-item>
      <el-form-item label="证件号">
        <el-input v-model="queryForm.cardId"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="from-btn" type="primary" icon="el-icon-search" @click="onSubmitQuery">查询</el-button>
        <el-button class="from-btn" type="danger" icon="el-icon-refresh-right" @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 按钮 -->
    <div class="btn-wrap">
      <el-button
        class="btn"
        icon="el-icon-setting"
        @click="isHasemailAppcustomer"
      >邮件激活</el-button>
      <el-button
        class="btn"
        icon="el-icon-setting"
        @click="resetSecurityAppcustomer"
      >重置安全策略</el-button>
      <el-button
        v-if="$filterBtnRoute(1014)"
        class="btn"
        icon="el-icon-setting"
        @click="auditRealNameAppcustomer"
      >实名审核</el-button>
      <el-button
        class="btn"
        icon="el-icon-setting"
        @click="moreAuditAppcustomer"
      >实名批量通过</el-button>
      <el-button class="btn" icon="el-icon-setting" @click="auditallAppcustomer">清除实名信息</el-button>
      <el-button class="btn" icon="el-icon-setting" @click="showPwdDialog">重置密码</el-button>
      <el-button class="btn" icon="el-icon-setting" @click="forbiddenAppcustomer">禁用</el-button>
      <el-button class="btn" icon="el-icon-setting" @click="permissibleAppcustomer">解禁</el-button>
      <el-button
        class="btn"
        icon="el-icon-setting"
        @click="openChangeAppcustomer"
      >交易开启</el-button>
      <el-button
        class="btn"
        icon="el-icon-setting"
        @click="fnCloseChangeAppcustomer"
      >交易关闭</el-button>
    </div>
    <!-- 表格 -->
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="50"></el-table-column>
      <el-table-column align="center" type="index" label="序号" width="50"></el-table-column>
      <el-table-column align="center" prop="appPersonInfo.email" label="邮箱">
        <template
          slot-scope="scope"
        >{{ scope.row.appPersonInfo.email ? scope.row.appPersonInfo.email : '-' }}</template>
      </el-table-column>
      <el-table-column align="center" prop="appPersonInfo.mobilePhone" label="手机号" width="150">
        <template
          slot-scope="scope"
        >{{ scope.row.appPersonInfo.mobilePhone ? scope.row.appPersonInfo.mobilePhone : '-' }}</template>
      </el-table-column>
      <el-table-column align="center" prop="appPersonInfo.surname" label="姓氏">
        <template
          slot-scope="scope"
        >{{ scope.row.appPersonInfo.surname ? scope.row.appPersonInfo.surname : '-' }}</template>
      </el-table-column>
      <el-table-column align="center" prop="appPersonInfo.trueName" label="名字" width="50">
        <template
          slot-scope="scope"
        >{{ scope.row.appPersonInfo.trueName ? scope.row.appPersonInfo.trueName : '-' }}</template>
      </el-table-column>
      <el-table-column align="center" prop="appPersonInfo.cardType" label="证件类型">
        <template
          slot-scope="scope"
        >{{ scope.row.appPersonInfo.cardType ? scope.row.appPersonInfo.cardType : '身份证' }}</template>
      </el-table-column>
      <el-table-column align="center" prop="appPersonInfo.cardId" label="证件号">
        <template
          slot-scope="scope"
        >{{ scope.row.appPersonInfo.cardId ? scope.row.appPersonInfo.cardId : '-' }}</template>
      </el-table-column>
      <el-table-column align="center" prop="appPersonInfo.created" label="注册时间">
        <template
          slot-scope="scope"
        >{{ $moment(scope.row.appPersonInfo.created).format('YYYY-MM-DD, h:mm:ss') }}</template>
      </el-table-column>
      <el-table-column align="center" prop="googleState" label="谷歌认证">
        <template slot-scope="scope">{{ scope.row.googleState ? '认证' : '未认证' }}</template>
      </el-table-column>
      <el-table-column align="center" prop="phoneState" label="手机认证">
        <template slot-scope="scope">{{ scope.row.phoneState ? '认证' : '未认证' }}</template>
      </el-table-column>
      <el-table-column align="center" prop="states" label="实名状态">
        <template slot-scope="scope">{{ returnIsreal(scope.row.states) }}</template>
      </el-table-column>
      <el-table-column align="center" prop="isDelete" label="是否禁用">
        <template slot-scope="scope">{{ scope.row.isDelete ? '禁用' : '未禁用' }}</template>
      </el-table-column>
      <el-table-column align="center" prop="isChange" label="是否启开交易">
        <template slot-scope="scope">{{ !scope.row.isChange ? '已开启' : '未开启' }}</template>
      </el-table-column>
      <el-table-column align="center" prop="hasEmail" label="是否激活">
        <template slot-scope="scope">{{ scope.row.hasEmail ? '已激活' : '未激活' }}</template>
      </el-table-column>
      <el-table-column align="center" prop="isMarketTransactions" label="市价交易">
        <template slot-scope="scope">{{ scope.row.isMarketTransactions ? '开启' : '未开启' }}</template>
      </el-table-column>
      <el-table-column align="center" prop="fishingCode" label="防钓鱼码">
        <template slot-scope="scope">{{ scope.row.status ? scope.row.status : '未设置' }}</template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 20]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>

    <!-- 重置密码弹窗 -->
    <el-dialog
      title="信息"
      :visible.sync="pwdDialogVisible"
      width="30%"
      center
      @close="pwdDialogClose"
    >
      <el-input type="password" v-model="password" placeholder="修改登录密码(密码为8-12位且包含大写字母、小写字母以及数字)"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="setPwAppcustomer">提交</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'UnNameUserIndex',
  props: {},
  data() {
    return {
      tableData: null,
      queryForm: {
        // 查询表单
        email: '',
        mobilePhone: '',
        trueName: '',
        states: '',
        isReal: 0, //实名状态
        cardId: '' // 证件号
      },
      currentPage: 1, // 初始当前第几页
      pageSize: 10, // 初始当前每页条数
      total: 0, // 总条数
      multipleSelection: [], // 被勾选的数据行
      password: '', // pwd
      pwdDialogVisible: false, // 弹窗是否显示
      isrealnameArr: [],
      isrealnameChangeArr: []
    }
  },
  async created() {
    await this.getisrealname()
    await this.getAppcustomerList()
  },
  mounted() {},
  watch: {},
  computed: {},
  methods: {
    // 获取实名的key
    async getisrealname(){
      try {
        let res = await this.$api.Common.getKey({key: 'isrealname'})
        // console.log(res);
        this.isrealnameArr = res
        this.isrealnameChangeArr = res.filter((item) => {
          if(item.text !== '已实名'){
            return item
          }
        })
        
      }
      catch (e) {
        this.$handleError.handleApiRequestException(e)
      }
    },
    // 实名状态
    returnIsreal(value){
      for(let item of this.isrealnameArr){
        // console.log(value, item.value);
        if(value === item.value * 1){
          return item.text
        }
      }
    },
    // refresh btn
    refresh() {
      location.reload()
    },
    // 获取用户列表
    async getAppcustomerList() {
      try {
        let res = await this.$api.customerservice.registeredUsers.getAppcustomerList(
          {
            ...this.queryForm,
            offset: (this.currentPage - 1) * this.pageSize,
            limit: this.pageSize
          }
        )
        // console.log(res)
        if (res.success) {
          this.tableData = res.obj.records
          this.total = res.obj.total
        }
      } catch (e) {
        // Handle api request exception
        this.$handleError.handleApiRequestException(e)
      }
    },
    // from
    // 查询
    onSubmitQuery() {
      this.currentPage = 1
      this.getAppcustomerList()
    },
    // 重置
    resetForm() {
      this.queryForm.states = ''
      this.queryForm.email = ''
      this.queryForm.mobilePhone = ''
      this.queryForm.trueName = ''
      this.queryForm.cardId = ''
    },
    // btns
    // 邮件激活
    isHasemailAppcustomer() {
      if (this.multipleSelection.length !== 1) {
        return this.$message({
          type: 'warning',
          message: '请选择一条数据'
        })
      }

      // console.log(this.multipleSelection[0]);
      if (this.multipleSelection[0].hasEmail) {
        return this.$message({
          type: 'warning',
          message: '已激活，无需再次激活'
        })
      }
      this.$confirm('你确定要激活吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          try {
            let res = await this.$api.customerservice.registeredUsers.isHasemailAppcustomer(
              this.multipleSelection[0].id
            )
            // console.log(res);
            if (res.success) {
              return this.$message({
                type: 'success',
                message: res.msg
              })
            }
            if (!res.success) {
              return this.$message({
                type: 'error',
                message: res.msg
              })
            }
          } catch (e) {
            this.$handleError.handleApiRequestException(e)
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消激活'
          })
        })
    },
    // 重置安全策略
    resetSecurityAppcustomer() {
      if (this.multipleSelection.length !== 1) {
        return this.$message({
          type: 'warning',
          message: '请选择一条数据'
        })
      }
      this.$confirm('你确定要重置吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          try {
            // console.log(this.multipleSelection[0]);
            let res = await this.$api.customerservice.registeredUsers.resetSecurityAppcustomer(
              this.multipleSelection[0].id
            )
            // console.log(res)
            if (res.success) {
              this.getAppcustomerList()
              return this.$message({
                type: 'success',
                message: '重置成功'
              })
            }
          } catch (e) {
            this.$handleError.handleApiRequestException(e)
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消激活'
          })
        })
    },
    // 实名审核
    async auditRealNameAppcustomer() {
      if (this.multipleSelection.length !== 1) {
        return this.$message({
          type: 'warning',
          message: '请选择一条数据'
        })
      }
      let id = this.multipleSelection[0].id
      this.$router.push('/unnamedUser/audit/' + id)
    },
    // 批量实名审核
    moreAuditAppcustomer() {
      if (!this.multipleSelection.length) {
        return this.$message({
          type: 'warning',
          message: '请选择数据'
        })
      }
      this.$confirm('你确定要批量实名审核吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          try {
            let idsArr = this.multipleSelection.map((item) => item.id)
            let ids = idsArr.toString()
            let res = await this.$api.customerservice.registeredUsers.moreAuditAppcustomer(
              ids
            )
            // console.log(res);
            if (res.success) {
              return this.$message({
                type: 'success',
                message: res.msg
              })
            }
            if (!res.success) {
              return this.$message({
                type: 'error',
                message: res.msg
              })
            }
          } catch (e) {
            this.$handleError.handleApiRequestException(e)
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消批量实名'
          })
        })
    },
    // 清除实名信息
    auditallAppcustomer() {
      if (this.multipleSelection.length !== 1) {
        return this.$message({
          type: 'warning',
          message: '请选择一条数据'
        })
      }
      this.$confirm('你确定要清除实名信息吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          try {
            let id = this.multipleSelection[0].id
            let res = await this.$api.customerservice.registeredUsers.auditallAppcustomer(
              id
            )
            // console.log(res);
            if (res.success) {
              this.getAppcustomerList()
              return this.$message({
                type: 'success',
                message: '清除成功'
              })
            }
            if (!res.success) {
              return this.$message({
                type: 'error',
                message: '清除失败'
              })
            }
          } catch (e) {
            this.$handleError.handleApiRequestException(e)
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消清除'
          })
        })
    },
    // 点击重置密码 btn--显示pwd弹窗
    showPwdDialog() {
      if (this.multipleSelection.length !== 1) {
        return this.$message({
          type: 'warning',
          message: '请选择一条数据'
        })
      }
      this.pwdDialogVisible = true
    },
    // 点击弹窗的提交密码 btn
    async setPwAppcustomer() {
      // 密码为8-12位且包含大写字母、小写字母以及数字
      if (
        !/^(?:(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]))[a-zA-Z0-9]{8,12}$/.test(
          this.password
        )
      ) {
        return this.$message({
          type: 'error',
          message: '密码为8-12位且包含大写字母、小写字母以及数字'
        })
      }
      try {
        let id = this.multipleSelection[0].id
        let password = this.$md5.md5(this.password)
        let obj = {
          id,
          password
        }
        let res = await this.$api.customerservice.registeredUsers.setPwAppcustomer(
          obj
        )
        // console.log(res)
        if (res.success) {
          return this.$message({
            type: 'success',
            message: '重置密码成功'
          })
        }
        if (!res.success) {
          return this.$message({
            type: 'error',
            message: '重置密码失败'
          })
        }
      } catch (e) {
        this.$handleError.handleApiRequestException(e)
      }
    },
    // pwd弹窗关闭
    pwdDialogClose() {
      this.password = ''
    },
    // 禁用
    forbiddenAppcustomer() {
      if (this.multipleSelection.length !== 1) {
        return this.$message({
          type: 'warning',
          message: '请选择一条数据'
        })
      }
      this.$confirm('你确定要禁用吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          try {
            let id = this.multipleSelection[0].id
            let res = await this.$api.customerservice.registeredUsers.forbiddenAppcustomer(
              id
            )
            // console.log(res)
            if (res.success) {
              this.getAppcustomerList()
              return this.$message({
                type: 'success',
                message: '禁用成功'
              })
            }
            if (!res.success) {
              return this.$message({
                type: 'error',
                message: res.msg
              })
            }
          } catch (e) {
            this.$handleError.handleApiRequestException(e)
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消禁用'
          })
        })
    },
    // 解禁
    permissibleAppcustomer() {
      if (this.multipleSelection.length !== 1) {
        return this.$message({
          type: 'warning',
          message: '请选择一条数据'
        })
      }
       this.$confirm('你确定要解禁吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          try {
            let id = this.multipleSelection[0].id
            let res = await this.$api.customerservice.registeredUsers.permissibleAppcustomer(
              id
            )
            // console.log(res)
            if (res.success) {
              this.getAppcustomerList()
              return this.$message({
                type: 'success',
                message: '解禁成功'
              })
            }
            if (!res.success) {
              return this.$message({
                type: 'error',
                message: res.msg
              })
            }
          } catch (e) {
            this.$handleError.handleApiRequestException(e)
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消解禁'
          })
        })
    },
    // 交易关闭
    fnCloseChangeAppcustomer() {
      if (this.multipleSelection.length !== 1) {
        return this.$message({
          type: 'warning',
          message: '请选择一条数据'
        })
      }
      this.$confirm('你确定要关闭交易吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          try {
            let id = this.multipleSelection[0].id
            let res = await this.$api.customerservice.registeredUsers.fnCloseChangeAppcustomer(
              id
            )
            // console.log(res)
            if (res.success) {
              this.getAppcustomerList()
              return this.$message({
                type: 'success',
                message: '关闭交易成功'
              })
            }
            if (!res.success) {
              return this.$message({
                type: 'error',
                message: res.msg
              })
            }
          } catch (e) {
            this.$handleError.handleApiRequestException(e)
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消关闭'
          })
        })
    },
    // 交易开启
    openChangeAppcustomer() {
      if (this.multipleSelection.length !== 1) {
        return this.$message({
          type: 'warning',
          message: '请选择一条数据'
        })
      }
      this.$confirm('你确定要开启交易吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          try {
            let id = this.multipleSelection[0].id
            let res = await this.$api.customerservice.registeredUsers.openChangeAppcustomer(
              id
            )
            // console.log(res)
            if (res.success) {
              this.getAppcustomerList()
              return this.$message({
                type: 'success',
                message: '交易开启成功'
              })
            }
            if (!res.success) {
              return this.$message({
                type: 'error',
                message: res.msg
              })
            }
          } catch (e) {
            this.$handleError.handleApiRequestException(e)
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消开启'
          })
        })
    },
    // 表格
    handleSelectionChange(val) {
      // console.log('选择项发生变化时', val)
      this.multipleSelection = val
    },
    // 分页
    // 每页条数变化
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`)
      this.pageSize = val
      this.getAppcustomerList()
    },
    // 当前页变化
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`)
      this.currentPage = val
      this.getAppcustomerList()
    }
  },
  components: {}
}
</script>

<style scoped lang="scss">
.mailConfig {
  padding: 0 20px;
  .title {
    padding: 20px 0;
    padding-bottom: 15px;
    border-bottom: 2px solid #ebebeb;
  }
  .border {
    position: relative;
  }
  .border::before {
    content: '';
    position: absolute;
    top: 35px;
    left: 0;
    height: 2px;
    width: 100%;
    background-color: #3b96dc;
  }
  .refresh-btn {
    position: relative;
    top: -11px;
    float: right;
  }
  .from-btn {
    margin-top: 40px;
  }
  .btn-wrap {
    margin: 20px 0;
  }
  .el-pagination {
    margin: 20px 0;
  }
}
.text-blue {
  color: #3b96dc;
}
.text-size18 {
  font-size: 18px;
}
// 修改el样式
.form {
  .el-form-item {
    ::v-deep .el-form-item__label {
      padding: 0;
    }
  }
}
.el-table {
  ::v-deep .el-table__body-wrapper {
    td div {
      font-size: 12px;
    }
  }
}
</style>
