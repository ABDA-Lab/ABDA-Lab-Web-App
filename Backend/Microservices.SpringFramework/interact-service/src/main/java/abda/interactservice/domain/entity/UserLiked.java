package abda.interactservice.domain.entity;

import java.sql.Date;
import java.util.UUID;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Builder
@Table(name = "user_liked")
@NoArgsConstructor
@AllArgsConstructor
public class UserLiked {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "UserId")
    private UUID userId;
    
    @Column(name = "PostId")
    private UUID postId;

    @Column(name = "LikedDate")
    private Date likedDate;
}