<template>
    <div class="role-container">
        <div class="right-box">
            <div class="user-text">
              <div class="role-text">查看角色</div>
              <el-tooltip content="返回" placement="top">
                <span class="svg-container" @click="handleBack">
                  <svg-icon icon-class="back" />
                </span>
              </el-tooltip>
            </div>
            <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign" size="medium">
              <el-form-item label="角色名称">
                <el-input v-model="formLabelAlign.name" clearable></el-input>
              </el-form-item>
              <el-form-item label="角色描述">
                <el-input v-model="formLabelAlign.description" clearable></el-input>
              </el-form-item>
            </el-form>
            <el-button type="primary" plain size="medium">提交</el-button>
            <el-tabs type="border-card">
              <el-tab-pane label="客服">客服</el-tab-pane>
              <el-tab-pane label="全球化">全球化</el-tab-pane>
              <el-tab-pane label="币币">币币</el-tab-pane>
              <el-tab-pane label="站点">站点</el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      labelPosition: 'right',
      formLabelAlign: {
        name: '',
        description: ''
      }
    }
  },
  methods: {
    // 点击返回
    handleBack() {
      // console.log('点击了')
      this.$router.push('./accountManage/rolePower')
    },
  }
}
</script>

<style lang="scss" scoped>
.role-container {
  margin: 30px;
  .role-text {
    display: inline-block;
    margin: 0px 0 10px;
    line-height: 34px;
    border-bottom: 2px solid #ebebeb;
    position: relative;
    font-size: 18px;
    color: #3b96dc;
    &::after {
      content: "";
      width: 76px;
      height: 2px;
      background: #3b96dc;
      position: absolute;
      left: 0;
      bottom: -2px;
    }
  }
  .right-box {
    width: 77%;
    position: absolute;
    margin: 0 20px;
    height: 500px;
    display: inline-block;
    .user-text {
      display:flex;
      justify-content:space-between;
      margin-bottom: 10px;
      .svg-container {
        display: inline-block;
      }
    }
    .el-form-item {
      width: 600px;
    }
    .el-tabs {
      margin-top: 20px;
    }
  }
}
</style>