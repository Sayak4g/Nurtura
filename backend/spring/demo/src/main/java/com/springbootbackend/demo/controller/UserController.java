package com.springbootbackend.demo.controller;

import com.springbootbackend.demo.serviceImp.CloudinaryServiceImp;
import com.springbootbackend.demo.serviceImp.UserServiceImp;
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
    @PostMapping("createUser")
    public String  createUser(
            @RequestParam("name") String name,
            @RequestParam("age") int age,
            @RequestParam("email") String email,
            @RequestParam("phoneNo") String phoneNo,
            @RequestParam("gender") String gender
            ) {

       String userId =  userServiceImp.createUser(name , age , email , phoneNo , gender);
       return userId;
    }
    @PostMapping("uploadReport/{id}")
    public void uploadReports(@PathVariable String id,
                              @RequestParam("files") MultipartFile[] files)throws IOException{
        List<String> reportUrls = imgUpload.uploadFile(id , files);
        for(String url : reportUrls){
            System.out.println(url);
        }
    }

}
