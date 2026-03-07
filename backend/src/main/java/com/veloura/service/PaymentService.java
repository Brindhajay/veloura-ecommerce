package com.veloura.service;

import com.veloura.entity.*;
import com.veloura.repository.OrderRepository;
import com.veloura.repository.PaymentRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class PaymentService {

    private final OrderRepository orderRepository;
    private final PaymentRepository paymentRepository;

    public Payment payForOrder(Long orderId, String email) {

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        // Check if this order belongs to the user
        if (!order.getUser().getEmail().equals(email)) {
            throw new RuntimeException("You cannot pay for this order");
        }

        // Prevent payment if cancelled
        if (order.getStatus() == OrderStatus.CANCELLED) {
            throw new RuntimeException("Cancelled order cannot be paid");
        }

        // Prevent double payment
        if (order.getStatus() == OrderStatus.SHIPPED ||
                order.getStatus() == OrderStatus.DELIVERED) {
            throw new RuntimeException("Order already paid");
        }

        // Create payment record
        Payment payment = Payment.builder()
                .amount(order.getTotalAmount())
                .status(PaymentStatus.SUCCESS)
                .paymentDate(LocalDateTime.now())
                .order(order)
                .build();

        paymentRepository.save(payment);

        // Update order status to SHIPPED
        order.setStatus(OrderStatus.SHIPPED);
        orderRepository.save(order);

        // Return payment object (IMPORTANT)
        return payment;
    }
}