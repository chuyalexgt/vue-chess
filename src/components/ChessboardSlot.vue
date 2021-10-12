<template>
  <v-card
    height="12.5%"
    class="d-flex justify-center align-center"
    elevation="1"
    :color="colorCalculate"
    @click="movePiece()"
  >
    <div
      :class="{
        'inRange d-flex justify-center align-center': cell.inRange,
        'enemyInRange d-flex justify-center align-center':
          cell.inRange & (cell.content != ''),
          'preRange':cell.preScan
      }"
    >
      <Bishop
        v-if="cell.content === 'Bishop'"
        :teamColor="cell.color"
        :x="rowIndex"
        :y="colIndex"
        :chessboardMatriz="chessboardMatriz"
      />
      <King
        v-if="cell.content === 'King'"
        :teamColor="cell.color"
        :x="rowIndex"
        :y="colIndex"
        :chessboardMatriz="chessboardMatriz"
      />
      <Knight
        v-if="cell.content === 'Knight'"
        :teamColor="cell.color"
        :x="rowIndex"
        :y="colIndex"
        :chessboardMatriz="chessboardMatriz"
      />
      <Pawn
        v-if="cell.content === 'Pawn'"
        :teamColor="cell.color"
        :x="rowIndex"
        :y="colIndex"
        :chessboardMatriz="chessboardMatriz"
      />
      <Queen
        v-if="cell.content === 'Queen'"
        :teamColor="cell.color"
        :x="rowIndex"
        :y="colIndex"
        :chessboardMatriz="chessboardMatriz"
      />
      <Rook
        v-if="cell.content === 'Rook'"
        :teamColor="cell.color"
        :x="rowIndex"
        :y="colIndex"
        :chessboardMatriz="chessboardMatriz"
      />
    </div>
  </v-card>
</template>

<script>
export default {
  name: "ChessboardSlot",
  created() {
    this.$bus.$on("gameStart", () => {
      this.isSelected = false;
    });
  },
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
        if (this.turnState & (this.cell.color == "black")) {
          this.$bus.$emit("wrongTurnIndicator"); //si es el turno de blancas y se quiere mover una negra no lo permite
          return;
        }
        if (!this.turnState & (this.cell.color == "white")) {
          this.$bus.$emit("wrongTurnIndicator"); //mismo caso con el turno de las negras
          return;
        }
        if (this.cell.content === "") return; //Evita el movimiento de una celda sin pieza
        this.multiBus();
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
    multiBus() {
      let position = [this.rowIndex, this.colIndex];
      if (this.cell.content == "Bishop") this.$bus.$emit("rangeToMoveBishop", position);
      if (this.cell.content == "Knight") this.$bus.$emit("rangeToMoveKnight", position);
      if (this.cell.content == "Queen") this.$bus.$emit("rangeToMoveQueen", position);
      if (this.cell.content == "Rook") this.$bus.$emit("rangeToMoveRook", position);
      if (this.cell.content == "King") this.$bus.$emit("rangeToMoveKing", position);
      if (this.cell.content == "Pawn") this.$bus.$emit("rangeToMovePawn", position);
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

<style lang="scss" scoped>
.inRange {
  width: 100%;
  height: 100%;
  border: 3px outset #1c6ea4;
  background-color: rgba(29, 185, 195, 0.5);
}
.enemyInRange {
  width: 100%;
  height: 100%;
  border: 3px outset #a41c1c;
  background-color: rgba(195, 29, 29, 0.5);
}
.preRange {
  width: 100%;
  height: 100%;
  border: 3px outset #1ca423;
  background-color: rgba(29, 195, 51, 0.5);
}
</style>
