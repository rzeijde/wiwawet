<template>
  <div>
    <v-container class="grey lighten-5">
      <v-row no-gutters>
        <v-col
            cols="6"
            align="left"
        >
            <v-icon large color="info" class="mr-1">mdi-home</v-icon>
        </v-col>
        <v-col
            cols="6"
            align="right"
        >
                <div v-if="ventilate">
      <v-icon x-large color="info" class="mr-1">mdi-weather-windy</v-icon>
    </div>
    <div v-if="!ventilate">
      <v-icon x-large color="error" class="mr-1">mdi-window-close</v-icon>
    </div>
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
                :min="minTempInside"
                :max="maxTempInside"
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
                        align="left"
        >
            <v-icon large color="success ma-5" class="mr-1">mdi-pine-tree</v-icon>
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
                :min="minTempOutSide[month]"
                :max="maxTempOutSide[month]"
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
  mounted() {
    this.tempOutside.val = (this.maxTempOutSide[this.month] + this.minTempOutSide[this.month]) / 2
  },
  data() {
    return {
      month: new Date().getMonth()+1,
      minTempOutSide: {1: 0, 2: 0, 3: 0, 4: 5, 5: 5, 6: 10, 7: 10, 8: 10, 9: 10, 10: 5, 11: 0, 12: 0},
      maxTempOutSide: {1: 15, 2: 15, 3: 15, 4: 20, 5: 25, 6: 25, 7: 30, 8: 30, 9: 30, 10: 25, 11: 20, 12: 15},
      minTempInside: 10,
      maxTempInside: 30,
      tempInside: {label: 'color', val: 20, color: 'red'},
      tempOutside: {label: 'track-color', val: 20, color: 'red'},
      humInside: {label: 'thumb-color', val: 50, color: 'info'},
      humOutside: {label: 'thumb-color', val: 50, color: 'info'},
      }
  },
  computed: {
    ventilate: function () {
      var ti = this.tempInside.val
      var ri = this.humInside.val
      var ahi = 13.2471*Math.pow(Math.E,17.67*ti/(ti+243.5))*ri/(273.15+ti);

      var to = this.tempOutside.val
      var ro = this.humOutside.val
      var aho = 13.2471*Math.pow(Math.E,17.67*to/(to+243.5))*ro/(273.15+to);
      return ahi > aho
      
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
