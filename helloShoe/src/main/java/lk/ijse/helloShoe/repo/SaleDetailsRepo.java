package lk.ijse.helloShoe.repo;

import lk.ijse.helloShoe.entity.SaleDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface SaleDetailsRepo extends JpaRepository<SaleDetails,String> {
    @Query("SELECT SUM(sd.unitPriceSale * sd.quantity) FROM SaleDetails sd")
    Double findTotalSales();

    @Query("SELECT SUM((sd.unitPriceSale - i.unitPriceBuy) * sd.quantity) FROM SaleDetails sd JOIN Inventory i ON sd.itemCode = i.itemCode")
    Double findTotalProfit();
}
