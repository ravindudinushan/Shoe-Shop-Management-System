package lk.ijse.helloShoes.api;

import jakarta.validation.Valid;
import lk.ijse.helloShoes.dto.InventoryDTO;
import lk.ijse.helloShoes.dto.SupplierDTO;
import lk.ijse.helloShoes.enums.Status;
import lk.ijse.helloShoes.service.InventoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.Base64;
import java.util.List;

@RestController
@RequestMapping("/inventory")
@CrossOrigin
public class InventoryController {

    @Autowired
    InventoryService inventoryService;

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public List<InventoryDTO> getAllCustomers(){
        return inventoryService.getAllInventory();
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public void saveCustomer(@RequestPart("itemCode") String itemCode,
                                     @RequestPart("itemDesc") String itemDesc,
                                     @RequestPart("itemPic") String itemPic,
                                     @RequestPart("category") String category,
                                     @RequestPart("size") int size,
                                     @RequestPart("unitPrice") double unitPrice,
                                     @RequestPart("status") Status status){
        String base64Pic = Base64.getEncoder().encodeToString(itemPic.getBytes()); //Build Base64 image
        InventoryDTO inventory = new InventoryDTO(itemCode,itemDesc,base64Pic,category,size,unitPrice,status);
        inventoryService.saveInventory(inventory);
    }
//    @DeleteMapping("/{itemCode}")
//    @ResponseStatus(HttpStatus.NO_CONTENT)
//    public void deleteInventory(@PathVariable("itemCode") String itemCode){
//        inventoryService.deleteInventory(itemCode);
//    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping(params = {"inventoryCode"})
    public void deleteSupplier(@RequestParam String inventoryCode) {
        inventoryService.deleteInventory(inventoryCode);
    }

//    @PatchMapping(value = "/{itemCode}",consumes = MediaType.APPLICATION_JSON_VALUE)
//    @ResponseStatus(HttpStatus.NO_CONTENT)
//    public void updateInventory(@PathVariable("itemCode") String itemCode, @Valid @RequestBody InventoryDTO inventoryDTO){
//        inventoryDTO.setItemCode(itemCode);
//        inventoryService.updateInventory(inventoryDTO);
//    }

    @PutMapping
    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public void updateInventory(@RequestBody InventoryDTO dto) {
        inventoryService.updateInventory(dto);
    }
}
