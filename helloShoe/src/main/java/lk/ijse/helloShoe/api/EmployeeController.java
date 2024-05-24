package lk.ijse.helloShoe.api;

import lk.ijse.helloShoe.dto.CustomDTO;
import lk.ijse.helloShoe.dto.EmployeeDTO;
import lk.ijse.helloShoe.entity.Employee;
import lk.ijse.helloShoe.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/employee")
@CrossOrigin
public class EmployeeController {

    @Autowired
    EmployeeService employeeService;

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public List<EmployeeDTO> getAllEmployees(){
        return employeeService.getAllEmployee();
    }

    @ResponseStatus(HttpStatus.CREATED)
    @GetMapping(path = "/employeeIdGenerate")
    public @ResponseBody
    CustomDTO employeeIdGenerate() {
        return employeeService.employeeIdGenerate();
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public void saveEmployee(@RequestBody EmployeeDTO dto){
        employeeService.saveEmployee(dto);
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping(params = {"employeeCode"})
    public void deleteEmployee(@RequestParam String employeeCode) {
        employeeService.deleteEmployee(employeeCode);
    }

    @PutMapping
    public void updateEmployee(@RequestBody EmployeeDTO dto) {
        employeeService.updateEmployee(dto);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @GetMapping(path = "/searchEmployee", params = {"employeeCode"})
    public Employee searchInventoryCode(String employeeCode) {
        return employeeService.searchEmployeeCode(employeeCode);
    }
}
