<template>
  <v-card class="d-flex justify-center align-center">
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
    <v-dialog transition="dialog-bottom-transition" :value="coronationDialog" persistent>
      <v-card color="brown lighten-5">
        <v-toolbar color="brown darken-1" dark class="">
          <p class="dialog-title pt-4 pl-3">Coronacion</p>
        </v-toolbar>
        <v-card-text>
          <p class="dialog-text py-5 px-4 text-center">
            Seleciona una pieza para mejorar a tu peon
          </p>
          <v-row justify="center">
            <v-col cols="6" md="3">
              <button class="dialog-button" @click="executeCoronation('Bishop')">
                <v-card
                  elevation="3"
                  class="mx-5 my-2 d-flex justify-center align-center flex-column"
                >
                  <v-icon size="3rem" class="pa-4">mdi-chess-bishop</v-icon>
                  <p>Arfil</p>
                </v-card>
              </button>
            </v-col>
            <v-col cols="6" md="3">
              <button class="dialog-button" @click="executeCoronation('Queen')">
                <v-card
                  elevation="3"
                  class="mx-5 my-2 d-flex justify-center align-center flex-column"
                >
                  <v-icon size="3rem" class="pa-4">mdi-chess-queen</v-icon>
                  <p>Reina</p>
                </v-card>
              </button>
            </v-col>
            <v-col cols="6" md="3">
              <button class="dialog-button" @click="executeCoronation('Rook')">
                <v-card
                  elevation="3"
                  class="mx-5 my-2 d-flex justify-center align-center flex-column"
                >
                  <v-icon size="3rem" class="pa-4">mdi-chess-rook</v-icon>
                  <p>Torre</p>
                </v-card>
              </button>
            </v-col>
            <v-col cols="6" md="3">
              <button class="dialog-button" @click="executeCoronation('Knight')">
                <v-card
                  elevation="3"
                  class="mx-5 my-2 d-flex justify-center align-center flex-column"
                >
                  <v-icon size="3rem" class="pa-4">mdi-chess-knight</v-icon>
                  <p>Caballo</p>
                </v-card>
              </button>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
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
      coronationDialog: false,
      coronationSelection: "",
      coronationPosition: [],
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
    this.$bus.$on("coronation", (data) => {
      this.coronationPosition = data;
      this.coronationDialog = true;
      // this.chessboardMatriz[data[1]][data[0]].content = this.coronationSelection;
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
    executeCoronation(selection) {
      this.coronationDialog = false;
      this.chessboardMatriz[this.coronationPosition[1]][
        this.coronationPosition[1]
      ].content = selection;
      this.chessboardMatriz[this.coronationPosition[1]].unshift(
        this.chessboardMatriz[this.coronationPosition[1]].shift()
      );
      console.log(
        this.chessboardMatriz[this.coronationPosition[1]][this.coronationPosition[1]]
          .content
      );
      console.log(selection);
    },
  },
  computed: {
    teamIconRender() {
      console.log(this.blackTeam);
      console.log(this.whiteTeam);
      if (this.teamIconColor == "black") return blackTeam;
      if (this.teamIconColor == "white") return whiteTeam;
    },
  },
};
</script>

<style lang="scss" scoped>
.dialog-title {
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
  font-size: calc(1.2rem + 4px);
  letter-spacing: 1.5px;
}
.dialog-text {
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;

  font-size: calc(0.8rem + 4px);
}
.dialog-button {
  width: 100%;
}
</style>
