package lk.ijse.helloShoe.repo;

import lk.ijse.helloShoe.entity.SaleDetails;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SaleDetailsRepo extends JpaRepository<SaleDetails,String> {
}
