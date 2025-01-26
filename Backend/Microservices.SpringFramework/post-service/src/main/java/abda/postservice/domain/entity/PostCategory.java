package abda.postservice.domain.entity;

import java.util.Collection;
import java.util.Date;
import java.util.UUID;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "postCategories")
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

    @ManyToMany
    @JoinTable(
        name = "posts_postcategories",
        joinColumns = {
            @JoinColumn(name = "PostCategoryId")
        },
        inverseJoinColumns = {
            @JoinColumn(name = "PostId")
        }
    )
    private Collection<Post> posts;
}
