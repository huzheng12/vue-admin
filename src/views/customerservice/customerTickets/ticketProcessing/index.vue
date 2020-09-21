<template>
  <div class="page">
    <!-- 标题 -->
    <div class="title">
      <span class="title-text">工单列表</span>
    </div>
    <!-- 条件查询 -->
    <div class="query">
      <el-form :model="formData" label-width="1180px" label-position="top" :inline="true">
        <el-form-item label="工单编号">
          <el-input v-model="formData.workOrderNo"></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="formData.currentType" placeholder="请选择">
            <el-option :label="item.typeName" :value="item.typeName" v-for="(item, index) in formData.typeNameList" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="formData.region" placeholder="请选择">
            <el-option label="已受理" value="1"></el-option>
            <el-option label="未受理" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" class="search" @click="searchModus">搜索</el-button>
          <el-button type="danger" icon="el-icon-refresh-left" class="search" @click="resetModus">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 语言选择 -->
    <div class="language">
      <el-tabs v-model="activeName" type="card" @tab-click="handleModus">
        <el-tab-pane :name="item.value" v-for="(item, index) in langList" :key="index">
          <span slot="label" v-html="item.name"></span>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- 模板部分 -->
    <div class="template">
      <el-button icon="el-icon-rank" @click="viewCategory" v-if="$filterBtnRoute(1129)">查看</el-button>
      <el-button icon="el-icon-edit-outline" @click="modifyCategory" v-if="$filterBtnRoute(1066)">受理</el-button>
    </div>
    <!-- 表格部分 -->
    <div class="table">
      <el-table :data="tableData" style="width: 100%" ref="multipleTable" @selection-change="choiceModus">
        <el-table-column align="center" type="selection" width="55"></el-table-column>
        <el-table-column align="center" type="index" label="序号" width="100"></el-table-column>
        <el-table-column align="center" prop="workOrderNo" label="工单编号" width="200">
          <template
          slot-scope="scope"
        >{{ scope.row.workOrderNo ? scope.row.workOrderNo : '-' }}</template>
        </el-table-column>
        <el-table-column align="center" prop="categoryName" label="类型" width="200">
          <template
          slot-scope="scope"
        >{{ scope.row.categoryName ? scope.row.categoryName : '-' }}</template>
        </el-table-column>
        <el-table-column align="center" prop="workContent" label="工单内容" width="300">
          <template
          slot-scope="scope"
        >{{ scope.row.workContent ? scope.row.workContent : '-' }}</template>
        </el-table-column>
        <el-table-column align="center" label="状态">
          <template slot-scope="scope">
            <span class="table-status">{{scope.row.state === 0 ? '未受理' : '已受理'}}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页部分 -->
    <div class="pagination">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[5, 10, 20, 50, 100]"
        :page-size="limit" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 条件查询
      formData: {
        // 名字
        name: '',
        // 类型
        region: '',
        // 类型下拉框
        typeNameList: [],
        // 选中类型
        currentType: '',
        // 工单号
        workOrderNo: ''
      },
      // 选中的标签(语言)
      activeName: '',
      // 标签数据
      langList: [],
      offset: 0,
      limit: 10,
      // 表格数据
      tableData: [],
      total: 0,
      currentPage: 1,
      multipleSelection: []
    }
  },
  async mounted() {
    await this.getSysLangInfo()
    await this.getTicketTypes()
    await this.list()
  },
  methods: {
    // 获取系统语种信息
    async getSysLangInfo() {
      try {
        const res = await this.$api.GlobalManagement.messageTemplate.getSysLangInfo()
        if (res.success) {
          // console.log('获取系统语种信息222', res.obj.langList)
          this.langList = res.obj.langList
          this.activeName = res.obj.defaultLang
        }
      } catch (e) {
        this.$handleError.handleApiRequestException(e)
      }
    },

    // 获取工单类型列表
    async getTicketTypes() {
      try {
        const res = await this.$api.customerservice.tickettypes()
        if (res) {
          // console.log('获取工单类型列表', res)
          this.formData.typeNameList = res.records
        }
      } catch (e) {
        this.$handleError.handleApiRequestException(e)
      }
    },
    // 获取类别列表
    async list() {
      try {
        const res = await this.$api.customerservice.tickettaskslist({
          offset: this.offset,
          limit: this.limit,
          languageDic: this.activeName,
          categoryName: this.formData.currentType,
          state: this.formData.region,
          workOrderNo: this.formData.workOrderNo
        })
        if (res.success === false) {
          this.$message({
            title: '警告',
            message: res.msg,
            type: 'warning'
          })
          return
        }
        // console.log('获取类别列表', res)
        this.tableData = res.records
        this.total = res.total
      } catch (e) {
        this.$handleError.handleApiRequestException(e)
      }
    },

    // 选择每页显示多少条
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`)
      this.limit = val
      this.offset = 0
      this.list()
    },

    // 当前页的数据
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`)
      this.offset = (val - 1) * this.limit
      // console.log('页面aaaaa:', this.offset);
      this.list()
    },

    // 选择语言
    handleModus() {
      this.offset = 0
      this.list()
    },

    // 搜索
    searchModus() {
      this.offset = 0
      this.list()
    },

    // 重置
    resetModus() {
      this.formData.workOrderNo = ''
      this.formData.region = ''
      this.formData.currentType = ''
      this.offset = 0
      this.list()
    },

    // 选择每行数据所触发的方法
    choiceModus(selection) {
      // console.log('selection', selection)
      // console.log(selection.length > 1)
      //  console.log('selection', selection)
      // console.log('selection', selection[0].id)
      // console.log('selection', selection.length)
      this.multipleSelection = selection
      // this.multipleSelection.length

    },
    // 查看
    viewCategory() {
      if (this.multipleSelection.length !== 1) {
        this.$message({
          title: '警告',
          message: '请选择一条数据',
          type: 'warning'
        })
        return
      }
      this.$router.push({ path: `/ticketProcessing/viewTicket/${this.multipleSelection[0].id}`, query: { id: JSON.stringify(this.multipleSelection[0].id),lang: this.activeName } })
      // this.$router.push({
      //   path: '/ticketProcessing/viewTicket',
      //   query: {
      //     id: this.multipleSelection[0].id,
      //     lang: this.activeName
      //   }
      // })
    },
    // 受理
    modifyCategory() {
      if (this.multipleSelection.length !== 1) {
        this.$message({
          title: '警告',
          message: '请选择一条数据',
          type: 'warning'
        })
        return
      }
      if (this.multipleSelection[0].state === 1) {
        this.$message({
          title: '警告',
          message: '此数据已受理',
          type: 'warning'
        })
        return
      }
      this.$router.push({ path: `/ticketProcessing/acceptTicket/${this.multipleSelection[0].id}`, query: { id: JSON.stringify(this.multipleSelection[0].id),lang: this.activeName } })
      // this.$router.push({
      //   path: '/ticketProcessing/acceptTicket',
      //   query: {
      //     id: this.multipleSelection[0].id,
      //     lang: this.activeName
      //   }
      // })
    },

  },
  components: {}
}
</script>

<style lang='scss' scoped>
.page {
  padding: 10px 20px 0 30px;
}
// 标题
.title {
  width: 100%;
  height: 64px;
  border-bottom: 2px solid #ebebeb;
  font-size: 18px;
  color: #3b96dc;
  position: relative;
  .title-text {
    border-bottom: 2px solid #3b96dc;
    padding-bottom: 18px;
    position: absolute;
    bottom: -2px;
    left: 0;
  }
}
// 条件查询
.query {
  .search {
    margin-top: 37px;
  }
}
// 表格部分
.table {
  .table-status {
    color: #3b96dc;
  }
}
// 分页部分
.pagination {
  margin-top: 35px;
}
// 修改element组件样式
.query {
  ::v-deep .el-form--inline .el-form-item {
    margin-right: 60px;
  }
  ::v-deep .el-form--label-top .el-form-item__label {
    padding: 0;
  }
}
</style>
