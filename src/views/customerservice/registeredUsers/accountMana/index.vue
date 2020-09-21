<template>
  <div class="accountMana">
    <div class="title text-blue text-size18">
      <span class="border">用户货币账户管理</span>
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
      <el-form-item label="姓氏">
        <el-input v-model="queryForm.surname"></el-input>
      </el-form-item>
      <el-form-item label="名字">
        <el-input v-model="queryForm.trueName"></el-input>
      </el-form-item>
      <el-form-item label="钱包地址">
        <el-input v-model="queryForm.publicKey"></el-input>
      </el-form-item>
      <el-form-item label="交易币种">
        <el-select v-model="queryForm.coinCode">
          <el-option v-for="item in coinArr" :key="item" :label="item" :value="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button class="from-btn" type="primary" icon="el-icon-search" @click="onSubmitQuery">查询</el-button>
        <el-button class="from-btn" type="danger" icon="el-icon-refresh-right" @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
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
      <el-table-column align="center" prop="appPersonInfo.trueName" label="名字">
        <template
          slot-scope="scope"
        >{{ scope.row.appPersonInfo.trueName ? scope.row.appPersonInfo.trueName : '-' }}</template>
      </el-table-column>
      <el-table-column align="center" prop="coinName" label="币种名称">
        <template slot-scope="scope">{{ scope.row.coinName ? scope.row.coinName : '-' }}</template>
      </el-table-column>
      <el-table-column align="center" prop="publicKey" label="钱包地址">
        <template slot-scope="scope">{{ scope.row.publicKey ? scope.row.publicKey : '-' }}</template>
      </el-table-column>
      <el-table-column align="center" prop="accountNum" label="虚拟账号">
        <template slot-scope="scope">{{ scope.row.accountNum ? scope.row.accountNum : '-' }}</template>
      </el-table-column>
      <el-table-column align="center" prop="hotMoney" label="可用币个数">
        <template slot-scope="scope">{{ scope.row.hotMoney ? scope.row.hotMoney : '-' }}</template>
      </el-table-column>
      <el-table-column align="center" prop="coldMoney" label="冻结币个数">
        <template slot-scope="scope">{{ scope.row.coldMoney ? scope.row.coldMoney : '-' }}</template>
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
  name: 'accountManaIndex',
  props: {},
  data() {
    return {
      tableData: null,
      queryForm: {
        // 查询表单
        email: '',
        mobilePhone: '',
        surname: '',
        trueName: '',
        publicKey: '',
        coinCode: ''
      },
      currentPage: 1, // 初始当前第几页
      pageSize: 10, // 初始当前每页条数
      total: 0, // 总条数
      multipleSelection: [], // 被勾选的数据行
      coinArr: []
    }
  },
  created() {
    this.getCoinCode()
    this.getExdigitalmoneyaccountList()
  },
  mounted() {},
  watch: {},
  computed: {},
  methods: {
    refresh() {
      location.reload()
    },
    // 获取币种名称
    async getCoinCode() {
      try {
        let res = await this.$api.otc.getCoinCode()
        // console.log(res)
        this.coinArr = res.map((item) => item.coinCode)
      } catch (e) {
        // Handle api request exception
        this.$handleError.handleApiRequestException(e)
      }
    },
    // 获取提币列表
    async getExdigitalmoneyaccountList() {
      try {
        let res = await this.$api.customerservice.registeredUsers.getExdigitalmoneyaccountList(
          {
            ...this.queryForm,
            offset: (this.currentPage - 1) * this.pageSize,
            limit: this.pageSize
          }
        )
        // console.log(res)
        if (res.success) {
          this.tableData = res.obj.rows
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
      this.getExdigitalmoneyaccountList()
    },
    // 重置
    resetForm() {
      this.queryForm.email = ''
      this.queryForm.mobilePhone = ''
      this.queryForm.surname = ''
      this.queryForm.trueName = ''
      this.queryForm.publicKey = ''
      this.queryForm.coinCode = ''
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
      this.getExdigitalmoneyaccountList()
    },
    // 当前页变化
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`)
      this.currentPage = val
      this.getExdigitalmoneyaccountList()
    }
  },
  components: {}
}
</script>

<style scoped lang="scss">
.accountMana {
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
