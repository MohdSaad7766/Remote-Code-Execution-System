package com.CodeLab.RCE_System.service;

import com.CodeLab.RCE_System.entity.AppUser;
import com.CodeLab.RCE_System.entity.Location;
import com.CodeLab.RCE_System.entity.User;
import com.CodeLab.RCE_System.enums.Language;
import com.CodeLab.RCE_System.exception.EmailNotFoundException;
import com.CodeLab.RCE_System.exception.InvalidAppUserIdException;
import com.CodeLab.RCE_System.repository.AppUserRepository;
import com.CodeLab.RCE_System.repository.UserRepository;
import com.CodeLab.RCE_System.request_dto.UserProfileRequestDTO;
import com.CodeLab.RCE_System.request_dto.UserProfileUpdateRequestDTO;
import com.CodeLab.RCE_System.response_dto.UserProfileResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class AppUserService {
    private final AppUserRepository appUserRepository;
    private final UserRepository userRepository;

    @Autowired
    public  AppUserService(AppUserRepository appUserRepository,
                           UserRepository userRepository){
        this.appUserRepository = appUserRepository;
        this.userRepository = userRepository;
    }
    public AppUser findById(UUID id){
        return appUserRepository.findById(id).orElseThrow(()->new InvalidAppUserIdException("Invalid User Id"));
    }

    public AppUser findByEmail(String email){
        return appUserRepository.findByEmail(email).orElseThrow(()->new EmailNotFoundException("User with provided email not found."));
    }

    public void addUserProfile(String email, UserProfileRequestDTO dto) {
        AppUser appUser = findByEmail(email);

        if (!appUser.isUser()) {
            throw new IllegalStateException("Only USER can have user profile");
        }

        if (appUser.getUser() != null) {
            throw new IllegalStateException("User profile already exists");
        }

        User user = new User();
        user.setAppUser(appUser);
        user.setName(dto.getName());
        user.setGender(dto.getGender());
        user.setPreferredLanguage(dto.getPreferredLanguage());

        if (dto.getLocation() != null) {
            user.setLocation(Location.fromDTO(dto.getLocation()));
        }

        appUser.setUser(user);
        appUserRepository.save(appUser);
    }

    public void updateUserPreferredLanguage(String email, Language language){
        User user = getUserByEmail(email);
        user.setPreferredLanguage(language);
        userRepository.save(user);
    }

    public UserProfileResponseDTO getUserProfile(String email){

        AppUser appUser = findByEmail(email);
        User user = appUser.getUser();

        if(user == null)
            return null;


        UserProfileResponseDTO profile = new UserProfileResponseDTO();
        profile.setName(user.getName());
        profile.setGender(user.getGender());
        profile.setEmail(appUser.getEmail());
        profile.setPreferredLanguage(user.getPreferredLanguage());
        profile.setCity(user.getLocation().getCity());
        profile.setState(user.getLocation().getState());
        profile.setCountry(user.getLocation().getCountry());

        return profile;

    }

    public User getUserByEmail(String email){
        return findByEmail(email).getUser();
    }

    public void updateUserProfile(String email, UserProfileUpdateRequestDTO dto){
        User user = getUserByEmail(email);
        user.setName(dto.getName());
        user.setGender(dto.getGender());
        user.setPreferredLanguage(dto.getPreferredLanguage());

        Location location = user.getLocation();
        location.setCity(dto.getLocation().getCity());
        location.setState(dto.getLocation().getState());
        location.setCountry(dto.getLocation().getCountry());

        userRepository.save(user);
    }
}
