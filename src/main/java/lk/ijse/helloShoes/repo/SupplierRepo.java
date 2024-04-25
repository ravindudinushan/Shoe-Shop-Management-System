package lk.ijse.helloShoes.repo;

import lk.ijse.helloShoes.entity.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface SupplierRepo extends JpaRepository<Supplier, String> {
    @Query(value = "SELECT supplierCode FROM Supplier ORDER BY supplierCode DESC LIMIT 1", nativeQuery = true)
    String getLastIndex();
}
