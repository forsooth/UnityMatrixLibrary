#pragma strict

/* TODO
 * Make determinant work for edge cases, add better checking for invertible matrices
 * Change from using javascript arrays to using Unity native double[][] arrays
 * overload UnityScript operators for +, -, *, /, and ==
 * change all data values from double to even better to a void* or ambiguous type equivalent
 * debug more
 * optimize more
 */

public class Matrix {

        /* Private data for the matrix class. Each matrix keeps track of its size and
         * its data values
         */
        var cols : int;
        var rows : int;
        var data : double [,];


        /* Constructor to create a new empty matrix of a given size */
        public function Matrix(cols : int, rows : int) {

                this.cols = cols;
                this.rows = rows;

                /* Do not attempt to make arrays of size zero */
                if (cols == 0 || rows == 0) {
                        this.data = null;
                        return;
                }

                this.data = new double[cols, rows];
/*
                for (var i = 0; i < cols; i++) {
                        this.data[i] = new Array(rows);
                }*/
        }
        
        /* Check if the matrix is a square matrix, i.e. its number of rows is equal
         * to its number of columns.
         */
        public function isSquare() : boolean {
                return this.cols == this.rows;
        }

        /* Return the number of columns in the matrix */
        public function numCols() : int {
                return this.cols;
        }

        /* Return the number of rows in the matrix */
        public function numRows() : int {
                return this.rows;
        }

        /* Return the value at the given indices in the matrix. */
        public function getAt(col : int, row : int) : double {
                var v : double = this.data[col, row];
                return v;
        }

        /* Given two indices and a value, put the value into the matrix. */
        public function setAt(col : int, row : int, value) {
                this.data[col, row] = value;
        }

        /* Return a deep copy of the matrix. */
        public function copy() : Matrix {
                var matrix : Matrix;
                matrix = new Matrix(this.cols, this.rows);
                for (var i = 0; i < this.cols; i++) {
                        for (var j = 0; j < this.rows; j++) {
                                matrix.setAt(i, j, this.data[i, j]);
                        }
                }

                return matrix;
        }

        /* Using Debug.Log, print out the data in the matrix. */
        public function print() : void {
                var line = "";
                for (var i = 0; i < this.rows; i++) {
                        for (var j = 0; j < this.cols; j++) {
                                line += "[" + this.data[j,i] + "]";
                        }
                        Debug.Log(line);
                        line = "";
                }
        }

