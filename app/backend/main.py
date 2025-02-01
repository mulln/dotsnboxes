from flask import Flask, jsonify, request

app = Flask(__name__)

# Game state
board = [[None for _ in range(3)] for _ in range(3)]
players = ['Player 1', 'Player 2']
current_player = 0

@app.route('/move', methods=['POST'])
def move():
    global current_player
    data = request.json
    x, y = data['x'], data['y']
    if board[x][y] is not None:
        return jsonify({'error': 'Invalid move'}), 400
    board[x][y] = players[current_player]
    current_player = 1 - current_player
    return jsonify({'board': board, 'current_player': players[current_player]})

@app.route('/reset', methods=['POST'])
def reset():
    global board, current_player
    board = [[None for _ in range(3)] for _ in range(3)]
    current_player = 0
    return jsonify({'board': board, 'current_player': players[current_player]})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
