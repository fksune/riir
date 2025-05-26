package app.netlify.riirx.service;

import app.netlify.riirx.dao.ToolDao;
import app.netlify.riirx.model.Tool;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ToolService {
    @Autowired
    ToolDao toolDao;

    public List<Tool> getAllTools() {
        return toolDao.findAll();
    }
}
