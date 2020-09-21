<template>
  <div class="whiteUser">
    <div class="title text-blue text-size18">
      <span class="border">设备白名单管理</span>
      <el-button class="refresh-btn" size="mini" @click="refresh">
        <i class="el-icon-refresh"></i>
      </el-button>
    </div>
    <!-- 表单 -->
    <el-form ref="queryform" class="form" label-position="top" :inline="true" :model="queryForm">
      <el-form-item label="邮箱">
        <el-input v-model="queryForm.email"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="queryForm.mobilePhone"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="from-btn" type="primary" icon="el-icon-search" @click="onSubmitQuery">查询</el-button>
        <el-button class="from-btn" type="danger"  icon="el-icon-refresh-right" @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 按钮 -->
    <div class="btn-wrap">
      <el-button
        class="btn"
        icon="el-icon-setting"
        @click="removeLogindevicerecord"
      >删除</el-button>
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
      <el-table-column align="center" prop="deviceType" label="设备类型">
        <template
          slot-scope="scope"
        >{{ scope.row.deviceType ? scope.row.deviceType : '-' }}</template>
      </el-table-column>
      <el-table-column align="center" prop="browserName" label="设备名称">
        <template
          slot-scope="scope"
        >{{ scope.row.browserName ? scope.row.browserName : '-' }}</template>
      </el-table-column>
      <el-table-column align="center" prop="osName" label="客户端系统类型">
        <template
          slot-scope="scope"
        >{{ scope.row.osName ? scope.row.osName : '-' }}</template>
      </el-table-column>
      <el-table-column align="center" prop="deviceIp" label="访问设备IP">
        <template
          slot-scope="scope"
        >{{ scope.row.deviceIp ? scope.row.deviceIp : '-' }}</template>
      </el-table-column>
      <el-table-column align="center" prop="loginTime" label="登录时间">
        <template slot-scope="scope">{{ $moment(scope.row.loginTime).format('YYYY-MM-DD h:mm:ss') }}</template>
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
  </div>
</template>

<script>
export default {
  name: 'deviceWhiteListIndex',
  props: {},
  data() {
    return {
      tableData: null,
      queryForm: {
        // 查询表单
        email: '',
        mobilePhone: ''
      },
      currentPage: 1, // 初始当前第几页
      pageSize: 10, // 初始当前每页条数
      total: 0, // 总条数
      multipleSelection: [] // 被勾选的数据行
    }
  },
  created() {
    this.getLogindevicerecordlist()
  },
  mounted() {},
  watch: {},
  computed: {},
  methods: {
    refresh() {
      location.reload()
    },
    // 获取白名单设备列表
    async getLogindevicerecordlist() {
      try {
        let res = await this.$api.customerservice.registeredUsers.getLogindevicerecordlist(
          {
            ...this.queryForm,
            offset: (this.currentPage - 1) * this.pageSize,
            limit: this.pageSize
          }
        )
        // console.log(res)
        if (res.success) {
          this.tableData = res.obj.obj.records
          this.total = res.obj.obj.total
        }
      } catch (e) {
        // Handle api request exception
        this.$handleError.handleApiRequestException(e)
      }
    },
    // 删除
    async removeLogindevicerecord() {
      if (this.multipleSelection.length !== 1) {
        return this.$message({
          type: 'warning',
          message: '请选择一条数据'
        })
      }
      this.$confirm('你确定要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          try {
            let ids = this.multipleSelection[0].id
            let res = await this.$api.customerservice.registeredUsers.removeLogindevicerecord(
              ids
            )
            // console.log(res)
            if (res.success) {
               return this.$message({
                type: 'success',
                message: '删除成功'
              })
            }
            if (!res.success) {
              return this.$message({
                type: 'error',
                message: '删除失败'
              })
            }
          } catch (e) {
            // Handle api request exception
            this.$handleError.handleApiRequestException(e)
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // from
    // 查询
    onSubmitQuery() {
      this.currentPage = 1
      this.getLogindevicerecordlist()
    },
    // 重置
    resetForm() {
      this.queryForm.email = ''
      this.queryForm.mobilePhone = ''
    },
    // btns
    // 移除白名单
    removeWhitelist() {
      if (!this.multipleSelection.length) {
        return this.$message({
          type: 'warning',
          message: '请选择数据'
        })
      }
      this.$confirm('你确定要在白名单移除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          try {
            let idsArr = this.multipleSelection.map((item) => item.id)
            let idsRemove = idsArr.toString()
            let res = await this.$api.customerservice.registeredUsers.removeWhitelist(
              idsRemove
            )
            // console.log(res)
            if (res.success) {
              this.getwhiteList()
              return this.$message({
                type: 'success',
                message: '移除成功'
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
      this.getLogindevicerecordlist()
    },
    // 当前页变化
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`)
      this.currentPage = val
      this.getLogindevicerecordlist()
    }
  },
  components: {}
}
</script>

<style scoped lang="scss">
.whiteUser {
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
