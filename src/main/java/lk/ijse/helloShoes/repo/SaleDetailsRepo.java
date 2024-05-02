package lk.ijse.helloShoes.repo;

import lk.ijse.helloShoes.entity.SaleDetails;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SaleDetailsRepo extends JpaRepository<SaleDetails,String> {
}
