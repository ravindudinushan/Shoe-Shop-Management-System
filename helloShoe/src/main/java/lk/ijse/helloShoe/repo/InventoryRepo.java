package lk.ijse.helloShoe.repo;

import lk.ijse.helloShoe.entity.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InventoryRepo extends JpaRepository<Inventory,String> {

}
