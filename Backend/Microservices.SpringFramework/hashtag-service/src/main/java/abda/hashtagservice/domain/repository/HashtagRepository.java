package abda.hashtagservice.domain.repository;

import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import abda.hashtagservice.domain.entity.Hashtag;

@Repository
public interface HashtagRepository extends JpaRepository<Hashtag, UUID> {
    
}
