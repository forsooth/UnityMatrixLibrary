#pragma strict

function Start () {
        var m : Matrix;
        m = new Matrix(4, 4);
        m.setAt(0, 0, 3);       
        m.setAt(1, 0, 0);      
        m.setAt(2, 0, 2);        
        m.setAt(3, 0, -1);
        m.setAt(0, 1, 1);     
        m.setAt(1, 1, 2);
        m.setAt(2, 1, 0);
        m.setAt(3, 1, -2);
        m.setAt(0, 2, 4);
        m.setAt(1, 2, 0);
        m.setAt(2, 2, 6);
        m.setAt(3, 2, -3);
        m.setAt(0, 3, 5);
        m.setAt(1, 3, 0);
        m.setAt(2, 3, 2);
        m.setAt(3, 3, 0);

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
}

function Update () {

}
