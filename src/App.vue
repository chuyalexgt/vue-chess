<template>
  <v-app>
    <v-dialog :value="dialogState" persistent fullscreen>
      <v-card color="brown lighten-4">
        <v-toolbar color="brown darken-1" elevation="10" v-if="showStartMenu" dark
          >Menu Inicial</v-toolbar
        >
        <v-toolbar color="brown darken-1" elevation="10" v-if="showGameOver" dark
          >Partida Finalizada</v-toolbar
        >
        <v-card-text class="d-flex justify-center align-center flex-column">
          <v-img
            :src="mainMenu"
            width="30%"
            min-width="210"
            max-width="280"
            class="ma-10"
          />
          <p class="font-weight-black subtitle-1" v-if="showGameOver">
            El Jugador {{ winner }} ha ganado la partida
          </p>
          <PlayerTurnIndicator />
        </v-card-text>
        <v-card-actions class="d-flex justify-center align-center">
          <v-btn
            v-if="showStartMenu"
            @click="startGame"
            class="my-10 pa-5"
            elevation="10"
            color="brown lighten-3"
            rounded
            large
            >Iniciar Partida</v-btn
          >
          <v-btn
            v-if="showGameOver"
            @click="toHome()"
            class="my-10 pa-5"
            elevation="10"
            color="brown lighten-3"
            rounded
            large
            >Regresar al menu</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-card
      flat
      color="rgba(0,0,0,0)"
      class="d-flex justify-center align-center my-4"
      :class="UI_distribution"
    >
      <ChessBoard />
      <div class="pa-5 ma-5 | background_UI">
        <v-alert type="error" class="my-3" v-if="invalidMovement"
          >Movimiento invalido</v-alert
        >
        <v-alert type="error" class="my-3" v-if="wrongTurn">Aun no es tu turno</v-alert>
        <v-row>
          <v-col>
            <v-banner class="text-center">
              TURNO
              <v-chip color="white" class="px-5 my-1 elevation-10" v-if="turnState"
                >Jugador 1</v-chip
              >
              <v-chip color="black" dark class="px-5 my-1 elevation-10" v-if="!turnState"
                >Jugador 2</v-chip
              >
            </v-banner>
          </v-col>
          <v-col class="d-flex justify-center align-center">
            <v-chip outlined class="px-5 my-1 | font-weight-black" color="brown darken-3"
              ><v-icon left>mdi-clock</v-icon>{{ minutesS + ":" + secondsS }}</v-chip
            ></v-col
          >
        </v-row>
        <v-row>
          <v-col>
            <MovementsTable :movements="movementsList" />
          </v-col>
        </v-row>
        <v-row class="d-flex justify-center">
          <v-col>
            <CapturedPieces :pieces="whiteCaptured" />
          </v-col>
          <v-col>
            <v-btn
              @click="toHome()"
              class="my-10"
              elevation="10"
              color="brown lighten-3"
              rounded
              large
              >Reiniciar Partida</v-btn
            >
          </v-col>
          <v-col>
            <CapturedPieces :pieces="blackCaptured" />
          </v-col>
        </v-row>
      </div>
    </v-card>
  </v-app>
</template>

<script>
import mainMenu from "./assets/main-menu.png";
export default {
  name: "App",

  data() {
    return {
      showStartMenu: true,
      showGameOver: false,
      dialogState: true,
      winner: "",
      mainMenu,
      invalidMovement: false,
      wrongTurn: false,
      minutes: 0,
      seconds: 0,
      turnState: true,
      movementsListState: true, //la uso para evitar que se agreguen varios movimiento clonados
      capturedListState: true,
      movementsList: [],
      whiteCaptured: [],
      blackCaptured: [],
    };
  },
  watch: {
    turnState() {
      this.movementsListState = true;
      this.capturedListState = true;
    },
  },
  computed: {
    secondsS() {
      if (this.seconds < 10) return "0" + `${this.seconds}`;
      return `${this.seconds}`;
    },
    minutesS() {
      if (this.minutes < 10) return "0" + `${this.minutes}`;
      return `${this.minutes}`;
    },
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
    UI_distribution() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "flex-column";
        case "sm":
          return "flex-column";
        case "md":
          return "flex-column";
        case "lg":
          return "flex-row";
        case "xl":
          return "flex-row";
      }
    },
  },
  methods: {
    startGame() {
      this.$bus.$emit("gameStart");
      this.showStartMenu = false;
      this.showGameOver = false;
      this.dialogState = false;
      this.seconds = 0;
      this.minutes = 0;
      this.movementsList = [];
      this.turnState = true;
      this.whiteCaptured = [];
      this.blackCaptured = [];
    },
    timer() {
      if (this.seconds + 1 == 60) {
        this.minutes++;

        this.seconds = 0;
      } else {
        this.seconds++;
      }
      setTimeout(() => {
        this.timer();
      }, 1000);
    },
    toHome() {
      location.reload();
    },
  },
  created() {
    this.$bus.$on("playerTurn", (data) => {
      this.turnState = data;
    });
    this.$bus.$on("addMovementData", (data) => {
      if (this.movementsListState) {
        this.movementsListState = false;
        this.movementsList.unshift(data);
      }
    });
    this.$bus.$on("addToCaptured", (data) => {
      if (this.capturedListState) {
        this.capturedListState = false;
        if (data.color == "white") this.whiteCaptured.push(data);
        if (data.color == "black") this.blackCaptured.push(data);
      }
    });
    ///////////////////////////////////////////////////////////
    this.timer();
    this.$bus.$on("showWinner", (looser) => {
      this.showGameOver = true;
      this.dialogState = true;
      looser == "black"
        ? (this.winner = "1")
        : looser == "white"
        ? (this.winner = "2")
        : null;
    });
    this.$bus.$on("invalidMovement", () => {
      this.invalidMovement = true;
      setTimeout(() => (this.invalidMovement = false), 1000);
    });
    this.$bus.$on("wrongTurnIndicator", () => {
      this.wrongTurn = true;
      setTimeout(() => (this.wrongTurn = false), 1500);
    });
  },
};
</script>
<style lang="scss">
#app {
  background: url(./assets/wooden-background.png) repeat center center fixed;
}
*::-webkit-scrollbar {
  width: 0.5rem;
}
*::-webkit-scrollbar-track {
  background-color: #cfb784;
}
*::-webkit-scrollbar-thumb {
  border-radius: 7px;
  width: 0.6rem;
  background-color: #a08357;
}
.alert-position {
  position: absolute;
  top: 50vh;
  left: 35vw;
  z-index: 9999;
  width: 30vw;
}
.background_UI {
  border-radius: 41px;
  background-color: #cfb78494;
  box-shadow: inset 9px 9px 18px #c5ae7d, inset -9px -9px 18px #d9c08b;
}
.scroll {
  height: 280px;
  overflow-y: scroll;
  scroll-behavior: smooth;
}
</style>
