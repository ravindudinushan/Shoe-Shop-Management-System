package lk.ijse.helloShoes.repo;

import lk.ijse.helloShoes.entity.Sale;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IncomeRepo extends JpaRepository<Sale,String> {
}
