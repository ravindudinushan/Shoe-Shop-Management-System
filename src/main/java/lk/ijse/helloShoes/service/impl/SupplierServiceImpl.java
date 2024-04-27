package lk.ijse.helloShoes.service.impl;

import lk.ijse.helloShoes.dto.CustomDTO;
import lk.ijse.helloShoes.dto.SupplierDTO;
import lk.ijse.helloShoes.entity.Supplier;
import lk.ijse.helloShoes.repo.SupplierRepo;
import lk.ijse.helloShoes.service.SupplierService;
import lk.ijse.helloShoes.service.exception.NotFoundException;
import lk.ijse.helloShoes.util.Transformer;
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
    Transformer transformer;

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
        if(!repo.existsById(dto.getSupplierCode())){
            throw new NotFoundException("Update Failed; supplier code: " + dto.getSupplierCode() + " does not exist");
        }
        repo.save(mapper.map(dto, Supplier.class));
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
        return null;
    }
}
