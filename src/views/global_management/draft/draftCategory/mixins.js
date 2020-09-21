export default {
  data(){
    return {
      IsPageArr: []
    }
  },
  created(){
    this.getIsPageKey()
  },
  methods: {
    // 获取是否的key
    // 获取页面类型key
    async getIsPageKey(){
      try {
        let res = await this.$api.Common.getKey({key: 'pageType'})
        this.IsPageArr = res
      }
      catch (e) {
        this.$handleError.handleApiRequestException(e)
      }
    },
}
}