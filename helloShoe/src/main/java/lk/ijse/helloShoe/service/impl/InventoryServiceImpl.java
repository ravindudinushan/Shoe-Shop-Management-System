package lk.ijse.helloShoe.service.impl;

import lk.ijse.helloShoe.dto.InventoryDTO;
import lk.ijse.helloShoe.entity.Customer;
import lk.ijse.helloShoe.entity.Inventory;
import lk.ijse.helloShoe.repo.InventoryRepo;
import lk.ijse.helloShoe.service.InventoryService;
import lk.ijse.helloShoe.service.exception.DuplicateRecordException;
import lk.ijse.helloShoe.service.exception.NotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Base64;
import java.util.List;

@Service
@Transactional
public class InventoryServiceImpl implements InventoryService {

    InventoryRepo inventoryRepository;
    ModelMapper modelMapper;

    public InventoryServiceImpl(InventoryRepo inventoryRepository, ModelMapper modelMapper) {
        this.inventoryRepository = inventoryRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public List<InventoryDTO> getAllInventory() {
        return inventoryRepository.findAll().stream().map(
                inventory -> modelMapper.map(inventory, InventoryDTO.class)
        ).toList();
    }

    @Override
    public InventoryDTO getInventoryDetails(String id) {
        if(!inventoryRepository.existsByItemCode(id)){
            throw new NotFoundException("Inventory "+id+" Not Found!");
        }
        return modelMapper.map(inventoryRepository.findByItemCode(id), InventoryDTO.class);
    }

    @Override
    public InventoryDTO saveInventory(InventoryDTO inventoryDTO) {
        if(inventoryRepository.existsByItemCode(inventoryDTO.getItemCode())){
            throw new DuplicateRecordException("This Inventory "+inventoryDTO.getItemCode()+" already exicts...");
        }
        return modelMapper.map(inventoryRepository.save(modelMapper.map(
                inventoryDTO, Inventory.class)), InventoryDTO.class
        );
    }

    @Override
    public void updateInventory(String id, InventoryDTO inventoryDTO) {
        Inventory existingInventory = inventoryRepository.findByItemCode(id);

        if(existingInventory.getItemCode().isEmpty()){
            throw new NotFoundException("Inventory "+ id + "Not Found...");
        }

        existingInventory.setItemDesc(inventoryDTO.getItemDesc());
        existingInventory.setItemPic(inventoryDTO.getItemPic());

        inventoryRepository.save(existingInventory);
    }

    @Override
    public void deleteInventory(String id) {
        if(!inventoryRepository.existsByItemCode(id)){
            throw  new NotFoundException("Inventory "+ id + "Not Found...");
        }
        inventoryRepository.deleteByItemCode(id);
    }
}
