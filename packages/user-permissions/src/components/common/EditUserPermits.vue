<template lang="pug">
  .edit-user-permits
    .param-wrapper
      .param__label Разрешения
      .param__data
        .param__data-wrapper( v-if="hasPermits"  )
          select(
            :disabled="isAllItemsSelected"
            v-model="selectedPermit"
          )
            option(
                v-for="(item, index) in permitItems"
                :value="item.permit"
                :key="item.permit"
                :disabled="!index"
              ) {{ item.alias }}
          .add-item(
            v-if="!isAllItemsSelected"
            title="Добавить разрешение пользователю"
            @click.stop="addPermit"
          )
            include ./../../common/assets/icons/add
    .param-wrapper
      .param__label
      .param__data
        .user-permits__list( v-if="hasUserPermits ")
          .user-permits__list-item(
            v-for="permit in userPermits"
            :key="permit"
          )
            .item__caption {{ getPermitAlias( permit ) }}
            .item__action(
              title="Удалить разрешение"
              @click.stop="removePermit( permit )"
            )
              include ./../../common/assets/icons/remove
        .no-data( v-else ) Разрешения не заданы
</template>

<script lang="ts">

import { cloneDeep, isEqual } from 'lodash'
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import { Permission } from '../../types/userpermissions'
import AppCheckedItems from './AppCheckedItems.vue'

const UG = namespace('upGroups')

@Component({ components: { AppCheckedItems } })
export default class EditUserPermits extends Vue {
  @Prop({ default: () => [] }) private value: Array<string>
  @Prop({ default: () => [] }) private permits: Array<Permission>

  private userPermits = []
  private selectedPermit = ''

  get hasUserPermits() {
    return this.userPermits.length
  }

  get hasPermits() {
    return this.permits?.length
  }

  get valueStringifyed() {
    return JSON.stringify( this.value )
  }

  get userPermitsStringifyed() {
    return JSON.stringify( this.userPermits )
  }

  @Watch('valueStringifyed') private onValueChanged() {
    const permitList = this.permits.map( p => p.permit )
    // Не отображаем "вложенные" разрешения - которые описаны в поле extend
    this.userPermits = cloneDeep( this.value ).filter(
      p => permitList.includes( p )
    )
  }

  @Watch('userPermitsStringifyed') private onPermitsChanged() {
    if ( !isEqual( this.value, this.userPermits )) {
      this.$emit('input', this.userPermits)
    }
  }

  get permitItems(): Array<Permission> {
    const list = this.permits.filter( p => !this.userPermits.includes( p.permit ) )
    list.unshift({
      alias: this.isAllItemsSelected ? 'Выбраны все разрешения' : 'Выберите разрешение',
      permit: ''
    })
    return list
  }

  get isAllItemsSelected() {
    return this.userPermits.length === this.permits.length
  }

  private getPermitAlias( permit: string ) {
    return this.permits.find( p => p.permit === permit )?.alias ?? 'Не задан псевдоним разрешения'
  }

  private addPermit() {
    if (!this.selectedPermit) {
      return
    }
    const nextPermit = this.getNextPermit( this.selectedPermit )
    this.userPermits.unshift( this.selectedPermit )
    this.selectedPermit = nextPermit
  }

  private removePermit( permit: string) {
    this.userPermits = this.userPermits.filter( p => p !== permit )
  }

  private getNextPermit( permit: string ): string {
    const index = this.permitItems.map( r => r.permit).indexOf( permit )
    if (this.permitItems.length === 2) {
      return ''
    } else if ( index === this.permitItems.length - 1 ) {
      return this.permitItems[ index - 1 ].permit
    }
    return this.permitItems[ index + 1 ].permit
  }
}
</script>

<style lang="sass" scoped>
@import "../../common/assets/styles/common"
@import "../../common/assets/styles/form"
</style>
