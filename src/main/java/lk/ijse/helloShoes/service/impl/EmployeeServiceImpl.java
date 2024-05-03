package lk.ijse.helloShoes.service.impl;

import lk.ijse.helloShoes.dto.CustomDTO;
import lk.ijse.helloShoes.dto.EmployeeDTO;
import lk.ijse.helloShoes.entity.Employee;
import lk.ijse.helloShoes.service.EmployeeService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class EmployeeServiceImpl implements EmployeeService {
    @Override
    public void saveEmployee(EmployeeDTO dto) {

    }

    @Override
    public void updateEmployee(EmployeeDTO dto) {

    }

    @Override
    public void deleteEmployee(String employeeCode) {

    }

    @Override
    public List<EmployeeDTO> getAllEmployee() {
        return null;
    }

    @Override
    public CustomDTO employeeIdGenerate() {
        return null;
    }

    @Override
    public Employee searchEmployeeCode(String employeeCode) {
        return null;
    }
}
