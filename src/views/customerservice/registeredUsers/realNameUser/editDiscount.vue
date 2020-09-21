<template>
  <div class="edit-discount">
    <div class="title text-blue text-size18">
      <span class="border">修改手续费</span>
      <el-button class="return-btn" type="primary" @click="back">
        返回
        <i class="el-icon-d-arrow-right"></i>
      </el-button>
    </div>
    <!-- 表单 -->
    <el-form class="form" :rules="rules" label-position="top" :model="formData" ref="ruleForm">
      <el-form-item label="交易类型" prop="type">
        <el-select disabled v-model="formData.type" class="isPageSelect">
          <el-option
            v-for="item in dealtypedArr"
            :key="item.text"
            :label="item.text"
            :value="item.value * 1"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="formData.status" class="isPageSelect">
          <el-option label="关闭" :value="0"></el-option>
          <el-option label="开启" :value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="吃单手续费率(小数点形式)" prop="takeFeeRate">
        <el-input v-model="formData.takeFeeRate"></el-input>
      </el-form-item>
      <el-form-item label="挂单手续费率(小数点形式)" prop="makeFeeRate">
        <el-input v-model="formData.makeFeeRate"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'editDiscount',
  props: {},
  data() {
    // 吃单手续费率校验
    var validateTakeFeeRate = (rule, value, callback) => {
      if (!value) {
        return
      }
      if (value > 1 || value < 0) {
        callback(new Error('吃单手续费率为0-1的小数点形式'))
      }
      callback()
    }
    // 挂单手续费率校验
    var validateMakeFeeRate = (rule, value, callback) => {
      if (!value) {
        return
      }
      if (value > 1 || value < 0) {
        callback(new Error('挂单手续费率为0-1的小数点形式'))
      }
      callback()
    }

    return {
      // 表单数据
      formData: {
        type: '',
        status: '',
        takeFeeRate: '',
        makeFeeRate: ''
      },
       dealtypedArr: [],
      // 表单验证规则
      rules: {
        type: [
          {
            required: true,
            message: '交易类型不能为空',
            trigger: 'change'
          }
        ],
        status: [
          {
            required: true,
            message: '状态不能为空',
            trigger: 'change'
          }
        ],
        takeFeeRate: [
          {
            required: true,
            message: 'takeFeeRate不能为空',
            trigger: 'blur'
          },
          { validator: validateTakeFeeRate, trigger: 'blur' }
        ],
        makeFeeRate: [
          {
            required: true,
            message: 'makeFeeRate不能为空',
            trigger: 'blur'
          },
          { validator: validateMakeFeeRate, trigger: 'blur' }
        ]
      }
    }
  },
  async created() {
    this.customerId = this.$route.params.customerId
    this.id = this.$route.params.id
    await this.getdealtype()
    await this.seeUserfeesCustomer()
  },
  mounted() {},
  watch: {},
  computed: {},
  methods: {
    // 获取交易类型的key
    async getdealtype() {
      try {
        let res = await this.$api.Common.getKey({ key: 'dealtype' })
        // console.log(res);
        this.dealtypedArr = res
      } catch (e) {
        this.$handleError.handleApiRequestException(e)
      }
    },
    // 获取折扣信息
    async seeUserfeesCustomer() {
      try {
        let res = await this.$api.customerservice.registeredUsers.seeUserfeesCustomer(
          {
            id: this.id
          }
        )
        // console.log(res)
        if (res.success) {
          for(let key in this.formData){
            if(key in res.obj){
              this.formData[key] = res.obj[key]
            }
          }
        }
      } catch (e) {
        // Handle api request exception
        this.$handleError.handleApiRequestException(e)
      }
    },
    // 修改折扣
    async updateUserfeesCustomer() {
      try {
        let res = await this.$api.customerservice.registeredUsers.updateUserfeesCustomer(
          {
            customerId: this.customerId,
            id: this.id,
            ...this.formData
          }
        )
        // console.log(res)
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
            message: res.msg
          })
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
    // 提交表单
    submitForm(formName) {
      let flag = true
      // 整体判断表单必填选项
      this.$refs[formName].validate((valid) => {
        if (!valid) {
          flag = valid
          // console.log(valid);
          return this.$message({
            type: 'error',
            message: '请填写完必填选项!'
          })
        }
      })
      // console.log(flag);

      if (!flag) {
        return false
      }
      // console.log(this.formData.sysLanguages)

      this.updateUserfeesCustomer()
    }
  }
}
</script>

<style scoped lang="scss">
.edit-discount {
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
  .el-form {
    padding: 30px 0;
    width: 500px;
  }
  .isPageSelect {
    width: 100%;
  }
}
.text-blue {
  color: #3b96dc;
}
.text-size18 {
  font-size: 18px;
}
</style>
