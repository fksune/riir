package app.netlify.riirx.dao;

import app.netlify.riirx.model.Tool;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ToolDao extends JpaRepository<Tool, Integer> {
}
