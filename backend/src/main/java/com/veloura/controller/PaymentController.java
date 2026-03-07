package com.veloura.controller;

import com.veloura.entity.Payment;
import com.veloura.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;

    @PostMapping("/{orderId}")
    public Payment pay(@PathVariable Long orderId,
                       Authentication authentication) {

        String email = authentication.getName();

        return paymentService.payForOrder(orderId, email);
    }
}