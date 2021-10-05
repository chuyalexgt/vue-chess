<template>
  <v-card
    height="12.5%"
    class="d-flex justify-center align-center"
    elevation="1"
    :color="colorCalculate"
    @click="movePiece()"
  >
    <Bishop
      v-if="cell.content === 'Bishop'"
      :teamColor="cell.color"
      :x="rowIndex"
      :y="colIndex"
      :contain="cell"
      :chessboardMatriz="chessboardMatriz"
    />
    <King
      v-if="cell.content === 'King'"
      :teamColor="cell.color"
      :x="rowIndex"
      :y="colIndex"
      :contain="cell"
      :chessboardMatriz="chessboardMatriz"
    />
    <Knight
      v-if="cell.content === 'Knight'"
      :teamColor="cell.color"
      :x="rowIndex"
      :y="colIndex"
      :contain="cell"
      :chessboardMatriz="chessboardMatriz"
    />
    <Pawn
      v-if="cell.content === 'Pawn'"
      :teamColor="cell.color"
      :x="rowIndex"
      :y="colIndex"
      :contain="cell"
      :chessboardMatriz="chessboardMatriz"
    />
    <Queen
      v-if="cell.content === 'Queen'"
      :teamColor="cell.color"
      :x="rowIndex"
      :y="colIndex"
      :contain="cell"
      :chessboardMatriz="chessboardMatriz"
    />
    <Rook
      v-if="cell.content === 'Rook'"
      :teamColor="cell.color"
      :x="rowIndex"
      :y="colIndex"
      :contain="cell"
      :chessboardMatriz="chessboardMatriz"
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
    rowIndex: Number,
    cell: Object,
    colIndex: Number,
    isPieceSelected: Boolean,
    chessboardMatriz: Array,
    turnState: Boolean,
  },
  methods: {
    movePiece() {
      if (!this.isPieceSelected) {
        if (this.turnState & (this.cell.color == "black")){
          this.$bus.$emit("wrongTurnIndicator"); //si es el turno de blancas y se quiere mover una negra no lo permite
          return
        }
        if (!this.turnState & (this.cell.color == "white")){
          this.$bus.$emit("wrongTurnIndicator"); //mismo caso con el turno de las negras
          return
        }
        if (this.cell.content === "") return; //Evita el movimiento de una celda sin pieza
        this.$bus.$emit("piecePosition", {
          position: [this.rowIndex, this.colIndex],
          data: this.cell,
        });

        this.$bus.$emit("switchSelection"); //cambia estado de isPieceSelected

        return;
      }
      if (this.isPieceSelected) {
        this.$bus.$emit("positionToMove", {
          position: [this.rowIndex, this.colIndex],
          data: this.cell,
        });
      }
    },
  },
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
