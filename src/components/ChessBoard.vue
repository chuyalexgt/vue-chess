<template>
  <v-card
    width="40vw"
    height="40vw"
    color="brown lighten-4"
    class="d-flex justify-space-around"
  >
    <v-card v-for="(c, index) in this.chessboardMatriz" :key="index" width="12.5%">
      <ChessboardSlot
        v-for="(cell, index2) in c"
        :key="index2"
        :colIndex="index"
        :cell="cell"
        :rowIndex="index2"
        :isPieceSelected="isPieceSelected"
        :chessboardMatriz="chessboardMatriz"
      />
    </v-card>
  </v-card>
</template>

<script>
export default {
  name: "ChessBoard",
  data() {
    return {
      chessboardMatriz: Array(8) ///Formato [col][row]
        .fill(null)
        .map(() =>
          Array(8).fill(
            Object.assign(
              {},
              {
                content: "",
                color: "",
              }
            )
          )
        ),
      isPieceSelected: false,
      piecePosition: [],
      pieceData: {},
      positionToMove: [],
      dataOfpositionToMove: {},
    };
  },
  created() {
    this.$bus.$on("gameStart", () => {
      this.chessboardMatriz = Array(8)
        .fill(null)
        .map(() =>
          Array(8).fill(
            Object.assign(
              {},
              {
                content: "",
                color: "",
              }
            )
          )
        );
      this.$initialPieces.forEach((e) => {
        this.addPiece(e.row, e.col, e.color, e.piece);
      });
    });
    this.$bus.$on(
      "switchSelection",
      () => (this.isPieceSelected = !this.isPieceSelected)
    );
    this.$bus.$on("piecePosition", (data) => {
      this.piecePosition = data.position;
      this.pieceData = data.data;
    });
    this.$bus.$on("positionToMove", (data) => {
      this.positionToMove = data.position;
      this.dataOfpositionToMove = data.data;
      this.isPieceSelected = false;
      let dataToSend = {
        start: this.piecePosition,
        end: this.positionToMove,
        pieceData: this.pieceData,
        positionData: this.dataOfpositionToMove,
      };
      //se envia por difierentes eventos para no saturar el eventbus
      if (this.pieceData.content == "Bishop")
        this.$bus.$emit("positionsToMoveBishop", dataToSend);
      if (this.pieceData.content == "Knight")
        this.$bus.$emit("positionsToMoveKnight", dataToSend);
      if (this.pieceData.content == "Queen")
        this.$bus.$emit("positionsToMoveQueen", dataToSend);
      if (this.pieceData.content == "Rook")
        this.$bus.$emit("positionsToMoveRook", dataToSend);
      if (this.pieceData.content == "King")
        this.$bus.$emit("positionsToMoveKing", dataToSend);
      if (this.pieceData.content == "Pawn")
        this.$bus.$emit("positionsToMovePawn", dataToSend);
    });
    this.$bus.$on("executeMovement", (data) => {
      this.chessboardMatriz[data.start[1]].splice(
        data.start[0],
        1,
        Object.assign(
          {},
          {
            content: "",
            color: "",
          }
        )
      );
      this.chessboardMatriz[data.end[1]].splice(
        data.end[0],
        1,
        Object.assign(
          {},
          {
            content: data.pieceData.content,
            color: data.pieceData.color,
          }
        )
      );
      this.piecePosition = [];
      this.pieceData = {};
      this.positionToMove = [];
      this.dataOfpositionToMove = {};
    });
  },
  props: {},
  methods: {
    addPiece(row, col, color, piece) {
      this.chessboardMatriz[col].splice(
        row,
        1,
        Object.assign(
          {},
          {
            content: piece,
            color: color,
          }
        )
      );
    },
  },
};
</script>

<style lang="scss" scoped></style>
