package lk.ijse.helloShoes.api;

import lk.ijse.helloShoes.dto.CustomDTO;
import lk.ijse.helloShoes.dto.CustomerDTO;
import lk.ijse.helloShoes.embeded.Address1;
import lk.ijse.helloShoes.entity.Customer;
import lk.ijse.helloShoes.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/customer")
@CrossOrigin
public class CustomerController {

    @Autowired
    CustomerService customerService;

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public List<CustomerDTO> getAllCustomers(){
        return customerService.getAllCustomer();
    }

    @ResponseStatus(HttpStatus.CREATED)
    @GetMapping(path = "/customerIdGenerate")
    public @ResponseBody
    CustomDTO customerIdGenerate() {
        return customerService.customerIdGenerate();
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public void saveCustomer(@ModelAttribute CustomerDTO customerDTO, @ModelAttribute Address1 address) {
        customerDTO.setAddress(address);
        customerService.saveCustomer(customerDTO);
        System.out.println(customerDTO);
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping(params = {"customerCode"})
    public void deleteCustomer(@RequestParam String customerCode) {
        customerService.deleteCustomer(customerCode);
    }

    @PutMapping
    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public void updateCustomer(@RequestBody CustomerDTO dto) {
        customerService.updateCustomer(dto);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @GetMapping(path = "/searchCustomer", params = {"customerCode"})
    public Customer searchCustomerCode(String customerCode) {
        return customerService.searchCustomerCode(customerCode);
    }
}
