package abda.postservice.domain.entity;

import java.util.Collection;
import java.util.Date;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "post_categories")
@NoArgsConstructor
@AllArgsConstructor
public class PostCategory {
    
    @Id
    @Column(name = "PostCategoryId", columnDefinition = "UUID")    
    private UUID postCategoryId;

    @Column(name = "Name", length = 512)
    private String name;

    @Column(name = "CreatedDate")
    private Date createdDate;

    @ManyToMany(mappedBy = "categories")
    private Collection<Post> posts;
}
