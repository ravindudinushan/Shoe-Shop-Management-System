package lk.ijse.helloShoe.service;

import lk.ijse.helloShoe.dto.CustomDTO;
import lk.ijse.helloShoe.dto.EmployeeDTO;
import lk.ijse.helloShoe.entity.Employee;

import java.util.List;

public interface EmployeeService {
    void saveEmployee(EmployeeDTO dto);
    void updateEmployee(EmployeeDTO dto);
    void deleteEmployee(String employeeCode);
    List<EmployeeDTO> getAllEmployee();
    CustomDTO employeeIdGenerate();
    Employee searchEmployeeCode(String employeeCode);
}
