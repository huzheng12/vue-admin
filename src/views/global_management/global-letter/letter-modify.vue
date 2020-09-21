<template>
  <div class="page">
    <!-- 标题 -->
    <div class="title">
      <span class="title-text">修改站内信模板</span>
      <el-button plain size="mini" class="title-bnt" icon="el-icon-arrow-left" @click="backModus">返回</el-button>
    </div>
    <!-- 表单部分 -->
    <div class="form">
      <el-form
        ref="form"
        :model="form"
        label-width="80px"
        hide-required-asterisk
        label-position="top"
        :rules="rules"
      >
        <el-form-item label="系统语种" prop="region">
          <el-input v-model="form.region" disabled></el-input>
        </el-form-item>
        <el-form-item label="模板名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <!-- {{form.content.length}} -->
        <el-form-item label="模板内容" prop="content">
           <!-- <quill-editor
            v-model="form.content"
            :options="editorOption"
          /> -->
          <vue-ueditor-wrap class="ueditor" v-model="form.content" :config="myConfig"></vue-ueditor-wrap>
        </el-form-item>
        <el-form-item label="模板触发点" prop="trigger">
          <el-select v-model="form.trigger" placeholder="请选择">
            <el-option
              :label="item.name" 
              :value="item.value"
              v-for="(item, index) in form.triggerName"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item size="large">
          <el-button @click="submitForm('form')" type="primary" v-if="$filterBtnRoute(1173)">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 表单数据
      form: {
        // // 模板名称
        // name: '',
        // // 模板类型
        // region: '',
        // // 模板类型的可选项
        // typeName: [],
        // // 模板内容
        // content: '',
        // // 模板状态
        // templateStatus: '',
        // // 模板转态的可选项
        // templateName: [
        //   { label: '关闭', value: 0 },
        //   { label: '开启', value: 1 }
        // ],
        // // 第三方模板ID
        // thirdTemplateId: ''

        // 系统语种
        region: '',
        // 系统语种的可选项
        langList: [],
        // 模板名称
        name: '',
        // 模板内容
        content: '',
        // 模板触发点
        trigger: '',
        // 模板触发点的可选项
        triggerName: []

      },
      // 富文本配置
      myConfig: {
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
      // 验证的规则
      rules: {
        region: [
          { required: true, message: '请选择系统语种', trigger: 'change' }
        ],
        name: [
          { required: true, message: '模板名称不能为空', trigger: 'change' }
        ],
        trigger: [
          { required: true, message: '请选择模板触发点', trigger: 'change' }
        ]
      }
    }
  },
  async mounted() {
    await this.getSysLangInfo()
    await this.modifysee()
    await this.findkeyAndVal() 
  },
  methods: {
    // 获取系统语种信息
    async getSysLangInfo() {
      try {
        const res = await this.$api.GlobalManagement.messageTemplate.getSysLangInfo()
        if (res.success) {
          // console.log('aaa', res.obj.langList)
          this.form.langList = res.obj.langList
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

    // 获取单条数据
    async modifysee() {
      try {
        const res = await this.$api.GlobalManagement.letterTemplate.modifysee({id: this.$route.params.id})
        // console.log(res);
        if (res.success) {
            const data = res.obj
            const tempLang = data.messageCategory
            this.form.region = this.form.langList.filter(item=> {
                if(item.value == tempLang){
                    return item
                }
            })[0].name
            this.form.name = data.name
            this.form.content = data.describes
            this.form.trigger = data.triggerPoint
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

    // 获取触发点
    async findkeyAndVal() {
      try {
        const res = await this.$api.GlobalManagement.letterTemplate.findkeyAndVal({
          pkey: 'trigger'
        })
        if (res.success) {
          // console.log(res.obj)
          this.form.triggerName = res.obj
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

    // 表单提交
    submitForm(formName) {
      //   console.log(formName)
      this.$refs[formName].validate(async valid => {
        if (valid) {
          if(this.form.content.length === 0){
            this.$notify({
              title: '警告',
              message: '模板内容不能为空',
              type: 'warning'
            })
            return
          }
          try {
            const res= await this.$api.GlobalManagement.letterTemplate
              .modify({
                id: this.$route.params.id,              // 唯一标识
                name: this.form.name,                  // 模板名字
                describes: window.encodeURI(this.form.content),          // 模板内容
                trigger: this.form.trigger             // 触发点  
              })
                // console.log(res)
                if (res.success) {
                    this.$notify({
                        title: '成功',
                        message: '修改成功',
                        type: 'success'
                    })
                    setTimeout(()=>{
                      this.$router.push('/letterTemplate')
                    }, 2000)
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
        } else {
          // console.log('error submit!!')
          return false
        }
      })
    },

    // 返回上一页
    backModus() {
      this.$router.go(-1)
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
  height: 64px;
  font-size: 18px;
  color: #3b96dc;
  padding-top: 20px;
  border-bottom: 2px solid #ebebeb;
  position: relative;
  .title-text {
    border-bottom: 2px solid #3b96dc;
    padding-bottom: 20px;
    position: absolute;
    bottom: -2px;
    left: 0;
  }
  .title-bnt {
    margin-bottom: 10px;
    position: absolute;
    bottom: 0;
    right: 0;
  }
}
// 表单部分
.form {
  width: 1200px;
}
// 修改element组件样式
.form {
  ::v-deep .el-form--label-top .el-form-item__label {
    padding: 0;
  }
  ::v-deep .el-select {
    display: block;
  }
  ::v-deep .el-button {
    padding: 12px 38px;
  }
}
</style>
