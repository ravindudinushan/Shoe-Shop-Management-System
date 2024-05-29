package lk.ijse.helloShoe.service.impl;

import jakarta.annotation.PostConstruct;
import lk.ijse.helloShoe.dto.CustomDTO;
import lk.ijse.helloShoe.dto.SaleDTO;
import lk.ijse.helloShoe.dto.SaleDetailsDTO;
import lk.ijse.helloShoe.entity.Customer;
import lk.ijse.helloShoe.entity.Inventory;
import lk.ijse.helloShoe.entity.Sale;
import lk.ijse.helloShoe.entity.SaleDetails;
import lk.ijse.helloShoe.repo.CustomerRepo;
import lk.ijse.helloShoe.repo.InventoryRepo;
import lk.ijse.helloShoe.repo.SaleDetailsRepo;
import lk.ijse.helloShoe.repo.SaleRepo;
import lk.ijse.helloShoe.service.SaleService;
import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;
import org.modelmapper.TypeMap;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class SaleServiceImpl implements SaleService {

    @Autowired
    private SaleRepo saleRepo;

    @Autowired
    private CustomerRepo customerRepo;

    @Autowired
    private SaleDetailsRepo saleDetailsRepo;

    @Autowired
    private InventoryRepo inventoryRepo;

    @Autowired
    private ModelMapper mapper;

    @PostConstruct
    public void configureMapper() {
        mapper.addMappings(new PropertyMap<Sale, SaleDTO>() {
            @Override
            protected void configure() {
                map().setCustomerCode(source.getCustomerCode().getCustomerCode());
            }
        });
    }


    @Override
    public void placeOrder(SaleDTO dto) {
        Sale sale = mapper.map(dto, Sale.class);
        if (saleRepo.existsById(sale.getOrderNo())) {
            throw new RuntimeException("Order " + sale.getOrderNo() + " already added.!");
        }
        saleRepo.save(sale);

        // Update item quantities
        for (SaleDetails od : sale.getSaleDetails()) {
            Inventory inventory = inventoryRepo.findById(od.getItemCode()).get();
            inventory.setQuantity(inventory.getQuantity() - od.getQuantity());
            inventoryRepo.save(inventory);
        }

        // Update customer points
        Customer customer = customerRepo.findById(sale.getCustomerCode().getCustomerCode()).orElseThrow(() ->
                new RuntimeException("Customer not found."));
        customer.setPoints(customer.getPoints() + (int) sale.getAddPoints());
        customerRepo.save(customer);
    }

    private SaleDTO convertToDTO(Sale sale) {
        return mapper.map(sale, SaleDTO.class);
    }

    @Override
    public ArrayList<SaleDTO> LoadOrders() {
        List<Sale> sales = saleRepo.findAll();
        return sales.stream().map(this::convertToDTO).collect(Collectors.toCollection(ArrayList::new));
    }

    @Override
    public ArrayList<SaleDetailsDTO> LoadOrderDetails() {
        List<SaleDetails> saleDetails = saleDetailsRepo.findAll();
        return mapper.map(saleDetails, new TypeToken<List<SaleDetailsDTO>>() {}.getType());
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
    public Double getTotalSales() {
        return saleDetailsRepo.findTotalSales();
    }

    @Override
    public Double getTotalProfit() {
        return saleDetailsRepo.findTotalProfit();
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

    @Override
    public void deleteOrder(String orderNo) {
        if (!saleRepo.existsById(orderNo)) {
            throw new RuntimeException("Order " + orderNo + " not found.!");
        }
        saleDetailsRepo.deleteByOrderNo(orderNo);
        saleRepo.deleteById(orderNo);
    }

    @Override
    public void refundOrder(String orderNo) {
        Sale sale = saleRepo.findById(orderNo).orElseThrow(() -> new RuntimeException("Order " + orderNo + " not found."));

        // Update item quantities
        for (SaleDetails saleDetail : sale.getSaleDetails()) {
            Inventory inventory = inventoryRepo.findById(saleDetail.getItemCode()).get();
            inventory.setQuantity(inventory.getQuantity() + saleDetail.getQuantity());
            inventoryRepo.save(inventory);
        }

        // Delete sale details and sale
        saleDetailsRepo.deleteByOrderNo(orderNo);
        saleRepo.deleteById(orderNo);
    }
}
