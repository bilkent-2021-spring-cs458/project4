package tr.com.bilkent.patientmonitoring.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tr.com.bilkent.patientmonitoring.entity.User;

public interface UserRepository extends JpaRepository<User, String> {
}
