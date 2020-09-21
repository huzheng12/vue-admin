<!--
 * @name: 数据字典管理
 * @author: SunSeekerX
 * @time: 2020-03-16 14:28:25
 * @LastEditors: SunSeekerX
 * @LastEditTime: 2020-04-26 17:30:51
 -->

<template>
  <ssx-part-loading :loading="pageLoading">
    <section class="content__wrap">
      <el-row>
        <!-- Tree -->
        <el-col :xs="24" :sm="9" :lg="7">
          <div class="left__tree">
            <el-scrollbar style="height: 100%;">
              <el-tree
                :data="treeList"
                node-key="id"
                highlight-current
                accordion
                :expand-on-click-node="false"
                :indent="10"
              >
                <div
                  @click="onClickItem(data)"
                  class="custom-tree-node"
                  slot-scope="{ node, data }"
                >
                  <!-- <span>{{ node.label }}</span> -->
                  <span>{{ data.name }}</span>
                  <span>
                    <el-button
                      v-if="data.type !== '3' && $filterBtnRoute(1184)"
                      @click.stop="onAdd(data)"
                      class="color--primary"
                      type="text"
                      size="mini"
                      icon="el-icon-plus"
                    >添加</el-button>

                    <el-button
                      v-if="data.type !== '3' && $filterBtnRoute(1185)"
                      @click.stop="onEdit(data)"
                      class="color--warning"
                      type="text"
                      size="mini"
                      icon="el-icon-edit"
                    >修改</el-button>

                    <el-button
                      v-if="$filterBtnRoute(1186)"
                      @click.stop="onRemove(node, data)"
                      :loading="data.loading"
                      class="color--danger"
                      type="text"
                      size="mini"
                      icon="el-icon-delete"
                    >删除</el-button>
                  </span>
                </div>
              </el-tree>
            </el-scrollbar>
          </div>
        </el-col>

        <!-- Table -->
        <el-col :xs="24" :sm="15" :lg="17">
          <div class="right__content">
            <el-scrollbar style="height: 100%;">
              <el-table
                :data="tableData"
                @selection-change="onSelectionChange"
                stripe
                border
                style="width: 100%"
              >
                <el-table-column align="center" type="selection" width="55"></el-table-column>
                <el-table-column align="center" type="index" label="序号" width="50"></el-table-column>
                <el-table-column align="center" prop="pkey" label="字典标识">
                  <template slot-scope="scope">{{ scope.row.pkey ? scope.row.pkey : '-' }}</template>
                </el-table-column>
                <el-table-column align="center" prop="name" label="名称">
                  <template slot-scope="scope">{{ scope.row.name ? scope.row.name : '-' }}</template>
                </el-table-column>
                <el-table-column align="center" prop="value" label="键值">
                  <template slot-scope="scope">{{ scope.row.value ? scope.row.value : '-' }}</template>
                </el-table-column>
                <el-table-column align="center" prop="remark1" label="remark1">
                  <template slot-scope="scope">{{ scope.row.remark1 ? scope.row.remark1 : '-' }}</template>
                </el-table-column>
                <el-table-column align="center" prop="remark2" label="remark2">
                  <template slot-scope="scope">{{ scope.row.remark2 ? scope.row.remark2 : '-' }}</template>
                </el-table-column>
                <el-table-column align="center" prop="remark3" label="remark3">
                  <template slot-scope="scope">{{ scope.row.remark3 ? scope.row.remark3 : '-' }}</template>
                </el-table-column>
                <el-table-column align="center" prop="remark3" label="remark3">
                  <template slot-scope="scope">{{ scope.row.remark3 ? scope.row.remark3 : '-' }}</template>
                </el-table-column>

                <el-table-column align="center" label="操作" fixed>
                  <template slot-scope="scope">
                    <el-button @click="onModifyDict(scope.row)" size="mini">编辑</el-button>
                    <!-- <el-button
                    @click="onRemoveItem(scope)"
                    :loading="scope.row.loading"
                    size="mini"
                    type="danger"
                    >删除</el-button
                    >-->
                  </template>
                </el-table-column>
              </el-table>

              <div style="margin-top: 20px">
                <el-button
                  v-if="$filterBtnRoute(1186)"
                  @click="onRemoveRequest"
                  :loading="isRemoveSelectedLoading"
                  type="danger"
                >删除</el-button>
              </div>
            </el-scrollbar>
          </div>
        </el-col>
      </el-row>

      <!-- 添加字典 -->
      <el-dialog title="添加字典" :visible.sync="isShowAddDict" :close-on-click-modal="false">
        <el-form :model="addDictForm">
          <el-form-item label="字典名称">
            <el-input v-model="addDictForm.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="字典标识">
            <el-input v-model="addDictForm.mkey" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="isShowAddDict = false">取 消</el-button>
          <el-button @click="onAddDictRequest" :loading="isAddDictLoading" type="primary">确 定</el-button>
        </div>
      </el-dialog>

      <!-- 添加字典项 -->
      <el-dialog title="添加字典项" :visible.sync="isShowAddDictItem" :close-on-click-modal="false">
        <el-form :model="addDictItemForm">
          <el-form-item label="名称">
            <el-input v-model="addDictItemForm.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="键值">
            <el-input v-model="addDictItemForm.value" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="isShowAddDictItem = false">取 消</el-button>
          <el-button
            @click="onAddDictItemRequest"
            :loading="isAddDictItemLoading"
            type="primary"
          >确 定</el-button>
        </div>
      </el-dialog>

      <!-- 修改分类 -->
      <el-dialog title="修改分类" :visible.sync="isShowModifyClassify" :close-on-click-modal="false">
        <el-form :model="modifyClassifyForm">
          <el-form-item label="分类名称">
            <el-input v-model="modifyClassifyForm.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="分类标识">
            <el-input v-model="modifyClassifyForm.value" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="isShowModifyClassify = false">取 消</el-button>
          <el-button
            @click="onEditClassifyRequest"
            :loading="isModifyClassifyLoading"
            type="primary"
          >确 定</el-button>
        </div>
      </el-dialog>

      <!-- 修改字典 -->
      <el-dialog title="修改字典" :visible.sync="isShowModifyDict" :close-on-click-modal="false">
        <el-form :model="modifyDictForm">
          <el-form-item label="字典名称">
            <el-input v-model="modifyDictForm.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="字典标识">
            <el-input v-model="modifyDictForm.value" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="isShowModifyDict = false">取 消</el-button>
          <el-button @click="onEditDictRequest" :loading="isModifyDictLoading" type="primary">确 定</el-button>
        </div>
      </el-dialog>

      <!-- 修改字典项 -->
      <el-dialog title="修改字典项" :visible.sync="isShowModifyDictItem" :close-on-click-modal="false">
        <el-form :model="modifyDictItemForm">
          <el-form-item label="字典标识">
            <el-input v-model="modifyDictItemForm.mkey" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="父标识">
            <el-input v-model="modifyDictItemForm.pkey" disabled autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="字典名称">
            <el-input v-model="modifyDictItemForm.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="字典键值">
            <el-input v-model="modifyDictItemForm.value" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="isShowModifyDictItem = false">取 消</el-button>
          <el-button
            @click="onModifyDictItemRequest"
            :loading="isModifyDictItemLoading"
            type="primary"
          >确 定</el-button>
        </div>
      </el-dialog>
    </section>
  </ssx-part-loading>
