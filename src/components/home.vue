<template>
  <div id="main">
        <div class="topMessage">
          <h2 class="top-head">刚哥看小说</h2> <img class="top-image" src="../assets/photo/bb.png">
        </div>
        <div class="banner"></div>
        <div class="classify">

          <div @click="getRankList('玄幻')"><img src="../assets/photo/cc.png" style="width: 30px;height: 30px" ><span>玄幻</span>  </div>
          <div @click="getRankList('仙侠')"><img src="../assets/photo/cc.png" style="width: 30px;height: 30px" ><span>仙侠</span>  </div>
          <div @click="getRankList('都市')"><img src="../assets/photo/cc.png" style="width: 30px;height: 30px" ><span>都市</span>  </div>
          <div @click="getRankList('历史')"><img src="../assets/photo/cc.png" style="width: 30px;height: 30px" ><span>历史</span>  </div>
          <div @click="getRankList('科幻')"><img src="../assets/photo/cc.png" style="width: 30px;height: 30px" ><span>科幻</span>  </div>
        </div>
        <div class="hotNovel">
        <span style="border-left: 3px solid red; padding-left: 3px; margin-left: 5px">热门小说</span>
            <div class="container">
              <renderlist :books="hotBooks"></renderlist>
            </div>
        </div>
        <div class="rankList">
          <span style="border-left: 3px solid red; padding-left: 3px; margin-left: 5px;font-weight: bold">排行版</span>
            <div class="rankList-container">
              <renderlist :books="rankList"></renderlist>
            </div>
        </div>
        <div>
          <router-view></router-view>
        </div>

  </div>
</template>

<script>
    import  renderlist from './common/renderList.vue'
export default {
  name: 'main',
    /*methods: {
      gotoPage:function(){
    this.$router.push('/aa')
      },
     aa:()=>{
      console.log(this)
    }
    },*/
   components:{
     renderlist
   },
  data: function () {
    return {
      hotBooks:[],
      rankList:[],
       me:'你好'
    }
  },
  mounted:function () {
  //   console.log(this)
     var vthis = this;
     //热门书推荐前三
    let url = 'http://novel.juhe.im/rank/54d42d92321052167dfb75e3';
    this.$axios.get(url).then(function (res) {
      vthis.hotBooks = res.data.data.ranking.books.slice(0,3);

    });
      let rankUrl ='http://novel.juhe.im/category-info?gender=male&type=hot&major='+'奇幻'+'&minor=&start=0&limit=20'
    this.$axios.get(rankUrl).then(function (res) {
      vthis.rankList = res.data.data.books.slice(0,3);

    })
  },
  methods:{
     getRankList:function (classify) {
      this.$router.push(`/rank/${classify}`)

     }
  }
}
</script>

<style>
    #main{
       margin: 0;
        padding: 0;

    }
    .topMessage{
        width: 100%;
        height: 50px;

    }
      .top-head{

      }
    .top-image{
        width: 30px;
        height: 30px;
        float: right;
        position: relative;
        top:-50px;
    }
    /*
      滚动条幅区
    */
     .banner{
        height: 200px;
       width:100%;
        border:1px solid salmon;
     }
      /*

       分类区
      */
  .classify{
    margin-top:20px;
    width:100%;
    height: 50px;
    margin-left: 10px;
  }
    .classify div{
       width: 18%;
        float: left;
        padding-left: 7px;
        height: 10px;

    }
    .classify div img{
      width:100%;
    }
    .classify div span{
      text-align: center;
      font-size: 18px;
       font-weight: bold;
       position: relative;
      top:20px;
        left: -32px;
    }
  /*
  热门书
  */
   .hotNovel{
      margin-top: 20px;
     height: 220px;
     width:100%;
      display: inline-block;
   }
    .hotNovel span{
      font-weight:bold;

    }
  /*
  排行版
  */
  .rankList{
     margin-top: 20px;
    height: 220px;
    width:100%;
    display: inline-block;
  }
</style>
