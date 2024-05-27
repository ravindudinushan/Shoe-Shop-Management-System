package lk.ijse.helloShoe.repo;

import lk.ijse.helloShoe.entity.SaleDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface SaleDetailsRepo extends JpaRepository<SaleDetails,String> {
    @Query(value = "SELECT SUM(total_price) AS totalSale " +
            "FROM sale " +
            "WHERE MONTH(purchase_date) = MONTH(CURDATE()) AND YEAR(purchase_date) = YEAR(CURDATE())",
            nativeQuery = true)
    Double findTotalSales();

    @Query(value = "SELECT SUM(sd.unit_price_sale * sd.quantity) - SUM(i.unit_price_buy * sd.quantity) AS totalProfit " +
            "FROM sale_details sd " +
            "JOIN inventory i ON sd.item_code = i.item_code " +
            "JOIN sale s ON sd.order_no = s.order_no " +
            "WHERE MONTH(s.purchase_date) = MONTH(CURDATE()) AND YEAR(s.purchase_date) = YEAR(CURDATE())",
            nativeQuery = true)
    Double findTotalProfit();

    void deleteByOrderNo(String orderNo);
}
