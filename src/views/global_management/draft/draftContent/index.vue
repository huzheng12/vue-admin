<template>
  <div>
    <div class="tree fl w18">
      <div class="text-blue text-size18 title">
        <span class="border">文章内容管理</span>
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
        <span
          class="custom-tree-node"
          slot-scope="{ node }"
        >
          <span>{{ node.label }}</span>
        </span>
      </el-tree>
    </div>
    <div class="fr w82">
      <content-mana v-if="nodeData" :treeNodeData="nodeData"></content-mana>
    </div>
  </div>
</template>

<script>
export default {
  name: 'contentIndex',
  data() {
    return {
      treeData: [], // tree
      nodeData: JSON.parse(sessionStorage.getItem('draftContent_node_Data')) || null, //节点数据
      expandedArr: JSON.parse(sessionStorage.getItem('draftContent_expanded_Arr')) || [], // 展开节点
    }
  },
  async created() {
    // location.reload()
    try {
      let {
        success,
        obj
      } = await this.$api.GlobalManagement.DraftContent.getLoadTree({
        langCode:'zh_CN'
      })
      // console.log(success, obj)
      if (success) {
        this.treeData = obj
        
      }
    } catch (e) {
      // Handle api request exception
      this.$handleError.handleApiRequestException(e)
    }
  },
  methods: {
    // tree节点关闭
    handleCollapseClick(data){
      // console.log('tree节点关闭', data.id, this.expandedArr);
      this.expandedArr.forEach((item, index) => {
        if(item === data.id){
          // console.log(item, data.id);
          this.expandedArr.splice(index,1)
          sessionStorage.setItem('draftContent_expanded_Arr', JSON.stringify(this.expandedArr))
        }
      })
    },
    // tree节点展开
    handleExpandClick(data){
      // console.log('tree节点展开', data.id, this.expandedArr);
      if(!this.expandedArr.includes(data.id)){
        this.expandedArr.push(data.id)
        sessionStorage.setItem('draftContent_expanded_Arr', JSON.stringify(this.expandedArr))
      }
    },
    // tree节点点击
    handleNodeClick(data) {
      // console.log('tree节点点击',data.id, data, data.children)
      this.nodeData = data
      // 持久化
      sessionStorage.setItem('draftContent_node_Data', JSON.stringify(data))
    }
  },
  components: {
    ContentMana: () => import('./contentManage')
  }
}
</script>

<style scoped lang="scss">
.tree {
  padding: 20px;
  // background-color: #eee;
  .title {
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
  .el-tree {
    margin-top: 20px;
  }
  .el-button {
    position: relative;
    width: 18px;
    height: 18px;
    cursor: pointer;
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
