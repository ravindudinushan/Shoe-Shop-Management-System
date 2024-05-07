package lk.ijse.helloShoes.api;

import lk.ijse.helloShoes.dto.InventoryDTO;
import lk.ijse.helloShoes.entity.Inventory;
import lk.ijse.helloShoes.service.InventoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import java.util.Base64;
import org.springframework.web.bind.annotation.*;

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
    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public void saveInventory(@RequestBody InventoryDTO dto){
        String encodedImageData = encodeToBase64(dto.getItemPic().getBytes());
        dto.setItemPic(encodedImageData);

        // Save the inventory
        inventoryService.saveInventory(dto);
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping(params = {"itemCode"})
    public void deleteInventory(@RequestParam String itemCode) {
        inventoryService.deleteInventory(itemCode);
    }

    @PutMapping
    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public void updateInventory(@RequestBody InventoryDTO dto) {
        // Encode the image data to base64
        String encodedImageData = encodeToBase64(dto.getItemPic().getBytes());
        dto.setItemPic(encodedImageData);

        // Update the inventory
        inventoryService.updateInventory(dto);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @GetMapping(path = "/searchInventory", params = {"itemCode"})
    public Inventory searchInventoryCode(String itemCode) {
        return inventoryService.searchInventoryCode(itemCode);
    }

    private String encodeToBase64(byte[] imageData) {
        return Base64.getEncoder().encodeToString(imageData);
    }
}
