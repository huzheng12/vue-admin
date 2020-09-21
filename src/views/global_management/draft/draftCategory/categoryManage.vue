<template>
  <div class="category-manage">
    <div class="title text-blue text-size18">
      <span class="border">{{returnTitle}}</span>
    </div>
    <div class="btn-wrap">
      <el-button
        v-if="$filterBtnRoute(870)"
        class="btn"
        icon="el-icon-edit"
        @click="edit"
      >编辑</el-button>
      <el-button
        v-if="$filterBtnRoute(869) && returnIsshowAddBtn"
        class="btn"
        icon="el-icon-plus"
        @click="add"
      >添加</el-button>
      <el-button class="btn" v-if="$filterBtnRoute(1160)" icon="el-icon-delete" @click="remove">删除</el-button>
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
      <el-table-column align="center" prop="name" label="名称">
      </el-table-column>
      <el-table-column align="center" prop="preateName" label="父类名称">
      </el-table-column>
      <el-table-column align="center" prop="modified" label="修改时间">
        <template slot-scope="scope">{{ $moment(scope.row.modified).format('YYYY-MM-DD h:mm:ss') }}</template>
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
import getIsPageKey from './mixins.js'
export default {
  name: 'categoryMana',
  props: {
    treeNodeData: {
      type: Object
      // default: sessionStorage.getItem('draftCategory_node_Data')
    },
    langkey:{
      type:String,
      default:'zh_CN'
    }
  },
  data() {
    return {
      tableData: null,
      currentPage: 1, // 初始当前第几页
      pageSize: 10, // 初始当前每页条数
      total: 0, // 总条数
      multipleSelection: [], // 被勾选的数据行
      IsPageArr: []
    }
  },
  created() {
    this.getIsPageKey()
  },
  mounted() {},
  mixins: [getIsPageKey],
  watch: {
    treeNodeData: {
      handler() {
        // 初始化table数据
        this.getAppcategoryList()
      },
      immediate: true,
      deep: true
    },
    langkey(){
      this.getAppcategoryList()
    }
  },
  computed: {
    returnTitle() {
      return '【' + this.treeNodeData.label + '】'
    },
    // 判断add按钮是否存在
    returnIsshowAddBtn() {
      return this.treeNodeData.preateId ? false : true
    }
  },
  methods: {
    returnIsPage(value){
      for(let item of this.IsPageArr){
        if(value === item.value * 1){
          return item.text
        }
      }
    },
    // 获文章分类列表
    async getAppcategoryList() {
      try {
        let {
          success,
          obj
        } = await this.$api.GlobalManagement.DraftCategory.getAppcategoryList({
          pageNum: this.currentPage,
          pageSize: this.pageSize,
          id: this.treeNodeData.id,
          langCode:this.langkey
        })
        // console.log(success, obj, obj.total)
        if (success) {
          this.tableData = obj.records
          this.total = obj.total
        }
      } catch (e) {
        // Handle api request exception
        this.$handleError.handleApiRequestException(e)
      }
    },
    // 增删改查
    // add btn
    add() {
      // console.log('add')
      this.$router.push({
        name: 'AddCategory',
        params: { langkey: this.langkey }
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
      let ids = idsArr.toString()
      // console.log(idsArr, this.ids)
      try {
        let {
          success
        } = await this.$api.GlobalManagement.DraftCategory.removeAppcategory(
          ids
        )
        if (success) {
          this.getAppcategoryList()
          this.$emit('reloadTree');
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          // location.reload()s
        }
        if (!success) {
          this.$message({
            type: 'error',
            message: '删除失败!'
          })
        }
        // console.log(success, message);
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
      let idEdit = this.multipleSelection[0].id
      this.$router.push(`/draftCategory/editCategory/${idEdit}`)
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
      this.getAppcategoryList()
    },
    // 当前页变化
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`)
      this.currentPage = val
      this.getAppcategoryList()
    }
  },
  components: {}
}
</script>

<style scoped lang="scss">
.category-manage {
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
</style>
