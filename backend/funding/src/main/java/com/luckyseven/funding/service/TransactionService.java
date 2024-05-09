package com.luckyseven.funding.service;

import com.siot.IamportRestClient.exception.IamportResponseException;

import java.io.IOException;

public interface TransactionService {
    String verifiyAndSavePayment (String transactionId, String pgId, Integer amount);
    Boolean cancelPayment (String pgId);
}
