<template>
  <div class="page">
    <!-- 标题 -->
    <div class="title">
      <span class="title-text">添加模板</span>
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
        <el-form-item label="模板名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="模板类型" prop="region">
          <el-select v-model="form.region" placeholder="请选择模板类型">
            <el-option
              :label="item.text"
              :value="item.value"
              v-for="(item, index) in form.typeName"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="模板内容" prop="content">
          <el-input type="textarea" v-model="form.content" resize="none" :rows="10"></el-input>
        </el-form-item>
        <el-form-item label="模板状态" prop="templateStatus">
          <el-select v-model="form.templateStatus" placeholder="请选择模板状态">
            <el-option
              :label="item.text"
              :value="item.value"
              v-for="(item, index) in form.templateName"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="第三方模板Id">
          <el-input v-model="form.thirdTemplateId"></el-input>
        </el-form-item>
        <el-form-item size="large">
          <el-button @click="submitForm('form')" type="primary" :loading="loading" v-if="$filterBtnRoute(1168)">提交</el-button>
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
        // 模板名称
        name: '',
        // 模板类型
        region: '',
        // 模板类型的可选项
        typeName: [],
        // 模板内容
        content: '',
        // 模板状态
        templateStatus: '',
        // 模板转态的可选项
        templateName: [],
        // 第三方模板ID
        thirdTemplateId: ''
      },
      // 异步按钮
      loading: false,
      rules: {
        name: [
          { required: true, message: '模板名称不能为空', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择模板类型', trigger: 'change' }
        ],
        content: [
          { required: true, message: '模板内容不能为空', trigger: 'blur' }
        ],
        templateStatus: [
          { required: true, message: '请选择模板状态', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    this.smsTypeList()
    this.getKey()
  },
  methods: {
    // 获取短信模板类型
    async smsTypeList() {
      try {
        const res = await this.$api.GlobalManagement.messageTemplate.smsTypeList()
        if (res.success) {
          // console.log(res.obj)
          this.form.typeName = res.obj
        }
      } catch (e) {
        this.$handleError.handleApiRequestException(e)
      }
    },
    
    //  获取数据字典
    async getKey() {
      try {
        const res = await this.$api.Common.getKey({
          key: 'templateStatus'
        })
        // console.log(res);
        if(res.success === false){
          this.$notify({
            title: '警告',
            message: res.msg,
            type: 'warning'
          })
          return
        }
        this.form.templateName = res
      } catch (e) {
        this.$handleError.handleApiRequestException(e)
      }
    },

    // 提交
    submitForm(formName) {
      //   console.log(formName)
      this.$refs[formName].validate(async valid => {
        if (valid) {
          this.loading = true
          try {
            const res= await this.$api.GlobalManagement.messageTemplate
              .add({
                tempName: this.form.name, // 模板名字
                tempType: this.form.region, // 模板类型
                tempContent: this.form.content, // 模板内容
                thirdTemplateId: this.form.thirdTemplateId, // 第三方模板id
                tempState: this.form.templateStatus // 模板状态 0-关闭，1-开启
              })
              // console.log(res)
              if (res.success) {
                  this.$notify({
                      title: '成功',
                      message: res.msg,
                      type: 'success'
                  })
                  setTimeout(()=>{
                    this.$router.push('/messageTemplate')
                  }, 2000)
              } else {
                this.$notify({
                  title: '警告',
                  message: res.msg,
                  type: 'warning'
                })
              }
              this.loading = false
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
  width: 400px;
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
