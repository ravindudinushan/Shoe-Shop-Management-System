package lk.ijse.helloShoes.service.impl;

import lk.ijse.helloShoes.dto.InventoryDTO;
import lk.ijse.helloShoes.entity.Inventory;
import lk.ijse.helloShoes.repo.InventoryRepo;
import lk.ijse.helloShoes.service.InventoryService;
import lk.ijse.helloShoes.service.exception.NotFoundException;
import lk.ijse.helloShoes.util.Transformer;
import lk.ijse.helloShoes.util.UtilMatter;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;

public class InventoryServiceImpl implements InventoryService {

    @Autowired
    InventoryRepo repo;

    @Autowired
    Transformer transformer;

    @Override
    public InventoryDTO saveInventory(InventoryDTO inventoryDTO) {
        inventoryDTO.setItemCode(UtilMatter.generateId());
        return transformer.fromInventoryEntity(repo.save(transformer.toInventoryEntity(inventoryDTO)));
    }

    @Override
    public void updateInventory(InventoryDTO dto) {
        if(!repo.existsById(dto.getItemCode())){
            throw new NotFoundException("Update Failed; item code: " + dto.getItemCode() + " does not exist");
        }
        repo.save(transformer.toInventoryEntity(dto));
    }

    @Override
    public void deleteInventory(String itemCode) {
        if(!repo.existsById(itemCode)){ throw new NotFoundException("Delete Failed; item code: " + itemCode + " does not exist");
        }
        repo.deleteById(itemCode);
    }

    @Override
    public List<InventoryDTO> getAllInventory() {
        return repo.findAll().stream().map(inventory -> transformer.fromInventoryEntity(inventory)).toList();
    }

    @Override
    public InventoryDTO inventoryIdGenerate() {
        return null;
    }


    @Override
    public Inventory searchInventoryCode(String inventoryCode) {
        return null;
    }
}
