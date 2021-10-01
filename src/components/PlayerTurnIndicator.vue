<template>
  <v-row justify-content="space-between" align-content="center">
    <v-col v-for="(player, index) in players" class="my-1" :key="index">
      <v-chip :color="player.color" :class="{ 'white--text': player.color == 'black' }">{{
        player.description
      }}</v-chip>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "PlayerTurnIndicator",
  created() {},
  data() {
    return {
      players: {
        player_1: {
          description: "Jugador 1",
          color: "white",
        },
        player_2: {
          description: "Jugador 2",
          color: "black",
        },
      },
    };
  },
  props: {},
  methods: {},
  computed: {
    width() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "47.5vw";
        case "sm":
          return "30vw";
        case "md":
          return "20vw";
        case "lg":
          return "20vw";
        case "xl":
          return "20vw";
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
