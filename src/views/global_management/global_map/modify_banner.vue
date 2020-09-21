<template>
  <div class="page">
    <!-- 标题 -->
    <div class="title">
      <span class="title-text">修改Banner</span>
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
        <el-form-item label="配图类型">
          <el-input disabled placeholder="banner区"></el-input>
        </el-form-item>
        <el-form-item label="图片名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="应用类型" prop="applicationTypeDefault">
          <el-select v-model="form.applicationTypeDefault" placeholder="请选择应用类型">
            <el-option
              :label="item.name"
              :value="item.value"
              v-for="(item, index) in form.applicationType"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="系统语种" prop="region">
          <el-select v-model="form.region" placeholder="请选择语种">
            <el-option
              :label="item.name | replaceStr"
              :value="item.value"
              v-for="(item, index) in form.typeName"
              :key="index"
            >
              <!-- <span style="float: left" v-html="item.name"></span> -->
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否置顶" prop="region">
          <el-select v-model="form.isTopVal" placeholder="请选择">
            <el-option
              :label="item.name"
              :value="item.value"
              v-for="(item, index) in form.isTop"
              :key="index"
            >
              <!-- <span style="float: left" v-html="item.name"></span> -->
            </el-option>
          </el-select>
        </el-form-item>
         <el-form-item label="是否显示" prop="region">
          <el-select v-model="form.isShow" placeholder="请选择">
            <el-option
              :label="item.name"
              :value="item.value"
              v-for="(item, index) in form.isShowArr"
              :key="index"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上传图片">
          <el-upload
            ref="upload"
            class="avatar-uploader"
            action=""
            :auto-upload="false"
            :show-file-list="false"
            :on-change="uploadChange">
            <img v-if="form.imageUrl" :src="form.imageUrl.indexOf('http')===-1 ? $ALI_OSS_URL + form.imageUrl:form.imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <div class="upload-tips">
            <span v-if="form.applicationTypeDefault == 0">(电脑端尺寸1920px*540px)</span>
            <span v-else>(移动端尺寸750px*300px)</span>
          </div>
        </el-form-item>
        <!-- <el-form-item label="排序值" prop="sort">
          <el-input v-model="form.sort" type="number"></el-input>
        </el-form-item>
        <el-form-item label="外链URL">
          <el-input v-model="form.outlink"></el-input>
        </el-form-item>
        <el-form-item label="是否显示" prop="status">
          <el-select v-model="form.status" placeholder="请选择">
            <el-option
              :label="item.label"
              :value="item.value"
              v-for="(item, index) in form.bannerStatus"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item size="large">
          <el-button @click="submitForm('form')" type="primary">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import lrz from 'lrz'
