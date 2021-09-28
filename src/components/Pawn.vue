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
      //movimiento de Rey
      if ((data.start[0] == this.x) & (data.start[1] == this.y)) {
        //Si es la ficha que seleccionaste...
        this.pawnMovement(data);
      }
    });
  },
  methods: {
    pawnMovement(data) {
      // [x][y]
      let diagonalValidation =
        (Math.abs(data.start[0] - data.end[0]) === 1) &       //Solo se mueve en diagonal si es una casilla
        (Math.abs(data.start[1] - data.end[1]) === 1) &       
        this.canAttack();                                     //y hay una ficha enemiga en la posicion 
      let linearValidation =
        (data.start[1] == data.end[1]) &                      //No sea un movimiento vertical
        (data.start[0] != data.end[0]) &                      //sea un movimiento horizontal
        this.isFirstMovement(data) &                          // solo se mueva 1 casilla (o 2 si es el primer movimiento)
        this.canMove(data) &                                  // Solo sea un movimietno hacia el frente
        (data.positionData.color == "");                      //si se mueve hacia el frente no puede atacar
      let dontKillFriends = data.pieceData.color != data.positionData.color;
      if (diagonalValidation) {
        if (diagonalValidation & dontKillFriends) {
          this.$bus.$emit("executeMovement", data);
        } else {
          this.$bus.$emit("invalidMovement");
        }
      }
      if (linearValidation) {
        if (linearValidation & dontKillFriends) {
          this.$bus.$emit("executeMovement", data);
        } else {
          this.$bus.$emit("invalidMovement");
        }
      } else {
        this.$bus.$emit("invalidMovement");
      }
    },
    canAttack() {
      console.log(this.x, this.y);
      if (this.teamColor == "white") {
        if (this.y == 0) {
          return this.chessboardMatriz[this.y + 1][this.x - 1].color == "black"
            ? true
            : false;
        }
        if (this.y == 7) {
          return this.chessboardMatriz[this.y - 1][this.x - 1].color == "black"
            ? true
            : false;
        }
        if (
          (this.chessboardMatriz[this.y + 1][this.x - 1].color == "black") |
          (this.chessboardMatriz[this.y - 1][this.x - 1].color == "black")
        )
          return true;
      }
      if (this.teamColor == "black") {
        if (this.y == 0) {
          return this.chessboardMatriz[this.y + 1][this.x + 1].color == "white"
            ? true
            : false;
        }
        if (this.y == 7) {
          return this.chessboardMatriz[this.y - 1][this.x + 1].color == "white"
            ? true
            : false;
        }
        if (
          (this.chessboardMatriz[this.y + 1][this.x + 1].color == "white") |
          (this.chessboardMatriz[this.y - 1][this.x + 1].color == "white")
        )
          return true;
      }
      return false;
    },
    canMove(data) {
      if (this.teamColor == "white") {
        if ((data.start[0] - data.end[0] == 1) | 2) return true;
      }
      if (this.teamColor == "black") {
        if ((data.start[0] - data.end[0] == -1) | -2) return true;
      }
      return false;
    },
    isFirstMovement(data) {
      if (Math.abs(data.start[0] - data.end[0]) > 2) return false;
      if (this.teamColor == "white") {
        if ((data.start[0] == 6) & (Math.abs(data.start[0] - data.end[0]) == 2))
          return true;
        if (Math.abs(data.start[0] - data.end[0]) === 1) return true;
      }
      if (this.teamColor == "black") {
        if ((data.start[0] == 1) & (Math.abs(data.start[0] - data.end[0]) == 2))
          return true;
        if (Math.abs(data.start[0] - data.end[0]) === 1) return true;
      }
      return false;
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
