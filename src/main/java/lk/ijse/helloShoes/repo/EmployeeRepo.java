package lk.ijse.helloShoes.repo;

import lk.ijse.helloShoes.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepo extends JpaRepository<Employee,String> {
}
