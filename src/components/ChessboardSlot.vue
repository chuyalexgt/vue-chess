<template>
  <v-card
    height="12.5%"
    class="d-flex justify-center align-center"
    elevation="1"
    :color="colorCalculate"
  >
    <Bishop
      v-if="this.$chessboardMatriz[rowIndex][colIndex].content === 'Bishop'"
      :teamColor="this.$chessboardMatriz[rowIndex][colIndex].color"
    />
    <King
      v-if="this.$chessboardMatriz[rowIndex][colIndex].content === 'King'"
      :teamColor="this.$chessboardMatriz[rowIndex][colIndex].color"
    />
    <Knight
      v-if="this.$chessboardMatriz[rowIndex][colIndex].content === 'Knight'"
      :teamColor="this.$chessboardMatriz[rowIndex][colIndex].color"
    />
    <Pawn
      v-if="this.$chessboardMatriz[rowIndex][colIndex].content === 'Pawn'"
      :teamColor="this.$chessboardMatriz[rowIndex][colIndex].color"
    />
    <Queen
      v-if="this.$chessboardMatriz[rowIndex][colIndex].content === 'Queen'"
      :teamColor="this.$chessboardMatriz[rowIndex][colIndex].color"
    />
    <Rook
      v-if="this.$chessboardMatriz[rowIndex][colIndex].content === 'Rook'"
      :teamColor="this.$chessboardMatriz[rowIndex][colIndex].color"
    />
    <!-- {{`${rowIndex} - ${colIndex}`}} -->

    
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
    rowIndex: Number,
    cell: Object,
    colIndex: Number,
  },
  methods: {},
  computed: {
    colorCalculate() {
      if (
        (((this.rowIndex + 1) % 2 == 0) & ((this.colIndex + 1) % 2 != 0)) |
        (((this.rowIndex + 1) % 2 != 0) & ((this.colIndex + 1) % 2 == 0))
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
