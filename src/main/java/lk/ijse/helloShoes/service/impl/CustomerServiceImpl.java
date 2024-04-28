package lk.ijse.helloShoes.service.impl;

import lk.ijse.helloShoes.dto.CustomDTO;
import lk.ijse.helloShoes.dto.CustomerDTO;
import lk.ijse.helloShoes.entity.Customer;
import lk.ijse.helloShoes.repo.CustomerRepo;
import lk.ijse.helloShoes.service.CustomerService;
import lk.ijse.helloShoes.service.exception.NotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class CustomerServiceImpl implements CustomerService {

    @Autowired
    CustomerRepo repo;

    @Autowired
    private ModelMapper mapper;

    @Override
    public void saveCustomer(CustomerDTO dto) {
        Customer customer = new Customer(dto.getCustomerCode(), dto.getCustomerName(), dto.getGender(), dto.getDate(), dto.getLevel(), dto.getPoints(), dto.getDob(), dto.getAddress(), dto.getContact(), dto.getEmail());
        if (repo.existsById(dto.getCustomerCode())) {
            throw new RuntimeException("Customer Already Exist. Please enter another id..!");
        }
        System.out.println(customer);
        repo.save(customer);
    }

    @Override
    public void updateCustomer(CustomerDTO dto) {
        Customer customer = new Customer(dto.getCustomerCode(), dto.getCustomerName(), dto.getGender(), dto.getDate(), dto.getLevel(), dto.getPoints(), dto.getDob(), dto.getAddress(), dto.getContact(), dto.getEmail());
        if (!repo.existsById(dto.getCustomerCode())) {
            throw new RuntimeException("Customer Not Exist. Please enter Valid id..!");
        }
        repo.save(customer);
    }

    @Override
    public void deleteCustomer(String customerCode) {
        if(!repo.existsById(customerCode)){
            throw new NotFoundException("Delete Failed; customer code: " + customerCode + " does not exist");
        }
        repo.deleteById(customerCode);
    }

    @Override
    public List<CustomerDTO> getAllCustomer() {
        return repo.findAll().stream().map(customer -> mapper.map(customer, CustomerDTO.class)).toList();
    }

    @Override
    public CustomDTO customerIdGenerate() {
        return new CustomDTO(repo.getLastIndex());
    }

    @Override
    public Customer searchCustomerCode(String customerCode) {
        if (!repo.existsById(customerCode)) {
            throw new RuntimeException("Wrong ID. Please enter Valid id..!");
        }
        return mapper.map(repo.findById(customerCode).get(), Customer.class);
    }
}
