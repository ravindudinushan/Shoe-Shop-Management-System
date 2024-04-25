package lk.ijse.helloShoes.service;

import lk.ijse.helloShoes.dto.CustomDTO;
import lk.ijse.helloShoes.dto.SupplierDTO;
import lk.ijse.helloShoes.entity.Supplier;

import java.util.List;

public interface SupplierService {
    SupplierDTO saveSupplier(SupplierDTO dto);
    void updateSupplier(SupplierDTO dto);
    void deleteSupplier(String supplierCode);
    List<SupplierDTO> getAllSupplier();
    CustomDTO supplierIdGenerate();
    Supplier searchSupplierCode(String supplierCode);
}
