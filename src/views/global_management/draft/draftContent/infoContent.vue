<template>
  <div class="add-content">
    <div class="content-title text-blue text-size18 title"><span class="border">{{`【${title}】`}}</span></div>
    <div style="padding: 0 20px">
      <div class="title text-blue text-size18">
        <span class="border">文章基础信息</span>
        <el-button class="return-btn" size="mini" icon="el-icon-arrow-left" @click="back">
          返回
        </el-button>
      </div>
      <!-- 表单 -->
      <el-form
        class="form"
        label-position="top"
        label-width="100px"
        :model="formData"
        ref="ruleForm"
      >
        <el-row justify="space-around" :gutter="30">
          <el-col :span="12">
            <el-form-item label="选择语种">
              <el-select disabled v-model="formData.sysLangId">
                <el-option
                  v-for="item in langList"
                  :key="item.id"
                  :label="item.name | replaceStr"
                  :value="item.value"
                >
                  <span v-html="item.name"></span>
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="文章类别">
              <el-select disabled v-model="formData.categoryName">
                <el-option :label="formData.categoryName" :value="formData.categoryName"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row justify="space-around" :gutter="30">
          <el-col :span="12">
            <el-form-item label="文章标题">
              <el-input disabled v-model="formData.title"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="文章作者">
              <el-input disabled v-model="formData.writer"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row justify="space-around" :gutter="30">
          <el-col :span="12">
            <el-form-item label="是否置顶">
              <el-select disabled v-model="formData.isStick">
                <el-option :label="item.text" :value="item.value * 1" v-for="item in yesnoArr" :key="item.text"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否外链">
              <el-select disabled v-model="formData.isOutLink">
                <el-option :label="item.text" :value="item.value * 1" v-for="item in yesnoArr" :key="item.text"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="外链地址">
          <el-input disabled v-model="formData.outLink"></el-input>
        </el-form-item>
        <el-form-item label="允许h5访问地址">
          <el-input disabled v-model="formData.accessH5"></el-input>
        </el-form-item>
        <el-form-item label="允许pc访问地址">
          <el-input disabled v-model="formData.accessPC"></el-input>
        </el-form-item>
        <el-row justify="space-around" :gutter="30">
          <el-col :span="12">
            <el-form-item label="文章来源">
              <el-input disabled v-model="formData.source"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="文章点击量">
              <el-input disabled v-model="formData.hits"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="文章简介">
          <el-input disabled :rows="4" type="textarea" v-model="formData.shortContent"></el-input>
        </el-form-item>
        <!-- 富文本 -->
        <el-form-item label="文章内容(必填)" prop="content">
          <!-- <vue-ueditor-wrap class="ueditor" v-model="formData.content" :config="myConfig"></vue-ueditor-wrap> -->
          <quill-editor disabled v-model="formData.content" :options="editorOption"></quill-editor>
        </el-form-item>

        <el-row justify="space-around" :gutter="30">
          <el-col :span="12">
            <el-form-item label="seo标题">
              <el-input disabled v-model="formData.seoTitle"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="seo关键字">
              <el-input disabled v-model="formData.seoKeyword"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="seo描述">
          <el-input disabled :rows="4" type="textarea" v-model="formData.seoDescribe"></el-input>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import editor from '@/components/mixins/editor'
import getyesnoKey from './mixins.js'
export default {
  name: 'infoContent',
  data() {
    return {
      langList: [], // 语种分类
      title: '',
      // 表单数据
      formData: {
        langType: '', // 语种名称
        sysLangId: '', // 语种value
        categoryName: '', // 文章类别
        title: '', //文章标题
        writer: '', //作者
        isStick: 0, // 是否置顶
        isOutLink: 0, // 是否外链
        outLink: '', // 外链地址
        accessH5: '', // h5地址
        accessPC: '', //pc地址
        source: '', // 文章来源
        hits: '', // 点击量
        shortContent: '', // 文章简介
        seoTitle: '', //seo标题
        seoKeyword: '', // seo关键字
        seoDescribe: '', // seo描述
        content: '' // 富文本内容
      }

      // myConfig: {
      //   // 富文本配置
      //   // 编辑器不自动被内容撑高
      //   autoHeightEnabled: false,
      //   // 初始容器高度
      //   initialFrameHeight: 240,
      //   // 初始容器宽度
      //   initialFrameWidth: '100%',
      //   // 上传文件接口（这个地址是我为了方便各位体验文件上传功能搭建的临时接口，请勿在生产环境使用！！！）
      //   serverUrl: 'http://35.201.165.105:8000/controller.php',
      //   // UEditor 资源文件的存放路径，如果你使用的是 vue-cli 生成的项目，通常不需要设置该选项，vue-ueditor-wrap 会自动处理常见的情况，如果需要特殊配置，参考下方的常见问题2
      //   UEDITOR_HOME_URL: '/ueditor/'
      // }
    }
  },
  async created() {
    this.title = JSON.parse(
      sessionStorage.getItem('draftContent_node_Data')
    ).name
    await this.getSysLangInfo()
    await this.modifyseeApparticle()
  },
  mixins: [editor, getyesnoKey],
  methods: {
    // 获取系统语种信息
    async getSysLangInfo() {
      try {
        let res = await this.$api.GlobalManagement.messageTemplate.getSysLangInfo()
        // console.log(res);
        if (res.success) {
          this.langList = res.obj.langList
          // this.activeName = res.obj.defaultLang
        }
      } catch (e) {
        this.$handleError.handleApiRequestException(e)
      }
    },
    // 获取文章内容
    async modifyseeApparticle() {
      try {
        let id = this.$route.params.id
        // console.log(id)
        let {
          success,
          obj
        } = await this.$api.GlobalManagement.DraftContent.modifyseeApparticle(
          id
        )
        // console.log(success, obj)
        if (success) {
          this.formData = {
            sysLangId: obj.sysLangId,
            ...obj.model
          }
        }
      } catch (e) {
        // Handle api request exception
        this.$handleError.handleApiRequestException(e)
      }
    },
    // 返回
    back() {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped lang="scss">
.add-content {
  padding: 0 20px;
  .content-title {
    border-bottom: 1px solid #000;
    padding: 20px 0;
  }
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
    width: 80%;
    background-color: rgb(64, 158, 255);
  }
  .el-form {
    padding: 30px 0;
    .el-select {
      width: 100%;
    }
  }
}
.text-blue {
  color: rgb(64, 158, 255);
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

// 修复因element污染富文本编辑器的样式
// .ueditor {
//   ::v-deep #edui191 {
//     height: 24px !important;
//   }
//   ::v-deep #edui77 {
//     height: 24px !important;
//   }
//   ::v-deep #edui83 {
//     height: 24px !important;
//   }
//   ::v-deep #edui92 {
//     height: 24px !important;
//   }
//   ::v-deep #edui105 {
//     height: 24px !important;
//   }
//   ::v-deep #edui105 {
//     height: 24px !important;
//   }
//   ::v-deep #edui117 {
//     height: 24px !important;
//   }
//   ::v-deep #edui121 {
//     height: 24px !important;
//   }
// }
</style>