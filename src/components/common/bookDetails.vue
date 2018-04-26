<template>
    <div id="bookdetail">
        <div class="head">

          <img :src="decodeURIComponent((bookDetails.cover).slice(7,-3))" height="133" width="100" style="border: 1px solid salmon"/>
           <span class="title">{{bookDetails.title}}</span>
            <span class="author">作者：{{bookDetails.author}}</span>
            <span class="classify">分类：{{bookDetails.cat}}</span>
            <span class="count">{{wordCount}}万字</span>
        </div>
            <div class="read">
               <button class="startRead" @click="goto_chapters(bookDetails._id)">开始阅读</button> <button class="joinSheif">加入书架</button>
            </div>

            <div class="summary">
              <p>
                {{bookDetails.longIntro}}
              </p>
            </div>
    </div>
</template>
<script type="text/ecmascript-6">
    export default {

        data: function () {
            return {
              bookDetails:[]
            }
        },
        watch:{
          '$route'(to,from){
          this.getDetails()
          }
        },
        computed:{
         wordCount:function () {
           return Math.round((this.bookDetails.wordCount)/10000)
         }
        },

      created:function () {
      this.getDetails()

      },
      methods:{
           getDetails:function () {
             let url ='http://novel.juhe.im/book-info/';
             let id = this.$route.params.id;

             this.$axios.get(url+id).then((data)=>{
               this.bookDetails=data.data.data

             })
           },
        goto_chapters(link){
           this.$router.push('/read/'+link)
        }
      },

    }

</script>
<style>
  #bookdetail{
    width: 352px;
  }
  .head {
     position: absolute;
  }
   .head img{
    margin-left: 20px;
     position: relative;
     top: 30px;
   }
  .title{
    position: absolute;
    top:30px;
    left: 140px;
    font-weight: bold;
  }
  .author{
    position: absolute;
    top: 60px;
    left: 140px;
    font-size: 14px;
      line-height: 1.8;
  }
  .classify{
    position: relative;
   left: 12px;
    top:-30px;
    font-size: 14px;
    line-height: 1.8;
  }
  .count{
    position: relative;
    left: -62px;
    top:-1px;
    font-size: 14px;
    line-height: 1.8;
  }
/*
阅读及加入书架
*/
  .read{
    position: absolute;
    top:200px;
    left: 50px;
  }
  .startRead{
    width:168px;
    height: 33px;
    border-radius: 5px;
    margin-right: 40px;
    background-color: #ed424b;
  }
  .joinSheif{
    width: 168px;
    height: 33px;
    border-radius: 5px;
  }
  /*
  小说简介区域
  */
  .summary{
    position: absolute;
    top:240px;
    left: 60px;
    height:200px;
    width: 352px;

  }
  .summary p{
    height: 200px;
    width: 100%;
  }
</style>
