package com.springbootbackend.demo.controller;

import com.springbootbackend.demo.dto.MedicalRecordsDto;
import com.springbootbackend.demo.service.MedicalReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RequestMapping("medicalReport")
@RestController
public class MedicalReportController {
    @Autowired
    MedicalReportService medicalReportService;

    @PostMapping("/uploadMedicalRecord")
    public String addMedicalReport( @RequestParam("userId") String userId,
                                    @RequestParam("fileName") String fileName, @RequestParam List<MultipartFile> files)throws IOException{
   String medicalRecordsId =  medicalReportService.uploadMedicalReport(userId,fileName,files);
   return medicalRecordsId;
    }

    @GetMapping("/getMedicalRecords/{id}")
    public List<MedicalRecordsDto> getMedicalRecords(@PathVariable String id){
        return medicalReportService.getMedicalRecordsByUserId(id);

    }

    @GetMapping("/getMedicalReports/{id}")
    public List<String> getMedicalReports(@PathVariable String id){
        return medicalReportService.getMedicalReportFileUrlsByUserId(id);
    }
}
