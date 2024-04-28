package lk.ijse.helloShoes.repo;

import lk.ijse.helloShoes.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepo extends JpaRepository<Customer,String> {
}
