package abda.postservice.domain.entity;

import java.util.Collection;
import java.util.Date;
import java.util.UUID;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
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
@Table(name = "posts")
@NoArgsConstructor
@AllArgsConstructor
public class Post {
    
    @Id
    @Column(name = "PostId", columnDefinition = "UUID")
    private UUID postId;

    @Column(name = "UserId", columnDefinition = "UUID")
    private UUID userId;

    @Column(name = "Title", length = 1024)
    private String title;

    @Column(name = "ContentMd", columnDefinition = "TEXT")
    private String contentMd;

    @Column(name = "CreatedDate")
    private Date createdDate;

    @Column(name = "UpdatedDate")
    private Date updatedDate;

    @Column(name = "IsDeleted")
    private Boolean isDeleted;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "post_categories",
        joinColumns = {
            @JoinColumn(name = "PostId", referencedColumnName = "PostId")
        },
        inverseJoinColumns = {
            @JoinColumn(name = "PostCategoryId", referencedColumnName = "PostCategoryId")
        }
    )
    private Collection<PostCategory> categories;

}
