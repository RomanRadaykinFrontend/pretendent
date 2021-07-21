<template lang="pug">
.edit-user-region
  .param-wrapper
    .param__label Доступные регионы
    .param__data
      .param__data-wrapper( v-if="hasRegions"  )
        select(
          :disabled="isAllRegionsAdded"
          v-model="selectedUuid"
        )
          option(
              v-for="(region, index) in regionList"
              :value="region.uuid"
              :key="region.uuid"
              :disabled="!index"
            ) {{ region.name }}
        .add-item(
          v-if="!isAllRegionsAdded"
          title="Добавить регион пользователю"
          @click.stop="addRegion"
        )
          include ./../../common/assets/icons/add
      .no-data( v-else ) Список регионов отсутствует
  .param-wrapper
    .param__label
    .param__data
      .user-regions__list( v-if="hasUserRegions ")
        .user-regions__list-item(
          v-for="uuid in userRegions"
          :key="uuid"
        )
          .item__caption {{ getRegionName( uuid ) }}
          .item__action(
            title="Удалить регион"
            @click.stop="removeRegion( uuid )"
          )
            include ./../../common/assets/icons/remove
      .no-data( v-else ) Регионы не заданы
</template>

<script lang="ts">

import { cloneDeep, intersection, isEqual } from 'lodash'
import { Region } from '../../types/userpermissions'
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

@Component
export default class EditUserRegions extends Vue {

  @Prop({ default: () => [] }) private value: Array<string>
  @Prop({ default: () => [] }) private regions: Array<Region>

  private selectedUuid: string = ''
  private userRegions: Array<string> = []

  get valueStringifyed() {
    return JSON.stringify( this.value )
  }

  get userGroupsStringifyed() {
    return JSON.stringify( this.userRegions )
  }

  @Watch('valueStringifyed') private onValueChanged() {
    this.userRegions = cloneDeep( this.value )
  }

  @Watch('userGroupsStringifyed') private onRegionsChanged() {
    if ( !isEqual( this.regions, this.value )) {
      this.$emit('input', this.userRegions)
    }
  }

  get hasRegions(): boolean {
    return !!this.regions.length
  }

  get hasUserRegions(): boolean {
    return !!this.userRegions.length
  }

  get isRegionSelected(): boolean {
    return !!this.selectedUuid
  }

  get isAllRegionsAdded() {
    return this.userRegions.length === this.regions.length
  }

  get regionList() {
    const selectRegionItems = [...this.regions]
    selectRegionItems.unshift(
      {
        name: this.isAllRegionsAdded ? 'Выбраны все регионы' : 'Выберите регион',
        uuid: '',
      },
    )
    const filteredRegionItems = selectRegionItems.filter( r => !this.userRegions.includes( r.uuid ) )
    return filteredRegionItems
  }

  // Data methods

  // Remove deleted regions from user region list
  private setUserRegions() {
    const sourceRegions = this.regions.map( r => r.uuid )
    this.userRegions = intersection( sourceRegions, this.userRegions )
  }

  // Adding a region to allowed region list
  private addRegion() {
    if (!this.isRegionSelected) {
      return
    }
    const nextRegion = this.getNextRegionUUID( this.selectedUuid )
    this.userRegions.unshift( this.selectedUuid )
    this.selectedUuid = nextRegion
  }

  // Remove a region from allowed region list
  private removeRegion( uuid: string) {
    this.userRegions = this.userRegions.filter( r => r !== uuid )
  }

  // UI methods

  // Get region name by UUID
  private getRegionName( uuid: string ): string {
    return this.regions.find( r => r.uuid === uuid ).name
  }

  // Get next region item at allowed region list
  private getNextRegionUUID( uuid: string ): string {
    const index = this.regionList.map( r => r.uuid).indexOf( uuid )
    // if select the only remaining item
    if (this.regionList.length === 2) {
      return ''
      // if select last item - try select previous item
    } else if ( index === this.regionList.length - 1 ) {
      return this.regionList[ index - 1 ].uuid
    }
    // select next item
    return this.regionList[ index + 1 ].uuid
  }
}
</script>

<style lang="sass" scoped>
@import "../../common/assets/styles/common"
@import "../../common/assets/styles/form"
</style>
