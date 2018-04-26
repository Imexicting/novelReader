<!--
  经过对组件的分析，发现热门书和排行榜都具有相同的结构，所以
  复用该组件即可达到我们的渲染目的，节约资源。。
-->
<template>
    <div id="books-list">
      <ul  id="booksul">
        <li id="book_detail" v-for="(item,index) in books">
              <div>
                <img :src="decodeURIComponent((item.cover).slice(7,-3))" v-cloak>
                  <span>书名:{{item.title}}</span>
                  <span>作者:{{item.author}}</span>
              </div>
        </li>
      </ul>
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
        data: function () {
            return {

            }
        },
      props:{
        books:{
           type:Array,
          default:['空']
        }
        },
      methods:{

      },
     /*created:function () {
       var url ='/agent/http%3A%2F%2Fimg.1391.com%2Fapi%2Fv1%2Fbookcenter%2Fcover%2F1%2F1228859%2F_1228859_441552.jpg%2F'
        console.log(url.slice(7,-3))
     },*/
      computed:{
          getPhoto:()=>{
            let url = '/agent/http%3A%2F%2Fimg.1391.com%2Fapi%2Fv1%2Fbookcenter%2Fcover%2F1%2F1228859%2F_1228859_441552.jpg%2F'

           return decodeURIComponent(url.slice(7,-3))

          }

      },


    }

</script>
<style>
  #books-list{
    display: block;

  }
  #booksul #books-list{
     overflow: hidden;

  }
  #books-list li{
    display: inline-block;
    margin-right: 12px;
    width: 100px;
    float: left;


    }
    #book_detail div{
      width: 100px;
      height:125px;

    }
    #book_detail div img {
        height: 100%;
      width:100%;
    /*  border: 1px solid red;*/
    }
    #book_detail div span
    {
      text-align: left;
      font-size: 14px;
       display: block;
      white-space: nowrap;
       font-weight: 500;
    }
</style>
