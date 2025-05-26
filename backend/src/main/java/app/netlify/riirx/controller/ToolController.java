package app.netlify.riirx.controller;

import app.netlify.riirx.model.Tool;
import app.netlify.riirx.service.ToolService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class ToolController {
    @Autowired
    ToolService toolService;

    @GetMapping("/")
    List<Tool> getTools() {
        return toolService.getAllTools();
    }
}
