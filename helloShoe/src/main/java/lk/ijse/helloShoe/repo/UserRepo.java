package lk.ijse.helloShoe.repo;
import lk.ijse.helloShoe.entity.User;
import lk.ijse.helloShoe.enums.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepo extends JpaRepository<User,String> {
    Boolean existsByEmail(String email);
    User findByEmailAndRole(String email, Role role);
    void deleteByEmail(String email);
    Optional<User> findByEmail(String email);
}