        /* Return a new matrix that is the square identity matrix for a given dimension */
        public static function I(dim : int) : Matrix {
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

        /* Matrices can only multiply if the number of columns on the left hand
         * side equals the number of rows on the right hand side. This checks if 
         * that is possible, i.e. if this matrix can multiply into another. 
         */
        public function canMultiply(matrix : Matrix) : boolean {
                return this.cols == matrix.numRows();
        }

        /* Two matrices can add only if they have the same number of rows and columns. 
         * This checks if this matrix has the same dimensions as a given matrix. 
         */
        public function canAdd(matrix : Matrix) : boolean {
                return (this.cols == matrix.numCols()) && (this.rows == matrix.numRows());
        }
        
        /* Return a complete row of the matrix as an Array */
        public function getRow(i : int) : double[] {
        		var a = new double[this.cols];
                for (var j = 0; j < this.cols; j++) {
                        a[j] = this.data[j, i];
                }

                return a;
        }

        /* Set a complete row of the matrix to a given Array */
        public function setRow(i : int, row :double[]) : void {
                for (var j = 0; j < this.cols; j++) {
                        this.data[j, i] = row[j];
                }
        }

        /* Return a complete column of the matrix as an Array */
        public function getCol(i : int) : double[] {
        		var colarray = new double[this.rows];
        		for(var j = 0; j < this.rows; j++){
        			colarray[j] = this.getAt(i, j);
        		}
                return colarray;
        }

        /* Set a complete column of the matrix to an Array */
        public function setCol(i : int, col : double[]) : void {
                for(var j = 0; j < this.rows; j++){
                	this.setAt(i, j, col[j]);
                }
        }

        /* Add a given matrix to this matrix */
        public function add(matrix : Matrix) : Matrix {
                if (!canAdd(matrix)) Debug.LogError("Cannot add matrices. Rows and columns are not equal in length.");

                var result : Matrix;
                result = new Matrix(this.cols, this.rows);
                for (var i = 0; i < this.cols; i++) {
                        for (var j = 0; j < this.rows; j++) {
                                var v1 : double = this.data[i,j];
                                var v2 : double = matrix.getAt(i, j);
                                var value : double =  v1 + v2;
                                result.setAt(i, j, value);
                        }
                }

                return result;

        }

        /* Subtract a given matrix from this matrix. */
        public function sub(matrix : Matrix) : Matrix {
                if (!canAdd(matrix)) Debug.LogError("Cannot subtract matrices. Rows and columns are not equal in length.");

                var result : Matrix;
                result = new Matrix(this.cols, this.rows);
                for (var i = 0; i < this.cols; i++) {
                        for (var j = 0; j < this.rows; j++) {
                                var v1 : double = this.data[i, j];
                                var v2 : double = matrix.getAt(i, j);
                                var value : double =  v1 - v2;
                                result.setAt(i, j, value);
                        }
                }

                return result;
        }

        /* Returns the dot product of two arrays. This is used in multiplying two
         * matrices together.
         */
        private function dotProduct(a1 : double[], a2 : double[]) : double {
                if (a1.length != a2.length) Debug.LogError("Cannot take dot product of vectors with unequal length. First length: " + a1.length + ", second length: " + a2.length + ".");

                var result : double = 0;

                for (var i = 0; i < a1.length; i++) {
                        var v1 : double = a1[i];
                        var v2 : double = a2[i];
                        result += v1 * v2;
                }

                return result;
        }
        
        /* Multiply a given matrix by this matrix. */
        public function multiply(matrix : Matrix) : Matrix {

                if (this.data == null) Debug.LogError("Cannot multiply by a matrix with null data.");
                if (!canMultiply(matrix)) Debug.LogError("Cannot multiply matrices ");

                var result : Matrix;
                result = new Matrix(this.rows, matrix.numCols());

                for (var i = 0; i < this.rows; i++) {
                        for (var j = 0; j < matrix.numCols(); j++) {
                                result.setAt(j, i, dotProduct(matrix.getCol(j), this.getRow(i)));                                
                        }
                }

                return result;
          
        }

        /* Multiply this matrix by a constant. */
        public function multiply(value: double) : Matrix {
                if (this.data == null) Debug.LogError("Cannot multiply with no matrix data.");

                var result : Matrix;
                result = new Matrix(this.rows, this.numCols());

                for (var i = 0; i < this.rows; i++) {
                        for (var j = 0; j < this.numCols(); j++) {
                                result.setAt(i, j, this.getAt(i, j) * value);                                
                        }
                }

                return result;
          
        }

        /* Calculate the determinant of this matrix. */
        public function determinant() : double {
		    if (this.data == null) {
		        Debug.LogError("Cannot take the determinant of a matrix with no data");
		    }
		    if (!this.isSquare()) {
		        Debug.LogError("Cannot take the determinant of a matrix that is not square");
		    }
		    
		    var thismatrix = "";
		    Debug.Log("DOING THE DETERMINANT OF");
		    for(var matrixiter = 0; matrixiter < this.cols; matrixiter++){
		    	for(var matrixiterrow = 0; matrixiterrow < this.rows; matrixiterrow++){
		    		thismatrix += this.getAt(matrixiter, matrixiterrow);
		    		thismatrix += " ";
		    	}
		    	thismatrix += "\n";
		    }
		    Debug.Log(thismatrix);

		    var upper : Matrix = this.copy();
		    var swapCount : int = 0;


		    for(var i = 0; i < (this.cols -1); i++){
		        if(upper.getAt(i, i) == 0){ //if this diagonal value is 0 we need to find a pivot
		            var j = i;
		            var switched = false;
		            while(j < (this.cols -1) && !switched){
		                if(upper.getAt(i,j) != 0){ // if this row has a pivot that is valid swap
		                    upper.swapRows(i, j);
		                    swapCount++;
		                    switched = true;
		                }
		                j++;
		            }
		        } // now we have a valid pivot
		        for (j = i+1; j < this.cols; j++) {
		            if(upper.getAt(i, j) != 0){
		                var coeff = upper.getAt(i, j)/upper.getAt(i,i); // calculate pivot coefficient
		                var rowJ = upper.getRow(j);
		                var rowI = upper.getRow(i);
		                for(var counter = 0; counter < rowJ.length; counter++){
		                    rowI[counter] = rowI[counter] * coeff;
		                    rowJ[counter] = rowJ[counter] - rowI[counter]; // set the new row to the zeroed value
		                }
		                if(rowJ[i] != 0){
		                    Debug.LogError("ERROR Calculating Zeros returning 0"); // if something really bad happened and math broke 
		                    return 0;
		                }
		                upper.setRow(j, rowJ);
		            }
		        }
		    }

		    var determinant : double = 1;
		    for(i = 0; i < upper.cols; i++){
		        determinant = determinant * upper.getAt(i,i);
		    }
		    
		    for(i = 0; i < swapCount; i++){ //every swap multiplied the determinant by -1 so we need to account for that
		        determinant = determinant * -1;
		    }
		    return determinant;
		}

		function swapRows(rowA, rowB){
		    var copy : Matrix = this.copy();
		    this.setRow(rowB, copy.getRow(rowA));
		    this.setRow(rowA, copy.getRow(rowB));
		}
        
        /* Find the inverse of this matrix, assuming it is invertible. */
        public function inverse() : Matrix {
                if (this.data == null) Debug.LogError("Cannot take the inverse of a matrix with no data.");
                if (!this.isSquare()) Debug.LogError("Cannot take the inverse of a matrix that is not square.");
            
                var copy: Matrix = this.copy();
                var identity : Matrix = I(this.cols);
            
	        var numerator : double; 
	        var denominator : double; 
	        var element : double;
	        var element2 : double;                
	        var upper = new double[copy.cols];
	        var upper_i = new double[copy.cols];
 	        var lower = new double[copy.cols];
	        var lower_i = new double[copy.cols];
           
                // Reduce to the diagonal only. 
                for(var i = 0; i < copy.rows; i++) {
	                upper = copy.getRow(i);
                        var counter = i;
                        while (upper[i] == 0) {
                                upper = copy.getRow(++counter);
                               
                                if (counter >= copy.rows) {
                                        Debug.LogError("Could not reduce matrix to row echelon form when finding the inverse. Returning null."); 
                                        return null;
                                }
                        }
	                       
                        upper_i = identity.getRow(counter);
                
                        copy.setRow(counter, copy.getRow(i));
                        copy.setRow(i, upper);
                        identity.setRow(counter, identity.getRow(i));
                        identity.setRow(i, upper_i);
                
	                denominator = upper[i];
	          
                        for (var j = 0; j < copy.cols; j++) {
                                if(j != i) {
                                        lower = copy.getRow(j);
                                        lower_i = identity.getRow(j);                   
                                        numerator = lower[i];

                                        for(var k = 0; k < copy.cols; k++) {
                                                element = upper[k];
                                                element2 = lower[k];
                                                lower[k] = element2 - numerator/denominator * element;
                                                element = upper_i[k];
                                                element2 = lower_i[k];
                                                lower_i[k] = element2 - numerator/denominator * element;
                                        }
                                        
                                        copy.setRow(j, lower);
                                        identity.setRow(j, lower_i);                    
                                }
                        }
                }

                /* Reduce one side to the identity matrix to get the inverse in the other */
                for(i = 0; i < copy.rows; i++) {
                        upper = copy.getRow(i);
                   	denominator = upper[i];
                    
                        for (j = 0; j < copy.cols; j++) {
                                numerator = copy.data[j,i];
                                copy.data[j,i] = numerator / denominator;
                                numerator = identity.data[j,i];
                                identity.data[j,i] = numerator / denominator;
                        }
                }          
                                
                return identity;
        }

        /* Flip the matrix to get its transpose */
        public function transpose() : Matrix {
                var copy : Matrix;
                copy = new Matrix(this.cols, this.rows);
                for (var i = 0; i < copy.cols; i++) {
                        for (var j = 0; j < copy.rows; j++) {
                                copy.setAt(j, i, this.getAt(i, j));
                        }
                }
                return copy;
        }

        /* Equality check for two matrices */
        public function equals(matrix : Matrix) : boolean {
                for (var i = 0; i < this.cols; i++) {
                        for (var j = 0; j < this.rows; j++) {
                                if (this.getAt(i, j) != matrix.getAt(i, j)) {
                                        return false;
                                }
                        }
                }
                
                return true;
        }
}