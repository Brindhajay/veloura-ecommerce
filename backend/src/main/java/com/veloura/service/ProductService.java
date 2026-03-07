package com.veloura.service;

import com.veloura.entity.Category;
import com.veloura.entity.Product;
import com.veloura.repository.CategoryRepository;
import com.veloura.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    // 🔒 Admin - Create Product
    public Product createProduct(String name,
                                 String brand,
                                 Double price,
                                 Integer stock,
                                 String description,
                                 String imageUrl,
                                 Long categoryId) {

        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Category not found"));

        Product product = Product.builder()
                .name(name)
                .brand(brand)
                .price(price)
                .stock(stock)
                .description(description)
                .imageUrl(imageUrl)
                .category(category)
                .build();

        return productRepository.save(product);
    }

    // 🌍 Public - Get All (Search + Pagination + Sorting)
    public Page<Product> getAllProducts(String keyword,
                                        int page,
                                        int size,
                                        String sortBy) {

        Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy));

        if (keyword != null && !keyword.isEmpty()) {
            return productRepository
                    .findByNameContainingIgnoreCase(keyword, pageable);
        }

        return productRepository.findAll(pageable);
    }

    // 🌍 Public - Get Products By Category
    public List<Product> getProductsByCategory(Long categoryId) {

        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Category not found"));

        return productRepository.findByCategory(category);
    }
}