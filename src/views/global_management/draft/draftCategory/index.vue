<template>
  <div>
    <div class="tree fl w18">
      <div class="text-blue text-size18 title">
        <span class="border">文章类别管理</span>
          <el-select v-model="langkey" placeholder="请选择语种" class="selectLang" @change="changeLang">
            <el-option
              :label="item.name | replaceStr"
              :value="item.value"
              v-for="(item, index) in langList"
              :key="index"
            >
            </el-option>
          </el-select>
      </div>
      <el-tree
        icon-class="el-icon-folder-opened"
        :data="treeData"
        node-key="id"
        :default-expanded-keys="expandedArr"
        @node-click="handleNodeClick"
        @node-collapse="handleCollapseClick"
        @node-expand="handleExpandClick"
      >
        <span class="custom-tree-node" slot-scope="{ node }">
          <span>{{ node.label }}</span>
          <span v-if="true" style="padding-left: 10px;">
            <el-button
              class="btn"
              icon="el-icon-edit"
              circle
              type="primary"
              size="mini"
              v-if="$filterBtnRoute(870) && node.data.id !== 0"
              @click="edit(node)"
            ></el-button>
            <el-button
              class="btn"
              icon="el-icon-plus"
              circle
              type="success"
              size="mini"
              @click="add(node)"
              v-if="isShowAddBtn(node.childNodes.length, node.data.preateId)"
            ></el-button>
            <el-button
              class="btn"
              circle
              type="danger"
              icon="el-icon-delete"
              size="mini"
              v-if="$filterBtnRoute(1160) && node.data.id !== 0"
              @click="remove(node.data.id)"
            ></el-button>
            <!-- v-if="!node.id === 0" -->
            <!-- node.data.id -->
            <!-- preateId -->
          </span>
        </span>
      </el-tree>
    </div>
    <div class="fr w82">
      <!-- <router-view></router-view> -->
      <category-mana v-if="nodeData" :treeNodeData="nodeData" :langkey="langkey" @reloadTree="reloadTree"></category-mana>
    </div>
  </div>
</template>

<script>
export default {
  name: "CategoryIndex",
  props: {},
  data() {
    return {
      treeData: [], // tree,
      langList:[],
      langkey:'',
      nodeData:
        JSON.parse(sessionStorage.getItem("draftCategory_node_Data")) || null, //节点数据
      expandedArr:
        JSON.parse(sessionStorage.getItem("draftCategory_expanded_Arr")) || [], // 展开节点
      isShowBtn: false // 功能按钮显示
    };
  },
  async created() {
   await this.getSysLangInfo()
   await this.getLoadTree();
  },
  methods: {
    // 获取tree
    async getLoadTree() {
      try {
        let {
          success,
          obj
        } = await this.$api.GlobalManagement.DraftContent.getLoadTree({
          langCode:this.langkey
        });
        // console.log(success, obj)
        if (success) {
          this.treeData = obj;
          // 增加一级分类
          this.$forceUpdate();
          // let treeArr = [
          //   {
          //     id: 0,
          //     name: "文章分类管理",
          //     label: "文章分类管理",
          //     children: []
          //   }
          // ];
          // treeArr[0].children = [...simpleDataFormat(0, obj)];
          // this.treeData = treeArr;
        }
      } catch (e) {
        // Handle api request exception
        this.$handleError.handleApiRequestException(e);
      }
    },
    // tree节点关闭
    handleCollapseClick(data) {
      // console.log('tree节点关闭', data.id, this.expandedArr);
      this.expandedArr.forEach((item, index) => {
        if (item === data.id) {
          // console.log(item, data.id);
          this.expandedArr.splice(index, 1);
          sessionStorage.setItem(
            "draftCategory_expanded_Arr",
            JSON.stringify(this.expandedArr)
          );
        }
      });
    },
    reloadTree(){
      this.getLoadTree()
    },
    // tree节点展开
    handleExpandClick(data) {
      // console.log('tree节点展开', data.id, this.expandedArr);
      if (!this.expandedArr.includes(data.id)) {
        this.expandedArr.push(data.id);
        sessionStorage.setItem(
          "draftCategory_expanded_Arr",
          JSON.stringify(this.expandedArr)
        );
      }
    },
    async getSysLangInfo() {
      try {
        const res = await this.$api.GlobalManagement.messageTemplate.getSysLangInfo()
        if (res.success) {
          this.langList = res.obj.langList
          this.langkey=res.obj.langList[0].value
        }else{
          this.$notify({
            type: 'warning',
            message: res.msg
          })
        }
      } catch (e) {
        this.$handleError.handleApiRequestException(e)
      }
    },
    changeLang(){
      this.getLoadTree()
    },
    // tree节点点击
    handleNodeClick(data) {
      // console.log('tree节点点击', data.id, data, data.children)
      this.nodeData = data;
      // 持久化
      sessionStorage.setItem("draftCategory_node_Data", JSON.stringify(data));
    },
    // add按钮是否显示
    isShowAddBtn(data1, data2){
      // $filterBtnRoute(869) && node.childNodes.length || node.data.preateId === 0
      if(!this.$filterBtnRoute(869)){
        return false
      }
      if(this.$filterBtnRoute(869)){
        return data1 || data2 === 0
      }
    },
    // add
    add(node) {
      // console.log('add', node)
      sessionStorage.setItem(
        "draftCategory_node_Data",
        JSON.stringify(node.data)
      );
      this.$router.push({
        name: "AddCategory"
      });
    },
    // remove
    async remove(id) {
      // console.log(id)
      // console.log('remove')
      this.$confirm("你确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$api.GlobalManagement.DraftCategory.removeAppcategory(id).then(
            res => {
              if (res.success) {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                this.getLoadTree();
              }
              if (!res.success) {
                this.$message({
                  type: "error",
                  message: "删除失败!"
                });
              }
            }
          );
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // edit
    edit(node) {
      // console.log('edit', node)
      sessionStorage.setItem(
        "draftCategory_node_Data",
        JSON.stringify(node.data)
      );
      this.$router.push(`/draftCategory/editCategory/${node.data.id}`);
    }
  },
  components: {
    CategoryMana: () => import("./categoryManage")
  }
};
</script>

<style scoped lang="scss">
.tree {
  padding: 20px 0 20px 20px;
  .title {
    padding-bottom: 15px;
    border-bottom: 2px solid #ebebeb;
    display: flex;
    justify-content: space-between;
    .selectLang{
      width: 50%;
    }
  }
  .border {
    position: relative;
    width: 50%;
  }
  .border::before {
    content: "";
    position: absolute;
    top: 35px;
    left: 0;
    height: 2px;
    width: 100%;
    background-color: #3b96dc;
  }
  .el-tree {
    margin-top: 20px;
  }
  .el-button {
    position: relative;

    width: 14px;
    height: 14px;
    cursor: pointer;
    margin-left: 0;
  }
}
.text-blue {
  color: #3b96dc;
}
.text-size18 {
  font-size: 18px;
}
.fl {
  float: left;
}
.fr {
  float: right;
}
.w18 {
  width: 18%;
}
.w82 {
  width: 81.9%;
}
// 修改el组件样式
.el-tree {
  color: #000;
  // background-color: #eee;
  ::v-deep .el-tree-node__expand-icon {
    // color: #000;
  }
  ::v-deep .custom-tree-node {
    font-size: 14px;
  }
  ::v-deep .el-tree-node__children {
    overflow-x: auto;
  }
}
.btn {
  top: -5px;
  ::v-deep i {
    transform: translate(-50%, -50%);
    position: absolute;
    top: 50%;
    left: 50%;
  }
}
</style>
