<template>
  <div class="page">
    <!-- <div style="border: 1px dotted #ccc">
      <div style="width:500px; height:500px;background:pink" ref="chart1" id="chart-part1"></div>
    </div> -->
    <!-- 标题 -->
    <div class="title">
      <span class="title-text">短信发送记录</span>
      <!-- <i class="el-icon-refresh title-icon" @click="refreshModus" id="refreshIcon"></i> -->
    </div>
    <!-- 查询条件 -->
    <div class="query">
      <el-form :model="form" label-width="1180px" label-position="top" :inline="true">
        <el-form-item label="请选择状态">
          <el-select v-model="form.region" placeholder="请选择">
            <el-option
              :label="item.label"
              :value="item.value"
              v-for="(item, index) in form.status"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="form.mobileNum"></el-input>
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
        <el-table-column align="center" type="index" label="序号" width="55"></el-table-column>
        <el-table-column align="center" prop="mobileNum" label="手机号" width="130">
          <template slot-scope="scope">{{ scope.row.mobileNum ? scope.row.mobileNum : '-' }}</template>
        </el-table-column>
        <el-table-column align="center" label="类型" width="120">
          <template slot-scope="scope">{{typeModus(scope.row.type)}}</template>
        </el-table-column>
        <el-table-column align="center" prop="sendContent" label="短信内容">
          <template slot-scope="scope">{{ scope.row.sendContent ? scope.row.sendContent : '-' }}</template>
        </el-table-column>
        <el-table-column align="center" prop="postParam" label="请求参数" width="120">
          <template slot-scope="scope">{{ scope.row.postParam ? scope.row.postParam : '-' }}</template>
        </el-table-column>
        <el-table-column align="center" prop="sendStatus" label="状态" width="120">
          <template slot-scope="scope">{{ scope.row.sendStatus ? scope.row.sendStatus : '-' }}</template>
        </el-table-column>
        <el-table-column align="center" prop="thirdPartyResult" label="第三方返回信息" width="140">
          <template
            slot-scope="scope"
          >{{ scope.row.thirdPartyResult ? scope.row.thirdPartyResult : '-' }}</template>
        </el-table-column>
        <el-table-column align="center" label="时间" width="160">
          <template slot-scope="scope">{{$moment(scope.row.created).format("YYYY-MM-DD HH:mm:ss")}}</template>
        </el-table-column>
      </el-table>
    </div>
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
        mobileNum: '',
        region: null,
        status: [
          { label: '不限', value: '' },
          { label: '未发送', value: '0' },
          { label: '已发送', value: '1' }
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
      typeName: []
    }
  },
  async mounted() {
    await this.smsTypeList()
    await this.sendMessageList()
    // this.getEchartData1()
  },
  methods: {
    getEchartData1() {
      const chart1 = this.$refs.chart1
      // console.log(chart1)
      if (chart1) {
        const myChart = this.$echarts.init(document.getElementById('chart-part1'))
        // console.log(document.getElementById('chart-part1'))
        const option = {
          tooltip: {
            // show: false
            trigger: "axis",
            axisPointer: {
              lineStyle: {
                color: "#dddc6b"
              }
            }
          },
          grid: {
            left: '0',
            top: '0',
            right: '0',
            bottom: '0',
            containLabel: false
          },
          //  x 轴
          xAxis: [
            {
              boundaryGap: false,
              // 是否显示刻度标签
              axisLabel: {
                show: false
              },
              // 不显示y轴线条
              axisLine: {
                show: false
              },
              // 不显示刻度
              axisTick: {
                show: false
              },
              data: ['01', '02', '03', '04','05']
            }
          ],
          // Y 轴
          yAxis: [
            {
              show: false
            }
          ],
          
          series: [
            {
              type: 'line',
              smooth: true,
              symbol: 'circle',
              symbolSize: 5,
              showSymbol: false,
              lineStyle: {
                normal: {
                  color: '#00d887',
                  width: 2
                }
              },
              // 区域填充样式
              areaStyle: {
                normal: {
                  color: {
                      type: 'linear',
                      x: 0,
                      y: 0,
                      x2: 0,
                      y2: 1,
                      colorStops: [
                        {
                          offset: 0, color: 'rgba(0, 216, 135, 0.4)' // 0% 处的颜色
                        }, 
                        {
                          offset: 1, color: 'rgba(0, 216, 135, 0.1)' // 100% 处的颜色
                        }
                        ],
                      global: false // 缺省为 false
                  },
                  shadowColor: 'rgba(0, 0, 0, 0.1)'
                }
              },
              // itemStyle: {
              //   normal: {
              //     color: 'red',
              //     borderColor: 'red',
              //     borderWidth: 12
              //   }
              // },
              data: [ 50, 20, 30, 20, 10]
            }
          ]
        }
        myChart.setOption(option)
        window.addEventListener("resize", function() {
          myChart.resize();
        });
      }
    },
    // 获取短信模板类型
    async smsTypeList() {
      try {
        const res = await this.$api.GlobalManagement.messageTemplate.smsTypeList()
        if (res.success) {
          this.typeName = res.obj
          // console.log(this.typeName);
        }
      } catch (e) {
        this.$handleError.handleApiRequestException(e)
      }
    },
    // 分页查询短信发送记录
    async sendMessageList() {
      try {
        const res = await this.$api.GlobalManagement.messageRecord.sendMessageList(
          {
            offset: this.offset, // 偏移量
            limit: this.limit, // 条数
            mobileNum_like: this.form.mobileNum, // 电话号码
            sendStatus_EQ: this.form.region // 发送状态
          }
        )
        // console.log(res)
        if (res.success) {
          this.tableData = res.obj.records
          this.total = res.obj.total
          // this.tableData.map(item => {
          //   console.log('item', item);
          // })

          // for(var i= 0; i< this.tableData.length; i++){
          //   for(var j= 0; i< this.typeName.length; j++){
          //     console.log('this.tableData[i].type', this.tableData[i].type);
          //     console.log('this.typeName[j].value', this.typeName[j].value);

          //     if(this.tableData[i].type == this.typeName[j].value){
          //       this.tableData[i].type = this.typeName[j].text
          //     }
          //   }
          // }
          // for(let tableDataItem of this.tableData){
          //   console.log('tableDataItem', tableDataItem);
          //   for(let typeNameItem of this.typeName){
          //     if(tableDataItem.type == typeNameItem.value){
          //       tableDataItem.type = typeNameItem.text
          //     }
          //   }
          // }
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

    typeModus(val) {
      const data = this.typeName.filter(item => {
        if (item.value == val) {
          return item
        }
      })
      return data[0].text
    },
    // 选择每页显示多少条
    handleSizeChange(val) {
      this.limit = val
      this.offset = 0
      this.sendMessageList()
    },

    // 当前页的数据
    handleCurrentChange(val) {
      this.offset = (val - 1) * this.limit
      this.sendMessageList()
    },

    // 搜索
    searchModus() {
      this.offset = 0
      this.sendMessageList()
    },

    // 重置
    resetModus() {
      this.form.mobileNum = ''
      this.form.region = null
      this.offset = 0
      this.sendMessageList()
    },

    // 刷新
    refreshModus() {
      let refreshIcon = document.querySelector('#refreshIcon')
      // console.log('refreshIcon', refreshIcon)
      // console.log(refreshIcon.className);
      refreshIcon.className = 'el-icon-refresh title-icon rotate'
      // console.log('refreshIcon.className', refreshIcon.className);
      // this.offset = 0
      // console.log(this.currentPage);

      this.sendMessageList()
      // this.currentPage = 1
      setTimeout(() => {
        refreshIcon.className = 'el-icon-refresh title-icon'
        // console.log('====>',  refreshIcon.className);
      }, 2000)
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
.query {
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
