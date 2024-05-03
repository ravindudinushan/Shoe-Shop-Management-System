package lk.ijse.helloShoes.api;

import lk.ijse.helloShoes.dto.CustomDTO;
import lk.ijse.helloShoes.dto.SaleDTO;
import lk.ijse.helloShoes.service.SaleService;
import org.apache.tomcat.util.http.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1//sale")
@CrossOrigin
public class SaleController {

    @Autowired
    SaleService saleService;

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public void placeOrder(@RequestBody SaleDTO dto) {
        saleService.placeOrder(dto);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @GetMapping(path = "/LoadOrders")
    public void LoadOrders() {
        saleService.LoadOrders();
    }

    @ResponseStatus(HttpStatus.CREATED)
    @GetMapping(path = "/LoadOrderDetails")
    public void LoadOrderDetails() {
        saleService.LoadOrderDetails();
    }

    @ResponseStatus(HttpStatus.CREATED)
    @GetMapping(path = "/OrderIdGenerate")
    public @ResponseBody
    CustomDTO OrderIdGenerate() {
        return saleService.OrderIdGenerate();
    }

    @ResponseStatus(HttpStatus.CREATED)
    @GetMapping(path = "/ordersCount")
    public @ResponseBody CustomDTO getSumOrders() {
        return saleService.getSumOrders();
    }
}
