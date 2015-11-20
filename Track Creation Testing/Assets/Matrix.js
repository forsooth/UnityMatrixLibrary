#pragma strict

// TODO
// Make inverse, determinant, equals, and transpose work
// Change from using javascript arrays to using Unity native double[][] arrays
// change all data values from int to double, or even better to a void* ambiguous type equivalent
// debug extensively
// comment code
// optimize

public class Matrix {

        var cols : int;
        var rows : int;
        var data : Array;

        public function Matrix(cols : int, rows : int) {

                this.cols = cols;
                this.rows = rows;
                if (cols == 0 || rows == 0) {
                        this.data = null;
                        return;
                }

                this.data = new Array(cols);

                for (var i = 0; i < cols; i++) {
                         this.data[i] = new Array(rows);
                }
        }
        
        public function isSquare() {
                return this.cols == this.rows;
        }

        public function numCols() {
                return this.cols;
        }

        public function numRows() {
                return this.rows;
        }

        public function getAt(col : int, row : int) {
                var v : int = (this.data[col] as Array)[row];
                return v;
        }

        public function setAt(col : int, row : int, value) {
                (this.data[col] as Array)[row] = value;
        }


        public function copy() {
                var matrix : Matrix;
                matrix = new Matrix(this.cols, this.rows);
                for (var i = 0; i < this.cols; i++) {
                        for (var j = 0; j < this.rows; j++) {
                                matrix.setAt(i, j, (this.data[i] as Array)[j]);
                        }
                }

                return matrix;
        }

        public function print() {
                var line = "";
                for (var i = 0; i < this.rows; i++) {
                        for (var j = 0; j < this.cols; j++) {
                                line += "[" + (this.data[j] as Array)[i] + "]";
                        }
                        Debug.Log(line);
                        line = "";
                }
        }

        // Identity
        public function I(dim : int) {
                var identity : Matrix;
                identity = new Matrix(dim, dim);

                for (var i = 0; i < dim; i++) {
                        for (var j = 0; j < dim; j++) {
                                if (i != j) {
                                        identity.setAt(i, j, 0);
                                } else {
                                        identity.setAt(i, j, 1);
                                }
                        }
                }

                return identity;
        }

        public function canMultiply(matrix : Matrix) {
                return this.cols == matrix.numRows();
        }

        public function canAdd(matrix : Matrix) {
                return (this.cols == matrix.numCols()) && (this.rows == matrix.numRows());
        }
        
        public function getRow(i : int) {
                var a = new Array(this.cols);
                for (var j = 0; j < this.cols; j++) {
                        a[j] = (this.data[j] as Array)[i];
                }

                return a;
        }

        public function getCol(i : int) {
                return this.data[i];
        }

        public function setCol(i : int, col : Array) {
                this.data[i] = col;
        }


        public function add(matrix : Matrix) {
                if (!canAdd(matrix)) return null;

                var result : Matrix;
                result = new Matrix(this.cols, this.rows);
                for (var i = 0; i < this.cols; i++) {
                        for (var j = 0; j < this.rows; j++) {
                                var v1 : int = (this.data[i] as Array)[j];
                                var v2 : int = matrix.getAt(i, j);
                                var value =  v1 + v2;
                                result.setAt(i, j, value);
                        }
                }

                return result;

        }

        public function sub(matrix : Matrix) {
                if (!canAdd(matrix)) return null;

                var result : Matrix;
                result = new Matrix(this.cols, this.rows);
                for (var i = 0; i < this.cols; i++) {
                        for (var j = 0; j < this.rows; j++) {
                                var v1 : int = (this.data[i] as Array)[j];
                                var v2 : int = matrix.getAt(i, j);
                                var value =  v1 - v2;
                                result.setAt(i, j, value);
                        }
                }

                return result;
        }

        private function dotProduct(a1 : Array, a2 : Array) {
                if (a1.length != a2.length) return null;

                var result = 0;

                for (var i = 0; i < a1.length; i++) {
                        var v1 : int = a1[i];
                        var v2 : int = a2[i];
                        result += v1 * v2;
                }

                return result;
        }

        private function minor(matrix : Matrix, col : int) {
                var result : Matrix;
                result = new Matrix(matrix.numCols() - 1, matrix.numRows() - 1);

                for (var i = 0; i < matrix.numCols(); i++) {
                        if (i == col) continue;
                        for (var j = 1; j < matrix.numRows(); j++) {
                                if (i < col) {
                                        result.setAt(i, j - 1, matrix.getAt(i, j));
                                } else {
                                        result.setAt(i - 1, j - 1, matrix.getAt(i, j)); 
                                }
                        }
                }

                return result;
        }
        
        public function multiply(matrix : Matrix) {
                if (this.data == null) return null;
                if (!canMultiply(matrix)) return null;

                var result : Matrix;
                result = new Matrix(this.rows, matrix.numCols());

                for (var i = 0; i < this.rows; i++) {
                        for (var j = 0; j < matrix.numCols(); j++) {
                                result.setAt(j, i, dotProduct(matrix.getCol(j), this.getRow(i)));                                
                        }
                }

                return result;
          
        }


        public function determinant() {
                if (!this.isSquare()) return null;

                return 0;
                
        }
        
        public function inverse() {
                return this;
        }


        public function transpose() {
                return this;
        }

        public function equals(matrix : Matrix) {
                return true;
        }
}