<template>
  <!-- <div class="frame">
    <div class="toolbar">
      icons
    </div>
    <div class="editrow">
      <div @keydown="modifyKeyInput" @input="updateText" contenteditable class="editor">#&nbsp;song&nbsp;-&nbsp;artist<br>
1.&nbsp;verse<br>
2.&nbsp;verse<br>
~Chorus&nbsp;some&nbsp;{C}chorus&nbsp;&nbsp;<br>
more&nbsp;chorus&nbsp;&nbsp;<br>
end&nbsp;this&nbsp;chorus&nbsp;&nbsp;<br>
3.&nbsp;verse&nbsp;blah&nbsp;{a}blah&nbsp;{e}blah&nbsp;{...}&nbsp;<br>
      </div>
      <div v-html="processedHTML" class="preview"/>
    </div>
  </div> -->
  <div class="editor">
    <div class="buttons">
      <button @click="show = !show">switch</button>
    </div>
    <div class="source" v-show="show">
      <textarea v-model="text"></textarea>
    </div>
    <div class="preview" v-show="!show" v-html="processedHTML">
    </div>
  </div>
</template>

<script>
  export default {
    data:()=>{
      return {
        text: "&nbsp;",
        show: true,
      }
    },
    methods: {
      
      insertAtSelection(text) {
        var sel = window.getSelection();
        var range = sel.getRangeAt(0);
        var current = range.extractContents();
        range.insertNode(document.createTextNode(text));
        range.insertNode(current);
        sel.collapseToStart();
        return current;
      },
      modifyKeyInput(e) {
        var open = ["{", "(", "*"]
        var close = ["}", ")", "*"]
        var index = open.indexOf(e.key);
        if (index >= 0) {
          window.getSelection().getRangeAt(0).selectNode(
            this.insertAtSelection(close[index])
          )
        }
      },
      updateText(e) {
        this.text = e.target.innerHTML.replace(/\n/g, "").replace(/<br.+?>/g, "\n").replace(/<.+?>/g, "").replace(/&nbsp;/g, " ");
      }
    },
    computed: {
      processedHTML() {
        // eslint-disable-next-line
        console.log(this.text)
        return this.$markflat.makeHtml(this.text);
      }
    }
  }
</script>

<style scoped>
  .editor {
    margin: 10px;
    padding: 0;
    border: 2px solid #fff;
    border-radius: 5px;
  }
  .buttons {
    height: 30px;
    width: 100%;
    background: #aaa;
  }
  .source, .preview {
    width: 100%;
    min-height: 50%;
    background: #aaf;
  }
  .source textarea {
    width: 100%;
    height: 100%;
  }

  /* .frame {
    width: 100%;
    overflow:auto;
    display: table;
    position: absolute;
    top: 10px;
    bottom: 10px;
  }
  .toolbar {
    width: 100%;
    overflow:auto;
    height: 40px;
    padding: 10px;
    display: table-row;
  }
  .editrow {
    display: table-row;
  }
  .editor {
    width: 50%;
    display: table-cell;
    border: 1px inset #444;
    min-height: 100px;
  }
  .preview {
    width: 50%;
    display: table-cell;
    border: 1px inset #444;
    position: relative;
    min-height: 100px;
  }
  .preview p {
    margin: 0;
  } */
</style>