</template>

<script>
import SsxPartLoading from "@/components/SsxPartLoading";
import { simpleDataFormat } from "@/utils/recursion-router";
export default {
  name: "DataDictionary",
  components: {
    SsxPartLoading
  },
  data() {
    return {
      // 页面是否加载
      pageLoading: true,
      // 列表树对象
      treeList: [],
      // 表格数据对象
      tableData: [],
      // 当前选中表格数据父对象
      tableDataParent: null,
      // 当前选中表格的id字符串
      tableSelectedId: "",
      // 删除选中按钮是否加载
      isRemoveSelectedLoading: false,

      // 添加字典dialog是否显示
      isShowAddDict: false,
      // 添加字典按钮是否加载
      isAddDictLoading: false,
      // 添加字典对象
      addDictObj: null,
      // 添加字典表单
      addDictForm: {
        // 字典名称
        name: "",
        // 字典标识
        mkey: "",
        // 3 字典级别 1,初始目录 2.次级目录 3字典对象
        type: "2",
        // 父级键值
        pkey: ""
      },

      // 添加字典项
      isShowAddDictItem: false,
      // 添加字典项是否加载
      isAddDictItemLoading: false,
      // 添加字典项对象
      addDictItemObj: null,
      // 添加字典项表单
      addDictItemForm: {
        // 名称
        name: "",
        // 键值
        value: "",
        // 3 字典级别 1,初始目录 2.次级目录 3字典对象
        type: "3",
        // 父级键值
        pkey: ""
      },

      // 修改分类dialog
      isShowModifyClassify: false,
      // 修改分类是否加载
      isModifyClassifyLoading: false,
      // 修改分类对象
      modifyObj: null,
      // 修改分类表单
      modifyClassifyForm: {
        // 名称
        name: "",
        // 键值
        value: "",
        // 字典id
        id: "",
        // 字典标识
        mkey: ""
      },

      // 修改字典
      isShowModifyDict: false,
      // 修改字典是否加载
      isModifyDictLoading: false,
      // 修改字典表单
      modifyDictForm: {
        // 字典名称
        name: "",
        // 字典标识
        value: ""
      },

      // 修改字典项
      isShowModifyDictItem: false,
      // 修改字典项按钮是否加载
      isModifyDictItemLoading: false,
      // 修改字典项对象
      modifyDictItemObj: null,
      // 修改字典项表单
      modifyDictItemForm: {
        // id
        id: "",
        // 字典标识
        mkey: "",
        // 父标识
        pkey: "",
        // 字典名称
        name: "",
        // 字典键值
        value: ""
      }
    };
  },
  mounted() {
    /**
     * 初始化树
     */
    this.onInitTree();
  },
  methods: {
    /**
     * 初始化树
     */
    async onInitTree() {
      try {
        const res = await this.$api.SiteConfiguration.listTree();
        if (res && res.length) {
          this.treeList = simpleDataFormat("", res);
        } else {
          this.$message({
            type: "warning",
            message: "获取菜单失败"
          });
        }
      } catch (error) {
        // console.error(error)
        // this.$message({
        //   type: 'error',
        //   message: '获取菜单失败'
        // })
        this.$handleError.handleApiRequestException(error);
      } finally {
        this.pageLoading = false;
      }
    },

    /**
     * 左边树删除请求
     */
    onRemove(node, data) {
      this.$confirm("你确定要删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          if (["1", "2"].includes(data.type)) {
            try {
              // 启动按钮loading
              this.$set(data, "loading", true);
              const res = await this.$api.SiteConfiguration.removeGroup({
                id: data.id
              });
              if (res.success) {
                const parent = node.parent;
                const children = parent.data.children || parent.data;
                const index = children.findIndex(d => d.id === data.id);
                children.splice(index, 1);
              }

              // 提示
              this.$handleError.handleRequestFail({
                type: res.success ? "success" : "warning",
                message: res.msg
              });
            } catch (error) {
              // 请求失败
              this.$handleError.handleApiRequestException(error);
            } finally {
              // 关闭按钮loading
              this.$set(data, "loading", false);
            }
          } else {
            // 删除字段 多个
            try {
              // 启动按钮loading
              this.$set(data, "loading", true);
              const res = await this.$api.SiteConfiguration.remove({
                ids: data.id
              });
              if (res.success) {
                const parent = node.parent;
                const children = parent.data.children || parent.data;
                const index = children.findIndex(d => d.id === data.id);
                children.splice(index, 1);
              }
              // 提示
              this.$handleError.handleRequestFail({
                type: res.success ? "success" : "warning",
                message: res.msg
              });
            } catch (error) {
              // 请求失败
              this.$handleError.handleApiRequestException(error);
            } finally {
              // 关闭按钮loading
              this.$set(data, "loading", false);
            }
          }
        })
        .catch(() => {});
    },

    /**
     * 当点击子项
     */
    onClickItem(data) {
      switch (data.type) {
        case "2":
          if (data.children && data.children.length) {
            this.tableData = data.children;
            // 取得数据表格父对象
            this.tableDataParent = data;
          }
          break;
        default:
          break;
      }
    },

    /**
     * 修改字典项
     */
    onModifyDict(data) {
      // 显示编辑框
      this.isShowModifyDictItem = true;
      // 取得编辑对象
      this.modifyDictItemObj = data;
      // 显示编辑项
      Object.assign(this.modifyDictItemForm, {
        // id
        id: data.id,
        // 字典标识
        mkey: data.mkey,
        // 父标识
        pkey: data.pkey,
        // 字典名称
        name: data.name,
        // 字典键值
        value: data.value
      });
    },

    /**
     * 修改字典项请求
     */
    async onModifyDictItemRequest() {
      try {
        // 启动按钮loading
        this.isModifyDictItemLoading = true;
        const { id, mkey, name, value } = this.modifyDictItemForm;
        const res = await this.$api.SiteConfiguration.modify({
          name,
          value,
          id,
          mkey
        });
        if (res.success) {
          Object.assign(this.modifyDictItemObj, {
            name,
            value,
            id,
            mkey
          });
          // 关闭编辑框
          this.isShowModifyDictItem = false;
        }
        // 提示
        this.$handleError.handleRequestFail({
          type: res.success ? "success" : "warning",
          message: res.msg
        });
      } catch (error) {
        // 请求失败
        this.$handleError.handleApiRequestException(error);
      } finally {
        // 关闭按钮loading
        this.isModifyDictItemLoading = false;
      }
    },
    /**
     * 添加
     */
    onAdd(data) {
      switch (data.type) {
        case "1":
          // 添加字典项
          this.addDictForm.pkey = data.mkey;
          this.addDictObj = data;
          this.isShowAddDict = true;
          break;
        case "2":
          // 添加字典项
          this.addDictItemForm.pkey = data.mkey;
          this.addDictItemObj = data;
          this.isShowAddDictItem = true;
          break;
        default:
          break;
      }
    },
    /**
     * 删除分组
     */
    async onRemoveGroup(data) {
      let result;
      try {
        // 启动按钮loading
        this.$set(data, "loading", true);
        const res = await this.$api.SiteConfiguration.removeGroup({
          id: data.id
        });
        if (res.success) {
          result = true;
        } else {
          result = false;
        }
        // 提示
        this.$handleError.handleRequestFail({
          type: res.success ? "success" : "warning",
          message: res.msg
        });
      } catch (error) {
        // 请求失败
        this.$handleError.handleApiRequestException(error);
      } finally {
        this.$set(data, "loading", false);
      }
      return result;
    },

    /**
     * 删除字段请求，可以删除多个
     */
    onRemoveRequest() {
      if (!this.tableSelectedId) {
        return this.$message({
          type: "warning",
          message: "请至少选择一条数据！"
        });
      }

      this.$confirm("你确定要删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          // 删除字段 多个
          try {
            // 启动按钮loading
            this.isRemoveSelectedLoading = true;
            const res = await this.$api.SiteConfiguration.remove({
              ids: this.tableSelectedId
            });
            if (res.success) {
              const idArr = this.tableSelectedId.split(",");
              // 定义一个新的数组，接受改变后的结果
              const newResArr = [];
              for (let i = 0; i < this.tableData.length; i++) {
                if (!idArr.includes(String(this.tableData[i].id))) {
                  newResArr.push(this.tableData[i]);
                }
              }
              this.tableSelectedId = "";
              // 把结果提交给表格数据父对象
              this.tableDataParent.children = newResArr;
              // 重新把表格数据对象执行新的表格数据父对象的children
              this.tableData = this.tableDataParent.children;
            }
            // 提示
            this.$handleError.handleRequestFail({
              type: res.success ? "success" : "warning",
              message: res.msg
            });
          } catch (error) {
            // 请求失败
            this.$handleError.handleApiRequestException(error);
          } finally {
            // 关闭按钮loading
            this.isRemoveSelectedLoading = false;
          }
        })
        .catch(() => {});
    },
    /**
     * 修改
     */
    onEdit(data) {
      switch (data.type) {
        case "1":
          // 修改分类
          this.isShowModifyClassify = true;
          Object.assign(this.modifyClassifyForm, {
            name: data.name,
            value: data.value,
            id: data.id,
            mkey: data.mkey
          });
          this.modifyObj = data;
          break;
        case "2":
          // 修改字典
          this.isShowModifyDict = true;
          Object.assign(this.modifyDictForm, {
            name: data.name,
            value: data.value,
            id: data.id,
            mkey: data.mkey
          });
          this.modifyObj = data;
          break;
        default:
          break;
      }
    },

    /**
     * 修改分类请求
     */
    async onEditClassifyRequest() {
      try {
        // 启动按钮loading
        this.isModifyClassifyLoading = true;
        const res = await this.$api.SiteConfiguration.modify(
          this.modifyClassifyForm
        );
        if (res.success) {
          // 关闭修改分类dialog
          this.isShowModifyClassify = false;
          // 更新修改后的数据
          Object.assign(this.modifyObj, {
            name: this.modifyClassifyForm.name,
            value: this.modifyClassifyForm.value
          });
        }
        // 提示
        this.$handleError.handleRequestFail({
          type: res.success ? "success" : "warning",
          message: res.msg
        });
      } catch (error) {
        // 请求失败
        this.$handleError.handleApiRequestException(error);
      } finally {
        // 关闭按钮loading
        this.isModifyClassifyLoading = false;
      }
    },
    /**
     * 修改字典请求
     */
    async onEditDictRequest() {
      try {
        // 启动按钮loading
        this.isModifyDictLoading = true;
        const res = await this.$api.SiteConfiguration.modify(
          this.modifyDictForm
        );
        if (res.success) {
          // 关闭修改字典dialog
          this.isShowModifyDict = false;
          // 更新修改后的数据
          Object.assign(this.modifyObj, {
            name: this.modifyDictForm.name,
            value: this.modifyDictForm.value
          });
        }
        // 提示
        this.$handleError.handleRequestFail({
          type: res.success ? "success" : "warning",
          message: res.msg
        });
      } catch (error) {
        // 请求失败
        this.$handleError.handleApiRequestException(error);
      } finally {
        // 关闭按钮loading
        this.isModifyDictLoading = false;
      }
    },
    /**
     * 添加字典请求
     */
    async onAddDictRequest() {
      // 参数校验
      if (!this.addDictForm.name) {
        return this.$message({
          type: "warning",
          message: "请输入字典名称"
        });
      } else if (!this.addDictForm.mkey) {
        return this.$message({
          type: "warning",
          message: "请输入字典标识"
        });
      }

      // 请求
      try {
        this.isAddDictLoading = true;
        const res = await this.$api.SiteConfiguration.addGroup(
          this.addDictForm
        );
        if (res.success) {
          // 添加到listTree
          if (this.addDictObj.children) {
            this.addDictObj.children.push(res.obj);
          } else {
            this.$set(this.addDictObj, "children", [res.obj]);
          }
          // 清空输入
          Object.assign(this.addDictForm, {
            name: "",
            mkey: "",
            pkey: ""
          });
          // 关闭dialog
          this.isShowAddDict = false;
        }
        // 提示
        this.$handleError.handleRequestFail({
          type: res.success ? "success" : "warning",
          message: res.msg
        });
      } catch (error) {
        // 请求失败
        this.$handleError.handleApiRequestException(error);
      } finally {
        this.isAddDictLoading = false;
      }
    },
    /**
     * 添加字典项请求
     */
    async onAddDictItemRequest() {
      // 参数校验
      if (!this.addDictItemForm.name) {
        return this.$message({
          type: "warning",
          message: "请输入名称"
        });
      } else if (!this.addDictItemForm.value) {
        return this.$message({
          type: "warning",
          message: "请输入键值"
        });
      }

      // 请求
      try {
        this.isAddDictItemLoading = true;
        const res = await this.$api.SiteConfiguration.addItem(
          this.addDictItemForm
        );
        if (res.success) {
          // 添加到listTree
          if (this.addDictItemObj.children) {
            this.addDictItemObj.children.push(res.obj);
          } else {
            this.$set(this.addDictItemObj, "children", [res.obj]);
          }
          // 清空输入
          Object.assign(this.addDictItemForm, {
            name: "",
            value: "",
            pkey: ""
          });
          // 关闭dialog
          this.isShowAddDictItem = false;
        }
        // 提示
        this.$handleError.handleRequestFail({
          type: res.success ? "success" : "warning",
          message: res.msg
        });
      } catch (error) {
        // 请求失败
        this.$handleError.handleApiRequestException(error);
      } finally {
        this.isAddDictItemLoading = false;
      }
    },

    /**
     * 表格选择
     */
    onSelectionChange(selection) {
      const idArr = [];
      for (const item of selection) {
        idArr.push(item.id);
      }
      this.tableSelectedId = idArr.toString();
    }
  }
};
</script>

<style lang="scss" scoped>
.content__wrap {
  box-sizing: border-box;
  height: calc(100vh - 50px);
  padding: 10px;
  position: relative;
  overflow: hidden;
  .ps {
    height: calc(100vh - 70px);
  }
  .left__tree {
    // margin-bottom: 10px;
    height: calc(100vh - 70px);
    ::v-deep .el-scrollbar__wrap {
      overflow-x: hidden;
    }
  }
  .right__content {
    margin-left: 20px;
    height: calc(100vh - 70px);
    ::v-deep .el-scrollbar__wrap {
      overflow-x: hidden;
    }
    /* box-sizing: border-box; */
    /* width: 100%; */
    /* padding: 10px 10px 10px 0px; */
  }
}
.color--primary {
  color: #409eff;
}
.color--success {
  color: #67c23a;
}
.color--info {
  color: #909399;
}
.color--warning {
  color: #e6a23c;
}
.color--danger {
  color: #f56c6c;
}

.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>
