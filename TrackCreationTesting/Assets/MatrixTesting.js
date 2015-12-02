#pragma strict

function Start () {

        var l : Matrix;
        l = new Matrix(4, 4);
        l.setAt(0, 0, 9);       
        l.setAt(1, 0, 2);      
        l.setAt(2, 0, -8);        
        l.setAt(3, 0, 4);
        l.setAt(0, 1, 1);
        l.setAt(1, 1, 2);
        l.setAt(2, 1, 0);
        l.setAt(3, 1, 3);
        l.setAt(0, 2, 0);
        l.setAt(1, 2, -3);
        l.setAt(2, 2, 1);
        l.setAt(3, 2, -4);
        l.setAt(0, 3, 0);
        l.setAt(1, 3, 2.5);
        l.setAt(2, 3, -8.444);
        l.setAt(3, 3, -8.1);

        var m : Matrix;
        m = new Matrix(4, 4);
        m.setAt(0, 0, 1);       // 1 2 3 4
        m.setAt(1, 0, 2);       // 1 5 1 2
        m.setAt(2, 0, 3);       // 0 0 1 1
        m.setAt(3, 0, 4);       // 0 0 0 1
        m.setAt(0, 1, 1);
        m.setAt(1, 1, 5);       // 1 1 0 0
        m.setAt(2, 1, 1);       // 2 5 0 0
        m.setAt(3, 1, 2);       // 3 1 1 0
        m.setAt(0, 2, 0);       // 4 2 1 1
        m.setAt(1, 2, 0);
        m.setAt(2, 2, 1);
        m.setAt(3, 2, 1);
        m.setAt(0, 3, 0);
        m.setAt(1, 3, 0);
        m.setAt(2, 3, 0);
        m.setAt(3, 3, 1);

        var n : Matrix = m.I(4);

        var o : Matrix = l.multiply(m);
        var p : Matrix = m.multiply(l);
        var q : Matrix = l.multiply(n);
        var r : Matrix = n.multiply(l);
        var s : Matrix = m.multiply(n);
        var t : Matrix = n.multiply(m);

        var u : Matrix = n.add(n);
        var v : Matrix = l.add(m);
        var w : Matrix = n.add(l);
    
        var x : Matrix = l.inverse(); 
        var y : Matrix = m.inverse();

        var z : Matrix = x.multiply(l);
        var a : Matrix = y.multiply(m);

        var b : Matrix = m.transpose();

        var c : Matrix = m.multiply(2);
    
        var det : double = m.determinant();
        var det2 : double = l.determinant();

        Debug.Log("First Matrix:");
        l.print();

        Debug.Log("Second Matrix:");
        m.print();

        Debug.Log("Identity Matrix:");
        n.print();

        Debug.Log("First times second:");
        o.print();

        Debug.Log("Second times first:");
        p.print();

        Debug.Log("First times identity:");
        q.print();

        Debug.Log("Identity times first:");
        r.print();

        Debug.Log("Second times identity:");
        s.print();

        Debug.Log("Identity times second:");
        t.print();

        Debug.Log("Identity plus itself:");
        u.print();

        Debug.Log("First plus second:");
        v.print();

        Debug.Log("Identity plus first:");
        w.print();

        Debug.Log("First inverse:");
        x.print();

        Debug.Log("Second inverse:");
        y.print();

        Debug.Log("First inverse times first:");
        z.print();

        Debug.Log("Second inverse times second:");
        a.print();

        Debug.Log("Transpose of second:");
        b.print();

        Debug.Log("Second times two:");
        c.print();

        Debug.Log("Second determinant:");

        Debug.Log(det);

        Debug.Log("First determinant:");

        Debug.Log(det2);


        
}

function Update () {
}