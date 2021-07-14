<template lang="pug">
  UserPermissions
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { UserPermissions } from '../../packages/user-permissions'

@Component({
  components: { UserPermissions },
})
export default class UserPermissionsView extends Vue{
}
</script>

<style scoped lang="sass">

</style>
