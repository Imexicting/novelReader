<template>
    <div id="reader" @click="open_menu()">
        <div id="chapter_title">
          <span class="change_color" v-cloak>{{chaptersList[this.reading].title}}</span>
        </div>
      <div id="chapter_content">
        <p class="change_color" v-show="showContent">
        {{chpaterConent}}
      </p>
          <ul style="list-style: none"  v-show="showLists">
            <li v-for="(item,index) in chaptersList">
              <a href="javascript:;" style="text-decoration:none;" @click="goto_chapter(index)">{{item.title}}</a>
            </li>
          </ul>
      </div>
          <div class="fontSetting" v-show="showColors">
              <div class="setting_color">
                <div style="background-color: green" @click="setcontentColor('green')">护眼</div>
                <div style="background-color: #e9dfc7" @click="setcontentColor('#e9dfc7')">纸张</div>
                <div style="background-color: black;color: white" @click="setcontentColor('black')">夜间</div>
              </div>
          </div>
        <div class="setting" v-show="showSettings">
          <button id="setting_back" @click="changePage(false)">上一章</button> <button id="setting_ahead" @click="changePage(true)">下一章</button>
            <span id="setting_area"><button class="back_list" @click="showList(true)">返回目录</button>
              <button class="settings" @click="open_color()">设置</button>
              <button class="back_cabinet" @click="back_cabinet()">返回书架</button></span>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
        data: function () {
            return {
              chaptersList:[],
              chpaterConent:'',
              showSettings:false,
              showColors:false,
              showContent:true,
              showLists:false,
               reading:0
            }
        },
        watch:{
          '$route'(to,from){
            this.get_chapters()
          }
        },
       methods:{
           get_chapters:function () {
             /*
             * 先要获得书籍源的id 再通过书籍源的id来得到对应的书籍的详细列表
             * 现获取书籍章节列表，然后才能拿得到文章信息内容
             * */
                let url = 'http://novel.juhe.im/book-sources?view=summary&book='
             let chapters = this.$route.params.link;

             this.$axios.get(url+chapters).then((data)=>{
                 // console.log(data.data.data[0]._id)
               // this.sourceId=data.data.data[0]._id
                        this.getlist(data.data.data[0]._id)
             })
           },
          getlist:function (data) {
             console.log('get'+data)
            let chaptersUrl ='http://novel.juhe.im/book-chapters/';
            this.$axios.get(chaptersUrl+data).then((chapter)=>{
                      this.chaptersList = chapter.data.data.chapters
                        this.getContent(this.chaptersList)
                  })
          },
         getContent:function (chapters,) {

              let url ='http://novel.juhe.im/chapters/'
           this.$axios.get(url+ encodeURIComponent(chapters[this.reading].link)).then((data)=>{

              this.chpaterConent=data.data.data.chapter.cpContent

           })

         },
         goto_chapter:function (index) {
            this.reading =index;
           this.getContent(this.chaptersList)
           this.showList(false)

         },
         back_cabinet:function () {
            this.$router.go(-1)
         },
         open_menu:function () {
                if(this.showSettings){
                  this.showSettings=false
                }else {
                  this.showSettings=true
                }


         },
         showList:function (flag) {
                if(flag){
                  this.showContent=false
                  this.showLists =true
                }else {
                  this.showContent=true
                  this.showLists =false
                }

         },
         open_color:function () {
        this.open_menu(false)
           if(this.showColors){
             this.showColors=false
           }else {
             this.showColors=true
           }

         },
         changePage:function (info) {

                  if(info ==false){
                    if(this.reading===0){
                      return false
                    }else {
                      this.reading =  this.reading-1
                    }
                  }else {

                     this.reading =  this.reading+1
                  }
              this.getContent(this.chaptersList)


         },
         setcontentColor(color){
                if (color=='black'){
                  document.getElementById('chapter_content').style.color= 'white'
                }else {
                  document.getElementById('chapter_content').style.color= 'black'

                }
              document.getElementById('chapter_content').style.backgroundColor = color
              this.showColors =false
         }
       },
      created:function () {
        this.get_chapters()
      }
    }

</script>
<style>
    #reader {
     margin: 0;
      padding: 0;
    }
  /*
      头部固定文章标题栏
  */
  #chapter_title{
    position: fixed;
    color:rgba(0,0,0,.1);
    width: 100%;
    height: 50px;
    display: block;
    z-index: 1000;
    background-color: #e9dfc7;

    top: -1px;
    left: 0;
    font-weight: bold;
    line-height: 50px;
  }
  #chapter_title span{
    margin-left: 10px;
    font-size: 18px;
    color:black;
  }
/*
文章区
*/
  #chapter_content{
    background-color: #e9dfc7;
    margin-top: 48px;
    width: 100%;
    margin-bottom: 30px;

  }
  /*
  设置区
  */
  .fontSetting div span{
    width: 100%;

  }
    .setting {

    }
  .setting #setting_back{
    position: fixed;
    z-index: 10;
    top: 40%;
  }
    .setting #setting_ahead{
      position: fixed;
      z-index: 10;
      top: 40%;
      left: 87%;
    }
    #setting_area{
      position: fixed;
      height: 50px;
      width: 100%;
      margin-top:-50px;

    }
    #setting_area .back_list{
      position: fixed;
      display: inline-block;
      float: left;
      z-index: 10;
        height: 30px;
      width: 34%;
      top: 100%;
      margin-top:-30px;

    }
    #setting_area .back_cabinet{
      position: fixed;
      display: inline-block;
    left: 63%;
      z-index: 10;
      height: 30px;
      width: 36%;
      top: 100%;
      margin-top:-30px;

    }
    #setting_area .settings{
      position: fixed;
      display: inline-block;
      left: 33%;
      z-index: 10;
      height: 30px;
      width: 34%;
      top: 100%;
      margin-top:-30px;
    }
  .fontSetting div div{
     width: 30px;
    height: 30px;
    border-radius: 15px;
    background-color: red;
    font-size: 12px;
    text-align: center;
    line-height: 30px;
    float: left;
  }
  .fontSetting{
    position: absolute;
     width: 100%;
     height: 100px;
      margin-top: -132px;

    padding: 0;
    margin-right: 0;
  }
    .fontSetting .setting_color{
      height: 200px;
      width: 100%;
    position: fixed;
      background-color: white;


    top: 85%;

  }
  .setting_color div{
    margin-left: 20%;
    position: relative;
    top:30px;
  }

  #chapter_content a :link{
    color:black;
  }
    #chapter_content a :visited{
      color:gray;
    }



</style>
