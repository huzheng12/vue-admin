<template>
  <div class="role-container">
    <div class="title text-blue text-size18">
      <span class="border">角色管理</span>
      <el-button class="refresh-btn" icon="el-icon-refresh" size="mini" @click="handleRefresh">
      </el-button>
    </div>
    <!-- 按钮 -->
    <!-- <el-button type="primary" size="mini" icon="el-icon-edit">编辑</el-button>
          <el-button type="primary" size="mini" icon="el-icon-view" @click="handleView">查看</el-button>
    <el-button type="primary" size="mini" icon="el-icon-delete">删除</el-button>-->
    <el-button class="marginTop20" icon="el-icon-folder-add" v-if="$filterBtnRoute(818)" @click="handleAdd">添加角色</el-button>
    <!-- 表格start -->
    <el-table
      ref="singleTable"
      :data="tableData"
      highlight-current-row
      @current-change="handleCurrentChange"
      style="width: 100%"
    >
      <el-table-column align="center" type="index" width="50"></el-table-column>
      <el-table-column align="center" prop="name" label="角色名称" width="200">
        <template slot-scope="scope">{{ scope.row.name ? scope.row.name : '-' }}</template>
      </el-table-column>
      <el-table-column align="center" prop="remark" label="角色描述">
        <template slot-scope="scope">{{ scope.row.remark ? scope.row.remark : '-' }}</template>
      </el-table-column>
      <el-table-column align="center" fixed="right" label="操作" width="150">
        <template slot-scope="scope">
          <el-button v-if="$filterBtnRoute(817)" @click="handleView(scope.row)" type="text" size="small">查看</el-button>
          <el-button v-if="$filterBtnRoute(821)" @click="handleEdit(scope.row)" type="text" size="small">编辑</el-button>
          <el-button v-if="$filterBtnRoute(820)" @click="handleRemove(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 表格end -->
    <!-- 分页start -->
    <div class="block">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageParam.total"
      ></el-pagination>
    </div>
    <!-- 分页end -->
    <!-- 对话框start -->
    <el-dialog title="查看角色" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="角色名称" :label-width="formLabelWidth">
          <el-input v-model="rowArr.name" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="角色描述" :label-width="formLabelWidth">
          <el-input v-model="rowArr.remark" autocomplete="off" type="textarea" autosize disabled></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 对话框end-->
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPage: 1,
      multipleSelection: [],
      roleId: 0,
      rowArr: [],
      pageParam: {
        count: 0,
        total: 10,
        pageCurrent: 1, // 初始化为第一页
        pageSize: 10
      },
      tableData: [],
      dialogFormVisible: false,
      formLabelWidth: '120px',
      form: {
        rolename: '',
        roledescription: ''
      }
    }
  },
  methods: {
    // handle click refreshes icon
    handleRefresh() {
      this.roleslist()
    },
    // 取消选择
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    // 分页
    // handleSizeChange(val) {
    //   console.log(`每页 ${val} 条`);
    // },
    handleCurrentChange(val) {
      this.currentRow = val
    },
    // 角色列表
    async roleslist() {
      try {
        const res = await this.$api.SiteConfiguration.rolelist({
          pageNo: this.pageParam.pageCurrent,
          pageSize: this.pageParam.pageSize
        })
        // console.log('rolelistRes', res)
        if (res.success) {
          this.tableData = res.obj.records
          this.pageParam.total = Number(res.obj.total)
        }
      } catch (e) {
        // Handle api request exception
        this.$handleError.handleApiRequestException(e)
      }
    },
    // 点击添加
    handleAdd() {
      this.$router.push('/addRole')
    },
    // 点击编辑
    handleEdit(row) {
      // console.log(row);
      // this.$router.push({ path: '/editRole', query: { id: row.id, name: row.name, description: row.remark } })
      this.$router.push({
        path: `/editRole/${row.id}`,
        query: { id: JSON.stringify(row.id) }
      })
    },
    // 点击删除
    handleRemove(row) {
      this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$api.SiteConfiguration.roleremove({
            ids: row.id
          })
            .then((res) => {
              // console.log('removeMessageRes', res)
              if (res.success) {
                this.$message({
                  type: 'success',
                  message: res.msg
                })
                // location.reload()
                this.roleslist()
              }
            })
            .catch((e) => {
              // Handle api request exception
              this.$handleError.handleApiRequestException(e)
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 点击查看
    handleView(row) {
      // console.log(row);
      this.dialogFormVisible = true
      this.rowArr = row
    }
  },
  mounted() {
    this.roleslist()
  }
}
</script>

<style lang="scss" scoped>
.block {
  margin-top: 35px;
}
.role-container {
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
}

.text-blue {
  color: #3b96dc;
}
.text-size18 {
  font-size: 18px;
}
.marginTop20 {
  margin-top: 20px;
} 
</style>