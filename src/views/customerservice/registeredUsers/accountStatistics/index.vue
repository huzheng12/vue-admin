<template>
  <div class="whiteUser">
    <div class="title text-blue text-size18">
      <span class="border">平台账户余额统计</span>
      <!-- 刷新 -->
      <el-button class="refresh-btn fr" type="primary" @click="refresh">
        <i class="el-icon-refresh"></i>
      </el-button>
      <!-- 下拉复选框 -->
      <el-dropdown
        :hide-on-click="false"
        split-button
        type="primary"
        class="fr refresh-btn marginRight5"
        trigger="click"
      >
        <i class="el-icon-s-grid"></i>
        <el-dropdown-menu slot="dropdown">
          <el-checkbox-group v-model="checkList">
            <!-- <el-dropdown-item>
              <el-checkbox label="序号"></el-checkbox>
            </el-dropdown-item>-->
            <el-dropdown-item>
              <el-checkbox label="id"></el-checkbox>
            </el-dropdown-item>
            <el-dropdown-item>
              <el-checkbox label="币种"></el-checkbox>
            </el-dropdown-item>
            <el-dropdown-item>
              <el-checkbox label="冻结"></el-checkbox>
            </el-dropdown-item>
            <el-dropdown-item>
              <el-checkbox label="可用"></el-checkbox>
            </el-dropdown-item>
          </el-checkbox-group>
        </el-dropdown-menu>
      </el-dropdown>
      <el-button
        class="fr marginRight5 refresh-btn"
        @click="handleDownload"
        :loading="downloadLoading"
        style="margin:0 0 20px 20px;"
        type="primary"
        icon="el-icon-document"
      >导出</el-button>
      <ExportType v-model="bookType" class="fr refresh-btn" />
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
      <!-- v-if="this.checkList.includes('序号')" -->
      <el-table-column align="center" type="index" label="序号" width="50"></el-table-column>
      <el-table-column v-if="this.checkList.includes('id')" align="center" prop="id" label="id">
        <template slot-scope="scope">{{ scope.row.id ? scope.row.id : '-' }}</template>
      </el-table-column>
      <el-table-column
        v-if="this.checkList.includes('币种')"
        align="center"
        prop="coinCode"
        label="币种"
        width="150"
      >
        <template slot-scope="scope">{{ scope.row.coinCode ? scope.row.coinCode : '-' }}</template>
      </el-table-column>
      <el-table-column
        v-if="this.checkList.includes('冻结')"
        align="center"
        prop="cold_money"
        label="冻结"
      >
        <template slot-scope="scope">{{ scope.row.cold_money ? scope.row.cold_money : '-' }}</template>
      </el-table-column>
      <el-table-column
        v-if="this.checkList.includes('可用')"
        align="center"
        prop="hot_money"
        label="可用"
      >
        <template slot-scope="scope">{{ scope.row.hot_money ? scope.row.hot_money : '-' }}</template>
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
function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (typeof time === 'string') {
      if (/^[0-9]+$/.test(time)) {
        // support "1548221490638"
        time = parseInt(time)
      } else {
        // support safari
        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        time = time.replace(new RegExp(/-/gm), '/')
      }
    }

    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    return value.toString().padStart(2, '0')
  })
  return time_str
}
import { saveAs } from 'file-saver'
import ExportType from '@/components/ExportType/ExportType'
export default {
  name: 'accountStatisticsIndex',
  props: {},
  data() {
    return {
      checkList: ['id', '币种', '冻结', '可用'],
      tableData: null,
      queryForm: {
        // 查询表单
        email: '',
        mobilePhone: ''
      },
      currentPage: 1, // 初始当前第几页
      pageSize: 10, // 初始当前每页条数
      total: 0, // 总条数
      multipleSelection: [], // 被勾选的数据行
      bookType: 'xlsx', // 下载文件格式
      listLoading: true,
      downloadLoading: false
    }
  },
  created() {
    this.getExcoinsumList()
  },
  mounted() {},
  watch: {},
  computed: {},
  methods: {
    // download file
    handleDownload() {
      import('@/vendor/Export2Excel').then((excel) => {
        // const tHeader = [ 'id', '币种', '冻结', '可用']
        let tHeader = JSON.parse(JSON.stringify(this.checkList))
        // tHeader.splice(this.checkList.indexOf('序号'), 1)
        const filterVal = ['id', 'coinCode', 'cold_money', 'hot_money']
        const list = this.tableData // tabale data
        const data = this.formatJson(filterVal, list) // 过滤/返回勾选需要的table数据
        // console.log(this.bookType);
        // 注意: 处理json!!!
        if (this.bookType === 'json') {
          var blob = new Blob([JSON.stringify(list)], { type: '' })
          return saveAs(blob, 'tableExport.json')
        }
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'tableExport', // 导出文件名
          autoWidth: true,
          bookType: this.bookType // 导出文件格式
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map((v) =>
        filterVal.map((j) => {
          if (j === 'created' || j === 'modifed') {
            return parseTime(v[j])
          } else {
            return v[j]
          }
        })
      )
    },

    // refresh btn
    refresh() {
      location.reload()
    },
    // 获取资金账户统计列表
    async getExcoinsumList() {
      try {
        let res = await this.$api.customerservice.registeredUsers.getExcoinsumList(
          {
            offset: (this.currentPage - 1) * this.pageSize,
            limit: this.pageSize
          }
        )
        // console.log(res)
        this.tableData = res.rows
        this.total = res.total
      } catch (e) {
        // Handle api request exception
        this.$handleError.handleApiRequestException(e)
      }
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
      this.getExcoinsumList()
    },
    // 当前页变化
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`)
      this.currentPage = val
      this.getExcoinsumList()
    }
  },
  components: {
    ExportType
  }
}
</script>

<style scoped lang="scss">
.whiteUser {
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
  }
  .el-table {
    padding-top: 20px;
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
.marginRight5 {
  margin-right: 5px !important;
}
.fr {
  float: right;
}
// 修改el样式
.form {
  .el-form-item {
    ::v-deep .el-form-item__label {
      padding: 0;
    }
  }
}
.el-table {
  ::v-deep .el-table__body-wrapper {
    td div {
      font-size: 12px;
    }
  }
}
</style>
