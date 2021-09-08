<template>
  <div>
    <v-container v-if="ventilate">
      <v-icon x-large color="ma-5" class="mr-1">mdi-weather-windy</v-icon>Ventilate!
    </v-container>
    <v-container v-if="!ventilate">
      <v-icon x-large color="ma-5" class="mr-1">mdi-window-close</v-icon>Close Window!
    </v-container>
    <v-container class="grey lighten-5">
      <v-row no-gutters>
        <v-col
            cols="12"
            sm="12"
        >
          <v-card
              class="pa-2"
              tile
          >
            <v-icon large color="ma-5" class="mr-1">mdi-home</v-icon>Inside
          </v-card>
        </v-col>
        <v-col
            cols="12"
            sm="12"
        >
          <v-card
              class="pa-2"
              tile
          >
            <v-slider
                v-model="tempInside.val"
                :thumb-color="tempInside.color"
                thumb-label="always"
                min="10"
                max="30"
            >
              <template v-slot:prepend>
                <v-icon large
                        color="red"
                >
                  mdi-thermometer
                </v-icon>
              </template>
            </v-slider>
          </v-card>
        </v-col>
        <v-col
            cols="12"
            sm="12"
        >
          <v-card
              class="pa-2"
              tile
          >
            <v-slider
                v-model="humInside.val"
                thumb-label="always"
                :thumb-color="humInside.color"
                min="10"
                max="90"
            >
              <template v-slot:prepend>
                <v-icon large
                        color="info"
                >
                  mdi-water-percent
                </v-icon>
              </template>

            </v-slider>
          </v-card>
        </v-col>
      </v-row>
              <v-row no-gutters>
          <v-col
            class="text-left"
            cols="12"
            sm="12"
        >
          <v-card
              class="pa-2"
              tile
          >
                <v-icon large
                        color="info"
                >
                  mdi-water-outline
                </v-icon>
                {{absHumInside}} g/m³
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <v-container class="grey lighten-5">
      <v-row no-gutters>
        <v-col
            cols="12"
            sm="12"
        >
          <v-card
              class="pa-2"
              tile
          >
            <v-icon large color="success ma-5" class="mr-1">mdi-pine-tree</v-icon>Outside
          </v-card>
        </v-col>
        <v-col
            cols="12"
            sm="12"
        >
          <v-card
              class="pa-2"
              tile
          >
            <v-slider
                v-model="tempOutside.val"
                :thumb-color="tempOutside.color"
                thumb-label="always"
                min="10"
                max="30"
            >
              <template v-slot:prepend>
                <v-icon large
                        color="red"
                >
                  mdi-thermometer
                </v-icon>
              </template>
            </v-slider>
          </v-card>
        </v-col>
        <v-col
            cols="12"
            sm="12"
        >
          <v-card
              class="pa-2"
              tile
          >
            <v-slider
                v-model="humOutside.val"
                :thumb-color="humOutside.color"
                thumb-label="always"
                min="10"
                max="90"
            >
              <template v-slot:prepend>
                <v-icon large
                        color="info"
                >
                  mdi-water-percent
                </v-icon>
              </template>
            </v-slider>

          </v-card>
        </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col
            class="text-left"
            cols="12"
            sm="12"
        >
          <v-card
              class="pa-2"
              tile
          >
                <v-icon large
                        color="info"
                >
                  mdi-water-outline
                </v-icon>
                {{absHumOutside}} g/m³
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'WiWaWet',
  props: {
    msg: String
  },
  data() {
    return {
      tempInside: {label: 'color', val: 20, color: 'red'},
      tempOutside: {label: 'track-color', val: 20, color: 'red'},
      humInside: {label: 'thumb-color', val: 50, color: 'info'},
      humOutside: {label: 'thumb-color', val: 50, color: 'info'},
      }
  },
  computed: {
    ventilate: function () {
      return this.humOutside.val - 3 * (this.tempInside.val - this.tempOutside.val) < this.humInside.val
    },
    absHumInside: function () {
      var t = this.tempInside.val
      var r = this.humInside.val
      var ah = 13.2471*Math.pow(Math.E,17.67*t/(t+243.5))*r/(273.15+t);
      return Math.round(ah*100)/100
    },
    absHumOutside: function () {
      var t = this.tempOutside.val
      var r = this.humOutside.val
      var ah = 13.2471*Math.pow(Math.E,17.67*t/(t+243.5))*r/(273.15+t);
      return Math.round(ah*100)/100
    },

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
