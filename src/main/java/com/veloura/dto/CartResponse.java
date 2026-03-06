package com.veloura.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class CartResponse {

    private Long cartId;
    private String userEmail;
    private List<CartItemResponse> items;
    private double totalAmount;
}