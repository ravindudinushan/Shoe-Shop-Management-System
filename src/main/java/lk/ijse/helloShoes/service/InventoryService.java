package lk.ijse.helloShoes.service;

import lk.ijse.helloShoes.dto.InventoryDTO;
import lk.ijse.helloShoes.entity.Inventory;

import java.util.ArrayList;
import java.util.List;

public interface InventoryService {
    InventoryDTO saveInventory(InventoryDTO dto);
    void updateInventory(InventoryDTO dto);
    void deleteInventory(String itemCode);
    List<InventoryDTO> getAllInventory();
    InventoryDTO inventoryIdGenerate();
    Inventory searchInventoryCode(String itemCode);
}
