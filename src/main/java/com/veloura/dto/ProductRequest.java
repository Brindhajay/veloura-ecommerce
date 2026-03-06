package com.veloura.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ProductRequest {

    @NotBlank
    private String name;

    @NotBlank
    private String brand;

    @NotNull
    private Double price;

    @NotNull
    private Integer stock;

    private String description;

    private String imageUrl;

    @NotNull
    private Long categoryId;
}