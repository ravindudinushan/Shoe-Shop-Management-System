package lk.ijse.helloShoe.service;

import lk.ijse.helloShoe.dto.InventoryDTO;
import lk.ijse.helloShoe.entity.Inventory;

import java.util.List;

public interface InventoryService {
    List<InventoryDTO> getAllInventory();
    InventoryDTO getInventoryDetails(String id);
    InventoryDTO saveInventory(InventoryDTO inventoryDTO);
    void updateInventory(String id, InventoryDTO inventoryDTO);
    void deleteInventory(String id);
}
