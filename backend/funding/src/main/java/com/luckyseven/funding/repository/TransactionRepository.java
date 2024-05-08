package com.luckyseven.funding.repository;

import com.luckyseven.funding.entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransactionRepository extends JpaRepository<Transaction, String> {
    Boolean existsByTransactionIdOrPgId(String transactionId, String pgId);
}
