package lk.ijse.helloShoe.service.impl;//package lk.ijse.helloShoes.service.impl;

import lk.ijse.helloShoe.dto.UserDTO;
import lk.ijse.helloShoe.entity.User;
import lk.ijse.helloShoe.enums.Role;
import lk.ijse.helloShoe.repo.UserRepo;
import lk.ijse.helloShoe.service.UserService;
import lk.ijse.helloShoe.service.exception.DuplicateRecordException;
import lk.ijse.helloShoe.service.exception.NotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class UserServiceImpl implements UserService {
    UserRepo userRepository;
    ModelMapper modelMapper;

    public UserServiceImpl(UserRepo userRepository, ModelMapper modelMapper) {
        this.userRepository = userRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public UserDetailsService userDetailService() {
        return username -> userRepository.findByEmail(username)
                .orElseThrow(() -> new
                        UsernameNotFoundException(
                        "user not found"));
    }

    @Override
    public List<UserDTO> getAllUser() {
        return userRepository.findAll().stream().map(
                user -> modelMapper.map(user, UserDTO.class)
        ).toList();
    }

    @Override
    public UserDTO getUserDetails(String email, Role role) {
        if(!userRepository.existsByEmail(email)){
            throw new NotFoundException("User email :"+email+" Not Found!");
        }
        return modelMapper.map(userRepository.findByEmailAndRole(email,role), UserDTO.class);
    }

    @Override
    public UserDTO saveUser(UserDTO userDTO) {
        if(userRepository.existsByEmail(userDTO.getEmail())){
            throw new DuplicateRecordException("This User "+userDTO.getEmail()+" already have an account.");
        }
        return modelMapper.map(userRepository.save(modelMapper.map(
                userDTO, User.class)), UserDTO.class
        );
    }

    @Override
    public void updateUser(String email, UserDTO userDTO) {
        User existingUser = userRepository.findByEmailAndRole(email, userDTO.getRole());

        if(existingUser.getPassword().isEmpty()){
            throw new NotFoundException("User email :"+ email + "Not Found...");
        }

        existingUser.setPassword(userDTO.getPassword());
        existingUser.setRole(userDTO.getRole());

        userRepository.save(existingUser);
    }

    @Override
    public void deleteUser(String email) {
        if(!userRepository.existsByEmail(email)){
            throw  new NotFoundException("User email :"+ email + "Not Found...");
        }
        userRepository.deleteByEmail(email);
    }
}
