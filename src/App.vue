<template>
  <v-app>
    <v-card width="100vw" height="100vh" class="d-flex justify-center align-center">
      <ChessBoard />
    </v-card>
    <v-btn @click="startGame" v-if="showStartButton">Iniciar Partida</v-btn>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    showStartButton: true
  }),
  methods: {
    startGame (){
      this.$bus.$emit("gameStart")
      // this.showStartButton = false 
    }
  },
};
</script>
