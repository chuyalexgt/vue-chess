const chessboardDinamics = {};
chessboardDinamics.install = function(Vue) {

  let chessboardMatriz = Array(8)
    .fill(null)
    .map(() =>
      Array(8).fill(
        Object.assign(
          {},
          {
            content: "",
            color: "",
          }
        )
      )
    );
  Vue.prototype.$chessboardMatriz = chessboardMatriz;
  Vue.prototype.$addPiece = (row, col, color, piece) => {
    chessboardMatriz[row][col] = Object.assign({}, chessboardMatriz[row][col], {
      content: piece,
      color: color,
    });

    console.log(chessboardMatriz);
  };
};
export default chessboardDinamics;
