package app.netlify.riirx.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class Tool {
    @Id
    @GeneratedValue
    private Integer id;

    private String name;
    private String rewriteName;
    private String repoUrl;
}
