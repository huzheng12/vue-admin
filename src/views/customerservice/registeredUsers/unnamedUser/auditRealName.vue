<template>
  <div class="audit-RealName">
    <div class="title text-blue text-size18">
      <span class="border">实名审核</span>
      <el-button class="return-btn" type="primary" @click="back">
        返回
        <i class="el-icon-d-arrow-right"></i>
      </el-button>
    </div>
    <!-- 表单 -->
    <el-form class="form" label-position="top" :model="formData" ref="ruleForm">
      <el-form-item label="手机号">
        <el-input disabled v-model="formData.mobilePhone"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input disabled v-model="formData.email"></el-input>
      </el-form-item>
      <el-form-item label="姓氏">
        <el-input disabled v-model="formData.surname"></el-input>
      </el-form-item>
      <el-form-item label="名字">
        <el-input disabled v-model="formData.trueName"></el-input>
      </el-form-item>
      <el-form-item label="证件号">
        <el-input disabled v-model="formData.cardId"></el-input>
      </el-form-item>
      <el-form-item label="身份证正面照">
        <div class="imgBox">
          <img :src="returnCard(formData.personBank)" alt />
        </div>
      </el-form-item>
      <el-form-item label="身份证反面照">
        <div class="imgBox">
          <img :src="returnCard(formData.personCard)" alt />
        </div>
      </el-form-item>
      <el-form-item label="手持身份证照片">
        <div class="imgBox">
          <img :src="returnCard(formData.frontpersonCard)" alt />
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">通过</el-button>
        <el-button type="primary" @click="reject('ruleForm')">驳回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'AuditRealName',
  props: {},
  data() {
    return {
      // 表单数据
      formData: {
        mobilePhone: '',
        email: '',
        surname: '',
        trueName: '',
        cardId: '',
        personCard: '', // 手持身份证照片
        frontpersonCard: '', // 身份证正面照
        personBank: '' // 身份证反面照
      }
    }
  },
  created() {
    this.id = this.$route.params.id
    this.auditseeAppcustomer(this.id)
  },
  mounted() {},
  watch: {},
  computed: {},
  methods: {
    // 照片
    returnCard(data){
      // console.log(data);
      
      return data ? process.env.VUE_APP_ALIOSS_URL + data : ''
    },
    // 获取实名信息
    async auditseeAppcustomer(data) {
      try {
        let res = await this.$api.customerservice.registeredUsers.auditseeAppcustomer(
          data
        )
        // console.log(res)
        if (res.success) {
          for (let key in this.formData) {
            if (key in res.obj) {
              this.formData[key] = res.obj[key]
            }
          }
        }
      } catch (e) {
        // Handle api request exception
        this.$handleError.handleApiRequestException(e)
      }
    },
    // 实名验证
    async auditRealNameAppcustomer() {
      try {
        let res = await this.$api.customerservice.registeredUsers.auditRealNameAppcustomer(
          this.id
        )
        // console.log(res)
        if (!res.success) {
          this.$message({
            type: 'error',
            message: res.msg
          })
          this.$router.go(-1)
        }
        if (res.success) {
          this.$message({
            type: 'success',
            message: res.msg
          })
          this.$router.go(-1)
        }
      } catch (e) {
        // Handle api request exception
        this.$handleError.handleApiRequestException(e)
      }
    },
    // 驳回验证
    async auditbackAppcustomer() {
      try {
        let res = await this.$api.customerservice.registeredUsers.auditbackAppcustomer(
          this.id
        )
        // console.log(res)
        if (!res.success) {
          this.$message({
            type: 'error',
            message: res.msg
          })
          this.$router.go(-1)
        }
        if (res.success) {
          this.$message({
            type: 'success',
            message: res.msg
          })
          this.$router.go(-1)
        }
      } catch (e) {
        // Handle api request exception
        this.$handleError.handleApiRequestException(e)
      }
    },
    // 返回
    back() {
      this.$router.go(-1)
    },
    // 点击通过 btn
    submitForm() {
      this.$confirm('你确定要提交审核吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.auditRealNameAppcustomer()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消提交'
          })
        })
    },
    // 点击驳回 btn
    reject() {
      this.$confirm('你确定要驳回吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.auditbackAppcustomer()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消驳回'
          })
        })
    }
  }
}
</script>

<style scoped lang="scss">
.audit-RealName {
  padding: 0 20px;
  .audit-title {
    border-bottom: 2px solid #000;
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
    width: 100%;
    background-color: #3b96dc;
  }
  .el-form {
    padding: 30px 0;
    width: 700px;
    .imgBox {
      width: 700px;
      height: 700px;
      border: 1px solid #eee;
      img {
        width: 700px;
        height: 700px;
      }
    }
  }
}
.text-blue {
  color: #3b96dc;
}
.text-size18 {
  font-size: 18px;
}
</style>
