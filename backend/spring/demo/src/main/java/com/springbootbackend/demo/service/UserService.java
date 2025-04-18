package com.springbootbackend.demo.service;

import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

public interface UserService {
public String createUser(String name,
                        int age,
                        String email,
                        String phoneNo,
                       String gender);

}
