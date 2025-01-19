package abda.interactservice.web.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/interacts")
public class UserLikedController {

    @GetMapping
    public String test() {
        return "Interact Service is working!";
    }
    
}
