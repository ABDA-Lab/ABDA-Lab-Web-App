package abda.postservice.domain.repository;

import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import abda.postservice.domain.entity.Post;

@Repository
public interface PostRepository extends JpaRepository<Post, UUID> {
    
}
