package com.veloura.controller;

import com.veloura.entity.Order;
import com.veloura.entity.OrderStatus;
import com.veloura.service.OrderService;

import lombok.RequiredArgsConstructor;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    // PLACE ORDER
    @PostMapping("/place")
    public Order placeOrder(Authentication authentication) {

        if (authentication == null) {
            throw new RuntimeException("User not authenticated");
        }

        return orderService.placeOrder(authentication.getName());
    }

    // USER ORDERS
    @GetMapping("/my-orders")
    public List<Order> getMyOrders(Authentication authentication) {

        String email = authentication.getName();
        return orderService.getOrdersByUser(email);
    }

    // ADMIN - ALL ORDERS
    @GetMapping("/all")
    @PreAuthorize("hasRole('ADMIN')")
    public List<Order> getAllOrders() {
        return orderService.getAllOrders();
    }

    // ADMIN - UPDATE STATUS
    @PutMapping("/{orderId}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public Order updateOrderStatus(
            @PathVariable Long orderId,
            @RequestParam OrderStatus status) {

        return orderService.updateOrderStatus(orderId, status);
    }

    // USER - CANCEL ORDER
    @PutMapping("/{orderId}/cancel")
    @PreAuthorize("hasRole('USER')")
    public Order cancelOrder(
            @PathVariable Long orderId,
            Authentication authentication) {

        return orderService.cancelOrder(orderId, authentication.getName());
    }

    // ADMIN - MARK DELIVERED
    @PutMapping("/{orderId}/deliver")
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public Order deliverOrder(@PathVariable Long orderId) {

        return orderService.markAsDelivered(orderId);
    }
}