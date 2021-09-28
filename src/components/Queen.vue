<template>
  <div>
    <v-img :src="iconRender" max-width="48px" max-height="48px"></v-img>
  </div>
</template>

<script>
import black from "../Sprites/blackQueen.png";
import white from "../Sprites/whiteQueen.png";

export default {
  name: "Queen",
  data() {
    return {
      diagonalDontFlyValidation: false,
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
    this.$bus.$on("positionsToMoveQueen", (data) => {
      //movimiento de arfil
      if ((data.start[0] == this.x) & (data.start[1] == this.y)) {
        //Si es la ficha que seleccionaste...
        this.queenMovement(data);
      }
    });
  },
  methods: {
    queenMovement(data) {
      let diagonalValidation =
        Math.abs(data.start[0] - data.end[0]) === Math.abs(data.start[1] - data.end[1]);
      let linearValidation =
        ((data.start[0] != data.end[0]) & (data.start[1] == data.end[1])) |
        ((data.start[0] == data.end[0]) & (data.start[1] != data.end[1]));
      let dontKillFriends = data.pieceData.color != data.positionData.color;
      if (diagonalValidation) {
        this.diagonalDontFlyValidation = this.diagonalDontFly(data); ///validacion para que no salte otras piezas
        if (diagonalValidation & dontKillFriends & this.diagonalDontFlyValidation) {
          this.diagonalDontFlyValidation = false;
          this.$bus.$emit("executeMovement", data);
        } else {
          this.$bus.$emit("invalidMovement");
        }
      }
      if (linearValidation) {
        this.linearDontFlyValidation = this.linearDontFly(data); ///validacion para que no salte otras piezas
        if (linearValidation & dontKillFriends & this.linearDontFlyValidation) {
          this.linearDontFlyValidation = false;
          this.$bus.$emit("executeMovement", data);
        } else {
          this.$bus.$emit("invalidMovement");
        }
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
