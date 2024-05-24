package lk.ijse.helloShoe.api;

import lk.ijse.helloShoe.dto.InventoryDTO;
import lk.ijse.helloShoe.entity.Inventory;
import lk.ijse.helloShoe.service.InventoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.Base64;
import java.util.List;

@RestController
@RequestMapping("api/v1/inventory")
@CrossOrigin
public class InventoryController {

    @Autowired
    InventoryService inventoryService;

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public List<InventoryDTO> getAllInventory(){
        return inventoryService.getAllInventory();
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public void saveInventory(@RequestBody InventoryDTO dto){
        inventoryService.saveInventory(dto);
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping(params = {"itemCode"})
    public void deleteInventory(@RequestParam String itemCode) {
        inventoryService.deleteInventory(itemCode);
    }

    @PutMapping
    public void updateInventory(@RequestBody InventoryDTO dto) {
        inventoryService.updateInventory(dto);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @GetMapping(path = "/searchInventory", params = {"itemCode"})
    public Inventory searchInventoryCode(String itemCode) {
        return inventoryService.searchInventoryCode(itemCode);
    }

}
