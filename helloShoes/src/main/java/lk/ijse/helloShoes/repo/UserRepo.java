//package lk.ijse.helloShoes.repo;
//
//import lk.ijse.helloShoes.entity.User;
//import org.springframework.data.jpa.repository.JpaRepository;
//
//import java.util.Optional;
//
//public interface UserRepo extends JpaRepository<User,String> {
//    Boolean existsByEmail(String email);
//    User findByEmailAndRole(String email,String role);
//    void deleteByEmail(String email);
//    Optional<User> findByEmail(String email);
//}
