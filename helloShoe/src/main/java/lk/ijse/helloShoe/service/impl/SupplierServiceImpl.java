package lk.ijse.helloShoe.service.impl;

import lk.ijse.helloShoe.dto.CustomDTO;
import lk.ijse.helloShoe.dto.SupplierDTO;
import lk.ijse.helloShoe.entity.Supplier;
import lk.ijse.helloShoe.repo.SupplierRepo;
import lk.ijse.helloShoe.service.SupplierService;
import lk.ijse.helloShoe.service.exception.NotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class SupplierServiceImpl implements SupplierService {

    @Autowired
    SupplierRepo repo;

    @Autowired
    private ModelMapper mapper;

    @Override
    public void saveSupplier(SupplierDTO dto) {
        Supplier supplier = new Supplier(dto.getSupplierCode(), dto.getSupplierName(), dto.getCategory(), dto.getAddress(), dto.getContact(), dto.getEmail());
        if (repo.existsById(dto.getSupplierCode())) {
            throw new RuntimeException("Supplier Already Exist. Please enter another id..!");
        }
//        repo.save(mapper.map(dto, Supplier.class));
        System.out.println(supplier);
        repo.save(supplier);
    }

    @Override
    public void updateSupplier(SupplierDTO dto) {
        Supplier supplier = new Supplier(dto.getSupplierCode(), dto.getSupplierName(), dto.getCategory(), dto.getAddress(), dto.getContact(), dto.getEmail());
        if (!repo.existsById(dto.getSupplierCode())) {
            throw new RuntimeException("Supplier Not Exist. Please enter Valid id..!");
        }
        repo.save(supplier);
    }

    @Override
    public void deleteSupplier(String supplierCode) {
        if(!repo.existsById(supplierCode)){
            throw new NotFoundException("Delete Failed; supplier code: " + supplierCode + " does not exist");
        }
        repo.deleteById(supplierCode);
    }

    @Override
    public List<SupplierDTO> getAllSupplier() {
        return repo.findAll().stream().map(supplier -> mapper.map(supplier, SupplierDTO.class)).toList();
    }

    @Override
    public CustomDTO supplierIdGenerate() {
        return new CustomDTO(repo.getLastIndex());
    }

    @Override
    public Supplier searchSupplierCode(String supplierCode) {
        if (!repo.existsById(supplierCode)) {
            throw new RuntimeException("Wrong ID. Please enter Valid id..!");
        }
        return mapper.map(repo.findById(supplierCode).get(), Supplier.class);
    }
}
