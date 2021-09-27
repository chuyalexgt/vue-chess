<template>
  <div>
    <v-img :src="iconRender" max-width="48px" max-height="48px"></v-img>
  </div>
</template>

<script>
import black from "../Sprites/blackRook.png";
import white from "../Sprites/whiteRook.png";

export default {
  name: "Rook",
  data() {
    return {
      linearDontFlyValidation: false,
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
    chessboardMatriz: {
      type: Array,
      require: true,
    },
  },
  created() {
    this.$bus.$on("positionsToMovePiece", (data) => {
      //movimiento de torre
      if ((data.start[0] == this.x) & (data.start[1] == this.y)) {
        //Si es la ficha que seleccionaste...
        this.linearMovement(data);
      }
    });
  },
  methods: {
    linearMovement(data) {
      let validation =
        ((data.start[0] != data.end[0]) & (data.start[1] == data.end[1])) |
        ((data.start[0] == data.end[0]) & (data.start[1] != data.end[1]));
      let dontKillFriends = data.pieceData.color != data.positionData.color;
      this.linearDontFlyValidation = this.linearDontFly(data); ///validacion para que no salte otras piezas
      if (validation & dontKillFriends & this.linearDontFlyValidation) {
        this.linearDontFlyValidation = false;
        this.$bus.$emit("executeMovement", data);
        console.log("mov. valido");
      } else {
        this.$bus.$emit("invalidMovement");
        console.log("mov. invalido");
      }
    },
    linearDontFly(data) {
      let start = data.start;
      let end = data.end;
      let colission = false;
      let xdiferential = Math.abs(start[0] - end[0]);
      let ydiferential = Math.abs(start[1] - end[1]);

      if ((start[0] <= end[0]) & (start[1] == end[1])) {
        //mov. en x
        for (let i = 1; i < xdiferential; i++) {
          if (this.chessboardMatriz[start[1]][start[0] + i].content != "") {
            colission = true;
          }
        }
      }
      if ((start[0] == end[0]) & (start[1] <= end[1])) {
        //mov. en y
        for (let i = 1; i < ydiferential; i++) {
          if (this.chessboardMatriz[start[1] + i][start[0]].content != "") {
            colission = true;
          }
        }
      }
      if ((start[0] >= end[0]) & (start[1] == end[1])) {
        //mov. en -x
        for (let i = 1; i < xdiferential; i++) {
          if (this.chessboardMatriz[start[1]][start[0] - i].content != "") {
            colission = true;
          }
        }
      }
      if ((start[0] == end[0]) & (start[1] >= end[1])) {
        //mov. en -y
        for (let i = 1; i < ydiferential; i++) {
          if (this.chessboardMatriz[start[1] - i][start[0]].content != "") {
            colission = true;
          }
        }
      }
      if (!colission) return true;
      else return false;
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
