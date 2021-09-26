<template>
  <div>
    <v-img :src="iconRender" max-width="48px" max-height="48px"></v-img>
  </div>
</template>

<script>
import black from "../Sprites/blackBishop.png";
import white from "../Sprites/whiteBishop.png";

export default {
  name: "Bishop",
  data() {
    return {
      diagonalDontFlyValidation: false,
    };
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
  },
  created() {
    this.$bus.$on("positionsToMovePiece", (data) => {
      this.$bus.$on("dontFly", () => this.diagonalDontFlyValidation = true)
      //movimiento de arfil
      if ((data.start[0] == this.x) & (data.start[1] == this.y)) {
        //Si es la ficha que seleccionaste...
        this.diagonalMovement(data);
      }
    });
  },
  methods: {
    diagonalMovement(data) {
      let validation =
        Math.abs(data.start[0] - data.end[0]) === Math.abs(data.start[1] - data.end[1]);
      let dontKillFriends = data.pieceData.color != data.positionData.data.color;
      if (validation & dontKillFriends) {
        this.$bus.$emit("diagonalDontFly", data); ///validacion para que no salte otras piezas
        if (this.diagonalDontFlyValidation) this.$bus.$emit("executeMovement", data);
      } else {
        this.$bus.$emit("invalidMovement");
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
