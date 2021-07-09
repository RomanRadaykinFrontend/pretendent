<template lang="pug">
  highlight(
    language="cpp"
  ) {{ sourceCode }}
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import hljs from 'highlight.js'
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import Highlight from 'vue-highlight-component'

// eslint-disable-next-line @typescript-eslint/no-var-requires
hljs.registerLanguage( 'cpp', require( 'highlight.js/lib/languages/cpp' ) )

@Component({
  components: {
    Highlight,
  },
})
export default class TaskCode extends Vue{

  @Prop() private code!: string

  get sourceCode(){
    return this.code
  }


}
</script>

<style scoped lang="css" src="highlight.js/styles/github.css">

</style>
