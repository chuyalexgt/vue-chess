<template>
  <v-card
    height="12.5%"
    class="d-flex justify-center align-center"
    elevation="1"
    :color="colorCalculate"
  >
    <Bishop
      :teamColor="this.$chessboardMatriz[colIndex][rowIndex].color"
      v-if="this.$chessboardMatriz[colIndex][rowIndex].content == 'Bishop'"
    />
    <King
      :teamColor="black"
      v-if="this.$chessboardMatriz[colIndex][rowIndex].content == 'King'"
    />
    <Knight
      :teamColor="black"
      v-if="this.$chessboardMatriz[colIndex][rowIndex].content == 'Knight'"
    />
    <Pawn
      :teamColor="black"
      v-if="this.$chessboardMatriz[colIndex][rowIndex].content == 'Pawn'"
    />
    <Queen
      :teamColor="black"
      v-if="this.$chessboardMatriz[colIndex][rowIndex].content == 'Queen'"
    />
    <Rook
      :teamColor="black"
      v-if="this.$chessboardMatriz[colIndex][rowIndex].content == 'Rook'"
    />
  </v-card>
</template>

<script>
export default {
  name: "ChessboardSlot",
  created() {},
  data() {
    return {};
  },
  props: {
    colIndex: Number,
    cell: Object,
    rowIndex: Number,
  },
  methods: {},
  computed: {
    colorCalculate() {
      if (
        (((this.colIndex + 1) % 2 == 0) & ((this.rowIndex + 1) % 2 != 0)) |
        (((this.colIndex + 1) % 2 != 0) & ((this.rowIndex + 1) % 2 == 0))
      ) {
        return "grey darken-1";
      } else {
        return "grey lighten-4";
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
