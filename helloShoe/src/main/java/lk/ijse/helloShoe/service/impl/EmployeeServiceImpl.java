package lk.ijse.helloShoe.service.impl;

import lk.ijse.helloShoe.dto.CustomDTO;
import lk.ijse.helloShoe.dto.EmployeeDTO;
import lk.ijse.helloShoe.entity.Employee;
import lk.ijse.helloShoe.repo.EmployeeRepo;
import lk.ijse.helloShoe.service.EmployeeService;
import lk.ijse.helloShoe.service.exception.NotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class EmployeeServiceImpl implements EmployeeService {

    @Autowired
    private EmployeeRepo repo;

    @Autowired
    private ModelMapper mapper;

    @Override
    public void saveEmployee(EmployeeDTO dto) {
        if (repo.existsById(dto.getEmployeeCode())) {
            throw new RuntimeException("Employee Already Exist. Please enter another id..!");
        }
                repo.save(mapper.map(dto, Employee.class));
    }

    @Override
    public void updateEmployee(EmployeeDTO dto) {
        if (!repo.existsById(dto.getEmployeeCode())) {
            throw new RuntimeException("Supplier Not Exist. Please enter Valid id..!");
        }
        repo.save(mapper.map(dto, Employee.class));
    }

    @Override
    public void deleteEmployee(String employeeCode) {
        if(!repo.existsById(employeeCode)){ throw new NotFoundException("Delete Failed; employee code: " + employeeCode + " does not exist");
        }
        repo.deleteById(employeeCode);
    }

    @Override
    public List<EmployeeDTO> getAllEmployee() {
        return repo.findAll().stream().map(employee -> mapper.map(employee, EmployeeDTO.class)).toList();
    }

    @Override
    public CustomDTO employeeIdGenerate() {
        return new CustomDTO(repo.getLastIndex());
    }

    @Override
    public Employee searchEmployeeCode(String employeeCode) {
        if (!repo.existsById(employeeCode)) {
            throw new RuntimeException("Wrong ID. Please enter Valid id..!");
        }
        return mapper.map(repo.findById(employeeCode).get(), Employee.class);
    }
}
