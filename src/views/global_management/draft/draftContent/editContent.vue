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
      <el-form class="form" :rules="rules" label-position="top" :model="formData" ref="ruleForm">
        <el-row justify="space-around" :gutter="30">
          <el-col :span="12">
            <el-form-item label="选择语种" prop="sysLangId">
              <el-select v-model="formData.sysLangId">
                <el-option
                  v-for="item in langList"
                  :key="item.id"
                  :label="item.name | replaceStr"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="文章类别" prop="categoryId">
              <el-select v-model="formData.categoryId">
                <el-option
                  v-for="(item, index) in categorySelectData"
                  :key="index"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row justify="space-around" :gutter="30">
          <el-col :span="12">
            <el-form-item label="文章标题" prop="title">
              <el-input v-model="formData.title"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="文章作者" prop="writer">
              <el-input v-model="formData.writer"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row justify="space-around" :gutter="30">
          <el-col :span="12">
            <el-form-item label="是否开启" prop="status">
              <el-select v-model="formData.status">
                <el-option :label="item.label" :value="item.value * 1" v-for="item in yesOrno" :key="item.text"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否外链" prop="isOutLink">
              <el-select v-model="formData.isOutLink">
                <el-option :label="item.text" :value="item.value * 1" v-for="item in yesnoArr" :key="item.text"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="外链地址">
          <el-input v-model="formData.outLink"></el-input>
        </el-form-item>
        <el-form-item label="允许h5访问地址">
          <el-input v-model="formData.accessH5"></el-input>
        </el-form-item>
        <el-form-item label="允许pc访问地址">
          <el-input v-model="formData.accessPC"></el-input>
        </el-form-item>
        <el-row justify="space-around" :gutter="30">
          <el-col :span="12">
            <el-form-item label="文章来源">
              <el-input v-model="formData.source"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="文章点击量(数字)">
              <el-input type="number" v-model.trim.number="formData.hits"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="文章简介">
          <el-input :rows="4" type="textarea" v-model="formData.shortContent"></el-input>
        </el-form-item>
        <!-- 富文本 -->
        <el-form-item label="文章内容(必填)" prop="content">
          <quill-editor :disabled="editorFlag" v-model="formData.content" :options="editorOption"></quill-editor>
        </el-form-item>

        <el-row justify="space-around" :gutter="30">
          <el-col :span="12">
            <el-form-item label="seo标题">
              <el-input v-model="formData.seoTitle"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="seo关键字">
              <el-input v-model="formData.seoKeyword"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="seo描述">
          <el-input :rows="4" type="textarea" v-model="formData.seoDescribe"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-if="$filterBtnRoute(863)" @click="submitForm('ruleForm')">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import editor from '@/components/mixins/editor'
