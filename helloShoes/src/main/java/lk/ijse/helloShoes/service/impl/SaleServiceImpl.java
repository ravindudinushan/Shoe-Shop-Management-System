package lk.ijse.helloShoes.service.impl;

import lk.ijse.helloShoes.dto.CustomDTO;
import lk.ijse.helloShoes.dto.SaleDTO;
import lk.ijse.helloShoes.dto.SaleDetailsDTO;
import lk.ijse.helloShoes.entity.Inventory;
import lk.ijse.helloShoes.entity.Sale;
import lk.ijse.helloShoes.entity.SaleDetails;
import lk.ijse.helloShoes.repo.InventoryRepo;
import lk.ijse.helloShoes.repo.SaleDetailsRepo;
import lk.ijse.helloShoes.repo.SaleRepo;
import lk.ijse.helloShoes.service.SaleService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;

@Service
@Transactional
public class SaleServiceImpl implements SaleService {

    @Autowired
    private SaleRepo saleRepo;

    @Autowired
    private SaleDetailsRepo saleDetailsRepo;

    @Autowired
    private InventoryRepo inventoryRepo;

    @Autowired
    private ModelMapper mapper;

    @Override
    public void placeOrder(SaleDTO dto) {
        Sale sale = mapper.map(dto, Sale.class);
        if (saleRepo.existsById(sale.getOrderNo())) {
            throw new RuntimeException("Order" + sale.getOrderNo() + " Already added.!");
        }
        saleRepo.save(sale);

        //Update Item Qty
        for (SaleDetails od : sale.getSaleDetails()) {
            Inventory inventory = inventoryRepo.findById(od.getItemCode()).get();
            inventory.setQuantity(inventory.getQuantity() - od.getQuantity());
            inventoryRepo.save(inventory);
        }
    }

    @Override
    public ArrayList<SaleDTO> LoadOrders() {
        return mapper.map(saleRepo.findAll(), new TypeToken<ArrayList<SaleDTO>>() {
        }.getType());
    }

    @Override
    public ArrayList<SaleDetailsDTO> LoadOrderDetails() {
        return mapper.map(saleDetailsRepo.findAll(), new TypeToken<ArrayList<SaleDetailsDTO>>() {
        }.getType());
    }

    @Override
    public CustomDTO OrderIdGenerate() {
        return new CustomDTO(saleRepo.getLastIndex());
    }

    @Override
    public CustomDTO getSumOrders() {
        return new CustomDTO(saleRepo.getSumOrders());
    }

    @Override
    public Object[] getTotalSalesAndProfit() {
        return saleRepo.getTotalSalesAndProfit();
    }

    @Override
    public Object[] getMostSoldItem() {
        return saleRepo.getMostSoldItem();
    }

    @Override
    public String getBase64EncodedImageOfMostSoldItem() {
        return saleRepo.getBase64EncodedImageOfMostSoldItem();
    }

    @Override
    public int getMostSoldItemQuantity() {
        return saleRepo.getMostSoldItemQuantity();
    }
}
