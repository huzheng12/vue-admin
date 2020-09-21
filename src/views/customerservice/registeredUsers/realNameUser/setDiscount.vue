<template>
  <div class="audit-RealName">
    <div class="title text-blue text-size18">
      <span class="border">个人手续费列表</span>
      <el-button class="refresh-btn" type="primary" @click="refresh">
        <i class="el-icon-refresh"></i>
      </el-button>
    </div>
    <!-- 表单 -->
    <el-form class="form" label-position="top" :inline="true" :model="formData" ref="ruleForm">
      <el-form-item label="交易类型">
        <el-select v-model="formData.type" placeholder="请选择">
          <el-option
            v-for="item in dealtypedArr"
            :key="item.text"
            :label="item.text"
            :value="item.value * 1"
          ></el-option>
          <el-option label="请选择" value=""></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="from-btn" @click="onSubmitQuery('ruleForm')">查询</el-button>
        <el-button type="danger" class="from-btn" @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 按钮 -->
    <div class="btn-wrap">
      <el-button
        v-if="$filterBtnRoute(1016)"
        class="btn"
        icon="el-icon-plus"
        type="success"
        @click="add"
      >添加</el-button>
      <el-button
        v-if="$filterBtnRoute(1017)"
        class="btn"
        icon="el-icon-edit"
        type="primary"
        @click="edit"
      >编辑</el-button>
      <el-button class="btn" type="danger" icon="el-icon-delete" @click="remove">删除</el-button>
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
      <el-table-column align="center" prop="makeFeeRate" label="挂单手续费折扣"></el-table-column>
      <el-table-column align="center" prop="takeFeeRate" label="吃单手续费折扣"></el-table-column>
      <el-table-column align="center" prop="created" label="创建时间">
        <template slot-scope="scope">{{ scope.row.created ? $moment(scope.row.created).format('YYYY-MM-DD h:mm:ss') : '' }}</template>
      </el-table-column>
      <el-table-column align="center" prop="modified" label="修改时间">
        <template slot-scope="scope">{{ scope.row.modified ? $moment(scope.row.modified).format('YYYY-MM-DD h:mm:ss') : '' }}</template>
      </el-table-column>
      <el-table-column align="center" prop="type" label="交易类型">
        <template slot-scope="scope">{{ returndealtype(scope.row.type) }}</template>
      </el-table-column>
      <el-table-column align="center" prop="status" label="状态">
        <template slot-scope="scope">{{ scope.row.status ? '开启' : '关闭' }}</template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'disCountList',
  props: {},
  data() {
    return {
      // 表单数据
      formData: {
        type: ''
      },
      tableData: [],
      multipleSelection: [], // 被勾选的数据行
      dealtypedArr: []
    }
  },
  created() {
    this.getUserfeesList()
    this.getdealtype()
  },
  mounted() {},
  watch: {},
  computed: {},
  methods: {
    // 获取交易类型的key
    async getdealtype() {
      try {
        let res = await this.$api.Common.getKey({ key: 'dealtype' })
        // console.log(res);
        this.dealtypedArr = res
      } catch (e) {
        this.$handleError.handleApiRequestException(e)
      }
    },
    returndealtype(value) {
      for (let item of this.dealtypedArr) {
        if (value === item.value * 1) {
          return item.text
        }
      }
    },
    // 获取折扣列表
    async getUserfeesList() {
      let customerId = this.$route.params.customerId
      try {
        let res = await this.$api.customerservice.registeredUsers.getUserfeesList(
          {
            ...this.formData,
            customerId
          }
        )
        // console.log(res)
        if (res.success) {
          this.tableData = res.obj
        }
      } catch (e) {
        this.$handleError.handleApiRequestException(e)
      }
    },
    // 刷新
    refresh() {
      location.reload()
    },
    // 查询 btn
    onSubmitQuery() {
      this.getUserfeesList()
    },
    // 重置 btn
    resetForm() {
      this.formData.state = ''
    },
    // 增删改查
    // add btn
    add() {
      // console.log('add')
      let customerId = this.$route.params.customerId
      this.$router.push({
        name: 'addDiscount',
        params: {
          customerId
        }
      })
    },
    // remove btn
    async remove() {
      // console.log('remove', this.multipleSelection.length)
      if (!this.multipleSelection.length) {
        return this.$message({
          type: 'warning',
          message: '请选择数据'
        })
      }
      // 处理被勾选的数据行
      let idsArr = this.multipleSelection.map((item) => item.id)
      let idsRemove = idsArr.toString()
      // console.log(idsRemove)

      try {
        let res = await this.$api.customerservice.registeredUsers.deleteCustomerUserfees(
          idsRemove
        )
        // console.log(res)

        if (res.success) {
          this.getUserfeesList()
          return this.$message({
            message: '删除成功',
            type: 'success'
          })
        }
        if (!res.success) {
          return this.$message({
            message: res.msg,
            type: 'error'
          })
        }
      } catch (e) {
        this.$handleError.handleApiRequestException(e)
      }
    },
    // edit btn
    edit() {
      // console.log('edit')
      if (this.multipleSelection.length !== 1) {
        return this.$message({
          type: 'warning',
          message: '请选择一条数据'
        })
      }
      // 处理被勾选的数据行
      let idEdit = this.multipleSelection[0].customerId
      let id = this.multipleSelection[0].id
      this.$router.push({
        name: 'editDiscount',
        params: {
          customerId: idEdit,
          id
        }
      })
    },
    // 表格
    handleSelectionChange(val) {
      // console.log('选择项发生变化时', val)
      this.multipleSelection = val
    }
  }
}
</script>

<style scoped lang="scss">
.audit-RealName {
  padding: 0 20px;
  .audit-title {
    border-bottom: 2px solid #000;
    padding: 20px 0;
  }
  .title {
    padding: 20px 0;
    border-bottom: 2px solid #ebebeb;
    .return-btn {
      float: right;
    }
  }
  .border {
    position: relative;
  }
  .border::before {
    content: '';
    position: absolute;
    top: 40px;
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
    margin-top: 50px;
  }
  .btn-wrap {
    margin-bottom: 20px;
  }
  .el-form {
    padding: 30px 0 10px;
    width: 700px;
    .imgBox {
      height: 700px;
      border: 1px solid #eee;
    }
  }
}
.text-blue {
  color: #3b96dc;
}
.text-size18 {
  font-size: 18px;
}
</style>
