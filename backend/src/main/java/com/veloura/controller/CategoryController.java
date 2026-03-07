package com.veloura.controller;

import com.veloura.dto.CategoryRequest;
import com.veloura.entity.Category;
import com.veloura.service.CategoryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    // 🌍 Public endpoint
    @GetMapping
    public List<Category> getAllCategories() {
        return categoryService.getAllCategories();
    }

    // 🔒 Admin only
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public Category createCategory(@Valid @RequestBody CategoryRequest request) {
        return categoryService.createCategory(
                request.getName(),
                request.getDescription()
        );
    }
}