export default {
  data() {
    return {
      // 表单数据
      form: {
        // 配图类型
        type: '1',
        // 图片名称
        name: '',
        // 应用类型
        applicationTypeDefault: '',
        // 应用类型的可选项
        applicationType: [{
          name:'web',
          value:0
        },{
          name:'app',
          value:1
        },{
          name:'h5',
          value:2
        }],
        isShowArr:[{
          name:'是',
          value:1
        },{
          name:'否',
          value:0
        }],
        isShow:'',
        // 系统语种
        region: '',
        // 系统语种的可选项
        typeName: [],
        isTop:[{
          name:'是',
          value:1
        },{
          name:'否',
          value:0
        }],
        isTopVal:'',
        // 外链
        outlink: '',
        // 是否显示
        status: '',
        // 是否显示的可选项
        bannerStatus: [
          { label: '否', value: 0 },
          { label: '是', value: 1 }
        ],
        // 第三方模板ID
        thirdTemplateId: '',
        // 图片
        imageUrl: ''
      },
      rules: {
        name: [
          { required: true, message: 'Banner名称不能为空', trigger: 'blur' }
        ],
        applicationTypeDefault: [
          { required: true, message: '应用类型不能为空', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择系统语种', trigger: 'change' }
        ],
        // sort: [
        //   { validator: checkSort, trigger: 'blur' }
        // ],
        isShow: [
          { required: true, message: '请选择是否显示', trigger: 'change' }
        ],
        status: [
          { required: true, message: '是否显示不能为空', trigger: 'change' }
        ]
      },
      // 图片
      fileList: []
    }
  },
  mounted() {
    this.modifysee()
    this.getSysLangInfo()
    // this.getApplicationType()
  },
  methods: {
    // 通过id获取配图对象
    async modifysee() {
      try{
        const res = await this.$api.GlobalManagement.mapBanner.modifysee({
          id: this.$route.params.id
        })
        // console.log(res);
        if(res.success){
          const data = res.obj
          this.form.name = data.name
          this.form.applicationTypeDefault = data.applicationType
          this.form.region = data.langCode
          // this.form.sort = data.sort
          this.form.outlink = data.remark2
          this.form.status = data.isShow
          this.form.imageUrl = data.picturePath
          this.form.isShow = data.orShow
          this.form.isTopVal = data.orTop
        }
      }catch(e) {
        this.$handleError.handleApiRequestException(e)
      }
    },

    // 获取系统语种信息
    async getSysLangInfo() {
      try {
        const res = await this.$api.GlobalManagement.messageTemplate.getSysLangInfo()
        if (res.success) {
          this.form.typeName = res.obj.langList
        }
      } catch (e) {
        this.$handleError.handleApiRequestException(e)
      }
    },

    // 获取应用类型
    // async getApplicationType() {
    //   try {
    //     const res = await this.$api.GlobalManagement.mapBanner.getApplicationType()
    //     // console.log(res);
    //     if (res.success) {
    //       this.form.applicationType = res.obj
    //     }
    //   } catch (e) {
    //     this.$handleError.handleApiRequestException(e)
    //   }
    // },

    handleRemove(file, fileList) {
      // console.log(file, fileList);
      this.fileList = fileList
    },

    // 上传图片
    async uploadChange(file, fileList){
      // 图片的大小
      if (file.size > 1048576 * 10) {
        this.$refs.upload.handleRemove(file, fileList)
        this.$notify({
          type: 'warning',
          message: this.$notify({ message: ' 图片太大' })
        })
        return
      }
      //图片判断格式
      let endName = file.name.split('.')[file.name.split('.').length - 1]
      if (endName !== 'jpg' && endName !== 'png' && endName !== 'jpeg' && endName != 'bmp') {
        // 获取上传文件这个dom元素
        // console.log(this.$refs.upload);
        // 调用这个dom上的方法
        // console.log(this.$refs.upload.handleRemove);
        this.$refs.upload.handleRemove(file, fileList)
        this.$notify({
          type: 'warning',
          message: '只能上传jpg/png的图片'
        })
        return
      }
      // 压缩图片
      try {
        const rst = await lrz(file.raw, { quality: 0.2 })
        // console.log('ccccccc',rst)
        const fileRaw = new File([rst.file], rst.origin.name, {
          type: rst.origin.type
        })
        // console.log('ddddd', fileRaw)
        let data = new FormData()
        data.append('files', fileRaw)
        // console.log('eeee', file.raw)
        try {
          await this.addpicture(data)
        } catch (e) {
          // Handle api request exception
          this.$handleError.handleApiRequestException(e)
        }
        this.$refs.upload.clearFiles()
      } catch (e) {
        // Handle api request exception
        this.$handleError.handleApiRequestException(e)
      }
    },

    async addpicture(file) {
      try{
        const res = await this.$api.GlobalManagement.mapBanner.upload(file)
        if(res.success){
          this.form.imageUrl=res.obj[0]
        }else {
          this.$notify({
            title: '警告',
            message: res.msg,
            type: 'warning'
          })
        }
      }catch(e){
        this.$handleError.handleApiRequestException(e)
      }
    },

    // 提交
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          try {
            const res = await this.$api.GlobalManagement.mapBanner
              .modify({
                  id: this.$route.params.id,      // 唯一标识
                  name: this.form.name,          // 图片名字
                  picturePath: this.form.imageUrl,               // 图片地址
                  // isShow: this.form.status,      // 是否显示 0不显示  1显示 
                  // sort:this.form.sort, 
                  orTop:this.form.isTopVal,        //  排序顺序
                  applicationType: this.form.applicationTypeDefault, // 0电脑版1手机版2H5版
                  langCode: this.form.region,    // 语种类型
                  orShow:this.form.isShow
                  // whereUse: this.form.type,      // 配图类型 banner：banner图管理 / sitemap：站点配图
                  // remark2: this.form.outlink          // 外链
              })
              // console.log(res)
              if (res.success) {
                this.$notify({
                  title: '成功',
                  message: '修改成功',
                  type: 'success'
                })
                setTimeout(() => {
                  this.$router.push('/mapBanner')
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
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
    border: 1px dashed #d9d9d9;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
.upload-tips {
  color: #d14b64;
  margin-top: -10px;
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
