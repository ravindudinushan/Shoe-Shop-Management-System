package lk.ijse.helloShoes.service;

import lk.ijse.helloShoes.dto.CustomDTO;
import lk.ijse.helloShoes.dto.CustomerDTO;
import lk.ijse.helloShoes.entity.Customer;

import java.util.List;

public interface CustomerService {
    void saveCustomer(CustomerDTO dto);
    void updateCustomer(CustomerDTO dto);
    void deleteCustomer(String customerCode);
    List<CustomerDTO> getAllCustomer();
    CustomDTO customerIdGenerate();
    Customer searchCustomerCode(String customerCode);
}
