package lk.ijse.helloShoes.util;

import lk.ijse.helloShoes.dto.InventoryDTO;
import lk.ijse.helloShoes.dto.SupplierDTO;
import lk.ijse.helloShoes.entity.Inventory;
import lk.ijse.helloShoes.entity.Supplier;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class Transformer {

    @Autowired
    ModelMapper mapper;

    public InventoryDTO fromInventoryEntity(Inventory inventory){
        InventoryDTO inventoryDTO = mapper.map(inventory, InventoryDTO.class);
        return inventoryDTO;
    }

    public Inventory toInventoryEntity(InventoryDTO inventoryDTO){
        Inventory inventory = mapper.map(inventoryDTO, Inventory.class);
        return inventory;
    }

    public SupplierDTO fromSupplierEntity(Supplier supplier){
        SupplierDTO supplierDTO = mapper.map(supplier, SupplierDTO.class);
        return supplierDTO;
    }

    public Supplier toSupplierEntity(SupplierDTO supplierDTO){
        Supplier supplier = mapper.map(supplierDTO, Supplier.class);
        return supplier;
    }
}
