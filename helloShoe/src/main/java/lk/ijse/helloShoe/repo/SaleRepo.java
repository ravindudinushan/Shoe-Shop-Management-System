package lk.ijse.helloShoe.repo;

import lk.ijse.helloShoe.entity.Sale;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface SaleRepo extends JpaRepository<Sale,String> {
    @Query(value = "SELECT order_no FROM Sale ORDER BY order_no DESC LIMIT 1", nativeQuery = true)
    String getLastIndex();

    @Query(value = "SELECT COUNT(order_no) FROM Sale", nativeQuery = true)
    int getSumOrders();

    @Query(value = "SELECT SUM(total_price) AS total_sales, SUM(total_price - add_points) AS total_profit FROM sale", nativeQuery = true)
    Object[] getTotalSalesAndProfit();

    @Query(value = "SELECT item_code, SUM(quantity) AS total_quantity FROM sale_details GROUP BY item_code ORDER BY total_quantity DESC LIMIT 1", nativeQuery = true)
    Object[] getMostSoldItem();

    @Query(value = "SELECT item_pic FROM inventory INNER JOIN sale_details ON inventory.item_code = sale_details.item_code GROUP BY sale_details.item_code ORDER BY SUM(sale_details.quantity) DESC LIMIT 1", nativeQuery = true)
    String getBase64EncodedImageOfMostSoldItem();

    @Query(value = "SELECT SUM(quantity) AS total_quantity FROM sale_details GROUP BY item_code ORDER BY total_quantity DESC LIMIT 1", nativeQuery = true)
    int getMostSoldItemQuantity();

}
