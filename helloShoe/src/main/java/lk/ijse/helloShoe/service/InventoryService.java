package lk.ijse.helloShoe.service;

import lk.ijse.helloShoe.dto.InventoryDTO;
import lk.ijse.helloShoe.entity.Inventory;

import java.util.List;

public interface InventoryService {
    void saveInventory(InventoryDTO dto);
    void updateInventory(InventoryDTO dto);
    void deleteInventory(String itemCode);
    List<InventoryDTO> getAllInventory();
    InventoryDTO inventoryIdGenerate();
    Inventory searchInventoryCode(String itemCode);
}
