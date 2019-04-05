from flask import Flask, render_template, request

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/game')
def game():
    row_num = int(request.args.get('row-num', 3))
    col_num = int(request.args.get('col-num', 3))
    win_size = int(request.args.get('win-size', 3))
    return render_template('game.html', row_num=row_num, col_num=col_num, win_size=win_size)


if __name__ == '__main__':
    app.run(debug=True)


"""
/*var ticTacToe = _.range(3).map(function () {
 *       // Create one row
 *       return _.range(3).map(function () {
 *           return '.';
 *       });
 *   });
 *   ticTacToe[0][2] = 'X';  // [row][column]
 *   ticTacToe.forEach(function (row) {
 *       console.log(row.join(' '));
 *   });
 *
 *
 *
 *function createArray(length) {
 *    var arr = new Array(length || 0),
 *      i = length;
 *
 *   if (arguments.length > 1) {
 *       var args = Array.prototype.slice.call(arguments, 1);
 *       while(i--) arr[length-1 - i] = createArray.apply(this, args);
 *   }
 *
 *   return arr;
 *}*/"""