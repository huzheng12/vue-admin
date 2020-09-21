<template>
  <div class="role-container">
    <div class="title text-blue text-size18">
      <span class="border">编辑角色</span>
      <el-button class="refresh-btn" icon="el-icon-arrow-left" size="mini" @click="handleBack">
        返回
      </el-button>
    </div>
    <el-form class="marginTop20" :label-position="labelPosition" label-width="80px" size="medium">
      <el-form-item label="角色名称">
        <el-input v-model="this.rolename" clearable></el-input>
      </el-form-item>
      <el-form-item label="角色描述">
        <el-input v-model="this.roledescription" clearable type="textarea" autosize></el-input>
      </el-form-item>
    </el-form>
    <el-button type="primary" plain size="medium" v-if="$filterBtnRoute(1208)" @click="handleEditSubmit">提交</el-button>
    <!-- 树 start -->
    <!-- -->
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
      roleid: 0,
      rolename: '',
      roledescription: '',
    }
  },
  methods: {
    // 点击返回
    handleBack() {
      // console.log('点击了')
      this.$router.push('/accountManage/rolePower')
    },
    // 获取树
    async getTreeDetail() {
      try {
        const res = await this.$api.SiteConfiguration.modifydetail({
          id: this.id
        })
        if (res.success) {
          // console.log('modifydetailres',res);
          // let rolelist = Object.values(res.obj.role)
          // console.log('rolelist',rolelist);

          let data = dealWithData(res.obj.all)
          let authData = dealWithData(res.obj.has)
          // console.log(data, authData);
          //setChecked 子节点只选中一个需要用setChecked，（(key/data, checked, deep) 接收三个参数，
          // 1. 勾选节点的 key 或者 data 2. boolean 类型，节点是否选中 3. boolean 类型，是否设置子节点 ，默认为 false）如果全部选中setCheckedKeys
          // that.$refs.tree.setChecked(value, true, false)
          data.forEach(e => {
            e.treeList = arrayToJson2(e.allData)
            // console.log('e.treeList', e.treeList, JSON.stringify(e.treeList))
            // console.log('e.treeList', e.treeList)
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
            authData.forEach(item => {
              if (e.rootmenu === item.rootmenu) {
                let arr = []
                item.allData.forEach((ele) => {
                  var result = this.computerTreeListHasSelectId(ele.id, e.treeList);
                  !(result && result.children && result.children.length) && arr.push(ele.id)
                  // if (result) {
                  //   if (result.children && result.children.length) {
                  //   } else {
                  //     arr.push(ele.id)
                  //   }
                  // }
                })
                e.selectList = arr
              }
            })

          })
          // console.log(data, JSON.stringify(data))
          this.data = data
          this.roleid = res.obj.role.id
          this.rolename = res.obj.role.name
          this.roledescription = res.obj.role.remark
          // console.log('roledescription',this.roledescription);
        }
      } catch (e) {
        // Handle api request exception
        this.$handleError.handleApiRequestException(e)
      }
    },
    computerTreeListHasSelectId(id, treeList) {
      //设置结果
      let result;
      if (!treeList) return; // 如果treeList传空，直接返回
      for (var i = 0; i < treeList.length; i++) {
        let element = treeList[i]
        if (element.id === id) {
          result = element
          break
        } else if (element.children && element.children.length) {
          result = this.computerTreeListHasSelectId(id, element.children)
          if (result) return result // 关键代码：如果找到，就直接返回，结束后面的循环
        }
      }
      return result
    },
    // clickTree(v, e) {
    //   // console.log(v.id);
    //   // console.log(e.parent.data.id);
    // },
    // 处理编辑提交
    async handleEditSubmit() {
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
      try {
        const res = await this.$api.SiteConfiguration.rolemodify({
          id: this.id, // 角色id
          name: this.rolename, // 角色名称
          permissionId: selectMkeyString, // 权限id
          remark: this.roledescription
        })
        // console.log('roleModifyRes', res)
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
    // console.log('this.$route.params', this.$route.params)
    this.getTreeDetail()
  },
  computed: {
    id() {
      // return this.$route.query.id
      return this.$route.params.id
    },
    // name() {
    //   return this.$route.query.name
    // },
    // description() {
    //   return this.$route.query.description
    // }
  }
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