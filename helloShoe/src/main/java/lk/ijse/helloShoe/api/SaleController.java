package lk.ijse.helloShoe.api;

import lk.ijse.helloShoe.dto.CustomDTO;
import lk.ijse.helloShoe.dto.SaleDTO;
import lk.ijse.helloShoe.dto.SaleDetailsDTO;
import lk.ijse.helloShoe.service.SaleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/sale")
@CrossOrigin
public class SaleController {

    @Autowired
    SaleService saleService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void placeOrder(@RequestBody SaleDTO dto) {
        saleService.placeOrder(dto);
    }

    @GetMapping(path = "/LoadOrders")
    public ResponseEntity<List<SaleDTO>> LoadOrders() {
        List<SaleDTO> orders = saleService.LoadOrders();
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    @GetMapping(path = "/LoadOrderDetails")
    public ResponseEntity<List<SaleDetailsDTO>> LoadOrderDetails() {
        List<SaleDetailsDTO> orderDetails = saleService.LoadOrderDetails();
        return new ResponseEntity<>(orderDetails, HttpStatus.OK);
    }

    @GetMapping(path = "/OrderIdGenerate")
    public ResponseEntity<CustomDTO> OrderIdGenerate() {
        CustomDTO orderId = saleService.OrderIdGenerate();
        return new ResponseEntity<>(orderId, HttpStatus.OK);
    }

    @GetMapping(path = "/ordersCount")
    public ResponseEntity<CustomDTO> getSumOrders() {
        CustomDTO sumOrders = saleService.getSumOrders();
        return new ResponseEntity<>(sumOrders, HttpStatus.OK);
    }

    @GetMapping("/total-sales-profit")
    public ResponseEntity<Object[]> getTotalSalesAndProfit() {
        Object[] totalSalesAndProfit = saleService.getTotalSalesAndProfit();
        return new ResponseEntity<>(totalSalesAndProfit, HttpStatus.OK);
    }

    @GetMapping("/most-sold-item")
    public ResponseEntity<Object[]> getMostSoldItem() {
        Object[] mostSoldItem = saleService.getMostSoldItem();
        return new ResponseEntity<>(mostSoldItem, HttpStatus.OK);
    }

    @GetMapping("/most-sold-item-image")
    public ResponseEntity<String> getMostSoldItemImage() {
        String mostSoldItemImage = saleService.getBase64EncodedImageOfMostSoldItem();
        return new ResponseEntity<>(mostSoldItemImage, HttpStatus.OK);
    }

    @GetMapping("/most-sold-item-quantity")
    public ResponseEntity<Integer> getMostSoldItemQuantity() {
        int mostSoldItemQuantity = saleService.getMostSoldItemQuantity();
        return new ResponseEntity<>(mostSoldItemQuantity, HttpStatus.OK);
    }
}
