<template>
  <v-card
    height="12.5%"
    class="d-flex justify-center align-center"
    elevation="1"
    :color="colorCalculate"
  >
    <Bishop
      v-if="cell.content === 'Bishop'"
      :teamColor="cell.color"
      :x="rowIndex"
      :y="colIndex"
    />
    <King
      v-if="cell.content === 'King'"
      :teamColor="cell.color"
      :x="rowIndex"
      :y="colIndex"
    />
    <Knight
      v-if="cell.content === 'Knight'"
      :teamColor="cell.color"
      :x="rowIndex"
      :y="colIndex"
    />
    <Pawn
      v-if="cell.content === 'Pawn'"
      :teamColor="cell.color"
      :x="rowIndex"
      :y="colIndex"
    />
    <Queen
      v-if="cell.content === 'Queen'"
      :teamColor="cell.color"
      :x="rowIndex"
      :y="colIndex"
    />
    <Rook
      v-if="cell.content === 'Rook'"
      :teamColor="cell.color"
      :x="rowIndex"
      :y="colIndex"
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
  },
  methods: {},
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
