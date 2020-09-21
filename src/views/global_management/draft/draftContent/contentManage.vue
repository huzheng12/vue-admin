<template>
  <div class="content-manage">
    <div class="title text-blue text-size18">
      <span class="border">{{returnTitle}}</span>
    </div>
    <!-- 查询表单 -->
    <el-form ref="queryform" class="form" label-position="top" :inline="true" :model="queryForm">
      <!-- <el-form-item label="选择语种">
        <el-select v-model="queryForm.sysLangId" placeholder="请选择">
          <el-option v-for="item in langList" :key="item.id" :label="item.name | replaceStr" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item label="文章标题">
        <el-input v-model="queryForm.title"></el-input>
      </el-form-item>
      <!-- <el-form-item label="文章类别">
        <el-select v-model="queryForm.langName" placeholder="请选择">
          <el-option
            v-for="(item, index) in categorySelectData"
            :key="index"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item>
        <el-button class="from-btn" icon="el-icon-search" type="primary" @click="onSubmitQuery">查询</el-button>
        <el-button class="from-btn" type="danger" icon="el-icon-refresh-right" @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 按钮 -->
    <div class="btn-wrap">
      <el-button
        v-if="$filterBtnRoute(861)"
        class="btn"
        icon="el-icon-plus"
        @click="add"
      >添加</el-button>
      <!-- <el-button
        v-if="$filterBtnRoute(862)"
        class="btn"
        icon="el-icon-rank"
        @click="info"
      >查看</el-button> -->
      <el-button
        v-if="$filterBtnRoute(863)"
        class="btn"
        icon="el-icon-edit"
        @click="edit"
      >编辑</el-button>
      <el-button class="btn" v-if="$filterBtnRoute(1120)" icon="el-icon-delete" @click="remove">删除</el-button>
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
      <el-table-column align="center" prop="source" label="来源" width="120">
      </el-table-column>
      <!-- <el-table-column align="center" prop="categoryName" label="文章类别" width="200">
        <template
          slot-scope="scope"
        >{{ scope.row.categoryName ? scope.row.categoryName : '-' }}</template>
      </el-table-column> -->
      <el-table-column align="center" prop="title" label="文章标题">
        <template
          slot-scope="scope"
        >{{ scope.row.title ? scope.row.title : '-' }}</template>
      </el-table-column>
      <el-table-column align="center" prop="status" label="状态" width="100">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.statusVal"
            active-color="#13ce66"
            @change="statusChange(scope.row.id,scope.row.status)"
            >
          </el-switch>
        </template>
        
      </el-table-column>
      <!-- <el-table-column align="center" prop="isOutLink" label="是否外链" width="100">
        <template slot-scope="scope">{{ returnyesno(scope.row.isOutLink)}}</template>
      </el-table-column> -->
      <el-table-column align="center" prop="writer" label="作者" width="120">
        <template
          slot-scope="scope"
        >{{ scope.row.writer ? scope.row.writer : '-' }}</template>
      </el-table-column>
      <!-- <el-table-column align="center" prop="hits" label="点击量" width="100">
        <template
          slot-scope="scope"
        >{{ scope.row.hits ? scope.row.hits : '-' }}</template>
      </el-table-column> -->
      <el-table-column align="center" prop="created" label="时间">
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
import getyesnoKey from './mixins.js'
export default {
  name: 'contentMana',
  props: {
    treeNodeData: {
      type: Object
      // default: sessionStorage.getItem('draftContent_node_Data')
    }
  },
  data() {
    return {
      langList: [], // 语种分类
      title: '',
      tableData: null,
      id:'',
      queryForm: {
        // 查询表单
        sysLangId: '', // 语种
        title: '', // 文章标题
        langName: '' // 文章类别
      },
      categorySelectData: null, //文章类别选择框数据
      currentPage: 1, // 初始当前第几页
      pageSize: 10, // 初始当前每页条数
      total: 0, // 总条数
      multipleSelection: [], // 被勾选的数据行
    }
  },
  mixins: [getyesnoKey],
  created() {
    this.getSysLangInfo()
    // this.getyesno()
  },
  mounted() {},
  watch: {
    treeNodeData: {
      handler(newval) {
        // 防止切换不同分类,currentPage不为1
        this.currentPage = 1
        this.id=newval.id
        this.getApparticleList()
      },
      immediate: true,
      deep: true
    }
  },
  computed: {
    returnTitle() {
      return '【' + this.treeNodeData.label + '】'
    },
    returnCategorySelect() {
      if (this.treeNodeData.children.length) {
        return this.treeNodeData.children.map((item) => item.name)
      }
      return this.treeNodeData.name
    }
  },
  methods: {
    // 处理yesnokey对应的值
    returnyesno(value){
      for(let item of this.yesnoArr){
        if(value === item.value * 1){
          return item.text
        }
      }
    },
    async statusChange(id,status){
      try {
        let res = await this.$api.GlobalManagement.DraftContent.changeStatus({
          id:id,
          status:status==0?status=1:status=0
        })
        if (res.success) {
          this.$message({
            type:'success',
            message:'修改状态成功'
          })
        }else{
          this.$message({
            type:'warning',
            message:'修改状态失败'
          })
        }
      } catch (e) {
        this.$handleError.handleApiRequestException(e)
      }
    },
    // 获取系统语种信息
    async getSysLangInfo() {
      try {
        let res = await this.$api.GlobalManagement.messageTemplate.getSysLangInfo()
        if (res.success) {
          this.langList = res.obj.langList
        }
      } catch (e) {
        this.$handleError.handleApiRequestException(e)
      }
    },
    // 获文章内容列表
    async getApparticleList() {
      try {
        let {
          success,
          obj
        } = await this.$api.GlobalManagement.DraftContent.getApparticleList({
          pageNum: this.currentPage,
          pageSize: this.pageSize,
          categoryId: this.id,
        })
        // console.log(success, obj, obj.total)
        if (success) {
          obj.records.forEach(item => {
            if(item.status===0){
              item.statusVal=true
            }else{
              item.statusVal=false
            }
          });
          this.tableData = obj.records
          this.total = obj.total
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
      this.getApparticleList()
    },
    // 重置
    resetForm() {
      this.queryForm.sysLangId = ''
      this.queryForm.title = ''
      this.queryForm.langName = ''
    },
    // 增删改查
    // add btn
    add() {
      // console.log('add')
      this.$router.push({
        name: 'AddContent'
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
      try {
        let {
          success
        } = await this.$api.GlobalManagement.DraftContent.removeApparticle(
         idsRemove
        )
        if (success) {
          this.getApparticleList()
          return this.$message({
            message: '删除成功',
            type: 'success'
          })
        }
        if (!success) {
          return this.$message({
            message: '删除失败',
            type: 'error'
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
      // console.log(this.multipleSelection);
      let idEdit = this.multipleSelection[0].id
      this.$router.push(`/draftContent/editContent/${idEdit}`)
    },
    // info btn
    info() {
      // console.log('info')
      if (this.multipleSelection.length !== 1) {
        return this.$message({
          type: 'warning',
          message: '请选择一条数据'
        })
      }
      // 处理被勾选的数据行
      // console.log(this.multipleSelection);
      let idInfo = this.multipleSelection[0].id
      this.$router.push(`/draftContent/infoContent/${idInfo}`)
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
      this.getApparticleList()
    },
    // 当前页变化
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`)
      this.currentPage = val
      this.getApparticleList()
    }
  }
}
</script>

<style scoped lang="scss">
.content-manage {
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
    width: 80%;
    background-color: #3b96dc;
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
</style>
