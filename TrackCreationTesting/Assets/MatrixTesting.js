#pragma strict

function Start () {
        var m : Matrix;
        m = new Matrix(4, 4);
        m.setAt(0, 0, 0);       
        m.setAt(1, 0, 2);      
        m.setAt(2, 0, 3);        
        m.setAt(3, 0, 4);
        m.setAt(0, 1, 1);     
        m.setAt(1, 1, 5);
        m.setAt(2, 1, 1);
        m.setAt(3, 1, 2);
        m.setAt(0, 2, 0);
        m.setAt(1, 2, 0);
        m.setAt(2, 2, 1);
        m.setAt(3, 2, 1);
        m.setAt(0, 3, 0);
        m.setAt(1, 3, 0);
        m.setAt(2, 3, 0);
        m.setAt(3, 3, 1);

        m.print();

        Debug.Log("");

        var n : Matrix = m.I(4);
        n.print();

        Debug.Log("");

        var o : Matrix = m.multiply(n);
        o.print();
        Debug.Log("");

        var p : Matrix;
        p = n.add(n);
        p.print();
        Debug.Log("");

        Debug.Log(m.determinant());
    
        var q : Matrix;
        q = m.inverse();
        q.print();
        m.print();
        Debug.Log("");
		
        m.multiply(q).print();
}

function Update () {

}