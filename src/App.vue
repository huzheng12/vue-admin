<!--
 * @name: 
 * @author: SunSeekerX
 * @Date: 2020-07-13 17:34:03
 * @LastEditors: SunSeekerX
 * @LastEditTime: 2020-07-14 09:59:59
-->

<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    this.$store.commit('GET_APP_STORAGE')
    // this.$api.SiteConfiguration.infolist().then(res=>{
    //     if(res.success){
    //       if(res.obj.configList&&res.obj.configList.length>0){
    //         res.obj.configList.forEach(item=>{
    //           if(item.configkey=='managerName'){
    //             this.$store.commit('GET_SITE_TITLE',item.value)
    //           }
    //           if(item.configkey=='managerSysLogo'){
    //             this.$store.commit('GET_SITE_ICON',item.value)
    //           }
    //         })
    //       }
    //     }else{
    //       this.$message({
    //         type:'warning',
    //         message:'获取站点信息失败'
    //       })
    //     }
    // })
  },
}
</script>
