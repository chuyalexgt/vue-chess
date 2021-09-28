<template>
  <div>
    <v-img :src="iconRender" max-width="48px" max-height="48px"></v-img>
  </div>
</template>

<script>
import black from "../Sprites/blackKing.png";
import white from "../Sprites/whiteKing.png";

export default {
  name: "King",
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
    chessboardMatriz: {
      type: Array,
      require: true,
    },
  },
  created() {
    this.$bus.$on("positionsToMoveKing", (data) => {
      //movimiento de Rey
      if ((data.start[0] == this.x) & (data.start[1] == this.y)) {
        //Si es la ficha que seleccionaste...
        this.kingMovement(data);
      }
    });
  },
  methods: {
    kingMovement(data) {
      let diagonalValidation =
        (Math.abs(data.start[0] - data.end[0]) === 1) &
        (Math.abs(data.start[1] - data.end[1]) === 1);
      let linearValidation =
        ((data.start[0] != data.end[0]) &
          (data.start[1] == data.end[1]) &
          (Math.abs(data.start[0] - data.end[0]) === 1)) |
        ((data.start[0] == data.end[0]) &
          (data.start[1] != data.end[1]) &
          (Math.abs(data.start[1] - data.end[1]) === 1));
      let dontKillFriends = data.pieceData.color != data.positionData.color;
      if (diagonalValidation) {
        if (diagonalValidation & dontKillFriends) {
          this.diagonalDontFlyValidation = false;
          this.$bus.$emit("executeMovement", data);
        } else {
          this.$bus.$emit("invalidMovement");
        }
      }
      if (linearValidation) {
        if (linearValidation & dontKillFriends) {
          this.linearDontFlyValidation = false;
          this.$bus.$emit("executeMovement", data);
        } else {
          this.$bus.$emit("invalidMovement");
        }
      }
    },
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
