<template>
  <v-app>
    <v-card width="100vw" height="100vh" class="d-flex justify-center align-center">
      <ChessBoard />
    </v-card>
    <v-btn @click="$addPiece(1, 1, 'white', 'Pawn')">click</v-btn>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
  methods: {},
};
</script>
