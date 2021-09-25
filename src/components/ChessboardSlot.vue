<template>
  <v-card
    height="12.5%"
    class="d-flex justify-center align-center"
    elevation="1"
    :color="colorCalculate"
    @click="selectPositionToMove(rowIndex, colIndex, cell)"
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
  created() {
    this.$bus.$on("pieceSelected", (data) => {
      this.readyToSelect = true;
      this.dataOfSelectedPiece = data;
    });
    this.$bus.$on("disableSelection",()=>{
      this.readyToSelect = false
    })
  },
  data() {
    return {
      readyToSelect: false,
      dataOfSelectedPiece: [],
    };
  },
  props: {
    rowIndex: Number,
    cell: Object,
    colIndex: Number,
  },
  methods: {
    selectPositionToMove(row, col, cellData) {
      if (!this.readyToSelect) return;
      if (
        (this.dataOfSelectedPiece[0] == this.rowIndex) &
        (this.dataOfSelectedPiece[1] == this.colIndex)
      )
        return;
      this.$bus.$emit("positionSelected", [col, row, cellData, this.dataOfSelectedPiece]);
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
