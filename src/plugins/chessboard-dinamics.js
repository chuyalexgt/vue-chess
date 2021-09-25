const chessboardDinamics = {};
chessboardDinamics.install = function(Vue) {
    Vue.prototype.$bus = new Vue()
    Vue.prototype.$initialPieces = [
        //Blancas
        {row : 6,col : 0, color: "white", piece : "Pawn"},
        {row : 6,col : 1, color: "white", piece : "Pawn"},
        {row : 6,col : 2, color: "white", piece : "Pawn"},
        {row : 6,col : 3, color: "white", piece : "Pawn"},
        {row : 6,col : 4, color: "white", piece : "Pawn"},
        {row : 6,col : 5, color: "white", piece : "Pawn"},
        {row : 6,col : 6, color: "white", piece : "Pawn"},
        {row : 6,col : 7, color: "white", piece : "Pawn"},
        {row : 7,col : 0, color: "white", piece : "Rook"},
        {row : 7,col : 1, color: "white", piece : "Knight"},
        {row : 7,col : 2, color: "white", piece : "Bishop"},
        {row : 7,col : 3, color: "white", piece : "King"},
        {row : 7,col : 4, color: "white", piece : "Queen"},
        {row : 7,col : 5, color: "white", piece : "Bishop"},
        {row : 7,col : 6, color: "white", piece : "Knight"},
        {row : 7,col : 7, color: "white", piece : "Rook"},
        //Negras
        {row : 1,col : 0, color: "black", piece : "Pawn"},
        {row : 1,col : 1, color: "black", piece : "Pawn"},
        {row : 1,col : 2, color: "black", piece : "Pawn"},
        {row : 1,col : 3, color: "black", piece : "Pawn"},
        {row : 1,col : 4, color: "black", piece : "Pawn"},
        {row : 1,col : 5, color: "black", piece : "Pawn"},
        {row : 1,col : 6, color: "black", piece : "Pawn"},
        {row : 1,col : 7, color: "black", piece : "Pawn"},
        {row : 0,col : 0, color: "black", piece : "Rook"},
        {row : 0,col : 1, color: "black", piece : "Knight"},
        {row : 0,col : 2, color: "black", piece : "Bishop"},
        {row : 0,col : 3, color: "black", piece : "King"},
        {row : 0,col : 4, color: "black", piece : "Queen"},
        {row : 0,col : 5, color: "black", piece : "Bishop"},
        {row : 0,col : 6, color: "black", piece : "Knight"},
        {row : 0,col : 7, color: "black", piece : "Rook"},
    ]
};
export default chessboardDinamics;
