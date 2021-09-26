<template>
  <v-card
    height="12.5%"
    class="d-flex justify-center align-center"
    elevation="1"
    :color="colorCalculate"
    @click="movePiece()"
  >
    <Bishop
      v-if="cell.content === 'Bishop'"
      :teamColor="cell.color"
      :x="rowIndex"
      :y="colIndex"
      :contain="cell"
    />
    <King
      v-if="cell.content === 'King'"
      :teamColor="cell.color"
      :x="rowIndex"
      :y="colIndex"
      :contain="cell"
    />
    <Knight
      v-if="cell.content === 'Knight'"
      :teamColor="cell.color"
      :x="rowIndex"
      :y="colIndex"
      :contain="cell"
    />
    <Pawn
      v-if="cell.content === 'Pawn'"
      :teamColor="cell.color"
      :x="rowIndex"
      :y="colIndex"
      :contain="cell"
    />
    <Queen
      v-if="cell.content === 'Queen'"
      :teamColor="cell.color"
      :x="rowIndex"
      :y="colIndex"
      :contain="cell"
    />
    <Rook
      v-if="cell.content === 'Rook'"
      :teamColor="cell.color"
      :x="rowIndex"
      :y="colIndex"
      :contain="cell"
    />
  </v-card>
</template>

<script>
export default {
  name: "ChessboardSlot",
  created() {},
  data() {
    return {};
  },
  props: {
    rowIndex: Number,
    cell: Object,
    colIndex: Number,
    isPieceSelected: Boolean,
  },
  methods: {
    movePiece() {
      console.log(this.isPieceSelected);
      if (!this.isPieceSelected) {
        if (this.cell.content === "") return;
        this.$bus.$emit("piecePosition", {
          position: [this.rowIndex, this.colIndex],
          data: this.cell,
        });
        this.$bus.$emit("switchSelection");
        return;
      }
      if (this.isPieceSelected) {
        this.$bus.$emit("positionToMove", {
          position: [this.rowIndex, this.colIndex],
          data: this.cell,
        });
        this.$bus.$emit("switchSelection");
      }
    },
  },
  computed: {
    colorCalculate() {
      if (
        (((this.rowIndex + 1) % 2 == 0) & ((this.colIndex + 1) % 2 != 0)) |
        (((this.rowIndex + 1) % 2 != 0) & ((this.colIndex + 1) % 2 == 0))
      ) {
        return "grey darken-1";
      } else {
        return "grey lighten-4";
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
