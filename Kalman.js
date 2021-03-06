﻿#pragma strict

// 7
// xhatk = Fk * xhatklast + Bk * uk
// Pk = Fk * Pklast * Ftk + Qk
// 18
// xhatkprime = xhatk + Kprime * (zk - Hk * xhatk)
// Pkprime = Pk - Kprime * Hk * Pk
// 19
// Kprime = Pk * Htk * (Hk * Pk * Htk + Rk)^(-1) <---- Matrix inverse 

// Definitions
// xhatk: mean of the gaussian distribution of value probabilities, i.e. the data to use
// Pk: covariance matrix of interdependence of variables
// Fk: Prediction matrix, based in physics or other mathematical model
// Bk: Error we can calulate but not measure, e.g. jerk in acceleration, called control matrix
// uk: called control vector, measured quantity to multiply by Bk
// Qk: The system won't just evolve based on our model and known external influences, there are some unknown ones. Qk is covariance from everything else. In effect this is how much we trust the sensors relative to one another.
// Hk: representation of the sensor values we'd exect to see, based on our sensor data
// zk: mean of sensor distribution, i.e. our measurement data
// Rk: covariance of the sensor values, i.e. sensor noise
// K: Kalman Gain, combination of two abstract covariances, used to combine gaussian distributions. 
// xhatprime: new best estimate for data
// Pkprime: new best estimat for uncertainties
// Kprime: new Kalman Gain
// Ptk: transpose of P, used for covariance calculations
// Ftk: transpose of F
// Htk: transpose of H

private var dt : float;

private var x : Matrix;
private var u : Matrix;
private var z : Matrix;

private var P : Matrix;
private var F : Matrix;
private var B: Matrix;
private var K : Matrix;

private var Q : Matrix;
private var H : Matrix;
private var R : Matrix;

function Start () {
        x = new Matrix(1, 6);
        u = new Matrix(1, 6);
        z = new Matrix(1, 6);

        P = Matrix.I(6);

        Q = Matrix.I(6);
        Q.setAt(0, 0, 0);
        Q.setAt(1, 1, 0);
        Q.setAt(2, 2, 0);
        Q.setAt(3, 3, 0);
        Q.setAt(4, 4, 0);
        Q.setAt(5, 5, 0);

        F = new Matrix(6, 6); //physics to get to next state

        B = new Matrix(6, 6); //physics one level above F

        K = new Matrix(6, 6); // calculated as we go

        H = new Matrix(6, 6); //transformation to multiply x by to get prediction for next state

        R = new Matrix(6, 6); //sensor jitter

}

function Predict () {
        // formulas: 
        // xhatk = Fk * xhatklast + Bk * uk
        // Pk = Fk * Pklast * Ftk + Qk
        x = F.multiply(x);
        var temp : Matrix = B.multiply(u);
        x = x.add(temp);

        P = F.multiply(P);
        temp = F.transpose();
        P = P.multiply(temp);
        P = P.add(Q);
        
}

function Update () {
        dt = Time.deltaTime;
        Predict();
        // formulas:
        // xhatkprime = xhatk + Kprime * (zk - Hk * xhatk)
        // Pkprime = Pk - Kprime * Hk * Pk
        // Kprime = Pk * Htk * (Hk * Pk * Htk + Rk)^(-1) <---- Matrix inverse 
        var temp : Matrix = H.multiply(x);
        temp = z.sub(temp);
        temp = K.multiply(temp);
        x = x.add(temp);

        temp = K.multiply(H);
        temp = temp.multiply(P);

        var lastP : Matrix = P;

        P = P.sub(temp);

        temp = H.multiply(lastP);
        temp = temp.multiply(H.transpose());
        temp = temp.add(R);
        temp = temp.inverse();
        temp = H.transpose().multiply(temp);
        K = lastP.multiply(temp);
}
