package lk.ijse.helloShoe.service;

import lk.ijse.helloShoe.auth.request.SignInRequest;
import lk.ijse.helloShoe.auth.request.SignUpRequest;
import lk.ijse.helloShoe.auth.response.JWTAuthResponse;

public interface AuthenticationService {
    JWTAuthResponse signIn(SignInRequest signInRequest);
    JWTAuthResponse signUp(SignUpRequest signUpRequest);
}