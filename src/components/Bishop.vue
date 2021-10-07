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
        //Si es la ficha que seleccionaste y la casilla a la que se quiere mover esta dentro del rango, ejecuta el movimiento
        if (this.chessboardMatriz[data.end[1]][data.end[0]].inRange)
          this.$bus.$emit("executeMovement", data);
        else this.$bus.$emit("invalidMovement");
      }
    });
    this.$bus.$on("rangeToMoveBishop", (position) => {
      if ((position[0] == this.x) & (position[1] == this.y)) {
        //Si es la ficha que seleccionaste...
        this.diagonalMovementRange(position);
      }
    });
  },
  methods: {
    diagonalMovementRange(position) {
      let xyMax, _xyMax, _x_yMax, x_yMax; //el _ representa signo -, cada variable es la componente diagonal de cada cuadrante
      Math.abs(position[0] - 0) <= Math.abs(position[1] - 7) //se calcula el valor maximo de la componente diagonal de cada cuadrante
        ? (xyMax = Math.abs(position[0] - 0))
        : (xyMax = Math.abs(position[1] - 7));
      Math.abs(position[0] - 0) <= Math.abs(position[1] - 0)
        ? (_xyMax = Math.abs(position[0] - 0))
        : (_xyMax = Math.abs(position[1] - 0));
      Math.abs(position[0] - 7) <= Math.abs(position[1] - 0)
        ? (_x_yMax = Math.abs(position[0] - 7))
        : (_x_yMax = Math.abs(position[1] - 0));
      Math.abs(position[0] - 7) <= Math.abs(position[1] - 7)
        ? (x_yMax = Math.abs(position[0] - 7))
        : (x_yMax = Math.abs(position[1] - 7));
      // let dontKillFriends = data.pieceData.color != data.positionData.color;
      this.diagonalDontFly_beta(position, xyMax, _xyMax, _x_yMax, x_yMax); ///funcion para validar que no salten otras piezas y colorear las casillas a las que se puede mover
    },
    diagonalDontFly_beta(position, xyMax, _xyMax, _x_yMax, x_yMax) {
      let start = position;
      let cellsInRange = [];
      //mov. en cuadrante 4
      for (let i = 1; i <= x_yMax; i++) {
        if (this.chessboardMatriz[start[1] + i][start[0] + i].color == this.teamColor)
          break;
        cellsInRange.push([start[1] + i, start[0] + i]);
        if (this.chessboardMatriz[start[1] + i][start[0] + i].content != "") break;
      }
      //mov. en cuadrante 1
      for (let i = 1; i <= xyMax; i++) {
        if (this.chessboardMatriz[start[1] + i][start[0] - i].color == this.teamColor)
          break;
        cellsInRange.push([start[1] + i, start[0] - i]);
        if (this.chessboardMatriz[start[1] + i][start[0] - i].content != "") break;
      }
      //mov. en cuadrante 2
      for (let i = 1; i <= _xyMax; i++) {
        if (this.chessboardMatriz[start[1] - i][start[0] - i].color == this.teamColor)
          break;
        cellsInRange.push([start[1] - i, start[0] - i]);
        if (this.chessboardMatriz[start[1] - i][start[0] - i].content != "") break;
      }
      //mov. en cuadrante 3
      for (let i = 1; i <= _x_yMax; i++) {
        if (this.chessboardMatriz[start[1] - i][start[0] + i].color == this.teamColor)
          break;
        cellsInRange.push([start[1] - i, start[0] + i]);
        if (this.chessboardMatriz[start[1] - i][start[0] + i].content != "") break;
      }
      this.$bus.$emit("renderCellsInRange", cellsInRange);
    },
    //////////////////////////////////////////////////////
    // diagonalMovement(data) {
    //   let validation =
    //     Math.abs(data.start[0] - data.end[0]) === Math.abs(data.start[1] - data.end[1]);
    //   let dontKillFriends = data.pieceData.color != data.positionData.color;
    //   this.diagonalDontFlyValidation = this.diagonalDontFly(data); ///validacion para que no salte otras piezas
    //   if (validation & dontKillFriends & this.diagonalDontFlyValidation) {
    //     this.diagonalDontFlyValidation = false;

    //     this.$bus.$emit("executeMovement", data);
    //   } else {
    //     this.$bus.$emit("invalidMovement");
    //   }
    // },
    // diagonalDontFly(data) {
    //   let start = data.start;
    //   let end = data.end;
    //   let colission = false;
    //   let stepLenght = Math.abs(start[0] - end[0]);
    //   if ((start[0] <= end[0]) & (start[1] <= end[1])) {
    //     //mov. en cuadrante 1
    //     for (let i = 1; i < stepLenght; i++) {
    //       if (this.chessboardMatriz[start[1] + i][start[0] + i].content != "") {
    //         colission = true;
    //       }
    //     }
    //   }
    //   if ((start[0] >= end[0]) & (start[1] <= end[1])) {
    //     //mov. en cuadrante 2
    //     for (let i = 1; i < stepLenght; i++) {
    //       if (this.chessboardMatriz[start[1] + i][start[0] - i].content != "") {
    //         colission = true;
    //       }
    //     }
    //   }
    //   if ((start[0] >= end[0]) & (start[1] >= end[1])) {
    //     //mov. en cuadrante 3
    //     for (let i = 1; i < stepLenght; i++) {
    //       if (this.chessboardMatriz[start[1] - i][start[0] - i].content != "") {
    //         colission = true;
    //       }
    //     }
    //   }
    //   if ((start[0] <= end[0]) & (start[1] >= end[1])) {
    //     //mov. en cuadrante 4
    //     for (let i = 1; i < stepLenght; i++) {
    //       if (this.chessboardMatriz[start[1] - i][start[0] + i].content != "") {
    //         colission = true;
    //       }
    //     }
    //   }
    //   if (!colission) return true;
    //   else return false;
    // },
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
