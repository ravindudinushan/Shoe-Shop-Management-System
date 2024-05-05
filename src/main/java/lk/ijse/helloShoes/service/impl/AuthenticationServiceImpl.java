//package lk.ijse.helloShoes.service.impl;
//
//import lk.ijse.helloShoes.auth.request.SignInRequest;
//import lk.ijse.helloShoes.auth.request.SignUpRequest;
//import lk.ijse.helloShoes.auth.response.JWTAuthResponse;
//import lk.ijse.helloShoes.dto.UserDTO;
//import lk.ijse.helloShoes.entity.User;
//import lk.ijse.helloShoes.repo.SecurityRepo;
//import lk.ijse.helloShoes.service.AuthenticationService;
//import lk.ijse.helloShoes.service.JWTService;
//import lombok.RequiredArgsConstructor;
//import org.modelmapper.ModelMapper;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.stereotype.Service;
//
//@Service
//@RequiredArgsConstructor
//public class AuthenticationServiceImpl implements AuthenticationService {
//    private final PasswordEncoder passwordEncoder;
//    private final SecurityRepo securityRepository;
//    private final ModelMapper mapper;
//    private final JWTService jwtService;
//    private final AuthenticationManager authenticationManager;
//
//    @Override
//    public JWTAuthResponse signIn(SignInRequest signInRequest) {
//        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(signInRequest.getEmail(), signInRequest.getPassword()));
//        User user = securityRepository.findByEmail(signInRequest.getEmail())
//                .orElseThrow(() -> new UsernameNotFoundException("user not found"));
//        String generatedToken = jwtService.generateToken(user);
//        return JWTAuthResponse.builder().token(generatedToken).build();
//    }
//
//    @Override
//    public JWTAuthResponse signUp(SignUpRequest signUpRequest) {
//        UserDTO userDTO = UserDTO.builder()
//                .email(signUpRequest.getEmail())
//                .password(passwordEncoder.encode(signUpRequest.getPassword()))
//                .role(signUpRequest.getRole())
//                .build();
//        User savedUser = securityRepository.save(mapper.map(userDTO, User.class));
//        String generatedToken = jwtService.generateToken(savedUser);
//        return JWTAuthResponse.builder().token(generatedToken).build();
//    }
//}
//
