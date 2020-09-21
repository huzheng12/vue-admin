<template>
  <div class="role-container">
    <div class="title text-blue text-size18">
      <span class="border">添加角色</span>
      <el-button class="refresh-btn" icon="el-icon-arrow-left" size="mini" @click="handleBack">
        返回
      </el-button>
    </div>
    <el-form class="marginTop20" :label-position="labelPosition" label-width="80px" size="medium">
      <el-form-item label="角色名称">
        <el-input v-model="addForm.name" clearable></el-input>
      </el-form-item>
      <el-form-item label="角色描述">
        <el-input v-model="addForm.description" clearable type="textarea" autosize></el-input>
      </el-form-item>
    </el-form>
    <el-button type="primary" plain size="medium" v-if="$filterBtnRoute(1207)" @click="handleAddSubmit">提交</el-button>
    <!-- 树 start -->
    <el-tabs type="border-card">
      <el-tab-pane :label="item.name" v-for="(item,index) in data" :key="index">
        <el-tree :data="item.treeList" node-key="id" default-expand-all :expand-on-click-node="false" show-checkbox :default-checked-keys="item.selectList"
          :props="{ children: 'children',label: 'name' }" :ref="'tree'+ +index">
        </el-tree>
      </el-tab-pane>
    </el-tabs>
    <!-- 树 end -->
  </div>
</template>
<script>
import { arrayToJson2, dealWithData } from "@/utils/treeFormate";

export default {
  data() {
    return {
      labelPosition: 'right',
      data: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      addForm: {
        name: '',
        description: ''
      }
    }
  },
  methods: {
    // 点击返回
    handleBack() {
      this.$router.push('./accountManage/rolePower')
    },
    // 获取树
    async getTreeDetail() {
      try {
        const res = await this.$api.SiteConfiguration.roleaddmenu()
        // console.log('roleaddmenures',res)
        if (res.success) {
          let data = dealWithData(res.obj)
          // let data = dealWithData(res.obj.all)
          // let authData = dealWithData(res.obj.has)
          // debugger
          data.forEach(e => {
            e.treeList = arrayToJson2(e.allData)
            if (e.rootmenu === 'site_configuration') {
              e.name = '站点配置'
            } else if (e.rootmenu === 'global_management') {
              e.name = '全球化'
            } else if (e.rootmenu === 'otc_management') {
              e.name = 'OTC'
            } else if (e.rootmenu === 'customer_service') {
              e.name = '客服'
            } else if (e.rootmenu === 'asset_center') {
              e.name = '资产中心'
            } else {
              e.name = '币币'
            }
            // authData.forEach(item => {
            //   if (e.rootmenu === item.rootmenu) {
            //     let arr = []
            //     item.allData.forEach(ele => {
            //       arr.push(ele.id)
            //     })
            //     e.selectList = arr
            //   }
            // })
          })
          // console.log(data, JSON.stringify(data))
          this.data = data
        }
      } catch (e) {
        // Handle api request exception
        this.$handleError.handleApiRequestException(e)
      }
    },
    // clickTree(v, e) {
    //   // console.log(v.id);
    //   // console.log(e.parent.data.id);
    // },
    // 处理添加提交
    async handleAddSubmit() {
      // console.log(this.$refs.tree0[0].getCheckedNodes(), this.$refs.tree1[0].getCheckedNodes(), this.$refs.tree2[0].getCheckedNodes(), this.$refs.tree3[0].getCheckedNodes(), this.$refs.tree4[0].getCheckedNodes(), this.$refs.tree5[0].getCheckedNodes())
      let arr = []
      let selectMkey = []
      let selectMkeyString = ''
      this.data.forEach((e, i) => {
        // console.log(this.$refs['tree' + i][0].getCheckedNodes())
        arr = arr.concat(this.$refs['tree' + i][0].getCheckedNodes(false, true))
      })
      arr.forEach(e => {
        selectMkey.push(e.mkey)
      })
      selectMkeyString = selectMkey.join(',')
      // console.log(selectMkeyString, selectMkey.length)
      // debugger
      try {
        const res = await this.$api.SiteConfiguration.roleadd({
          name: this.addForm.name, // 角色名称
          permissionId: selectMkeyString, // 权限id
          remark: this.addForm.description
        })
        // console.log('roleAddRes', res)
        if (res.success) {
          this.$message({
            type: 'success',
            message: res.msg
          })
          this.$router.push('/accountManage/rolePower')
        } else {
          this.$message({
            type: 'warning',
            message: res.msg
          })
        }
      } catch (e) {
        // Handle api request exception
        this.$handleError.handleApiRequestException(e)
      }
    },
  },
  mounted() {
    // console.log('this.$route.query', this.$route.query)
    this.getTreeDetail()
  },
  computed: {}
}
</script>

<style lang="scss" scoped>
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
  .el-form-item {
    width: 600px;
  }
  .el-tabs {
    margin: 20px 0;
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