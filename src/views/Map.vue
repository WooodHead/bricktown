<template>
  <MapVM mapName="my-map"/>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import MapVM from '@/components/MapVM.vue'; // @ is an alias to /src
import {} from '@types/googlemaps';

@Component({
  components: {
    MapVM,
  },
})
export default class Map extends Vue {}
</script>