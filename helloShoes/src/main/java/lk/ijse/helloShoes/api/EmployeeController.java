package lk.ijse.helloShoes.api;

import lk.ijse.helloShoes.dto.CustomDTO;
import lk.ijse.helloShoes.dto.EmployeeDTO;
import lk.ijse.helloShoes.embeded.Address;
import lk.ijse.helloShoes.entity.Employee;
import lk.ijse.helloShoes.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.Base64;
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
        String encodedImageData = encodeToBase64(dto.getProfilePic().getBytes());
        dto.setProfilePic(encodedImageData);
        employeeService.saveEmployee(dto);
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping(params = {"employeeCode"})
    public void deleteEmployee(@RequestParam String employeeCode) {
        employeeService.deleteEmployee(employeeCode);
    }

    @PutMapping
    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public void updateEmployee(@RequestBody EmployeeDTO dto) {
        // Encode the image data to base64
        String encodedImageData = encodeToBase64(dto.getProfilePic().getBytes());
        dto.setProfilePic(encodedImageData);
        // Update the inventory
        employeeService.updateEmployee(dto);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @GetMapping(path = "/searchEmployee", params = {"employeeCode"})
    public Employee searchInventoryCode(String employeeCode) {
        return employeeService.searchEmployeeCode(employeeCode);
    }

    private String encodeToBase64(byte[] imageData) {
        return Base64.getEncoder().encodeToString(imageData);
    }
}
