package lk.ijse.helloShoes.service;

import lk.ijse.helloShoes.dto.InventoryDTO;
import lk.ijse.helloShoes.entity.Inventory;

import java.util.ArrayList;

public interface InventoryService {
    InventoryDTO saveInventory(InventoryDTO dto);
    void updateInventory(InventoryDTO dto);
    void deleteInventory(String itemCode);
    ArrayList<InventoryDTO> getAllInventory();
    InventoryDTO inventoryIdGenerate();
    Inventory searchInventoryCode(String itemCode);
}
