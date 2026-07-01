package Project.back_end.projections;

public interface UserDetailsProjection {

    Long getId();
    String getUsername();
    String getPassword();
    String getName();
    Long getRoleId();
    String getAuthority();
}
