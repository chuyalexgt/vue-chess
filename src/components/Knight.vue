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
    chessboardMatriz: {
      type: Array,
      require: true,
    },
  },
  created() {
    this.$bus.$on("positionsToMoveKnight", (data) => {
      //movimiento de arfil
      if ((data.start[0] == this.x) & (data.start[1] == this.y)) {
        //Si es la ficha que seleccionaste y la casilla a la que se quiere mover esta dentro del rango, ejecuta el movimiento
        if (this.chessboardMatriz[data.end[1]][data.end[0]].inRange)
          this.$bus.$emit("executeMovement", data);
        else this.$bus.$emit("invalidMovement");
      }
    });
    this.$bus.$on("rangeToMoveKnight", (position) => {
      if ((position[0] == this.x) & (position[1] == this.y)) {
        //Si es la ficha que seleccionaste...
        this.knightMovementRange(position);
      }
    });
  },
  methods: {
    knightMovementRange(position) {
      let cellsInRange = [];
      let start = position;
      ///para determinar cuanto espacio tiene disponible para moverse
      let xMax = Math.abs(position[1] - 7); //➡
      let yMax = Math.abs(position[0] - 7); //⬆
      let _xMax = Math.abs(position[1] - 0); //⬅
      let _yMax = Math.abs(position[0] - 0); //⬇
      xMax > 2 ? (xMax = 2) : null;
      yMax > 2 ? (yMax = 2) : null;
      _xMax > 2 ? (_xMax = 2) : null;
      _yMax > 2 ? (_yMax = 2) : null;
      console.log(start);
      console.log(xMax, yMax, _xMax, _yMax);
      /// Los 8 movimientos posibles de un caballo
      if ((yMax == 2) & (xMax >= 1)) {
        this.chessboardMatriz[start[1] + 1][start[0] + 2].color != this.teamColor
          ? cellsInRange.push([start[1] + 1, start[0] + 2])
          : null;
      }
      if ((yMax >= 1) & (xMax == 2)) {
        this.chessboardMatriz[start[1] + 2][start[0] + 1].color != this.teamColor
          ? cellsInRange.push([start[1] + 2, start[0] + 1])
          : null;
      }
      if ((_yMax >= 1) & (xMax == 2)) {
        this.chessboardMatriz[start[1] + 2][start[0] - 1].color != this.teamColor
          ? cellsInRange.push([start[1] + 2, start[0] - 1])
          : null;
      }
      if ((_yMax == 2) & (xMax >= 1)) {
        this.chessboardMatriz[start[1] + 1][start[0] - 2].color != this.teamColor
          ? cellsInRange.push([start[1] + 1, start[0] - 2])
          : null;
      }
      if ((_yMax == 2) & (_xMax >= 1)) {
        this.chessboardMatriz[start[1] - 1][start[0] - 2].color != this.teamColor
          ? cellsInRange.push([start[1] - 1, start[0] - 2])
          : null;
      }
      if ((_yMax >= 1) & (_xMax == 2)) {
        this.chessboardMatriz[start[1] - 2][start[0] - 1].color != this.teamColor
          ? cellsInRange.push([start[1] - 2, start[0] - 1])
          : null;
      }
      if ((yMax >= 1) & (_xMax == 2)) {
        this.chessboardMatriz[start[1] - 2][start[0] + 1].color != this.teamColor
          ? cellsInRange.push([start[1] - 2, start[0] + 1])
          : null;
      }
      if ((yMax == 2) & (_xMax >= 1)) {
        this.chessboardMatriz[start[1] - 1][start[0] + 2].color != this.teamColor
          ? cellsInRange.push([start[1] - 1, start[0] + 2])
          : null;
      }
      this.$bus.$emit("renderCellsInRange", cellsInRange);
      /////////////////////////////////////////
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
