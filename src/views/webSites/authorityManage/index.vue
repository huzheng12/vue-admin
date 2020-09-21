<template>
  <div class="container">
    <el-tabs tab-position="left" @tab-click="handleClick">
      <el-tab-pane
        v-for="item in loadmenu"
        :key="item.id"
        :label="item.name"
        :name="item.rootmenu"
        class="treeBox"
      >
        <el-tree :data="treeList">
          <span slot-scope="{ node, data }">
            <span>{{ node.label }}</span>
            <span>
              <el-button type="text" size="mini" v-show="$filterBtnRoute(809)" @click.stop="() => append(data)">
                添加
              </el-button>
              <el-button type="text" size="mini" v-show="$filterBtnRoute(810)" @click.stop="() => edit(data)">
                修改
              </el-button>
              <el-button
                type="text"
                size="mini"
                @click.stop="() => remove(node, data)"
                v-show="$filterBtnRoute(811)"
              >
                删除
              </el-button>
            </span>
          </span>
        </el-tree>
        <div class="edit_menu">
            <div v-show="menuFlag">
                <p class="title">{{title}}</p>
                <div class="item" v-show="fatherMenuFlag">
                    <p class="title_item">父级名称</p>
                    <el-input v-model="fatherName" disabled></el-input>
                </div>
                <div class="item">
                    <p class="title_item">菜单名称</p>
                    <el-input v-model="menuName"></el-input>
                </div>
                <div class="item">
                    <p class="title_item">链接</p>
                    <el-input v-model="url" placeholder="请输入内容"></el-input>
                </div>
                <div class="item">
                    <p class="title_item">权限</p>
                    <el-input v-model="permission" placeholder="请输入内容"></el-input>
                </div>
                <div class="item">
                    <p class="title_item">排序号</p>
                    <el-input v-model="sortNum" placeholder="请输入内容"></el-input>
                </div>
                <div class="item">
                    <p class="title_item">类型</p>
                    <el-select v-model="selected" placeholder="请选择">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <el-button type="primary" @click="submit">提交</el-button>
            </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { simpleDataFormat } from "@/utils/recursion-router";
export default {
  data() {
    return {
      loadmenu: [],
      treeList: [],
      title:'',//标题
      options: [{
          value: 2,
          label: '按钮'
        }, {
          value: 1,
          label: '菜单'
        }],
        selected: '',
        fatherName:'',//父级名称
        menuName:'', //菜单名称
        sortNum:'', //排序号
        url:'', //链接
        permission:'', //权限
        menuFlag:false, //控制右侧菜单显示隐藏
        fatherMenuFlag:false, //控制父级input框显示隐藏
        mkey:'',
        rootmenu:'',
        id:'', //对应的id
        Flag:'',//标识是修改还是添加
        tab:''
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    handleClick(tab) {
  //   console.log(tab.$attrs.mkey, tab.name, tab.label);
      this.tab=tab.name
      this.getLoadtree()
    },
    async init() {
      const res = await this.$api.Account.getLoadmenu();
      if (res.success) {
        this.loadmenu = res.obj;
      } else {
        this.$message({
          type: "warning",
          message: "获取父类菜单失败"
        });
      }
    },
    getLoadtree(){
      this.$api.Account.getLoadtree({
        rootmenu: this.tab
      }).then(res => {
        if (res.success) {
          this.treeList = simpleDataFormat('', res.obj);
          // console.log(this.treeList);
        } else {
          this.$message({
            type: "warning",
            message: "获取数据失败"
          });
        }
      });
    },
    // 修改菜单
    edit(data) {
      this.menuName=data.name
      this.sortNum=data.sortno
      this.url=data.url
      this.permission=data.permission
      this.title='修改菜单'
      this.menuFlag=true
      this.fatherMenuFlag=false
      this.Flag='modify'
      this.id=data.id
      this.selected=data.type
    },
    append(data){
        this.title='添加菜单'
        this.menuFlag=true
        this.fatherMenuFlag=true
        this.fatherName=data.name
        this.menuName=''
        this.mkey=data.mkey
        this.rootmenu=data.rootmenu
        this.sortNum=data.sortno
        this.Flag='add'
        this.selected=data.type
    },

    //删除菜单
    remove(node,data){
        this.id=data.id
        this.$confirm('此操作将永久删除该菜单, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$api.Account.removeMenu({
            id:this.id
            }).then(res=>{
                if(res.success){
                    const parent = node.parent;
                    const children = parent.data.children || parent.data;
                    const index = children.findIndex(d => d.id === data.id);
                    children.splice(index, 1);
                    this.$message({
                        type: "success",
                        message: res.msg
                    });
                }else{
                    this.$message({
                        type: "warning",
                        message: res.msg
                    });
                }
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
        
    },
    submit(){
        if(this.selected==''){
            this.$message({
                type: "warning",
                message: "类型不能为空"
            });
            return
        }
        if(this.Flag=='add'){
            //添加菜单
            this.$api.Account.addMenu({
              name:this.menuName,
              url:this.url,
              permission:this.permission,
              sortno:this.sortNum,
              type:this.selected,
              pkey:this.mkey,
              rootmenu:this.rootmenu
            }).then(res=>{
                if(res.success){
                  this.getLoadtree()
                    this.$message({
                        type: "success",
                        message: "添加成功"
                    });
                }else{
                    this.$message({
                        type: "warning",
                        message: "添加失败"
                    });
                }
            })
        }else{
            // 修改菜单
            this.$api.Account.modifyMenu({
                permission:this.permission,
                url:this.url,
                sortno:this.sortNum,
                name:this.menuName,
                type:this.selected,
                id:this.id
            }).then(res=>{
                if(res.success){
                    this.$message({
                        type: "success",
                        message: res.msg
                    });
                }else{
                    this.$message({
                        type: "warning",
                        message: "修改失败"
                    });
                }
            })
        }

    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  padding: 20px;
  .treeBox {
      display: flex;
      justify-content: space-around;
      .edit_menu{
          width: 50%;
          height: 100%;
        .title{
            margin: 0px 0 10px;
            line-height: 34px;
            border-bottom: 2px solid #3b96dc;
            font-size: 18px;
            color: #3b96dc;
        }
       .item{
            margin-bottom: 15px;
          .title_item{
            display: inline-block;
            max-width: 100%;
            margin-bottom: 5px;
            font-weight: 700;
            color: rgb(99, 112, 115);
          }
        }
      }

  }
}
</style>
