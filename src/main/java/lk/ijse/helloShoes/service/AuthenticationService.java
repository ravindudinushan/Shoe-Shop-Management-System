package lk.ijse.helloShoes.service;

import lk.ijse.helloShoes.auth.request.SignInRequest;
import lk.ijse.helloShoes.auth.request.SignUpRequest;
import lk.ijse.helloShoes.auth.response.JWTAuthResponse;

public interface AuthenticationService {
    JWTAuthResponse signIn(SignInRequest signInRequest);
    JWTAuthResponse signUp(SignUpRequest signUpRequest);
}
