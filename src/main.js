import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import '@babel/polyfill'
import Bishop from "./components/Bishop"
import King from "./components/King"
import Knight from "./components/Knight"
import Pawn from "./components/Pawn"
import Queen from "./components/Queen"
import Rook from "./components/Rook"
import ChessBoard from "./components/ChessBoard"
import ChessboardSlot from "./components/ChessboardSlot"
import chessboardDinamics from "./plugins/chessboard-dinamics"
import PlayerTurnIndicator from "./components/PlayerTurnIndicator"

Vue.component("Bishop",Bishop)
Vue.component("King",King)
Vue.component("Knight",Knight)
Vue.component("Pawn",Pawn)
Vue.component("Queen",Queen)
Vue.component("Rook",Rook)
Vue.component("ChessBoard",ChessBoard)
Vue.component("ChessboardSlot",ChessboardSlot)
Vue.component("PlayerTurnIndicator",PlayerTurnIndicator)

Vue.use(chessboardDinamics)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
