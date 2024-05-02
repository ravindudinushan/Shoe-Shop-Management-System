package lk.ijse.helloShoes.repo;

import lk.ijse.helloShoes.entity.Sale;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface SaleRepo extends JpaRepository<Sale,String> {
    @Query(value = "SELECT order_no FROM Sale ORDER BY order_no DESC LIMIT 1", nativeQuery = true)
    String getLastIndex();

    @Query(value = "SELECT COUNT(order_no) FROM Sale", nativeQuery = true)
    int getSumOrders();
}
