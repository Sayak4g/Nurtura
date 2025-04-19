package com.springbootbackend.demo.service;

import com.springbootbackend.demo.dto.UserDto;
import com.springbootbackend.demo.model.UserModel;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

public interface UserService {
public String createUser(UserDto userDto);


}
