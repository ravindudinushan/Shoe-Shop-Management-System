package lk.ijse.helloShoes.service.impl;

import lk.ijse.helloShoes.dto.CustomDTO;
import lk.ijse.helloShoes.dto.SaleDTO;
import lk.ijse.helloShoes.dto.SaleDetailsDTO;
import lk.ijse.helloShoes.service.SaleService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;

@Service
@Transactional
public class SaleServiceImpl implements SaleService {
    @Override
    public void placeOrder(SaleDTO dto) {

    }

    @Override
    public ArrayList<SaleDTO> LoadOrders() {
        return null;
    }

    @Override
    public ArrayList<SaleDetailsDTO> LoadOrderDetails() {
        return null;
    }

    @Override
    public CustomDTO OrderIdGenerate() {
        return null;
    }

    @Override
    public CustomDTO getSumOrders() {
        return null;
    }
}
