package lk.ijse.helloShoe.api;

import lk.ijse.helloShoe.dto.CustomDTO;
import lk.ijse.helloShoe.dto.SaleDTO;
import lk.ijse.helloShoe.service.SaleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/sale")
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

    @GetMapping("/total-sales-profit")
    public Object[] getTotalSalesAndProfit() {
        return saleService.getTotalSalesAndProfit();
    }

    @GetMapping("/most-sold-item")
    public Object[] getMostSoldItem() {
        return saleService.getMostSoldItem();
    }

    @GetMapping("/most-sold-item-image")
    public String getMostSoldItemImage() {
        return saleService.getBase64EncodedImageOfMostSoldItem();
    }

    @GetMapping("/most-sold-item-quantity")
    public int getMostSoldItemQuantity() {
        return saleService.getMostSoldItemQuantity();
    }
}
