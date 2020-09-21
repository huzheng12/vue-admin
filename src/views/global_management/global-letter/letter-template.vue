<template>
  <div class="page">
    <!-- 标题 -->
    <div class="title">
      <span class="title-text">系统信件模板</span>
    </div>
    <!-- 语言选择 -->
    <div class="language">
      <el-tabs v-model="activeName" type="card" @tab-click="handleModus">
        <el-tab-pane :name="item.value" v-for="(item, index) in langList" :key="index">
          <span slot="label" v-html="item.name"></span>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- 按钮部分 -->
    <div class="template">
      <el-button icon="el-icon-plus" @click="addModus" v-if="$filterBtnRoute(1005)">添加</el-button>
      <el-button icon="el-icon-edit" @click="modifyModus" v-if="$filterBtnRoute(1006)">修改</el-button>
      <el-button icon="el-icon-circle-check" @click="openModus" v-if="$filterBtnRoute(1174)">开启</el-button>
      <el-button icon="el-icon-circle-close" @click="CloseModus" v-if="$filterBtnRoute(1195)">关闭</el-button>
    </div>
    <!-- 表格部分 -->
    <div class="table">
      <el-table
        :data="tableData"
        style="width: 100%"
        ref="multipleTable"
        @selection-change="choiceModus"
      >
        <el-table-column align="center" type="selection" width="55"></el-table-column>
        <el-table-column align="center" type="index" label="序号"></el-table-column>
        <el-table-column align="center" label="语种">
          <template slot-scope="scope">{{langModus(scope.row.messageCategory)}}</template>
        </el-table-column>
        <el-table-column align="center" prop="name" label="模板名称">
           <template
          slot-scope="scope"
        >{{ scope.row.name ? scope.row.name : '-' }}</template>
        </el-table-column>
        <el-table-column align="center" prop="isOpen" label="开关">
          <template slot-scope="scope">
            <span class="table-status">{{scope.row.isOpen ? '开启' : '关闭'}}</span>
          </template>    
        </el-table-column>
        <el-table-column align="center" label="触发点">
          <template slot-scope="scope">
            <span class="table-status">{{scope.row.triggerPointLan}}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页部分 -->
    <div class="pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 选中的语言
      activeName: '',
      // 标签数据
      langList: [],
      offset: 0,
      limit: 10,
      // 表格数据
      tableData: [],
      total: 0,
      currentPage: 1,
      // 选中的数据
      multipleSelection: [],
      // 触发点
      // triggerName: []
      // 配图类型
      // whereUse: 'banner',
      // application: [],
      // layoutType: []
    }
  },
  async mounted() {
    await this.getSysLangInfo()
    // await this.findkeyAndVal()
    await this.sendMessageList()
  },
  methods: {
    // 获取系统语种信息
    async getSysLangInfo() {
      try {
        const res = await this.$api.GlobalManagement.messageTemplate.getSysLangInfo()
        if (res.success) {
          // console.log('aaa', res.obj.langList)
          this.langList = res.obj.langList
          this.activeName = res.obj.defaultLang
        } else {
          this.$notify({
            title: '警告',
            message: res.msg,
            type: 'warning'
          })
        }
      } catch (e) {
        this.$handleError.handleApiRequestException(e)
      }
    },

    // // 获取触发点
    // async findkeyAndVal() {
    //   try {
    //     const res = await this.$api.GlobalManagement.letterTemplate.findkeyAndVal({
    //       pkey: 'trigger'
    //     })
    //     if (res.success) {
    //       // console.log(res.obj)
    //       this.triggerName = res.obj
    //     } else {
    //       this.$notify({
    //         title: '警告',
    //         message: res.msg,
    //         type: 'warning'
    //       })
    //     }
    //   } catch (e) {
    //     this.$handleError.handleApiRequestException(e)
    //   }
    // },

    // 获取多语种配图列表数据
    async sendMessageList() {
      try {
        const res = await this.$api.GlobalManagement.letterTemplate.sendMessageList({
          offset: this.offset,
          limit: this.limit,
          messageCategory: this.activeName,  // 系统语种
        })
        if(res.success === false){
          this.$notify({
            title: '警告',
            message: res.msg,
            type: 'warning'
          })
          return
        }
        this.tableData = res.records
        this.total = res.total
      } catch (e) {
        this.$handleError.handleApiRequestException(e)
      }
    },

    // 根据接口返回的类型显示表格中对应的值(语种)
    langModus(val) {
      const data = this.langList.filter(item => {
        if (item.value == val) {
          return item
        }
      })
      return data[0].name
    },

    // // 根据接口返回的类型显示表格中对应的值(触发点)
    // triggerModus(val) {
    //   const data = this.triggerName.filter(item => {
    //     if (item.value == val) {
    //       return item
    //     }
    //   })
    //   return data[0].name
    // },

    // 选择每页显示多少条
    handleSizeChange(val) {
      this.limit = val
      this.offset = 0
      this.sendMessageList()
    },

    // 当前页的数据
    handleCurrentChange(val) {
      this.offset = (val - 1) * this.limit
      this.sendMessageList()
    },

    // 切换语言
    handleModus() {
      this.offset = 0
      this.sendMessageList()
    },

    // 选择每行数据所触发的方法
    choiceModus(selection) {
      this.multipleSelection = selection
    },

    // 添加
    addModus() {
      this.$router.push('/letterAddition')
    },
    
    // 修改
    modifyModus() {
      if (this.multipleSelection.length !== 1) {
        this.$notify({
          title: '警告',
          message: '请选择一条数据',
          type: 'warning'
        })
        return
      }
      let id = this.multipleSelection[0].id
      this.$router.push(`/letterModify/${id}`)
      // this.$router.push({
      //   path: '/letterModify',
      //   query: {
      //     id: this.multipleSelection[0].id
      //   }
      // })
    },
    
    // 开启
    async openModus() {
      if (this.multipleSelection.length !== 1) {
        this.$notify({
          title: '警告',
          message: '请选择一条数据',
          type: 'warning'
        })
        return
      }
      if (this.multipleSelection[0].isOpen === 1) {
        return
      }
      try {
        const res = await this.$api.GlobalManagement.letterTemplate.switchOpen(
          {
            ids: this.multipleSelection[0].id,
            type: 'open'
          }
        )
        // console.log('开启模板', res)
        if (res.success) {
          this.$notify({
            title: '成功',
            message: '开启成功',
            type: 'success'
          })
          this.sendMessageList()
        }else {
          this.$notify({
            title: '警告',
            message: res.msg,
            type: 'warning'
          })
        }
      } catch (e) {
        this.$handleError.handleApiRequestException(e)
      }
    },

    // 关闭
    async CloseModus() {
      if (this.multipleSelection.length !== 1) {
        this.$notify({
          title: '警告',
          message: '请选择一条数据',
          type: 'warning'
        })
        return
      }
      if (this.multipleSelection[0].isOpen === 0) {
        return
      }
      try {
        const res = await this.$api.GlobalManagement.letterTemplate.switchOpen(
          {
            ids: this.multipleSelection[0].id,
            type: 'close'
          }
        )
        if (res.success) {
          this.$notify({
            title: '成功',
            message: '关闭成功',
            type: 'success'
          })
          this.sendMessageList()
        }
      } catch (e) {
        this.$handleError.handleApiRequestException(e)
      }
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
  margin-bottom: 20px;
  .title-text {
    border-bottom: 2px solid #3b96dc;
    padding-bottom: 18px;
    position: absolute;
    bottom: -2px;
    left: 0;
  }
}
// // 条件查询
// .query {
//   .search {
//     margin-top: 37px;
//   }
// }
// 语言选择
// 按钮部分
.template {
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
