//package lk.ijse.helloShoe.service.impl;//package lk.ijse.helloShoes.service.impl;
//
//import lk.ijse.helloShoe.auth.request.SignInRequest;
//import lk.ijse.helloShoe.auth.request.SignUpRequest;
//import lk.ijse.helloShoe.auth.response.JWTAuthResponse;
//import lk.ijse.helloShoe.dto.UserDTO;
//import lk.ijse.helloShoe.entity.User;
//import lk.ijse.helloShoe.repo.EmployeeRepo;
//import lk.ijse.helloShoe.repo.SecurityRepo;
//import lk.ijse.helloShoe.service.AuthenticationService;
//import lk.ijse.helloShoe.service.JWTService;
//import lk.ijse.helloShoe.service.exception.NotFoundException;
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
//    EmployeeRepo employeeRepository;
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
//
//    @Override
//    public JWTAuthResponse updateaccount(SignUpRequest signUpRequest) {
//        if(!employeeRepository.existsByEmployeeCode(signUpRequest.getEmail())){
//            throw new NotFoundException("User"+ signUpRequest.getEmail() + "Not Found...");
//        }
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
