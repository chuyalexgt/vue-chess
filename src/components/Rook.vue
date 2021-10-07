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
    this.$bus.$on("positionsToMoveRook", (data) => {
      //movimiento de torre
      if ((data.start[0] == this.x) & (data.start[1] == this.y)) {
        //Si es la ficha que seleccionaste...
        if (this.chessboardMatriz[data.end[1]][data.end[0]].inRange)
          this.$bus.$emit("executeMovement", data);
        else this.$bus.$emit("invalidMovement");
      }
    });
    this.$bus.$on("rangeToMoveRook", (position) => {
      if ((position[0] == this.x) & (position[1] == this.y)) {
        //Si es la ficha que seleccionaste...
        this.linearMovementRange(position);
      }
    });
  },
  methods: {
    linearMovementRange(position) {
      let xMax, yMax, _xMax, _yMax; //cada variable es la componente vertical/horizontal del plano
      xMax = Math.abs(position[1] - 7); //➡
      yMax = Math.abs(position[0] - 0); //⬆
      _xMax = Math.abs(position[1] - 0); //⬅
      _yMax = Math.abs(position[0] - 7); //⬇
      this.linearDontFly(position, xMax, yMax, _xMax, _yMax); ///validacion para que no salte otras piezas colorear las casillas a las que se puede mover
    },
    linearDontFly(position, xMax, yMax, _xMax, _yMax) {
      let start = position;
      let cellsInRange = [];
      //mov. en x
      for (let i = 1; i <= xMax; i++) {
        if (this.chessboardMatriz[start[1] + i][start[0]].color == this.teamColor) break;
        cellsInRange.push([start[1] + i, start[0]]);
        if (this.chessboardMatriz[start[1] + i][start[0]].content != "") break;
      }
      //mov. en y
      for (let i = 1; i <= yMax; i++) {
        if (this.chessboardMatriz[start[1]][start[0] - i].color == this.teamColor) break;
        cellsInRange.push([start[1], start[0] - i]);
        if (this.chessboardMatriz[start[1]][start[0] - i].content != "") break;
      }
      //mov. en -x
      for (let i = 1; i <= _xMax; i++) {
        if (this.chessboardMatriz[start[1] - i][start[0]].color == this.teamColor) break;
        cellsInRange.push([start[1] - i, start[0]]);
        if (this.chessboardMatriz[start[1] - i][start[0]].content != "") break;
      }
      //mov. en -y
      for (let i = 1; i <= _yMax; i++) {
        if (this.chessboardMatriz[start[1]][start[0] + i].color == this.teamColor) break;
        cellsInRange.push([start[1], start[0] + i]);
        if (this.chessboardMatriz[start[1]][start[0] + i].content != "") break;
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
