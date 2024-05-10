package lk.ijse.helloShoe.service;

import lk.ijse.helloShoe.dto.CustomDTO;
import lk.ijse.helloShoe.dto.SupplierDTO;
import lk.ijse.helloShoe.entity.Supplier;

import java.util.List;

public interface SupplierService {
    void saveSupplier(SupplierDTO dto);
    void updateSupplier(SupplierDTO dto);
    void deleteSupplier(String supplierCode);
    List<SupplierDTO> getAllSupplier();
    CustomDTO supplierIdGenerate();
    Supplier searchSupplierCode(String supplierCode);
}
