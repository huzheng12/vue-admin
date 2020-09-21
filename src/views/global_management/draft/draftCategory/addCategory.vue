<template>
  <div class="add-category">
    <div class="category-title text-blue text-size18 title"><span class="border">{{`【${title}】`}}</span></div>
      <div style="padding: 0 20px">
      <div class="title text-blue text-size18">
        <span class="border">添加文章类别</span>
        <el-button class="return-btn" size="mini"  icon="el-icon-arrow-left" @click="back">
          返回
        </el-button>
      </div>
      <!-- 表单 -->
      <el-form class="form" :rules="rules" label-position="top" :model="formData" ref="ruleForm">
        <el-form-item label="父级分类">
          <el-input disabled v-model="formData.preateName"></el-input>
        </el-form-item>
        <!-- <el-form-item label="页面类别" prop="isPage">
          <el-select v-model="formData.isPage" class="isPageSelect">
            <el-option v-show="returnispage(item.text)" v-for="item in IsPageArr" :key="item.text" :label="item.text" :value="item.value * 1"></el-option>
          </el-select>
        </el-form-item> -->
        <!-- <el-form-item label="排序"  prop="sort">
          <el-input type="number" v-model="formData.sort"></el-input>
        </el-form-item> -->
        <el-form-item label="类别名称" prop="name">
          <el-input v-model="formData.name"></el-input>
        </el-form-item>
        <!-- <el-form-item label="简体中文" prop="zh_CN">
          <el-input v-model="formData.zh_CN"></el-input>
        </el-form-item>
        <el-form-item label="English">
          <el-input v-model="formData.en"></el-input>
        </el-form-item>
        <el-form-item label="한국어">
          <el-input v-model="formData.kor"></el-input>
        </el-form-item>
        <el-form-item label="Français">
          <el-input v-model="formData.fr"></el-input>
        </el-form-item>
        <el-form-item label="El español">
          <el-input v-model="formData.es"></el-input>
        </el-form-item>
        <el-form-item label="繁體中文">
          <el-input v-model="formData.zh_TW"></el-input>
        </el-form-item>
        <el-form-item label="日本語">
          <el-input v-model="formData.jp"></el-input>
        </el-form-item> -->
        <el-form-item>
          <el-button type="primary" v-if="$filterBtnRoute(869)" @click="submitForm('ruleForm')">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import getIsPageKey from './mixins.js'
export default {
  name: 'AddCategory',
  data() {
    return {
      // 表单数据
      formData: {
        preateId: '',
        preateName: '',
        name: '',
        langCode:''
        // en: '',
        // zh_CN: '',
        // kor: '',
        // fr: '',
        // es: '',
        // zh_TW: '',
        // jp: '',
        // sort: '',
        // sysLanguages: '',
        // isPage: '' // 页面类别
      },
      title:'',
      // sysLanguagesKeyS: ['en', 'zh_CN', 'kor', 'fr', 'es', 'zh_TW', 'jp'],
      // 表单验证规则
      rules: {
        name: [
          {
            required: true,
            message: '类别名称不能为空',
            trigger: 'blur'
          }
        ],
        // zh_CN: [
        //   {
        //     required: true,
        //     message: '简体中文不能为空',
        //     trigger: 'blur'
        //   }
        // ],
        // sort: [
        //   {
        //     required: true,
        //     message: '排序不能为空',
        //     trigger: 'blur'
        //   }
        // ],
        // // 页面类别
        // isPage: [
        //   {
        //     required: true,
        //     message: '请选择页面类别',
        //     trigger: 'change'
        //   }
        // ]
      }
    }
  },
  created() {
    this.title = JSON.parse(
      sessionStorage.getItem('draftCategory_node_Data')
    ).label
    this.formData.preateName = this.title
    this.formData.preateId =  JSON.parse(
      sessionStorage.getItem('draftCategory_node_Data')
    ).id
    this.formData.langCode=this.$route.params.langkey
  },
  mounted() {},
  mixins: [getIsPageKey],
  watch: {},
  computed: {},
  methods: {
    // 处理ispage
    returnispage(type){
      if(type !== '父节点'){
        return this.formData.preateId === 0 ? false : true 
      }
      if(type === '父节点'){
        return this.formData.preateId === 0 ? true : false 
      }
    },
    // 添加文章分类
    async addAppcategory(data) {
      try {
        let res = await this.$api.GlobalManagement.DraftCategory.addAppcategory(
          data
        )
        // console.log(res);
        if (res.success) {
          this.$message({
            type: 'success',
            message: '添加成功'
          })
          this.$router.go(-1)
        }
        if (!res.success) {
          this.$message({
            type: 'error',
            message: '添加失败'
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
      
      if(!flag){
        return false
      }
      // 处理sysLanguages字段
      // this.formData.sysLanguages = JSON.stringify(
      //   this.sysLanguagesKeyS.map((item) => {
      //     return {
      //       id: item,
      //       text: this.formData[item]
      //     }
      //   })
      // )
      // console.log(this.formData.sysLanguages)

      this.addAppcategory(this.formData)
    }
  }
}
</script>

<style scoped lang="scss">
.add-category {
  padding: 0 20px;
  .category-title {
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
