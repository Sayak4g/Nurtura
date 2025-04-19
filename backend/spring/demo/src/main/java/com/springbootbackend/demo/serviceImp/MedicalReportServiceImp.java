package com.springbootbackend.demo.serviceImp;

import com.springbootbackend.demo.dto.MedicalRecordsDto;
import com.springbootbackend.demo.model.MedicalRecord;
import com.springbootbackend.demo.model.UserModel;
import com.springbootbackend.demo.repository.MedicalRecordRepo;
import com.springbootbackend.demo.repository.UserRepo;
import com.springbootbackend.demo.service.MedicalReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class MedicalReportServiceImp implements MedicalReportService {
    @Autowired
    CloudinaryServiceImp cloudinaryService;
    @Autowired
    UserRepo userRepo;
    @Autowired
    MedicalRecordRepo  medicalRecordRepo;
    @Override
    public String uploadMedicalReport( String userId,
                                       String fileName, List<MultipartFile> files) throws IOException {
        List<MedicalRecord> medicalRecords = new ArrayList<>();


        for (MultipartFile file : files) {
            String fileUrl = cloudinaryService.uploadMedicalReport(file);

            MedicalRecord medicalRecord = new MedicalRecord();
            Optional<UserModel> optionalUser = userRepo.findById(userId);
            if (optionalUser.isEmpty()) {
                throw new RuntimeException("User not found with ID: " + userId);
            }

            UserModel user = optionalUser.get();

            medicalRecord.setUserId(user);
            medicalRecord.setFileUrl(fileUrl);
            medicalRecord.setFileName(fileName);



            medicalRecords.add(medicalRecord);
        }

        // Save all medical records to the database in one batch
        List<MedicalRecord> savedRecords = medicalRecordRepo.saveAll(medicalRecords);
        StringBuilder savedRecordIds = new StringBuilder();
        for (MedicalRecord record : savedRecords) {
            savedRecordIds.append(record.getId()).append(", ");
        }

        if (savedRecordIds.length() > 0) {
            savedRecordIds.setLength(savedRecordIds.length() - 2);
        }

        return "Medical reports uploaded successfully. Saved Record IDs: " + savedRecordIds.toString();

    }



    public List<MedicalRecordsDto> getMedicalRecordsByUserId(String userId) {
        // Retrieve the user by ID (now the userId is a String)

        // Fetch medical records by user
        List<MedicalRecord> medicalRecords = medicalRecordRepo.findByUserId_Id(userId);

        // Convert the list of medical records to DTOs for returning the response
        return medicalRecords.stream().map(medicalRecord -> {
            MedicalRecordsDto medicalRecordsDto = new MedicalRecordsDto();
            medicalRecordsDto.setUserId(userId);  // Assuming userId is a String
            medicalRecordsDto.setFileName(medicalRecord.getFileName());

            // You can add other properties if needed
            return medicalRecordsDto;
        }).collect(Collectors.toList());
    }


    public List<String> getMedicalReportFileUrlsByUserId(String userId) {

        List<MedicalRecord> medicalRecords = medicalRecordRepo.findByUserId_Id(userId);

        // Extract the file URLs from the medical records
        return medicalRecords.stream()
                .map(MedicalRecord::getFileUrl)  // Extract the fileUrl field from each record
                .collect(Collectors.toList());
    }
}
