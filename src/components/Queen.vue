<template>
  <div>
    <v-img :src="iconRender" max-width="48px" max-height="48px"></v-img>
  </div>
</template>

<script>
import black from "../Sprites/blackQueen.png"
import white from "../Sprites/whiteQueen.png"

export default {
  name: "Queen",
  created() {},
  data() {
    return {};
  },
  props: {
    teamColor: {
      type: String,
      require : true,
    },
  },
  methods: {},
  computed:{
    iconRender () {
      if(this.teamColor == "black") return black
      if(this.teamColor == "white") return white
    }
  }
};
</script>

<style lang="scss" scoped></style>