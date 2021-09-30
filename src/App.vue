<template>
  <v-app>
    <v-dialog :value="showStartMenu" persistent fullscreen>
      <v-card color="brown lighten-4">
        <v-toolbar color="brown darken-1" elevation="10"></v-toolbar>
        <v-card-text class="d-flex justify-center align-center flex-column">
          <v-img
            :src="mainMenu"
            width="30%"
            min-width="210"
            max-width="280"
            class="ma-10"
          />
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
    mainMenu,
  }),
  methods: {
    startGame() {
      this.$bus.$emit("gameStart");
      this.showStartMenu = false;
    },
  },
};
</script>
<style lang="scss">
#app {
  background: url(./assets/wooden-background.png) no-repeat center center fixed;
}
</style>
