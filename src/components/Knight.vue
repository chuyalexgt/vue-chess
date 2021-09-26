<template>
  <div>
    <v-img :src="iconRender" max-width="48px" max-height="48px"></v-img>
  </div>
</template>

<script>
import black from "../Sprites/blackKnight.png";
import white from "../Sprites/whiteKnight.png";

export default {
  name: "Knight",
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
  },
  created() {
    this.$bus.$on("positionsToMovePiece", (data) => {
      //movimiento de caballo
      if ((data.start[0] == this.x) & (data.start[1] == this.y)) {
        //Si es la ficha que seleccionaste...
        this.knightMovement(data);
      }
    });
  },
  methods: {
    knightMovement(data) {
      let validation =
        ((Math.abs(data.start[0] - data.end[0]) == 2) &
          (Math.abs(data.start[1] - data.end[1]) == 1)) |
        ((Math.abs(data.start[0] - data.end[0]) == 1) &
          (Math.abs(data.start[1] - data.end[1]) == 2));
      let dontKillFriends = data.pieceData.color != data.positionData.data.color;
      if (validation & dontKillFriends) {
        this.$bus.$emit("executeMovement", data);
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
