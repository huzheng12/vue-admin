<template>
  <div class="page">
    <!-- 标题 -->
    <div class="title">
      <span class="title-text">自动发送记录</span>
      <!-- <i class="el-icon-refresh title-icon" @click="refreshModus" id="refreshIcon"></i> -->
    </div>
    <!-- 查询条件 -->
    <div class="query">
      <el-form :model="form" label-width="1180px" label-position="top" :inline="true">
        <el-form-item label="标题关键词">
          <el-input v-model="form.titleWord"></el-input>
        </el-form-item>
        <el-form-item label="发送时间起始">
           <el-date-picker
            value-format="yyyy-MM-dd"
            v-model="form.startTime"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="发送时间截止">
          <el-date-picker
            value-format="yyyy-MM-dd"
            v-model="form.endTime"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="form.defaultState" placeholder="请选择">
            <el-option
              :label="item.text"
              :value="item.value"
              v-for="(item, index) in form.status"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" class="search" @click="searchModus">搜索</el-button>
          <el-button type="danger" icon="el-icon-refresh-left" class="search" @click="resetModus">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 表格部分 -->
    <div class="table">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="index" label="序号" width="55"></el-table-column>
        <el-table-column prop="messageTitle" label="标题">
          <template
          slot-scope="scope"
        >{{ scope.row.messageTitle ? scope.row.messageTitle : '-' }}</template>
        </el-table-column>
        <el-table-column label="信件语种">
          <template slot-scope="scope">{{langModus(scope.row.messageCategory)}}</template>
        </el-table-column>
        <el-table-column prop="sendUserName" label="发件人">
          <template
          slot-scope="scope"
        >{{ scope.row.sendUserName ? scope.row.sendUserName : '-' }}</template>
        </el-table-column>
        <!-- <el-table-column prop="postParam" label="收件人详情" width="120"></el-table-column> -->
        <!-- <el-table-column prop="sendStatus" label="收件人手机" width="120"></el-table-column> -->
        <!-- <el-table-column prop="thirdPartyResult" label="收件人姓名" width="140"></el-table-column> -->
        <el-table-column label="发送时间">
          <template slot-scope="scope">
            {{$moment(scope.row.sendDate).format("YYYY-MM-DD HH:mm:ss")}}
          </template>
        </el-table-column>
        <!-- <el-table-column prop="sendContent" label="修改时间"></el-table-column> -->
        <el-table-column prop="sendContent" label="操作">
          <template slot-scope="scope">
            <el-button type="success" size="mini" @click="lookModus(scope.row.id)">查看</el-button>
            <el-button type="warning" size="mini" @click="detailModus(scope.row.list)">收件人详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 查看的弹框 -->
    <el-dialog
      title=""
      :visible.sync="dialogVisibleLook"
      width="30%"
      :before-close="handleClose">
      <span>
        <el-form :model="formLook" label-width="1180px" label-position="top">
          <el-form-item label="语种">
            <el-input v-model="formLook.Languages" disabled></el-input>
          </el-form-item>
          <el-form-item label="信件标题">
            <el-input v-model="formLook.title" disabled></el-input>
          </el-form-item>
          <el-form-item label="信件正文">
            <!-- <el-input v-model="form.titleWord"></el-input> -->
            <span v-html="formLook.content"></span>
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleLook = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisibleLook = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 详情的弹框 -->
    <el-dialog
      title="收件人详情"
      :visible.sync="dialogVisibleDetail"
      width="50%"
      :before-close="handleClose">
      <span>
        <el-table :data="detailTableData" style="width: 100%">
          <el-table-column type="index" label="序号" width="55"></el-table-column>
          <el-table-column label="邮箱">
            <template slot-scope="scope">
              {{ scope.row.appPersonInfo.email ? scope.row.appPersonInfo.email : '-' }}
            </template>
          </el-table-column>
          <el-table-column prop="appPersonInfo.mobilePhone" label="手机号"></el-table-column>
          <el-table-column label="姓名">
            <template slot-scope="scope">
              {{ scope.row.appPersonInfo.surname + scope.row.appPersonInfo.trueName }}
            </template>
          </el-table-column>
          <el-table-column prop="commonLanguage" label="常用语种"></el-table-column>
        </el-table>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleDetail = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisibleDetail = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 分页部分 -->
    <div class="pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="10"
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
      // 条件查询
      form: {
        // 标题关键词
        titleWord: '',
        // 发送时间起始
        startTime: '',
        // 发送时间截止
        endTime: '',
        // 状态
        defaultState: '',
        // 状态的可选项
        status: [
          { label: '不限', value: '' },
          { label: '未发送', value: '0' },
          { label: '已发送', value: '1' },
          { label: '已撤回', value: '3' }
        ]
      },
      offset: 0,
      limit: 10,
      // mobileNum: null,
      // sendStatus: null,
      // 表格数据
      tableData: [],
      currentPage: 1,
      total: null,
      // 语言
      langList: [],
      // 查看的弹框
      dialogVisibleLook: false,
      formLook: {
        // 语种
        Languages: '',
        // 信件标题
        title: '',
        // 信件正文
        content: ''
      },
      // 详情的弹框
      dialogVisibleDetail: false,
      detail:{
        offset: 0,
        limit: 10,
      },
      detailTableData: [],
      detailTotal: null,


      // typeName: []
    }
  },
  async mounted() {
    await this.getKey()
    await this.getSysLangInfo()
    await this.listMessageVo()
  },
  methods: {
    // 站内信状态: messageStates
    async getKey() {
      try {
        const res = await this.$api.Common.getKey({
          key: 'messageStates'
        })
        this.form.status = res
      } catch (e) {
        this.$handleError.handleApiRequestException(e)
      }
    },
    // 获取系统语种信息
    async getSysLangInfo() {
      try {
        const res = await this.$api.GlobalManagement.messageTemplate.getSysLangInfo()
        if (res.success) {
          // console.log('aaa', res.obj.langList)
          this.langList = res.obj.langList
          // this.activeName = res.obj.defaultLang
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

    // 查询
    async listMessageVo() {
      try {
        const res = await this.$api.GlobalManagement.letterRecord.listMessageVo(
          {
            isAuto: '1',         // 自动发送记录 1 手动 0
            offset: this.offset,         // 偏移量
            limit: this.limit,          // 数量   
            title_like: this.form.titleWord,     // 标题关键字
            sendDate_GT: this.form.startTime,    // 发送时间起始
            sendDate_LT: this.form.endTime,    // 发送时间截至
            isSend: this.form.defaultState         // 状态 0 未发送 已发送 1 已撤回 3
          }
        )
        // console.log(res)
        // if(!res.success) {
        //   this.$notify({
        //     title: '警告',
        //     message: res.msg,
        //     type: 'warning'
        //   })
        //   return
        // }
        this.tableData = res.rows
        this.total = res.total
      } catch (e) {
        this.$handleError.handleApiRequestException(e)
      }
    },
    
    // 根据接口返回的类型显示表格中对应的值(语种)
    langModus(val) {
      const data = this.langList.filter(item => {
        if (item.value == val) {
          return item
        }
      })
      return data[0].name
    },

    // 选择每页显示多少条
    handleSizeChange(val) {
      this.limit = val
      this.offset = 0
      this.listMessageVo()
    },

    // 当前页的数据
    handleCurrentChange(val) {
      this.offset = (val - 1) * this.limit
      this.listMessageVo()
    },

    // 搜索
    searchModus() {
      this.offset = 0
      this.listMessageVo()
    },

    // 重置
    resetModus() {
      this.form.titleWord = ''
      this.form.startTime = ''
      this.form.endTime = ''
      this.form.defaultState = ''
      this.offset = 0
      this.listMessageVo()
    },

    // 查看
    async lookModus(val) {
      this.dialogVisibleLook = true
      // 获取一条的信息
      try {
        const res = await this.$api.GlobalManagement.letterRecord.modifysee({
          id: val
        })
        // console.log(res);
        if (res.success) {
          const listLook = res.obj.obj
          // console.log('listLook', listLook);
          const langType = res.obj.obj.messageCategory
          this.formLook.Languages = this.langList.filter(item => {
            if (item.value == langType) {
              return item
            }
          })[0].name
          this.formLook.title = listLook.title
          this.formLook.content = listLook.content
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

    // 收件人详情
    async detailModus(val) {
      // console.log(val[0].customerId);
      this.dialogVisibleDetail = true
      const ids = val[0].customerId
       // 获取一条的信息
      try {
        const res = await this.$api.GlobalManagement.letterRecord.list({
          ids,                            // 客户ID 多个用,隔开
          offset: this.detail.offset,    // 从第几条开始
          limit: this.detail.limit      // 每页多少条
        })
        // console.log(res);
        if (res.success) { 
          this.detailTableData = res.obj.records
          this.detailTotal = res.obj.total

        
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

    // 关闭弹框
    handleClose(done) {
      done()
    }

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

  .title-text {
    border-bottom: 2px solid #3b96dc;
    padding-bottom: 18px;
    position: absolute;
    bottom: -2px;
    left: 0;
  }
  .title-icon {
    margin-bottom: 20px;
    font-size: 26px;
    position: absolute;
    bottom: -2px;
    right: 0;
  }
}
// 条件查询
.query {
  .search {
    margin-top: 37px;
  }
}
// 表格部分
// 分页部分
.pagination {
  margin-top: 35px;
}
// 修改element组件样式
.page {
  ::v-deep .el-form--inline .el-form-item {
    margin-right: 60px;
  }
  ::v-deep .el-form--label-top .el-form-item__label {
    padding: 0;
  }
}
// 动画
.rotate {
  animation: circle 3s 1 linear;
}
@keyframes circle {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
