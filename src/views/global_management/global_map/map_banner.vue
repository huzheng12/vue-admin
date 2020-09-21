<template>
  <div class="page">
    <!-- 标题 -->
    <div class="title">
      <span class="title-text">Banner管理</span>
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
      <el-button icon="el-icon-plus" @click="addBanner" v-if="$filterBtnRoute(882)">添加</el-button>
      <el-button icon="el-icon-edit" @click="modifyBanner" v-if="$filterBtnRoute(883)">编辑</el-button>
      <el-button icon="el-icon-close" @click="deleteBanner" v-if="$filterBtnRoute(1223)">删除</el-button>
    </div>
    <!-- 表格部分 -->
    <div class="table">
      <el-table
        :data="tableData"
        style="width: 100%"
        ref="multipleTable"
        @selection-change="choiceModus"
      >
        <el-table-column align="center" type="selection" width="60"></el-table-column>
        <el-table-column align="center" type="index" label="序号"></el-table-column>
        <el-table-column align="center" prop="name" label="图片名称">
          <template
          slot-scope="scope"
        >{{ scope.row.name ? scope.row.name : '-' }}</template>
        </el-table-column>
        <el-table-column align="center" prop="picturePath" label="图片路径">
          <template
          slot-scope="scope"
        >{{ scope.row.picturePath ? scope.row.picturePath : '-' }}</template>
        </el-table-column>
        <el-table-column align="center" prop="orOutLink" label="外链">
          <template
          slot-scope="scope"
        >{{ scope.row.orOutLink ? scope.row.orOutLink : '-' }}</template>
        </el-table-column>
        <el-table-column align="center" label="是否显示">
          <template slot-scope="scope">
            <span class="table-status">{{scope.row.orShow === 0 ? '不显示' : '显示'}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="sort" label="排序">
          <template
          slot-scope="scope"
        >{{ scope.row.sort ? scope.row.sort : '-' }}</template>
        </el-table-column>
        <!-- <el-table-column align="center" label="应用类型">
          <template slot-scope="scope">
            {{applicationModus(scope.row.applicationType)}}
          </template>
        </el-table-column> -->
        <!-- <el-table-column align="center" label="配图类型">
          <template slot-scope="scope">
            {{getLayoutType(scope.row.whereUse)}}
          </template>
        </el-table-column> -->
      </el-table>
    </div>
    <!-- 分页部分 -->
    <div class="pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
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
      // 选中的标签(语言)
      activeName: '',
      // 标签数据
      langList: [],
      pageSize: 10,
      pageNum: 1,
      // 表格数据
      tableData: [],
      total: 0,
      currentPage: 1,
      // 单选数据
      // singleData: [],
      // singleDataId: null,
      // singleDataState: null,
      // rowData: [],
      // rowDataLength: null,
      multipleSelection: [],
      // 配图类型
      whereUse: 'banner',
      application: [],
      layoutType: []
    }
  },
  async mounted() {
    // await this.getApplicationType()
    // await this.getBannerType()
    await this.getSysLangInfo()
    await this.bannerList()
  },
  methods: {
    // 获取应用类型
    async getApplicationType() {
      try {
        const res = await this.$api.GlobalManagement.mapBanner.getApplicationType()
        // console.log(res);
        if (res.success) {
          this.application = res.obj
        }else{
          this.$notify({
            title: '警告',
            type: 'warning',
            message: res.msg
          })
        }
      } catch (e) {
        this.$handleError.handleApiRequestException(e)
      }
    },

    // 根据接口返回的类型显示表格中对应的值(应用类型)
    applicationModus(val) {
      // console.log('val', val)
      // console.log('application', this.application)
      const data = this.application.filter(item => {
        if (item.value == val) {
          // console.log('item', item)
          return item
        }
      })
      // console.log('data', data)
      return data[0].name
    },

    // banner对应的应用规则
    async getBannerType() {
      try{
        const res = await this.$api.GlobalManagement.mapBanner.getBannerType()
        
        if(res.success) {
          
          this.layoutType = res.obj
        } else {
          this.$notify({
            title: '警告',
            type: 'warning',
            message: res.msg
          })
        }
      }catch(e){
        this.$handleError.handleApiRequestException(e)
      }
    },

    //  根据接口返回的类型显示表格中对应的值(配图类型)
    getLayoutType(val) {
      // console.log('val',val);
      // console.log('layoutType', this.layoutType);
      const data = this.layoutType.filter(item => {
        if (item.value == val) {
          // console.log('item', item)
          return item
        }
      })
      // console.log('data', data)
      return data[0].name
    },

    // 获取系统语种信息
    async getSysLangInfo() {
      try {
        const res = await this.$api.GlobalManagement.messageTemplate.getSysLangInfo()
        if (res.success) {
          // console.log('获取系统语种信息222', res.obj.langList)
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

    // 获取多语种配图列表数据
    async bannerList() {
      try {
        const res = await this.$api.GlobalManagement.mapBanner.bannerList({
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          langCode: this.activeName,
        })
        // console.log(res);
        if(res.success === false){
          this.$notify({
            title: '警告',
            message: res.msg,
            type: 'warning'
          })
        }
        this.tableData = res.obj.records
        this.total = res.obj.total
      } catch (e) {
        this.$handleError.handleApiRequestException(e)
      }
    },

    // 选择每页显示多少条
    handleSizeChange(val) {
      this.pageNum = 1
      this.pageSize = val
      this.bannerList()
    },

    // 当前页的数据
    handleCurrentChange(val) {
      this.pageNum = val
      this.bannerList()
    },

    // 切换语言
    handleModus() {
      this.pageNum = 0
      this.bannerList()
    },

    // 选择每行数据所触发的方法
    choiceModus(selection) {
      this.multipleSelection = selection
      
      // if (selection.length > 0) {
        // 单选数据
        // this.rowData = selection
        // this.singleDataId = selection[0].id
        // this.singleDataState = selection[0].tempState
        // this.rowDataLength = selection.length
      // }
    },

    // 添加banner
    addBanner() {
      this.$router.push('/addBanner')
    },
    
    // 修改banner
    modifyBanner() {
      if (this.multipleSelection.length !== 1) {
        this.$notify({
          title: '警告',
          message: '请选择一条数据',
          type: 'warning'
        })
        return
      }
      let id = this.multipleSelection[0].id
      this.$router.push(`/modifyBanner/${id}`)
      // this.$router.push({
      //   path: '/modifyBanner',
      //   query: {
      //     id: this.multipleSelection[0].id
      //   }
      // })
      // this.$router.push(`/modifyBanner/${this.singleDataId}`)
    },

    // 删除模板 
    async deleteBanner() {
      if (this.multipleSelection.length < 1) {
        this.$notify({
          title: '警告',
          message: '请选择一条数据',
          type: 'warning'
        })
        return
      }
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
            this.$api.GlobalManagement.mapBanner.remove({ ids })
            .then(res=>{ 
              if(res.success) {
                this.$notify({
                  title: '成功',
                  message: '删除成功',
                  type: 'success'
                })
                this.offset = 0
                this.bannerList()
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
