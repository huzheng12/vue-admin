<template>
  <div class="addWhiteUser">
    <div class="title text-blue text-size18">
      <span class="border">添加白名单</span>
      <el-button class="refresh-btn" type="primary" @click="handleBack">
        返回
        <i class="el-icon-d-arrow-right"></i>
      </el-button>
    </div>
    <!-- 表单 -->
    <el-form ref="queryform" class="form" label-position="top" :inline="true" :model="queryForm">
      <el-form-item label="邮箱">
        <el-input v-model="queryForm.email_like"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="queryForm.mobilePhone_like"></el-input>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="queryForm.trueName_like"></el-input>
      </el-form-item>
      <el-form-item label="证件号码">
        <el-input v-model="queryForm.cardId"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="from-btn" type="primary" @click="onSubmitQuery">查询</el-button>
        <el-button class="from-btn" type="danger" @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 按钮 -->
    <div class="btn-wrap">
      <el-button class="btn" v-if="$filterBtnRoute(1040)" icon="el-icon-setting" type="primary" @click="addWhithOfCustom">添加</el-button>
    </div>
    <!-- 表格 -->
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column align="center" type="selection" width="30"></el-table-column>
      <el-table-column align="center" type="index" label="序号" width="50"></el-table-column>
      <el-table-column align="center" prop="email" label="邮箱"></el-table-column>
      <el-table-column align="center" prop="mobilePhone" label="手机号" width="150"></el-table-column>
      <el-table-column align="center" prop="trueName" label="姓名"></el-table-column>
      <el-table-column align="center" prop="cardType" label="证件类型">
        <template slot-scope="scope">{{ scope.row.cardType === 0 ? '身份证' : ''}}</template>
      </el-table-column>
      <el-table-column align="center" prop="cardId" label="证件号码"></el-table-column>
      <el-table-column align="center" prop="loginIp" label="ip"></el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      :background="true"
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
  name: 'addWhiteListUser',
  props: {},
  data() {
    return {
      tableData: null,
      queryForm: {
        // 查询表单
        email_like: '',
        mobilePhone_like: '',
        trueName_like: '',
        cardId: ''
      },
      currentPage: 1, // 初始当前第几页
      pageSize: 10, // 初始当前每页条数
      total: 0, // 总条数
      multipleSelection: [] // 被勾选的数据行
    }
  },
  created() {
    this.getwhitecustomList()
  },
  mounted() {},
  watch: {},
  computed: {},
  methods: {
    handleBack() {
      this.$router.go(-1)
    },
    // 获取非白名单列表
    async getwhitecustomList() {
      try {
        let res = await this.$api.customerservice.registeredUsers.getwhitecustomList(
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
    // btns
    // 添加白名单
    async addWhithOfCustom() {
      if (!this.multipleSelection.length) {
        return this.$message({
          type: 'warning',
          message: '请选择数据'
        })
      }
      this.multipleSelection.forEach(item => {
        item['0'] = true
      })
      let whiteData = JSON.stringify(this.multipleSelection)
      try {
        let res = await this.$api.customerservice.registeredUsers.addWhithOfCustom(
          whiteData
        )

        // console.log(res)
        if (res.success) {
          this.$message({
            type: 'success',
            message: '添加成功'
          })
          this.$router.go(-1)
        }
        if (!res.success) {
          return this.$message({
            type: 'error',
            message: res.msg
          })
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
      this.getwhitecustomList()
    },
    // 重置
    resetForm() {
      for(let key in this.queryForm){
        this.queryForm[key] = ''
      }
    },
    // btns
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
      this.getwhitecustomList()
    },
    // 当前页变化
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`)
      this.currentPage = val
      this.getwhitecustomList()
    }
  },
  components: {}
}
</script>

<style scoped lang="scss">
.addWhiteUser {
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
