package lk.ijse.helloShoe.service;

import lk.ijse.helloShoe.dto.CustomDTO;
import lk.ijse.helloShoe.dto.CustomerDTO;
import lk.ijse.helloShoe.entity.Customer;

import java.util.List;

public interface CustomerService {
    void saveCustomer(CustomerDTO dto);
    void updateCustomer(CustomerDTO dto);
    void deleteCustomer(String customerCode);
    List<CustomerDTO> getAllCustomer();
    CustomDTO customerIdGenerate();
    Customer searchCustomerCode(String customerCode);
    List<String> sendWishes();
}
