package com.springbootbackend.demo.serviceImp;

import com.springbootbackend.demo.model.UserModel;
import com.springbootbackend.demo.repository.UserRepo;
import com.springbootbackend.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImp implements UserService {
    @Autowired
    UserRepo userRepo;
    @Override
    public String createUser(String name, int age, String email, String phoneNo, String gender) {
        UserModel userEntity = new UserModel();
        userEntity.setName(name);
        userEntity.setAge(age);
        userEntity.setEmail(email);
        userEntity.setGender(gender);
        userEntity.setPhoneNo(phoneNo);
        userRepo.save(userEntity);

        return userEntity.getId();
    }
}
