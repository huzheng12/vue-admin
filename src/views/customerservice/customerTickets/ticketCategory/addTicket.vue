<template>
  <div class="page">
    <!-- 标题 -->
    <div class="title">
      <span class="title-text">添加工单类别</span>
      <el-button plain size="mini" class="title-bnt" icon="el-icon-caret-left" @click="backModus">返回</el-button>
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
        <el-form-item label="语言" prop="region">
          <el-select v-model="form.activeName" placeholder="请选择">
            <el-option
              :label="item.name"
              :value="item.value"
              v-for="(item, index) in form.langList"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="类别名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="content">
          <el-input type="textarea" v-model="form.content" resize="none" :rows="10"></el-input>
        </el-form-item>
        <el-form-item size="large">
          <el-button v-if="$filterBtnRoute(1221)" @click="submitForm('form')" type="primary">提交</el-button>
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
        // 类别名称
        name: '',
        // 模板类型
        region: '',
        // 模板类型的可选项
        typeName: [],
        // 语言数据
        langList: [],
        // 选中的标签(语言)
        activeName: '',
        // 描述内容
        content: '',
        // 模板状态
        templateStatus: '',
        // 模板转态的可选项
        templateName: [
          { label: '关闭', value: 0 },
          { label: '开启', value: 1 }
        ],
      },
      rules: {
        name: [
          { required: true, message: '类别名称不能为空', trigger: 'blur' }
        ],
        activeName: [
          { required: true, message: '请选择语言', trigger: 'change' }
        ],
        content: [
          { required: true, message: '描述不能为空', trigger: 'blur' }
        ],
      }
    }
  },
  mounted() {
    this.getSysLangInfo()
  },
  methods: {
    submitForm(formName) {
      //   console.log(formName)
      this.$refs[formName].validate(async valid => {
        if (valid) {
          try {
            const res= await this.$api.customerservice
              .addticketcategory({
                typeName: this.form.name, // 类别名字
                languageDic: this.form.activeName, // 语言
                describes: this.form.content // 描述内容
              })
                // console.log(res)
                if (res.success) {
                    this.$message({
                        title: '成功',
                        message: res.msg,
                        type: 'success'
                    })
                    setTimeout(()=>{
                      this.$router.push('/customerTickets/ticketCategory')
                    }, 2000)
                } else {
                  this.$message({
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

    // 获取系统语种信息
    async getSysLangInfo() {
      try {
        const res = await this.$api.GlobalManagement.messageTemplate.getSysLangInfo()
        if (res.success) {
          // console.log('获取系统语种信息222', res.obj.langList)
          this.form.langList = res.obj.langList
        }
      } catch (e) {
        this.$handleError.handleApiRequestException(e)
      }
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
