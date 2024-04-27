package lk.ijse.helloShoes.api;

import lk.ijse.helloShoes.dto.CustomDTO;
import lk.ijse.helloShoes.dto.SupplierDTO;
import lk.ijse.helloShoes.embeded.Address;
import lk.ijse.helloShoes.embeded.Contact;
import lk.ijse.helloShoes.entity.Supplier;
import lk.ijse.helloShoes.service.SupplierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/supplier")
@CrossOrigin
public class SupplierController {

    @Autowired
    SupplierService supplierService;

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public List<SupplierDTO> getAllCustomers(){
        return supplierService.getAllSupplier();
    }

    @ResponseStatus(HttpStatus.CREATED)
    @GetMapping(path = "/supplierIdGenerate")
    public @ResponseBody CustomDTO supplierIdGenerate() {
        return supplierService.supplierIdGenerate();
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public void saveSupplier(@RequestBody SupplierDTO supplierDTO, @ModelAttribute Address address, @ModelAttribute Contact contact) {
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
