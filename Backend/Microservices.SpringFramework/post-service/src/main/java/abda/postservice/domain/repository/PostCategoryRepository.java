package abda.postservice.domain.repository;

import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import abda.postservice.domain.entity.PostCategory;

public interface PostCategoryRepository extends JpaRepository<PostCategory, UUID> {

}
