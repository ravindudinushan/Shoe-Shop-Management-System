package lk.ijse.helloShoe.repo;

import lk.ijse.helloShoe.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CustomerRepo extends JpaRepository<Customer,String> {
    @Query(value = "SELECT customer_code FROM Customer ORDER BY customer_code DESC LIMIT 1", nativeQuery = true)
    String getLastIndex();

    @Query(value = "SELECT * FROM Customer WHERE DAY(dob) = DAY(CURDATE()) AND MONTH(dob) = MONTH(CURDATE())", nativeQuery = true)
    List<Customer> findCustomersByBirthdayToday();
}
