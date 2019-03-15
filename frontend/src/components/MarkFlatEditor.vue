<template>
  <div class="frame" :height="height">
    <div class="toolbar">
      icons
    </div>
    <div class="editor">
      {{ text }}
    </div>
    <VueShowdown :markdown="text" :options="{ emoji: true }" :extensions="['sbmd']" />
  </div>
</template>

<script>
  export default {
    data:()=>{
      return {
        text: "# some md - artist \n\nHello {A}world! **strong** \n\n1. list \n2. items\n",
      }
    },
    props: {
      height: {
        type: Number,
        default: 400
      }
    },
    computed: {
    },
  }
</script>

<style scoped>
  .frame {
    width: 100%;
    overflow:auto;
    padding: 10px;
  }
  .toolbar {
    width: 100%;
    overflow:auto;
    padding: 10px;
  }
  .editor {
    float:left;
    width: 50%;
    background:blue;
    height: 400px;
  }
  .preview {
    float: right;
    background:pink;
    height: 400px;
    width: 50%;
  }
</style>
