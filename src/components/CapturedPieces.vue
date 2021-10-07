<template>
  <div>
    <v-icon  v-for="(p, index) in pieces" :key="index" :color="p.color">{{defineIcon(p)}}</v-icon>
  </div>
</template>

<script>
export default {
  name: "CapturedPieces",
  created() {},
  data() {
    return {};
  },
  props: {
    pieces: {
      type: Array,
      require: true,
    },
  },
  methods: {
    defineIcon(type) {
      if (type.content == "Pawn") return "mdi-chess-pawn";
      if (type.content == "Bishop") return "mdi-chess-bishop";
      if (type.content == "Knight") return "mdi-chess-knight";
      if (type.content == "King") return "mdi-chess-king";
      if (type.content == "Queen") return "mdi-chess-queen";
      if (type.content == "Rook") return "mdi-chess-rook";
    },
  },
};
</script>

<style lang="scss" scoped></style>
