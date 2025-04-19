package com.springbootbackend.demo.service;

import com.springbootbackend.demo.dto.MedicalRecordsDto;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface MedicalReportService {
    String uploadMedicalReport(String userId , String fileName,  List<MultipartFile> files) throws IOException;
    public List<MedicalRecordsDto> getMedicalRecordsByUserId(String userId);
    public List<String> getMedicalReportFileUrlsByUserId(String userId);
}
