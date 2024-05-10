package lk.ijse.helloShoe.api;
//
//import lk.ijse.helloShoe.auth.request.SignInRequest;
//import lk.ijse.helloShoe.auth.request.SignUpRequest;
//import lk.ijse.helloShoe.auth.response.JWTAuthResponse;
//import lk.ijse.helloShoe.service.AuthenticationService;
//import lombok.RequiredArgsConstructor;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//@RestController
//@RequestMapping("api/v1/auth")
//@RequiredArgsConstructor
//public class LoginController {
//    private final AuthenticationService authenticationService;
//
//    @PostMapping("/signin")
//    public ResponseEntity<JWTAuthResponse> signIn(
//            @RequestBody SignInRequest signInRequest){
//        System.out.println("Signing in");
//        return ResponseEntity.ok(
//                authenticationService.signIn(signInRequest));
//    }
//
//    @PostMapping("/signup")
//    public ResponseEntity<JWTAuthResponse> signUp(
//            @RequestBody SignUpRequest signUpRequest){
//        return ResponseEntity.ok(
//                authenticationService.signUp(signUpRequest));
//    }
//}
//
