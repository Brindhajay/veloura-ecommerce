package com.veloura.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CartItemResponse {

    private Long productId;

    private String productName;

    private String imageUrl;

    private Double price;

    private Integer quantity;

    private Double itemTotal;

}