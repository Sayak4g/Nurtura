package com.springbootbackend.demo.serviceImp;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.springbootbackend.demo.model.UserModel;
import com.springbootbackend.demo.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class CloudinaryServiceImp {

 @Autowired
    UserRepo userRepo;
    @Autowired
    private Cloudinary cloudinary;

    public List<String> uploadFile(String userId , MultipartFile[] files) throws IOException {
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
    }
}
