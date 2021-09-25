<template>
  <div @click="pieceSelected">
    <v-img :src="iconRender" max-width="48px" max-height="48px"></v-img>
  </div>
</template>

<script>
import black from "../Sprites/blackBishop.png";
import white from "../Sprites/whiteBishop.png";

export default {
  name: "Bishop",
  data() {
    return {};
  },
  props: {
    teamColor: {
      type: String,
      require: true,
    },
    x: {
      type: Number,
      require: true,
    },
    y: {
      type: Number,
      require: true,
    },
    contain: {
      type: Object,
      require: true,
    },
  },
  created() {
    this.$bus.$on("positionSelected", (data) => {
      if ((data[3][0] != this.x) & (data[3][1] != this.y)) return;
      if (data[2].color === this.teamColor) {
        console.log("posicion no valida");
        return;
      }
      console.log("posicion  valida");

      this.$bus.$emit("disableSelection");
    });
  },
  methods: {
    pieceSelected() {
      this.$bus.$emit("pieceSelected", [this.x, this.y]);
    },
    canMove() {},
  },
  computed: {
    iconRender() {
      if (this.teamColor == "black") return black;
      if (this.teamColor == "white") return white;
    },
  },
};
</script>

<style lang="scss" scoped></style>
