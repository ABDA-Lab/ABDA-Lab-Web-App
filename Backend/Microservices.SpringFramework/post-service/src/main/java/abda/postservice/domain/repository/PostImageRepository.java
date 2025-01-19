package abda.postservice.domain.repository;

import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import abda.postservice.domain.entity.PostImage;

public interface PostImageRepository extends JpaRepository<PostImage, UUID> {
    
}
