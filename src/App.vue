<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <ul class="tab border-1px">
      <li class="item"><router-link to="/goods">商品</router-link></li>
      <li class="item"><router-link to="/rating">评价</router-link></li>
      <li class="item"><router-link to="/sell">商家</router-link></li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from 'components/Header'
const ERR_OK = 0 
export default {
  data() {
    return {
      seller: {}
    };
  },
  created() {
    this.$http.get('/api/seller').then((response) => {
      //get body data
      this.seller = response.body.data;
    },(response) => {
      //error callback
    });
  },
  components: {
    'v-header': Header
  }
}
</script>

<style lang="stylus">
@import './assets/stylus/mixin.styl';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  .tab{
    display:flex;
    width: 100%;
    height: 40px;
    line-height:40px;
    border-1px(rgba(7,17,27,0.1))
    .item{
      flex: 1;
      text-align: center;
      & > a{
        display:block;
        color: rgb(77,85,93);
        font-size: 14px;
        &.active{
          color: rgb(240,20,20)
        }
      }
    }
  }
}
</style>