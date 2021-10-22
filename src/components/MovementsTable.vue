<template>
  <v-banner :width="width" elevation="3">
    <v-expansion-panels accordion>
      <v-expansion-panel>
        <v-expansion-panel-header color="brown lighten-3"
          >Movimientos</v-expansion-panel-header
        >
        <v-expansion-panel-content class="pt-4 | scroll" color="brown lighten-5">
          <v-banner
            single-line
            v-for="(m, index) in movements"
            :key="index"
            color="brown lighten-4"
          >
            <v-row>
              <v-col class="d-flex justify-center align-center">
                <v-icon :color="m.pieceData.color" x-large>{{
                  defineIcon(m.pieceData.content)
                }}</v-icon>
              </v-col>
              <v-col>
                <p>Pieza: {{ m.pieceData.content }}</p>
                <p>
                  {{
                    ` De ${positionCode(m.start[0], m.start[1])} a  ${positionCode(
                      m.end[0],
                      m.end[1]
                    )}`
                  }}
                </p>
              </v-col>
            </v-row>
          </v-banner>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-banner>
</template>

<script>
export default {
  name: "MovementsTable",
  created() {},
  data() {
    return {};
  },
  props: {
    movements: {
      type: Array,
      require: true,
    },
  },
  methods: {
    defineIcon(type) {
      if (type == "Pawn") return "mdi-chess-pawn";
      if (type == "Bishop") return "mdi-chess-bishop";
      if (type == "Knight") return "mdi-chess-knight";
      if (type == "King") return "mdi-chess-king";
      if (type == "Queen") return "mdi-chess-queen";
      if (type == "Rook") return "mdi-chess-rook";
    },
    positionCode(c, r) {
      let colCode = ["A", "B", "C", "D", "E", "F", "G", "H"];
      let rowCode = [8, 7, 6, 5, 4, 3, 2, 1];
      return `${colCode[r]}${rowCode[c]}`;
    },
  },
  computed: {
    width() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "95vw";
        case "sm":
          return "60vw";
        case "md":
          return "45vw";
        case "lg":
          return "45vw";
        case "xl":
          return "45vw";
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
