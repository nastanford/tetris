(function() {

	window.game = {};
	
	window.game.stage = {
					// 绘制格子
		cols : 10,
		rows : 15,
		gridWidth : 400,
		gridHeight : 600,
		canvas : null,
		context : null,
		matrix : null,
		gridPadding : null,
		factory : null,
		tetromino : null,

		// 初始化
		init : function(canvasId) {
			this.canvas = document.getElementById(canvasId);
			this.context = this.canvas.getContext('2d');
			this.gridPadding = 10;
			this.cellWidth = 40;
			this.factory = window.game.tetrominoFactory;
			this.tetromino = this.factory.create();

			// 白色背景
			this.context.fillStyle = "white";
			this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);


			for (var x = 0; x <= this.gridWidth; x += this.cellWidth) {
				this.context.moveTo(0.5 + x + this.gridPadding, this.gridPadding);
				this.context.lineTo(0.5 +x + this.gridPadding, this.gridHeight + this.gridPadding);
			}

			for (var y = 0; y <= this.gridHeight; y += this.cellWidth) {
				this.context.moveTo(this.gridPadding, 0.5 + y + this.gridPadding);
				this.context.lineTo(this.gridWidth + this.gridPadding, 0.5 + y + this.gridPadding);
			}

			this.context.strokeStyle = "black";
			this.context.stroke();
			
			// 初始化矩阵
			this.matrix = utils.create2DArray(this.rows, this.cols);
			console.log('init stage');
		},

		clean: function() {
			this.context.fillStyle = "white";
			this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

			for (var x = 0; x <= this.gridWidth; x += this.cellWidth) {
				this.context.moveTo(0.5 + x + this.gridPadding, this.gridPadding);
				this.context.lineTo(0.5 +x + this.gridPadding, this.gridHeight + this.gridPadding);
			}

			for (var y = 0; y <= this.gridHeight; y += this.cellWidth) {
				this.context.moveTo(this.gridPadding, 0.5 + y + this.gridPadding);
				this.context.lineTo(this.gridWidth + this.gridPadding, 0.5 + y + this.gridPadding);
			}

			this.context.strokeStyle = "black";
			this.context.stroke();

			this.matrix = utils.create2DArray(this.rows, this.cols);
	
			console.log('clean stage');
		},

		redraw : function() {
			this.clean();
			this.context.fillStyle = "black";

			var tetrominoPoints = this.tetromino.getPoints();
			var point;
			for (var n = 0, m = tetrominoPoints.length; n < m; n++) {
				point = tetrominoPoints[n];
				this.matrix[point.x][point.y] = 1;
			}

			var x, y;
			for (var i = 0; i < this.cols; i++) {
				for (var j = 0; j < this.rows; j++) {
					if (this.matrix[i][j]) {
						x = 0.5 + i*this.cellWidth + this.gridPadding;
						y = 0.5 + j*this.cellWidth + this.gridPadding;
						this.context.fillRect(x + 1, y - 1, this.cellWidth - 1, this.cellWidth - 1);
					}
				}
			}
			console.log('redraw stage');
		},

		checkValid : function() {
			var tetrominoPoints = this.tetromino.getPoints();
			for (var i = 0; i < tetrominoPoints.length; i++) {
				if ((tetrominoPoints[i].x == this.cols) || (tetrominoPoints[i].x == -1)) {
					return false;
				}

				if (tetrominoPoints[i].y == this.rows)  {
					return false;
				} 

				if (this.matrix[tetrominoPoints[i].x][tetrominoPoints[i].y]) {
					return false;
				}
			}
			return true;
		},

		userInput : function(e) {
			var key = e.keyCode;
			switch(key) {
				// A and left 
				case 65:
				case 37:
					this.tetromino.moveLeft();
					if (!this.checkValid()) {
						this.tetromino.moveRight();
					}
					console.log('press left');
					break;

				// W and up
				case 87:
				case 38:
					this.tetromino.rotateRight();
					//if (!this.checkValid()) {
					//	this.tetromino.rotateLeft();
					//}
					console.log('press up');
					break;					

				// D and right
				case 68:
				case 39:
					this.tetromino.moveRight();
					if (!this.checkValid()) {
						this.tetromino.moveLeft();
					}
					console.log('press right');
					break;

				default : break;
			}
		},

		run :function() {
			this.tetromino.moveDown();
		},
	};

})();