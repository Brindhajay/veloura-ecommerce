package com.veloura.controller;

import com.veloura.dto.AddToCartRequest;
import com.veloura.dto.CartResponse;
import com.veloura.entity.Cart;
import com.veloura.service.CartService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class CartController {

    private final CartService cartService;


    @PostMapping("/add")
    public Cart addToCart(@Valid @RequestBody AddToCartRequest request,
                          Authentication authentication) {

        if (authentication == null) {
            throw new RuntimeException("User not authenticated");
        }

        String email = authentication.getName();

        return cartService.addToCart(
                email,
                request.getProductId(),
                request.getQuantity()
        );
    }


    @GetMapping
    public CartResponse viewCart(Authentication authentication) {

        if (authentication == null) {
            throw new RuntimeException("User not authenticated");
        }

        String email = authentication.getName();

        return cartService.getCartByUser(email);
    }


    @DeleteMapping("/remove/{productId}")
    public String removeFromCart(@PathVariable Long productId,
                                 Authentication authentication) {

        if (authentication == null) {
            throw new RuntimeException("User not authenticated");
        }

        String email = authentication.getName();

        cartService.removeFromCart(email, productId);

        return "Product removed from cart";
    }
}