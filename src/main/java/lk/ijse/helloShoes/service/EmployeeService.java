package lk.ijse.helloShoes.service;

import lk.ijse.helloShoes.dto.CustomDTO;
import lk.ijse.helloShoes.dto.EmployeeDTO;
import lk.ijse.helloShoes.entity.Employee;

import java.util.List;

public interface EmployeeService {
    void saveEmployee(EmployeeDTO dto);
    void updateEmployee(EmployeeDTO dto);
    void deleteEmployee(String employeeCode);
    List<EmployeeDTO> getAllEmployee();
    CustomDTO employeeIdGenerate();
    Employee searchEmployeeCode(String employeeCode);
}
