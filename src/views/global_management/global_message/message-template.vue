<template>
  <div class="page">
    <!-- 标题 -->
    <div class="title">
      <span class="title-text">短信模板管理</span>
    </div>
    <!-- 条件查询 -->
    <div class="query">
      <el-form :model="formData" label-width="1180px" label-position="top" :inline="true">
        <el-form-item label="模板名称">
          <el-input v-model="formData.name"></el-input>
        </el-form-item>
        <el-form-item label="模板类型">
          <el-select v-model="formData.region" placeholder="请选择">
            <el-option
              :label="item.text"
              :value="item.value"
              v-for="(item, index) in formData.typeName"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" class="search" @click="searchModus">搜索</el-button>
          <el-button
            type="danger"
            icon="el-icon-refresh-left"
            class="search"
            @click="resetModus"
          >重置</el-button>
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
      <el-button icon="el-icon-plus" @click="addTemplate" v-if="$filterBtnRoute(850)">添加模板</el-button>
      <el-button icon="el-icon-edit" @click="modifyTemplate" v-if="$filterBtnRoute(851)">修改模板</el-button>
      <el-button icon="el-icon-close" @click="deleteTemplate" v-if="$filterBtnRoute(1170)">删除模板</el-button>
      <el-button icon="el-icon-circle-check" @click="openModus" v-if="$filterBtnRoute(1171)">开启</el-button>
      <el-button icon="el-icon-circle-close" @click="CloseModus" v-if="$filterBtnRoute(1194)">关闭</el-button>
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
        <el-table-column align="center" type="index" label="序号" width="55"></el-table-column>
        <el-table-column align="center" prop="tempName" label="模板名称" width="180">
          <template
          slot-scope="scope"
        >{{ scope.row.tempName ? scope.row.tempName : '-' }}</template>
        </el-table-column>
        <el-table-column align="center" prop="tempContent" label="模板内容">
          <template
          slot-scope="scope"
        >{{ scope.row.tempContent ? scope.row.tempContent : '-' }}</template>
        </el-table-column>
        <el-table-column align="center" label="模板状态" width="120">
          <template slot-scope="scope">
            <!-- <span class="table-status">{{scope.row.tempState === 0 ? '关闭' : '开启'}}</span> -->
            <span class="table-status">{{tempStateModus(scope.row.tempState)}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="thirdTemplateId" label="第三方模板Id" width="140">
          <template
          slot-scope="scope"
        >{{ scope.row.thirdTemplateId ? scope.row.thirdTemplateId : '-' }}</template>
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
      // 条件查询
      formData: {
        // 模板名字
        name: '',
        // 模板类型
        region: '',
        // 模板类型下拉框
        typeName: []
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
      // 选中的数据
      multipleSelection: [],
      templateName: []
    }
  },
  async mounted() {
    await this.getKey()
    await this.getSysLangInfo()
    await this.list()
    await this.smsTypeList()
  },
  methods: {
    //  获取数据字典(模板状态)
    async getKey() {
      try {
        const res = await this.$api.Common.getKey({
          key: 'templateStatus'
        })
        // console.log(res);
        if(res.success === false){
          this.$notify({
            title: '警告',
            message: res.msg,
            type: 'warning'
          })
          return
        }
        this.templateName = res
      } catch (e) {
        this.$handleError.handleApiRequestException(e)
      }
    },

    // 根据接口返回的类型显示表格中对应的值(模板状态)
    tempStateModus(val) {
      const data = this.templateName.filter(item => {
        if (item.value == val) {
          return item
        }
      })
      return data[0].text
    },

    // 获取短信模板类型
    async smsTypeList() {
      try {
        const res = await this.$api.GlobalManagement.messageTemplate.smsTypeList()
        if (res.success) {
          this.formData.typeName = res.obj
        }
      } catch (e) {
        this.$handleError.handleApiRequestException(e)
      }
    },

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

    // 获取短信模板列表
    async list() {
      try {
        const res = await this.$api.GlobalManagement.messageTemplate.list({
          offset: this.offset,
          limit: this.limit,
          tempLang: this.activeName,
          tempName: this.formData.name,
          tempType: this.formData.region
        })
        if(res.success === false){
          this.$notify({
            title: '警告',
            message: res.msg,
            type: 'warning'
          })
          return
        }
        // console.log('获取短信模板列表333', res)
        this.tableData = res.records
        this.total = res.total
      } catch (e) {
        this.$handleError.handleApiRequestException(e)
      }
    },

    // 选择每页显示多少条
    handleSizeChange(val) {
      this.limit = val
      this.offset = 0
      this.list()
    },

    // 当前页的数据
    handleCurrentChange(val) {
      this.currentPage = val
      this.offset = (val - 1) * this.limit
      this.list()
    },

    // 选择语言
    handleModus() {
      this.currentPage = 1
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
      this.formData.name = ''
      this.formData.region = ''
      this.offset = 0
      this.list()
    },

    // 选择每行数据所触发的方法
    choiceModus(selection) {
      this.multipleSelection = selection
    },

    // 开启模板
    async openModus() {
      if (this.multipleSelection.length !== 1) {
        this.$notify({
          title: '警告',
          message: '请选择一条数据',
          type: 'warning'
        })
        return
      }
      if (this.multipleSelection[0].tempState === 1) {
        return
      }
      try {
        const res = await this.$api.GlobalManagement.messageTemplate.openOrClose(
          {
            id: this.multipleSelection[0].id
          }
        )
        // console.log('开启模板', res)
        if (res.success) {
          this.$notify({
            title: '成功',
            message: '开启成功',
            type: 'success'
          })
          this.list()
        }
      } catch (e) {
        this.$handleError.handleApiRequestException(e)
      }
    },

    // 关闭模板
    async CloseModus() {
      if (this.multipleSelection.length !== 1) {
        this.$notify({
          title: '警告',
          message: '请选择一条数据',
          type: 'warning'
        })
        return
      }
      if (this.multipleSelection[0].tempState === 0) {
        return
      }
      try {
        const res = await this.$api.GlobalManagement.messageTemplate.openOrClose(
          {
            id: this.multipleSelection[0].id
          }
        )
        if (res.success) {
          this.$notify({
            title: '成功',
            message: '关闭成功',
            type: 'success'
          })
          this.list()
        }
      } catch (e) {
        this.$handleError.handleApiRequestException(e)
      }
    },

    // 添加模板
    addTemplate() {
      this.$router.push('/messageAddition')
    },
    // 修改模板
    modifyTemplate() {
      if (this.multipleSelection.length !== 1) {
        this.$notify({
          title: '警告',
          message: '请选择一条数据',
          type: 'warning'
        })
        return
      }
      // this.$router.push({ name: 'messageModify',  params: { id: this.multipleSelection[0].id, lang: this.activeName } })
      let id = this.multipleSelection[0].id
      let lang = this.activeName
      // console.log(id, lang);
      this.$router.push(`/messageModify/${id}/${lang}`)
      // this.$router.push({
      //   path: '/messageModify',
      //   query: {
      //     id: this.multipleSelection[0].id,
      //     lang: this.activeName
      //   }
      // })
    },

    // 删除模板 
    async deleteTemplate() {
      if (this.multipleSelection.length < 1) {
        this.$notify({
          title: '警告',
          message: '请选择一条数据',
          type: 'warning'
        })
        return
      }
      // console.log('this.rowData', this.rowData);
      const idsArr = []
      this.multipleSelection.forEach(item => {
          // console.log('item',item.id);
          idsArr.push(item.id)
        })
      // console.log(idsArr); 
      const ids = idsArr.join()
      // console.log('ids', ids);
       this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          try{
            this.$api.GlobalManagement.messageTemplate.remove({ ids })
            .then(res=>{ 
              // console.log('res', res);
              if(res.success) {
                this.$notify({
                  title: '成功',
                  message: '删除成功',
                  type: 'success'
                })
                this.offset = 0
                this.list()
              }
            })
          }catch(e) {
            this.$handleError.handleApiRequestException(e)
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    }

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
// 语言选择
// 模板部分
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
