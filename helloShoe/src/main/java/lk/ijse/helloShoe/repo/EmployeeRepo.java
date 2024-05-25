package lk.ijse.helloShoe.repo;

import lk.ijse.helloShoe.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface EmployeeRepo extends JpaRepository<Employee,String> {
    @Query(value = "SELECT employee_code FROM Employee ORDER BY employee_code DESC LIMIT 1", nativeQuery = true)
    String getLastIndex();

    Boolean existsByEmployeeCode(String id);
}
