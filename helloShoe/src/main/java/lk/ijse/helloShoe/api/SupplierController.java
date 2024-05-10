package lk.ijse.helloShoe.api;

import lk.ijse.helloShoe.dto.CustomDTO;
import lk.ijse.helloShoe.dto.SupplierDTO;
import lk.ijse.helloShoe.embeded.Address;
import lk.ijse.helloShoe.embeded.Contact;
import lk.ijse.helloShoe.entity.Supplier;
import lk.ijse.helloShoe.service.SupplierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/supplier")
@CrossOrigin
public class SupplierController {

    @Autowired
    SupplierService supplierService;

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public List<SupplierDTO> getAllSupplier(){
        return supplierService.getAllSupplier();
    }

    @ResponseStatus(HttpStatus.CREATED)
    @GetMapping(path = "/supplierIdGenerate")
    public @ResponseBody CustomDTO supplierIdGenerate() {
        return supplierService.supplierIdGenerate();
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public void saveSupplier(@ModelAttribute SupplierDTO supplierDTO, @ModelAttribute Address address, @ModelAttribute Contact contact) {
        supplierDTO.setAddress(address);
        supplierDTO.setContact(contact);
        supplierService.saveSupplier(supplierDTO);
        System.out.println(supplierDTO);
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping(params = {"supplierCode"})
    public void deleteSupplier(@RequestParam String supplierCode) {
        supplierService.deleteSupplier(supplierCode);
    }

    @PutMapping
    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public void updateSupplier(@RequestBody SupplierDTO dto) {
        supplierService.updateSupplier(dto);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @GetMapping(path = "/searchSupplier", params = {"supplierCode"})
    public Supplier searchSupplierCode(String supplierCode) {
        return supplierService.searchSupplierCode(supplierCode);
    }
}
