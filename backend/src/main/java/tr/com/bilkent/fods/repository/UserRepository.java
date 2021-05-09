package tr.com.bilkent.fods.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tr.com.bilkent.fods.entity.User;

public interface UserRepository extends JpaRepository<User, String> {
}
