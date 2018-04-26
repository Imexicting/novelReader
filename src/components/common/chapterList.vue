<template>
    <div>
            <ul>
              <li v-for="item in cp">

              </li>
            </ul>
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
        data: function () {
            return {
            cp:this.$route.params
            }
        }
    }

</script>
<style>
    div li{
      list-style: none;
    }

</style>
