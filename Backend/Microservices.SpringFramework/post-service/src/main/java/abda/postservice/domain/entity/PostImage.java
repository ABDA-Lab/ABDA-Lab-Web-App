package abda.postservice.domain.entity;

import java.util.UUID;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.*;

@Data
@Entity
@Table(name = "post_images")
@NoArgsConstructor
@AllArgsConstructor
public class PostImage {

    @Id
    @Column(name = "PostImageId")
    private UUID postImageId;

    @ManyToOne(fetch = FetchType.LAZY)
    private Post postId;
    
    @Column(name = "Link", length = 1024)
    private String link;
}
