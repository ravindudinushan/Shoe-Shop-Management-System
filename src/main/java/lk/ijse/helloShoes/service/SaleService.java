package lk.ijse.helloShoes.service;

import lk.ijse.helloShoes.dto.CustomDTO;
import lk.ijse.helloShoes.dto.SaleDTO;
import lk.ijse.helloShoes.dto.SaleDetailsDTO;
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
}
