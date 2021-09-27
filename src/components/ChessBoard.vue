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
      />
    </v-card>
  </v-card>
</template>

<script>
export default {
  name: "ChessBoard",
  data() {
    return {
      chessboardMatriz: Array(8)             ///Formato [col][row]
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
      let initialPieces = this.$initialPieces;
      initialPieces.forEach((e) => {
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
      (this.dataOfpositionToMove = data.data);
      this.$bus.$emit("positionsToMovePiece", {
        start: this.piecePosition,
        end: this.positionToMove,
        pieceData: this.pieceData,
        positionData: this.dataOfpositionToMove,
      });
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
        Object.assign({}, data.pieceData)
      );
    });
    this.$bus.$on("diagonalDontFly", (data) => {
      let start = data.start;
      let end = data.end;
      let colission = false;
      let stepLenght = Math.abs(start[0] - end[0]);
      if ((start[0] <= end[0]) & (start[1] <= end[1])) {
        //mov. en cuadrante 1
        for (let i = 1; i < stepLenght; i++) {
          if (this.chessboardMatriz[start[1] + i][start[0] + i].content != "") {
            colission = true;
          }
        }
      }
      if ((start[0] >= end[0]) & (start[1] <= end[1])) {
        //mov. en cuadrante 2
        for (let i = 1; i < stepLenght; i++) {
          if (this.chessboardMatriz[start[1] + i][start[0] - i].content != "") {
            colission = true;
          }
        }
      }
      if ((start[0] >= end[0]) & (start[1] >= end[1])) {
        //mov. en cuadrante 3
        for (let i = 1; i < stepLenght; i++) {
          if (this.chessboardMatriz[start[1] - i][start[0] - i].content != "") {
            colission = true;
          }
        }
      }
      if ((start[0] <= end[0]) & (start[1] >= end[1])) {
        //mov. en cuadrante 4
        for (let i = 1; i < stepLenght; i++) {
          if (this.chessboardMatriz[start[1] - i][start[0] + i].content != "") {
            colission = true;
          }
        }
      }
      if (!colission) this.$bus.$emit("dontFlyD");
    });
    this.$bus.$on("linearDontFly", (data) => {
      let start = data.start;
      let end = data.end;
      let colission = false;
      let xdiferential = Math.abs(start[0] - end [0])
      let ydiferential = Math.abs(start[1] - end [1])

      if ((start[0] <= end[0]) & (start[1] == end[1])) {
        //mov. en x
        for (let i = 1; i < xdiferential; i++) {
          if (this.chessboardMatriz[start[1]][start[0] + i].content != "") {
            colission = true;
          }
        }
      }
      if ((start[0] == end[0]) & (start[1] <= end[1])) {
        //mov. en y
        for (let i = 1; i < ydiferential; i++) {
          if (this.chessboardMatriz[start[1] + i][start[0]].content != "") {
            colission = true;
          }
        }
      }
      if ((start[0] >= end[0]) & (start[1] == end[1])) {
        //mov. en -x
        for (let i = 1; i < xdiferential; i++) {
          if (this.chessboardMatriz[start[1]][start[0] - i].content != "") {
            colission = true;
          }
        }
      }
      if ((start[0] == end[0]) & (start[1] >= end[1])) {
        //mov. en -y
        for (let i = 1; i < ydiferential; i++) {
          if (this.chessboardMatriz[start[1] - i][start[0]].content != "") {
            colission = true;
          }
        }
      }
      if (!colission) this.$bus.$emit("dontFlyL");
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
