const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],
  ['blockquote', 'code-block'],
  [{
    'header': 1
  }, {
    'header': 2
  }],
  [{
    'list': 'ordered'
  }, {
    'list': 'bullet'
  }],
  [{
    'script': 'sub'
  }, {
    'script': 'super'
  }],
  [{
    'indent': '-1'
  }, {
    'indent': '+1'
  }],
  [{
    'direction': 'rtl'
  }],
  [{
    'size': ['small', false, 'large', 'huge']
  }],
  [{
    'header': [1, 2, 3, 4, 5, 6, false]
  }],
  [{
    'color': []
  }, {
    'background': []
  }],
  [{
    'font': []
  }],
  [{
    'align': []
  }],
  ['clean'],
  ['link', 'image', 'video']
]

import { quillRedefine } from 'vue-quill-editor-upload'
import { quillEditor } from 'vue-quill-editor'
export default {
  data() {
    return {
      editorOption: {}, // 富文本init配置
      editorFlag: true // 富文本是否能编辑
    }
  },
  created() {
    this.editorConfig()
    // 防止页面定位到可编辑富文本的区域
    setTimeout(() => {
      this.editorFlag = false
    }, 2000)
  },
  methods: {
    // 富文本配置
    editorConfig() {
      this.editorOption = quillRedefine({
        // 图片上传的设置
        uploadConfig: {
          // 必填参数 图片上传地址
          action: `${process.env.VUE_APP_BASE_API}/oss/upload`,
          // 必选参数  res是一个函数，函数接收的response为上传成功时服务器返回的数据
          // 你必须把返回的数据中所包含的图片地址 return 回去
          res: (res) => {
            // console.log(res)
            return process.env.VUE_APP_ALIOSS_URL + res.obj[0]
          },
          methods: 'post', // 可选参数 图片上传方式  默认为post
          // token: sessionStorage.token,  // 可选参数 如果需要token验证，假设你的token有存放在sessionStorage
          name: 'file', // 可选参数 文件的参数名 默认为img
          size: 2048, // 可选参数   图片限制大小，单位为Kb, 1M = 1024Kb
          accept: 'image/png, image/gif, image/jpeg', // 可选参数 可上传的图片格式
          // sizeError: (e) => {
          //   console.log('sizeError', e)
          // },
          // // 可选参数 接收一个函数 开始上传数据时会触发
          // start: (e) => {
          //   console.log('start', e);

          // },
          // // 可选参数 接收一个函数 上传数据完成（成功或者失败）时会触发
          // end: (e) => {
          //   console.log('end', e);

          // },
          // // 可选参数 接收一个函数 上传数据成功时会触发
          // success: (e) => {
          //   console.log('success', e);

          // },
          // // 可选参数 接收一个函数 上传数据中断时会触发
          // error: () => {
          //   console.log('error');

          // }
        },
        // 以下所有设置都和vue-quill-editor本身所对应
        toolOptions: toolbarOptions, // 可选参数  选择工具栏的需要哪些功能  默认是全部
        // handlers: {
        //   // 可选参数 重定义的事件，比如link等事件
        //   image:  (value) => {
        //     console.log(value, 'image handlers')
        //   }
        // }
      })
    },
  },
  components: {
    quillEditor
  }
}