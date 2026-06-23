package Project.back_end.resources;

import Project.back_end.dto.ActivityDTO;
import Project.back_end.services.FeedService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/feed")
public class FeedResource {

    @Autowired
    private FeedService feedService;

    @GetMapping
    public ResponseEntity<List<ActivityDTO>> myFeed() {
        return ResponseEntity.ok().body(feedService.getMyFeed());
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<List<ActivityDTO>> userActivities(@PathVariable Long id) {
        return ResponseEntity.ok().body(feedService.getUserActivities(id));
    }
}
