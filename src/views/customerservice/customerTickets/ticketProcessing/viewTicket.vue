<template>
  <div class="add-mailTem">
    <div class="title text-blue text-size18">
      <span class="border">查看工单</span>
      <el-button class="return-btn" type="primary" @click="back">
        返回
        <i class="el-icon-d-arrow-right"></i>
      </el-button>
    </div>
    <!-- 表单 -->
    <el-form class="form" label-position="top" :model="formData" ref="ruleForm">
      <el-form-item label="语言" prop="activeName">
        <el-select v-model="formData.activeName" placeholder="请选择" disabled>
          <el-option
            :label="item.name"
            :value="item.value"
            v-for="(item, index) in formData.langList"
            :key="index"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="工单编号" prop="workOrderNo">
        <el-input v-model="formData.workOrderNo" disabled></el-input>
      </el-form-item>
      <el-form-item label="工单类型" prop="categoryName">
        <el-input v-model="formData.categoryName" disabled></el-input>
      </el-form-item>
      <el-form-item label="工单图片">
          <el-image 
          class="ticketImg"
          v-for="(item,index) in imgUrlArr"
          :key="index"
          v-show="imgflag"
          style="width: 100px; height: 100px"
          :src="$ALI_OSS_URL+item" 
          :preview-src-list="[$ALI_OSS_URL+item]">
        </el-image>
      </el-form-item>
      <el-form-item label="工单内容" prop="content">
          <el-input type="textarea" v-model="formData.content" resize="none" :rows="10" disabled></el-input>
        </el-form-item>
      <el-form-item label="回复方式" prop="replyStatus" v-show="isAccepted === 1">
        <el-select v-model="formData.replyStatus" placeholder="请选择" disabled>
          <el-option
            :label="item.text"
            :value="item.value"
            v-for="(item, index) in formData.replyModeList"
            :key="index"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="回复内容" v-show="isAccepted === 1">
        <!-- 富文本 -->
        <quill-editor
          :disabled="editorFlag" 
          v-model="formData.tempContent"
          :options="editorOption"
          v-show="isAccepted === 1"
        ></quill-editor>
      </el-form-item>
      
    </el-form>
  </div>
</template>

<script>
import editor from '@/components/mixins/editor'

export default {
  name: 'editMailTem',
  props: {},
  data() {
    return {
      // 表单数据
      formData: {
        tempContent: '',
        replyStatus: '', // 选中回复方式
        replyModeList: [], // 回复方式分类
        id: '',
        langList: [], // 语种分类
        activeName: '', // 选中语种
        workOrderNo: '', // 工单编号
        categoryName: '', // 工单类型
        content: '', // 工单内容
      },
      imgUrl:'',
      imgUrlArr:[],
      imgflag:false,
      customerId: '',
      myConfig: {
        // 富文本配置
        // 编辑器不自动被内容撑高
        autoHeightEnabled: false,
        // 初始容器高度
        initialFrameHeight: 240,
        // 初始容器宽度
        initialFrameWidth: '100%',
        // 上传文件接口（文件上传功能搭建的临时接口）
        // serverUrl: 'http://35.201.165.105:8000/controller.php',
        serverUrl: 'http://dev.entry.bandex.lvyii.com/sys/ueditor/exec',
        // UEditor 资源文件的存放路径，如果你使用的是 vue-cli 生成的项目，通常不需要设置该选项，vue-ueditor-wrap 会自动处理常见的情况，如果需要特殊配置，参考下方的常见问题2
        UEDITOR_HOME_URL: '/ueditor/'
      },
      isAccepted: 1
    }
  },
  created() {
    this.getSysLangInfo()
    if(this.isAccepted === 1) {
      this.getReplyMode()
    }
  },
  mounted() {
    this.modifysee()
  },
  watch: {},
  computed: {
    id() {
      return this.$route.params.id
    },
  },
  mixins: [editor],
  methods: {
    // 通过id获取
    async modifysee() {
      try {
        const res = await this.$api.customerservice.viewtickettasks({
          id: this.id
        })
        // console.log('viewtickettasks',res);
        if (res.success) {
          const data = res.obj
          this.isAccepted = data.state
          this.customerId = data.customerId
          const tempLang = data.languageDic
          this.formData.workOrderNo = data.workOrderNo
          this.formData.categoryName = data.categoryName
          this.formData.content = data.workContent
          this.formData.tempContent = data.replyContent
          const tempReplyStatus = data.replyMode
          
          this.imgUrlArr=data.imgUrl.split(',')
          // this.imgUrl=data.imgUrl
          this.formData.replyStatus = this.formData.replyModeList.filter(item => 
          {
            if (item.value == tempReplyStatus) {
              return item
            }
          })[0].text
          this.formData.activeName = this.formData.langList.filter(item => 
          {
            if (item.value == tempLang) {
              return item
            }
          })[0].name
          if(this.imgUrlArr==''||this.imgUrlArr==null){
            this.imgflag=false
          }else{
            this.imgflag=true
          }
        }
      } catch (e) {
        this.$handleError.handleApiRequestException(e)
      }
    },

    // 获取系统语种信息
    async getSysLangInfo() {
      try {
        let res = await this.$api.GlobalManagement.messageTemplate.getSysLangInfo()
        // console.log(res);
        if (res.success) {
          this.formData.langList = res.obj.langList
          // this.activeName = res.obj.defaultLang
        }
      } catch (e) {
        this.$handleError.handleApiRequestException(e)
      }
    },

    // 获取回复方式
    async getReplyMode() {
      try {
        let res = await this.$api.Common.getKey({
          key: 'workOrderReplyMode'
        })
        // console.log('ReplyModeRes',res);
        if (res) {
          this.formData.replyModeList = res
        }
      } catch (e) {
        this.$handleError.handleApiRequestException(e)
      }
    },
    
    // 返回
    back() {
      // this.$router.go(-1)
      this.$router.push('/customerTickets/ticketProcessing')
    },
    
  }
}
</script>

<style scoped lang="scss">
.add-mailTem {
  padding: 0 20px;
  .title {
    padding: 20px 0;
    border-bottom: 2px solid #ebebeb;
    .return-btn {
      float: right;
    }
  }
  .border {
    position: relative;
  }
  .border::before {
    content: '';
    position: absolute;
    top: 40px;
    left: 0;
    height: 2px;
    width: 100%;
    background-color: #3b96dc;
  }
}
.el-form {
  padding: 30px 0;
  width: 1300px;
  .el-select {
    width: 100%;
  }
}
.ticketImg{
  margin-left: 10px;
}
.text-blue {
  color: #3b96dc;
}
.text-size18 {
  font-size: 18px;
}
// 修改富文本
.quill-editor {
  // margin-top: 15px;
  background-color: #fff;
  ::v-deep .ql-snow {
    line-height: normal !important;
  }
}
</style>
