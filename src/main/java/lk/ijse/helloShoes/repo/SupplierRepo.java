package lk.ijse.helloShoes.repo;

import lk.ijse.helloShoes.entity.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface SupplierRepo extends JpaRepository<Supplier, String> {
    @Query(value = "SELECT supplier_code FROM Supplier ORDER BY supplier_code DESC LIMIT 1", nativeQuery = true)
    String getLastIndex();
}
