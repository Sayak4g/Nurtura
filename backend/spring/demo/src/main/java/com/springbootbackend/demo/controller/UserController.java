package com.springbootbackend.demo.controller;

import com.springbootbackend.demo.dto.UserDto;
import com.springbootbackend.demo.model.UserModel;
import com.springbootbackend.demo.repository.UserRepo;
import com.springbootbackend.demo.serviceImp.CloudinaryServiceImp;
import com.springbootbackend.demo.serviceImp.UserServiceImp;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    CloudinaryServiceImp imgUpload;
    @Autowired
    UserServiceImp userServiceImp;
    @Autowired
    UserRepo userRepo;
    @PostMapping("/createUser")
    public String  createUser(@RequestBody UserDto userDTO) {
       String userId =  userServiceImp.createUser(userDTO);
       return userId;
    }
    @GetMapping("/getUser/{id}")
    public UserModel getSingleUser(@PathVariable String id){
        UserModel user = userRepo.findById(id).orElse(null);
        return user;
    }

    //saving profile pic
    @PostMapping("/uploadProfilePic/{id}")
    public void uploadProfilePic(@PathVariable String id , @RequestParam MultipartFile profilePic)throws IOException{
        imgUpload.uploadProfilePic(id , profilePic);
    }

    @GetMapping("/getProfilePic/{id}")
    public String getProfilePic(@PathVariable String id){
        UserModel user = userRepo.findById(id).orElseThrow(()-> new RuntimeException("user not found "));
        return user.getProfilePic();
    }

    /*@PostMapping("uploadReport/{id}")
    public void uploadReports(@PathVariable String id,
                              @RequestParam("files") MultipartFile[] files)throws IOException{
        List<String> reportUrls = imgUpload.uploadFile(id , files);
        for(String url : reportUrls){
            System.out.println(url);
        }
    }*/

}
