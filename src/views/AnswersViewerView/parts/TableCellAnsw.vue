<template lang="pug">
.table-cell
  .table-cell__task-number( v-show = " type === 'number' " )
    span {{ cellValue }}
  .table-cell__text-code( v-show = " type === 'task' " )
    span {{ cellValue }}
    Highlight( v-show = " showCode " ) {{ codeValue }}
  .table-cell__radio(
    v-show = " type === 'answersArr' "
    v-for = "(answer, index) in cellValue"
  )
    input(
      type = "radio" :id = "index"
      v-model = "picked"
    )
    label( for = "index" ) {{ answer }}
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
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
export default class TableCellAnsw extends Vue{
  @Prop() private value!: string | number | Array<string>
  @Prop() private type!: 'number' | 'task' | 'answersArr'
  @Prop({ required: false }) private code!: string

  private picked = ''
  get cellValue(){
    return this.value
  }
  get isObjFlag(){
    return this.isObj
  }
  get codeValue(){
    return this.code
  }

  get showCode(){
    return this.codeValue !== ''
  }
}
</script>

<style scoped lang="sass">
.table-cell
  padding: 0 15px
  box-sizing: border-box
  display: table-cell
  border: 1px solid rgba(198, 209, 221, 0.5)

  &__radio
    margin: 10px 0
    line-height: 1.5

</style>
