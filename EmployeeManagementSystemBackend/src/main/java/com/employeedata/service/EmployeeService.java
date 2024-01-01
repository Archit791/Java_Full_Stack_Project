package com.employeedata.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.employeedata.model.Employee;
import com.employeedata.repository.EmployeeRepository;

import java.util.List;

@Service
public class EmployeeService {

    private static final Logger logger = LoggerFactory.getLogger(EmployeeService.class);

    @Autowired
    private EmployeeRepository employeeRepository;

    public ResponseEntity<List<Employee>> getAllEmployees() {
        try {
            List<Employee> employees = employeeRepository.findAll();
            return new ResponseEntity<>(employees, HttpStatus.OK);
        } catch (DataAccessException e) {
            logger.error("Error while retrieving employees", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<String> addEmployee(Employee employee) {
        try {
            employeeRepository.save(employee);
            return new ResponseEntity<>("Employee created successfully", HttpStatus.CREATED);
        } catch (DataAccessException e) {
            logger.error("Error while creating employee", e);
            return new ResponseEntity<>("Failed to create employee", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<String> updateEmployee(Employee employee, Long id) {
        try {
            return employeeRepository.findById(id)
                    .map(existingEmployee -> {
                        existingEmployee.setFirstName(employee.getFirstName());
                        existingEmployee.setLastName(employee.getLastName());
                        existingEmployee.setEmail(employee.getEmail());
                        existingEmployee.setPhoneNumber(employee.getPhoneNumber());
                        employeeRepository.save(existingEmployee);
                        return new ResponseEntity<>("Employee updated successfully", HttpStatus.OK);
                    })
                    .orElse(new ResponseEntity<>("Employee not found", HttpStatus.NOT_FOUND));
        } catch (DataAccessException e) {
            logger.error("Error while updating employee", e);
            return new ResponseEntity<>("Failed to update employee", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<String> deleteEmployee(Long id) {
        try {
            return employeeRepository.findById(id)
                    .map(employee -> {
                        employeeRepository.deleteById(id);
                        return new ResponseEntity<>("Employee deleted successfully", HttpStatus.OK);
                    })
                    .orElse(new ResponseEntity<>("Employee not found", HttpStatus.NOT_FOUND));
        } catch (DataAccessException e) {
            logger.error("Error while deleting employee", e);
            return new ResponseEntity<>("Failed to delete employee", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

