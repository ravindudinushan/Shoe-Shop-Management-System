package lk.ijse.helloShoes.repo;

import lk.ijse.helloShoes.entity.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InventoryRepo extends JpaRepository<Inventory,String> {

}
