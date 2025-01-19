package abda.hashtagservice.web.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/hashtags")
public class HashtagController {
    
    @GetMapping
    public String test() {
        return "Hashtag Service is running!";   
    }

}
