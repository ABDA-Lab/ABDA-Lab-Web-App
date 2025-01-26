package abda.interactservice.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import abda.interactservice.domain.entity.UserLiked;

@Repository
public interface UserLikedRepository extends JpaRepository<UserLiked, Long> {
    
}
