package Project.back_end.dto;

import Project.back_end.entities.User;

public class UserSummaryDTO {

    private Long id;
    private String name;
    private String institutionName;
    private boolean following;

    public UserSummaryDTO() {
    }

    public UserSummaryDTO(User user, boolean following) {
        this.id = user.getId();
        this.name = user.getName();
        this.institutionName = (user.getAddress() != null) ? user.getAddress().getInstitutionName() : null;
        this.following = following;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getInstitutionName() {
        return institutionName;
    }

    public void setInstitutionName(String institutionName) {
        this.institutionName = institutionName;
    }

    public boolean isFollowing() {
        return following;
    }

    public void setFollowing(boolean following) {
        this.following = following;
    }
}
