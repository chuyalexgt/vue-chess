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
    chessboardMatriz: {
      type: Array,
      require: true,
    },
  },
  created() {
    this.$bus.$on("positionsToMoveBishop", (data) => {
      //movimiento de arfil
      if ((data.start[0] == this.x) & (data.start[1] == this.y)) {
        console.log("arfil");
        console.log(this.chessboardMatriz);

        //Si es la ficha que seleccionaste...
        this.diagonalMovement(data);
      }
    });
  },
  methods: {
    diagonalMovement(data) {
      let validation =
        Math.abs(data.start[0] - data.end[0]) === Math.abs(data.start[1] - data.end[1]);
      let dontKillFriends = data.pieceData.color != data.positionData.color;
      this.diagonalDontFlyValidation = this.diagonalDontFly(data); ///validacion para que no salte otras piezas
      if (validation & dontKillFriends & this.diagonalDontFlyValidation) {
        this.diagonalDontFlyValidation = false;

        this.$bus.$emit("executeMovement", data);

        console.log("mov. valido");
      } else {
        this.$bus.$emit("invalidMovement");

        console.log("mov. invalido");
      }
    },
    diagonalDontFly(data) {
      let start = data.start;
      let end = data.end;
      let colission = false;
      let stepLenght = Math.abs(start[0] - end[0]);
      if ((start[0] <= end[0]) & (start[1] <= end[1])) {
        //mov. en cuadrante 1
        for (let i = 1; i < stepLenght; i++) {
          if (this.chessboardMatriz[start[1] + i][start[0] + i].content != "") {
            colission = true;
          }
        }
      }
      if ((start[0] >= end[0]) & (start[1] <= end[1])) {
        //mov. en cuadrante 2
        for (let i = 1; i < stepLenght; i++) {
          if (this.chessboardMatriz[start[1] + i][start[0] - i].content != "") {
            colission = true;
          }
        }
      }
      if ((start[0] >= end[0]) & (start[1] >= end[1])) {
        //mov. en cuadrante 3
        for (let i = 1; i < stepLenght; i++) {
          if (this.chessboardMatriz[start[1] - i][start[0] - i].content != "") {
            colission = true;
          }
        }
      }
      if ((start[0] <= end[0]) & (start[1] >= end[1])) {
        //mov. en cuadrante 4
        for (let i = 1; i < stepLenght; i++) {
          if (this.chessboardMatriz[start[1] - i][start[0] + i].content != "") {
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
