package abda.hashtagservice.domain.entity;

import java.util.Date;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Builder
@Table(name = "hashtags")
@NoArgsConstructor
@AllArgsConstructor
public class Hashtag {
    
    @Id
    @Column(name = "HashtagId")
    private UUID hashtagId;

    @Column(name = "Name", length = 128, nullable = false)
    private String name;

    @Column(name = "CreatedDate")
    private Date createdDate;
}
