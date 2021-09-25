<template>
  <v-card
    width="40vw"
    height="40vw"
    color="brown lighten-4"
    class="d-flex justify-space-around"
  >
    <v-card v-for="(c, index) in this.$chessboardMatriz" :key="index" width="12.5%">
      <ChessboardSlot
        v-for="(cell, index2) in c"
        :key="index2"
        :colIndex = "index"
        :cell = "cell"
        :rowIndex = "index2"
      />
    </v-card>
  </v-card>
</template>

<script>
export default {
  name: "ChessBoard",
  created() {},
  data() {
    return {

    };
  },
  props: {},
  methods: {

}
}
</script>

<style lang="scss" scoped></style>
