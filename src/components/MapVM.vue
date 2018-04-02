<template>
  <div class="google-map" :id="mapName"></div>
</template>


<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';


@Component
export default class MapVM extends Vue {
  @Prop() private mapName: string;
  private lat: number = 35.658581;
  private lng: number = 139.745438;
  private thisMap: google.maps.Map;
  constructor() {
    super();
  }

  private mounted() {
    this.createMap();
  }

  private createMap() {
    const self = this;
    this.thisMap = new google.maps.Map(document.getElementById(self.mapName), {
        center: new google.maps.LatLng(self.lat, self.lng),
        zoom: 14,
        mapTypeControl: false,
    });
  }
}
</script>

<style scoped lang="scss">
.google-map {
  width: 800px;
  height: 600px;
  margin: 0 auto;
  background: gray;
}
</style>