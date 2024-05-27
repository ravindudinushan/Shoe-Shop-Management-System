package lk.ijse.helloShoe.service;

import lk.ijse.helloShoe.dto.CustomDTO;
import lk.ijse.helloShoe.dto.SaleDTO;
import lk.ijse.helloShoe.dto.SaleDetailsDTO;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;

public interface SaleService {
    void placeOrder(@RequestBody SaleDTO dto);

    ArrayList<SaleDTO> LoadOrders();

    ArrayList<SaleDetailsDTO> LoadOrderDetails();

    @ResponseBody
    CustomDTO OrderIdGenerate();

    @ResponseBody
    CustomDTO getSumOrders();

    Double getTotalSales();

    Double getTotalProfit();

    Object[] getMostSoldItem();

    String getBase64EncodedImageOfMostSoldItem();

    int getMostSoldItemQuantity();

    void deleteOrder(String orderNo);

    void refundOrder(String orderNo);
}
