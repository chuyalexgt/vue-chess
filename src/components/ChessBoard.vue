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
      chessboardMatriz: Array(8)
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
    };
  },
  created (){
    this.$bus.$on("gameStart",()=>{
      let initialPieces = this.$initialPieces
      initialPieces.forEach(e => {
        this.addPiece(e.row,e.col,e.color,e.piece)
      });
    })
  },
  props: {},
  methods: {
    addPiece(row, col, color, piece) {
      this.chessboardMatriz[col].splice(row,1, Object.assign(
        {},
        {
          content: piece,
          color: color,
        }
      ));
    },

  },
};
</script>

<style lang="scss" scoped></style>
