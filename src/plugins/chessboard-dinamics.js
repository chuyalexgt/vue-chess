const chessboardDinamics = {};
let chessboardPosition = {
    content : "",
    color : ""
}
let chessboardMatriz = Array(8)
  .fill(null)
  .map(() => Array(8).fill(chessboardPosition));

chessboardDinamics.install = function(Vue) {
  Vue.prototype.$chessboardMatriz = chessboardMatriz
};

export default chessboardDinamics;
