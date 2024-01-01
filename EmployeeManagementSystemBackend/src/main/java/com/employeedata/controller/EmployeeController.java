package com.employeedata.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.employeedata.model.Employee;
import com.employeedata.service.EmployeeService;


@RestController
@RequestMapping("employee")
@CrossOrigin(origins = "http://localhost:4200")

public class EmployeeController {

    @Autowired
    EmployeeService employeeService;

    @GetMapping("/allEmployees")
    public ResponseEntity<List<Employee>> getAll() {
        return employeeService.getAllEmployees();
    }

    @PostMapping("/Add")
    public ResponseEntity<String> add(@RequestBody Employee employee) {
        return employeeService.addEmployee(employee);
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable(name = "id") Long id) {
        employeeService.deleteEmployee(id);
    }

    @PutMapping("/update/{id}")
    private Employee update(@RequestBody Employee employee, @PathVariable(name = "id") Long id) {
        employeeService.updateEmployee(employee, id);
        return employee;
    }
}

