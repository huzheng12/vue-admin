export default {
  data(){
    return {
      yesnoArr: []
    }
  },
  created(){
    this.getyesno()
  },
  methods: {
    // 获取是否的key
    async getyesno(){
      try {
        let res = await this.$api.Common.getKey({key: 'yesno'})
        // console.log(res);
        this.yesnoArr = res
      }
      catch (e) {
        this.$handleError.handleApiRequestException(e)
      }
    },
  }
}