import getyesnoKey from './mixins.js'
export default {
  name: 'editContent',
  props: {},
  data() {
    return {
      langList: [], // 语种分类
      title: '',
      yesOrno:[{
        label:'是',
        value:0
      },{
        label:'否',
        value:1
      }],
      categorySelectData: null, //文章类别选择框数据
      // 表单数据
      formData: {
        id: '',
        langCode: '', // 语种value
        categoryId: '', // 文章类别id
        title: '', //文章标题
        writer: '', //作者
        status: '', // 是否置顶
        isOutLink: '', // 是否外链
        outLink: '', // 外链地址
        // accessH5: '', // h5地址
        // accessPC: '', //pc地址
        source: '', // 文章来源
        hits: '', // 点击量
        shortContent: '', // 文章简介
        seoTitle: '', //seo标题
        seoKeyword: '', // seo关键字
        seoDescribe: '', // seo描述
        // editorValue: '' // 富文本内容
        content: ''
      },
      //  yesnoArr: [],
      // 表单验证规则
      rules: {
        // 语种
        langCode: [
          {
            required: true,
            message: '请选择语种',
            trigger: 'change'
          }
        ],
        // 文章分类
        categoryId: [
          {
            required: true,
            message: '请选择文章类别',
            trigger: 'change'
          }
        ],
        // 是否外链
        status: [
          {
            required: true,
            message: '请选择置顶',
            trigger: 'change'
          }
        ],
        // 是否置顶
        isOutLink: [
          {
            required: true,
            message: '请选择外链',
            trigger: 'change'
          }
        ],
        // 作者
        writer: [
          {
            required: true,
            message: '请填写作者',
            trigger: 'blur'
          }
        ],
        // 标题
        title: [
          {
            required: true,
            message: '请填写标题',
            trigger: 'blur'
          }
        ],
        // 富文本
        content: [
          {
            required: true,
            message: '请填写文章内容',
            trigger: 'blur'
          }
        ]
      }

      // myConfig: {
      //   // 百度富文本配置
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
    ).label
    await this.getSysLangInfo()
    await this.modifyseeApparticle()
    this.changeCategoryNameSel()
  },
  mounted() {},
  mixins: [editor, getyesnoKey],
  watch: {},
  computed: {},
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
    // 富文本
    // 失去焦点事件
    // onEditorBlur(e) {
    //   console.log('失去焦点事件', e)
    // },
    // // 获得焦点事件
    // onEditorFocus(e) {
    //   console.log('获得焦点事件', e)
    // },
    // // 内容改变事件
    // onEditorChange(e) {
    //   console.log('内容改变事件', e)
    // },
    // 获取文章内容
    async modifyseeApparticle() {
      try {
        let id = this.$route.params.id
        this.formData.id = id
        // console.log(id)
        let {
          success,
          obj
        } = await this.$api.GlobalManagement.DraftContent.modifyseeApparticle(
          id
        )
        // console.log(success, obj)
        if (success) {
          for (let key in this.formData) {
            if (key in obj) {
              this.formData[key] = obj[key]
            }
          }
          // this.formData['content'] = window.encodeURI(this.formData['content'])
          this.formData.sysLangId = obj.sysLangId
          // console.log(this.formData)
        }
      } catch (e) {
        // Handle api request exception
        this.$handleError.handleApiRequestException(e)
      }
    },
    // 修改文章内容
    async modifyApparticle(data) {
      try {
        let res = await this.$api.GlobalManagement.DraftContent.modifyApparticle(
          data
        )
        // console.log(res.success, res);
        if (res.success) {
          this.$message({
            type: 'success',
            message: '修改成功'
          })
          this.$router.go(-1)
        }
        if (!res.success) {
          this.$message({
            type: 'error',
            message: '修改失败'
          })
        }
      } catch (e) {
        // Handle api request exception
        this.$handleError.handleApiRequestException(e)
      }
    },
    // 处理文章类别选择框数据
    changeCategoryNameSel() {
      let treeNodeData = JSON.parse(
        sessionStorage.getItem('draftContent_node_Data')
      )
      if (treeNodeData.children) {
        this.categorySelectData = treeNodeData.children.map((item) => ({
          name: item.name,
          id: item.id
        }))
        this.categorySelectData.unshift({
          name: treeNodeData.name,
          id: treeNodeData.id
        })
      }
      if (!treeNodeData.children) {
        this.categorySelectData = [
          {
            name: treeNodeData.name,
            id: treeNodeData.id
          }
        ]
      }
    },
    // 返回
    back() {
      this.$router.go(-1)
    },
    // 提交表单
    submitForm(formName) {
      let flag = true
      // 整体判断表单必填选项
      this.$refs[formName].validate((valid) => {
        if (!valid) {
          // console.log(valid);
          flag = valid
          return this.$message({
            type: 'error',
            message: '请填写完必填选项!'
          })
        }
      })
      if (!flag) {
        return false
      }
      // 富文本转义
      let obj = JSON.parse(JSON.stringify(this.formData))
      obj['content'] = window.encodeURI(obj['content'])

      this.modifyApparticle(obj)
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