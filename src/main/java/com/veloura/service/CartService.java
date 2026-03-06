package com.veloura.service;

import com.veloura.dto.CartItemResponse;
import com.veloura.dto.CartResponse;
import com.veloura.entity.*;
import com.veloura.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
@RequiredArgsConstructor
public class CartService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    public Cart addToCart(String email, Long productId, Integer quantity) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Cart cart = cartRepository.findByUserId(user.getId())
                .orElseGet(() -> {
                    Cart newCart = Cart.builder()
                            .user(user)
                            .items(new ArrayList<>())
                            .build();
                    return cartRepository.save(newCart);
                });

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        for (CartItem item : cart.getItems()) {

            if (item.getProduct().getId().equals(productId)) {

                item.setQuantity(item.getQuantity() + quantity);

                return cartRepository.save(cart);

            }
        }

        CartItem cartItem = CartItem.builder()
                .cart(cart)
                .product(product)
                .quantity(quantity)
                .build();

        cart.getItems().add(cartItem);

        return cartRepository.save(cart);
    }


    public CartResponse getCartByUser(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Cart cart = cartRepository.findByUserId(user.getId())
                .orElseThrow(() -> new RuntimeException("Cart is empty"));

        var itemResponses = cart.getItems().stream().map(item -> {

            double itemTotal = item.getProduct().getPrice() * item.getQuantity();

            return CartItemResponse.builder()
                    .productId(item.getProduct().getId())
                    .productName(item.getProduct().getName())
                    .imageUrl(item.getProduct().getImageUrl())
                    .price(item.getProduct().getPrice())
                    .quantity(item.getQuantity())
                    .itemTotal(itemTotal)
                    .build();

        }).toList();


        double totalAmount = itemResponses.stream()
                .mapToDouble(CartItemResponse::getItemTotal)
                .sum();

        return CartResponse.builder()
                .cartId(cart.getId())
                .userEmail(user.getEmail())
                .items(itemResponses)
                .totalAmount(totalAmount)
                .build();
    }


    public void removeFromCart(String email, Long productId) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Cart cart = cartRepository.findByUserId(user.getId())
                .orElseThrow(() -> new RuntimeException("Cart not found"));

        cart.getItems().removeIf(item ->
                item.getProduct().getId().equals(productId));

        cartRepository.save(cart);
    }


    public double calculateCartTotal(Cart cart) {

        return cart.getItems().stream()
                .mapToDouble(item ->
                        item.getProduct().getPrice() * item.getQuantity()
                )
                .sum();
    }
}