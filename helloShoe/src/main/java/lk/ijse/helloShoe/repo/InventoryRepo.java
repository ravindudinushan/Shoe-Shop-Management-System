package lk.ijse.helloShoe.repo;

import lk.ijse.helloShoe.entity.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InventoryRepo extends JpaRepository<Inventory,String> {
    Boolean existsByItemCode(String id);
    Inventory findByItemCode(String id);
    void deleteByItemCode(String id);
}
