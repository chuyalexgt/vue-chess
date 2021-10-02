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
          <p class="font-weight-black subtitle-1" v-if="showGameOver">El Jugador {{winner}} ha ganado la partida</p>
          <PlayerTurnIndicator />
        </v-card-text>
        <v-card-actions class="d-flex justify-center align-center">
          <v-btn
            @click="startGame"
            class="my-10 pa-5"
            elevation="10"
            color="brown lighten-3"
            rounded
            large
            >Iniciar Partida</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-card
      flat
      color="rgba(0,0,0,0)"
      class="d-flex flex-column justify-center align-center my-5"
    >
      <ChessBoard />
      <v-btn
        @click="startGame"
        class="my-10"
        elevation="10"
        color="brown lighten-3"
        rounded
        large
        >Reiniciar Partida</v-btn
      >
    </v-card>
  </v-app>
</template>

<script>
import mainMenu from "./assets/main-menu.png";
export default {
  name: "App",

  data: () => ({
    showStartMenu: true,
    showGameOver: false,
    dialogState: true,
    winner : "",
    mainMenu,
  }),
  methods: {
    startGame() {
      this.$bus.$emit("gameStart");
      this.showStartMenu = false;
      this.showGameOver = false;
      this.dialogState = false;
    },
  },
  created() {
    this.$bus.$on("showWinner", (looser) => {
      this.showGameOver = true;
      this.dialogState = true;
      (looser == "black")? this.winner = "1":null
      (looser == "white")? this.winner = "2":null
    });
  },
};
</script>
<style lang="scss">
#app {
  background: url(./assets/wooden-background.png) no-repeat center center fixed;
}
</style>
