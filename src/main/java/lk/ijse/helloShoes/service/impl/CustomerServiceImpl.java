package lk.ijse.helloShoes.service.impl;

import lk.ijse.helloShoes.dto.CustomDTO;
import lk.ijse.helloShoes.dto.CustomerDTO;
import lk.ijse.helloShoes.entity.Customer;
import lk.ijse.helloShoes.service.CustomerService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class CustomerServiceImpl implements CustomerService {
    @Override
    public void saveCustomer(CustomerDTO dto) {

    }

    @Override
    public void updateCustomer(CustomerDTO dto) {

    }

    @Override
    public void deleteCustomer(String customerCode) {

    }

    @Override
    public List<CustomerDTO> getAllCustomer() {
        return null;
    }

    @Override
    public CustomDTO CustomerIdGenerate() {
        return null;
    }

    @Override
    public Customer searchCustomerCode(String customerCode) {
        return null;
    }
}
