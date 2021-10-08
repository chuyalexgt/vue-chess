<template>
  <div>
    <v-img :src="iconRender" max-width="48px" max-height="48px"></v-img>
  </div>
</template>

<script>
import black from "../Sprites/blackPawn.png";
import white from "../Sprites/whitePawn.png";

export default {
  name: "Pawn",
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
    this.$bus.$on("positionsToMovePawn", (data) => {
      //movimiento de peon
      if ((data.start[0] == this.x) & (data.start[1] == this.y)) {
        //Si es la ficha que seleccionaste y la casilla a la que se quiere mover esta dentro del rango, ejecuta el movimiento
        if (this.chessboardMatriz[data.end[1]][data.end[0]].inRange) {
          this.$bus.$emit("executeMovement", data);
          if (
            ((data.end[0] == 0) & (this.teamColor == "white")) |
            ((data.end[0] == 7) & (this.teamColor == "black"))
          )
            this.$bus.$emit("coronation", [data.end[0], data.end[1]]);
        } else this.$bus.$emit("invalidMovement");
      }
    });
    this.$bus.$on("rangeToMovePawn", (position) => {
      if ((position[0] == this.x) & (position[1] == this.y)) {
        //Si es la ficha que seleccionaste...
        this.pawnMovementRange(position);
      }
    });
  },

  methods: {
    pawnMovementRange(position) {
      // [x][y]
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
      xyMax > 1 ? (xyMax = 1) : null; //para que solo pueda dar 1 paso max.
      _xyMax > 1 ? (_xyMax = 1) : null;
      _x_yMax > 1 ? (_x_yMax = 1) : null;
      x_yMax > 1 ? (x_yMax = 1) : null;
      ////////// solo movimientos diagonales hacia el frente estan permitidos
      if (this.teamColor == "white") {
        x_yMax = 0;
        _x_yMax = 0;
      }
      if (this.teamColor == "black") {
        xyMax = 0;
        _xyMax = 0;
      }
      /////////////////////////////////////////////
      let xMax, yMax, _xMax, _yMax; //cada variable es la componente vertical/horizontal del plano
      xMax = 0; //➡                 //los peones no se mueven en vertical
      yMax = Math.abs(position[0] - 0); //⬆
      _xMax = 0; //⬅
      _yMax = Math.abs(position[0] - 7); //⬇
      xMax > 1 ? (xMax = 1) : null; //para que solo pueda dar 1 paso max.
      yMax > 1 ? (yMax = 1) : null;
      _xMax > 1 ? (_xMax = 1) : null;
      _yMax > 1 ? (_yMax = 1) : null;
      this.teamColor == "white" ? (_yMax = 0) : null; ///y solo se horizontal hacia el frente
      this.teamColor == "black" ? (yMax = 0) : null;
      (this.teamColor == "white") & (this.x == 6) ? (yMax = 2) : null; //se mueven 2 casillas si es el primer movimiento
      (this.teamColor == "black") & (this.x == 1) ? (_yMax = 2) : null;
      console.log(yMax, _yMax);

      this.diagonalDontFly(position, xyMax, _xyMax, _x_yMax, x_yMax); ///funcion para validar que no salten otras piezas y colorear las casillas a las que se puede mover
      this.linearDontFly(position, xMax, yMax, _xMax, _yMax);
      ///////////////////////////////////////////////////
    },
    diagonalDontFly(position, xyMax, _xyMax, _x_yMax, x_yMax) {
      let start = position;
      let cellsInRange = [];
      //mov. en cuadrante 4
      for (let i = 1; i <= x_yMax; i++) {
        if (this.chessboardMatriz[start[1] + i][start[0] + i].color == this.teamColor)
          break;
        if (
          (this.chessboardMatriz[start[1] + i][start[0] + i].color != this.teamColor) &
          (this.chessboardMatriz[start[1] + i][start[0] + i].color != "")
        )
          cellsInRange.push([start[1] + i, start[0] + i]);
        if (this.chessboardMatriz[start[1] + i][start[0] + i].content != "") break;
      }
      //mov. en cuadrante 1
      for (let i = 1; i <= xyMax; i++) {
        if (this.chessboardMatriz[start[1] + i][start[0] - i].color == this.teamColor)
          break;
        if (
          (this.chessboardMatriz[start[1] + i][start[0] - i].color != this.teamColor) &
          (this.chessboardMatriz[start[1] + i][start[0] - i].color != "")
        )
          cellsInRange.push([start[1] + i, start[0] - i]);
        if (this.chessboardMatriz[start[1] + i][start[0] - i].content != "") break;
      }
      //mov. en cuadrante 2
      for (let i = 1; i <= _xyMax; i++) {
        if (this.chessboardMatriz[start[1] - i][start[0] - i].color == this.teamColor)
          break;
        if (
          (this.chessboardMatriz[start[1] - i][start[0] - i].color != this.teamColor) &
          (this.chessboardMatriz[start[1] - i][start[0] - i].color != "")
        )
          cellsInRange.push([start[1] - i, start[0] - i]);
        if (this.chessboardMatriz[start[1] - i][start[0] - i].content != "") break;
      }
      //mov. en cuadrante 3
      for (let i = 1; i <= _x_yMax; i++) {
        if (this.chessboardMatriz[start[1] - i][start[0] + i].color == this.teamColor)
          break;
        if (
          (this.chessboardMatriz[start[1] - i][start[0] + i].color != this.teamColor) &
          (this.chessboardMatriz[start[1] - i][start[0] + i].color != "")
        )
          cellsInRange.push([start[1] - i, start[0] + i]);
        if (this.chessboardMatriz[start[1] - i][start[0] + i].content != "") break;
      }
      this.$bus.$emit("renderCellsInRange", cellsInRange);
    },
    linearDontFly(position, xMax, yMax, _xMax, _yMax) {
      let start = position;
      let cellsInRange = [];
      //mov. en x
      for (let i = 1; i <= xMax; i++) {
        if (this.chessboardMatriz[start[1] + i][start[0]].content != "") break; //no puede avanzar al frente si hay una ficha (sin importar bando)
        cellsInRange.push([start[1] + i, start[0]]);
      }
      //mov. en y
      for (let i = 1; i <= yMax; i++) {
        if (this.chessboardMatriz[start[1]][start[0] - i].content != "") break;
        cellsInRange.push([start[1], start[0] - i]);
      }
      //mov. en -x
      for (let i = 1; i <= _xMax; i++) {
        if (this.chessboardMatriz[start[1] - i][start[0]].content != "") break;
        cellsInRange.push([start[1] - i, start[0]]);
      }
      //mov. en -y
      for (let i = 1; i <= _yMax; i++) {
        if (this.chessboardMatriz[start[1]][start[0] + i].content != "") break;
        cellsInRange.push([start[1], start[0] + i]);
      }
      this.$bus.$emit("renderCellsInRange", cellsInRange);
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
