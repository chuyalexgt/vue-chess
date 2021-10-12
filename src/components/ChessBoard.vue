<template>
  <v-card class="d-flex justify-center align-center">
    <v-card
      :width="width"
      :height="width"
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
          :turnState="turnState"
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
      turnState: true,
      movAux: true,
      chessboardMatriz: Array(8) ///Formato [col][row]
        .fill(null)
        .map(() =>
          Array(8).fill(
            Object.assign(
              {},
              {
                content: "",
                color: "",
                inRange: false,
                preScan: false, /////esto es para detectar si el rey esta en jaque
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
      resetGame: true,
    };
  },
  created() {
    this.$initialPieces.forEach((e) => {
      this.addPiece(e.row, e.col, e.color, e.piece);
    });
    this.$bus.$on("renderCellsInRange", (cellsInRange) => {
      cellsInRange.forEach((e) => {
        this.chessboardMatriz[e[0]][e[1]] = {
          ...this.chessboardMatriz[e[0]][e[1]],
          inRange: true,
        };
      }, this);
    });
    this.$bus.$on("renderCellsInPreRange", (cellsInPreRange) => {
      cellsInPreRange.forEach((e) => {
        this.chessboardMatriz[e[0]][e[1]] = {
          ...this.chessboardMatriz[e[0]][e[1]],
          preScan: true,
        };
      }, this);
    });
  },
  mounted() {
    this.$bus.$on("gameStart", () => {
      this.isPieceSelected = false;
      this.turnState = true;
      this.resetGame = !this.resetGame;
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
      if (this.movAux) {
        //previene que se ejecute varias veces el evento en un solo turno
        this.movAux = false;
        this.clearRange();
        if (this.chessboardMatriz[data.end[1]][data.end[0]].color != "") {
          this.$bus.$emit("addToCaptured", {
            content: this.chessboardMatriz[data.end[1]][data.end[0]].content,
            color: this.chessboardMatriz[data.end[1]][data.end[0]].color,
          });
        }
        this.chessboardMatriz[data.start[1]].splice(
          data.start[0],
          1,
          Object.assign(
            {},
            {
              content: "",
              color: "",
              inRange: false,
              preScan: false,
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
              inRange: false,
              preScan: false,
            }
          )
        );
        this.piecePosition = [];
        this.pieceData = {};
        this.positionToMove = [];
        this.dataOfpositionToMove = {};
        data.pieceData.color == "white" //swicheo los turnos asi para evitar que se repitan
          ? (this.turnState = false)
          : data.pieceData.color == "black"
          ? (this.turnState = true)
          : null;
        this.$bus.$emit("addMovementData", data);
        this.$bus.$emit("playerTurn", this.turnState);
      }
    });
    this.$bus.$on("coronation", (data) => {
      this.coronationPosition = data;
      this.coronationDialog = true;
    });
    this.$bus.$on("invalidMovement", this.clearRange);
  },
  props: {},
  watch: {
    chessboardMatriz: {
      handler(val) {
        //comprobar si el rey blanco sigue vivo
        let whiteKingIsAlive = val.some((e) => {
          return e.some((cell) => {
            return (cell.content == "King") & (cell.color == "white");
          });
        });
        let blackKingIsAlive = val.some((e) => {
          return e.some((cell) => {
            return (cell.content == "King") & (cell.color == "black");
          });
        });
        whiteKingIsAlive ? null : this.gameOver("white");
        blackKingIsAlive ? null : this.gameOver("black");
      },
    },
    turnState() {
      this.movAux = true;
      let teamToPreScan;
      this.turnState ? (teamToPreScan = "black") : (teamToPreScan = "white"); ///se hace un pre escaneo del equipo contrario
      this.initPreScan(teamToPreScan);
    },
    resetGame() {
      this.chessboardMatriz = this.chessboardMatriz.map((e) => {
        e = e.map((cell) => {
          cell.content = "";
          cell.color = "";
          cell.inRange = false;
          cell.preScan = false
          return cell;
        });
        return e;
      });
      this.$initialPieces.forEach((e) => {
        this.addPiece(e.row, e.col, e.color, e.piece);
      });
    },
  },
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
            inRange: false,
          }
        )
      );
    },
    executeCoronation(selection) {
      this.coronationDialog = false;
      this.chessboardMatriz[this.coronationPosition[1]][
        this.coronationPosition[0]
      ].content = selection;
      this.chessboardMatriz[this.coronationPosition[1]].unshift(
        this.chessboardMatriz[this.coronationPosition[1]].shift()
      );
    },
    gameOver(looser) {
      this.coronationDialog = false;
      this.$bus.$emit("showWinner", looser);
    },
    clearRange() {
      this.chessboardMatriz = this.chessboardMatriz.map((e) => {
        e = e.map((cell) => {
          cell = Object.assign(
            {},
            {
              content: cell.content,
              color: cell.color,
              inRange: false,
              preScan: false,
            }
          );
          return cell;
        });
        return e;
      });
    },
    initPreScan(team) {
      let position = []; //x,y
      for (let i = 0; i <= 7; i++) {
        this.chessboardMatriz[i].filter((e, index) => {
          if (e.color == team) {
            position = [index, i]; //si es una ficha enemiga, manda a hacer el pre escaneo
            if (e.content == "Bishop")
              this.$bus.$emit("preRangeOfBishop", position, "preScan", team);
            if (e.content == "Knight")
              this.$bus.$emit("preRangeOfKnight", position, "preScan", team);
            if (e.content == "Queen")
              this.$bus.$emit("preRangeOfQueen", position, "preScan", team);
            if (e.content == "Rook")
              this.$bus.$emit("preRangeOfRook", position, "preScan", team);
            if (e.content == "King")
              this.$bus.$emit("preRangeOfKing", position, "preScan", team);
            if (e.content == "Pawn"){
              this.$bus.$emit("preRangeOfPawn", position, "preScan",team);
            }
          }
        });
      }
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
          return "40vw";
        case "lg":
          return "40vw";
        case "xl":
          return "40vw";
      }
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
