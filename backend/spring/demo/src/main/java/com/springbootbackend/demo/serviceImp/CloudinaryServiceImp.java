package com.springbootbackend.demo.serviceImp;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.springbootbackend.demo.model.Contact;
import com.springbootbackend.demo.model.UserModel;
import com.springbootbackend.demo.repository.ContactRepo;
import com.springbootbackend.demo.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class CloudinaryServiceImp {

 @Autowired
    UserRepo userRepo;
 @Autowired
    ContactRepo contactRepo;
    @Autowired
    private Cloudinary cloudinary;

  /*  public List<String> uploadFile(String userId , MultipartFile[] files) throws IOException {
        // Upload the file to Cloudinary and return the secure URL
        UserModel user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        if(user.getMedicalRecords() == null){
            user.setMedicalRecords(new ArrayList<>());
        }

        List<String> uploadedUrls = new ArrayList<>();

        for (MultipartFile file : files) {
            Map uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());
            String url = uploadResult.get("url").toString();
            uploadedUrls.add(url);
            user.getMedicalRecords().add(url);
        }

        userRepo.save(user);
        return uploadedUrls;
    }*/

    public void uploadProfilePic(String id , MultipartFile file)throws IOException{
        Optional<UserModel> optionalUser = userRepo.findById(id);
        if (optionalUser.isEmpty()) {
            throw new RuntimeException("User not found with ID: " + id);
        }
        Map uploadResult = cloudinary.uploader().upload(file.getBytes(),
                ObjectUtils.asMap("folder", "profile_pics"));

        String imageUrl = uploadResult.get("secure_url").toString();
        UserModel user = optionalUser.get();
        user.setProfilePic(imageUrl);
        userRepo.save(user);
    }

    public void uploadContactProfilePic(String id , MultipartFile file)throws IOException{
        Optional<Contact> contact = contactRepo.findById(id);
        if (contact.isEmpty()) {
            throw new RuntimeException("contact not found with ID: " + id);
        }
        Map uploadResult = cloudinary.uploader().upload(file.getBytes(),
                ObjectUtils.asMap("folder", "profile_pics"));

        String imageUrl = uploadResult.get("secure_url").toString();
        Contact con = contact.get();
        con.setProfilePic(imageUrl);
        contactRepo.save(con);
    }


    public String uploadMedicalReport(MultipartFile file) throws IOException {
        Map<String, Object> uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());
        return (String) uploadResult.get("url");
    }
}
