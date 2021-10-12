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
    this.$bus.$on("positionsToMoveQueen", (data) => {
      //movimiento de reina
      if ((data.start[0] == this.x) & (data.start[1] == this.y)) {
        //Si es la ficha que seleccionaste y la casilla a la que se quiere mover esta dentro del rango, ejecuta el movimiento
        if (this.chessboardMatriz[data.end[1]][data.end[0]].inRange)
          this.$bus.$emit("executeMovement", data);
        else this.$bus.$emit("invalidMovement");
      }
    });
    this.$bus.$on("rangeToMoveQueen", (position) => {
      if ((position[0] == this.x) & (position[1] == this.y)) {
        //Si es la ficha que seleccionaste...
        this.linearMovementRange(position);
        this.diagonalMovementRange(position);
      }
    });
    this.$bus.$on("preRangeOfQueen", (position, mode, color) => {
      if (this.teamColor == color) {
        this.linearMovementRange(position, mode);
        this.diagonalMovementRange(position, mode);
      }
    });
  },
  methods: {
    diagonalMovementRange(position, mode) {
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
      this.diagonalDontFly(position, xyMax, _xyMax, _x_yMax, x_yMax, mode); ///funcion para validar que no salten otras piezas y colorear las casillas a las que se puede mover
    },
    diagonalDontFly(position, xyMax, _xyMax, _x_yMax, x_yMax, mode) {
      let start = position;
      let cellsInRange = [];
      let cellsInPreRange = [];
      //mov. en cuadrante 4
      for (let i = 1; i <= x_yMax; i++) {
        mode == "preScan" ? cellsInPreRange.push([start[1] + i, start[0] + i]) : null;
        if (this.chessboardMatriz[start[1] + i][start[0] + i].color == this.teamColor)
          break;
        cellsInRange.push([start[1] + i, start[0] + i]);
        if (this.chessboardMatriz[start[1] + i][start[0] + i].content != "") break;
      }
      //mov. en cuadrante 1
      for (let i = 1; i <= xyMax; i++) {
        mode == "preScan" ? cellsInPreRange.push([start[1] + i, start[0] - i]) : null;
        if (this.chessboardMatriz[start[1] + i][start[0] - i].color == this.teamColor)
          break;
        cellsInRange.push([start[1] + i, start[0] - i]);
        if (this.chessboardMatriz[start[1] + i][start[0] - i].content != "") break;
      }
      //mov. en cuadrante 2
      for (let i = 1; i <= _xyMax; i++) {
        mode == "preScan" ? cellsInPreRange.push([start[1] - i, start[0] - i]) : null;
        if (this.chessboardMatriz[start[1] - i][start[0] - i].color == this.teamColor)
          break;
        cellsInRange.push([start[1] - i, start[0] - i]);
        if (this.chessboardMatriz[start[1] - i][start[0] - i].content != "") break;
      }
      //mov. en cuadrante 3
      for (let i = 1; i <= _x_yMax; i++) {
        mode == "preScan" ? cellsInPreRange.push([start[1] - i, start[0] + i]) : null;
        if (this.chessboardMatriz[start[1] - i][start[0] + i].color == this.teamColor)
          break;
        cellsInRange.push([start[1] - i, start[0] + i]);
        if (this.chessboardMatriz[start[1] - i][start[0] + i].content != "") break;
      }

      mode == "preScan"
        ? this.$bus.$emit("renderCellsInPreRange", cellsInPreRange)
        : this.$bus.$emit("renderCellsInRange", cellsInRange);
    },
    linearMovementRange(position, mode) {
      let xMax, yMax, _xMax, _yMax; //cada variable es la componente vertical/horizontal del plano
      xMax = Math.abs(position[1] - 7); //➡
      yMax = Math.abs(position[0] - 0); //⬆
      _xMax = Math.abs(position[1] - 0); //⬅
      _yMax = Math.abs(position[0] - 7); //⬇
      this.linearDontFly(position, xMax, yMax, _xMax, _yMax, mode); ///validacion para que no salte otras piezas colorear las casillas a las que se puede mover
    },
    linearDontFly(position, xMax, yMax, _xMax, _yMax, mode) {
      let start = position;
      let cellsInRange = [];
      let cellsInPreRange = [];
      //mov. en x
      for (let i = 1; i <= xMax; i++) {
        mode == "preScan" ? cellsInPreRange.push([start[1] + i, start[0]]) : null;
        if (this.chessboardMatriz[start[1] + i][start[0]].color == this.teamColor) break;
        cellsInRange.push([start[1] + i, start[0]]);
        if (this.chessboardMatriz[start[1] + i][start[0]].content != "") break;
      }
      //mov. en y
      for (let i = 1; i <= yMax; i++) {
        mode == "preScan" ? cellsInPreRange.push([start[1], start[0] - i]) : null;
        if (this.chessboardMatriz[start[1]][start[0] - i].color == this.teamColor) break;
        cellsInRange.push([start[1], start[0] - i]);
        if (this.chessboardMatriz[start[1]][start[0] - i].content != "") break;
      }
      //mov. en -x
      for (let i = 1; i <= _xMax; i++) {
        mode == "preScan" ? cellsInPreRange.push([start[1] - i, start[0]]) : null;
        if (this.chessboardMatriz[start[1] - i][start[0]].color == this.teamColor) break;
        cellsInRange.push([start[1] - i, start[0]]);
        if (this.chessboardMatriz[start[1] - i][start[0]].content != "") break;
      }
      //mov. en -y
      for (let i = 1; i <= _yMax; i++) {
        mode == "preScan" ? cellsInPreRange.push([start[1], start[0] + i]) : null;
        if (this.chessboardMatriz[start[1]][start[0] + i].color == this.teamColor) break;
        cellsInRange.push([start[1], start[0] + i]);
        if (this.chessboardMatriz[start[1]][start[0] + i].content != "") break;
      }

      mode == "preScan"
        ? this.$bus.$emit("renderCellsInPreRange", cellsInPreRange)
        : this.$bus.$emit("renderCellsInRange", cellsInRange);
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
