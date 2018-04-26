<template>
    <div id="ranklist">
        <p>{{this.$route.params.classify}}</p>
        <ul class="common-ul">
          <li class="common-li" v-for="item in bookList" @click="getDetails(item)" v-cloak>
            <div class="list-container">
          <img :src="decodeURIComponent((item.cover).slice(7,-3))" height="107" width="80" v-cloak/>
              <span class="bookName">{{item.title}}</span>
              <span class="author">{{item.author}}</span>
                <span class="summary">{{item.shortIntro}}</span>
            </div>
          </li>
        </ul>
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
        data: function () {
            return {
               classify:'',
               bookList:[]
            }
        },
      watch:{
        '$route'(to,from){
          this.getNewDatas()
        }
      },
       created:function () {
          console.log('aa')
        this.getNewDatas()

         /*this.classify = this.$route.params.classify
         let id = this.$route.params.classify
         console.log(id)
         this.$axios.get('http://novel.juhe.im/category-info?gender=male&type=hot&major='+id+'&minor=&start=0&limit=20').then((data)=>{
           this.bookList = data.data.data.books

         })
*/
       },
       methods:{
          //点击列表中的书籍进入书籍详情页
          getDetails:function (item) {
           this.$router.push('/bookDetails/'+item._id)
          },
         getNewDatas:function () {
           let id = this.$route.params.classify
           this.$axios.get('http://novel.juhe.im/category-info?gender=male&type=hot&major='+id+'&minor=&start=0&limit=20').then((data)=>{
             this.bookList = data.data.data.books

           })
         }
       },


    }

</script>
<style>
  #ranklist{
     position: absolute;
    display: block;
    width: 360px;
    height: 50px;
  }
  .common-ul{
    position: absolute;
  }
  .common-li{
      width: 100px;
      height: 100%;
     list-style: none;
    margin-bottom: 20px;


  }
  .list-container{
    height: 107px;
    width: 200px;
  }
 .bookName{
    position: relative;
   top:-70px;
   left: 17px;
   font-weight: bold;
 }
  .author{
    position: relative;
    top:75px;
    left: 100px;
    display: inline-block;
     font-size: 12px;

  }
  #ranklist .summary{
    display: block;
     white-space:nowrap;
    overflow: hidden;
  text-overflow: ellipsis;
    position: relative;
    width: 300px;
    height: 50px;
    top:-40px;
    left: 97px;
    font-size: 14px;

  }

</style>
