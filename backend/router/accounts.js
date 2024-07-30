const { accountList } = require("../dataStore");
const express = require("express");
const router = express.Router();

router.get("/accounts", (req, res) => {
  if (!accountList.length) {
    return res.status(404).json({
      message: "Ma'lumot topilmadi",
      type: "error",
      data: null,
    });
  }

  res.status(200).json({
    message: "Foydalanuvchilar ro'yxati",
    type: "success",
    data: accountList,
    total: accountList.length,
  });
});

router.post("/accounts", (req, res) => {
  const existingAccount = accountList.find(acc => acc.userHandle === req.body.userHandle);
  if (existingAccount) {
    return res.status(409).json({
      message: "Bu foydalanuvchi allaqachon mavjud",
      type: "error",
      data: null,
    });
  }

  const newAccount = {
    accountId: Date.now(),
    fullName: req.body.fullName,
    userHandle: req.body.userHandle,
    userSecret: req.body.userSecret,
  };

  accountList.push(newAccount);
  res.status(201).json({
    message: "Yangi foydalanuvchi qo'shildi",
    type: "success",
    data: newAccount,
  });
});

router.delete("/accounts/:accountId", (req, res) => {
  const accountIndex = accountList.findIndex(acc => acc.accountId === +req.params.accountId);
  if (accountIndex < 0) {
    return res.status(404).json({
      message: "Foydalanuvchi topilmadi",
      type: "error",
      data: null,
    });
  }

  accountList.splice(accountIndex, 1);
  res.status(200).json({
    message: "Foydalanuvchi o'chirildi",
    type: "success",
    data: null,
  });
});

router.put("/accounts/:accountId", (req, res) => {
  const accountId = +req.params.accountId;
  const accountIndex = accountList.findIndex(acc => acc.accountId === accountId);

  if (accountIndex < 0) {
    return res.status(404).json({
      message: "Foydalanuvchi topilmadi",
      type: "error",
      data: null,
    });
  }

  const updatedAccount = {
    accountId,
    fullName: req.body.fullName,
    userHandle: req.body.userHandle,
    userSecret: req.body.userSecret,
  };

  accountList[accountIndex] = updatedAccount;
  res.status(200).json({
    message: "Foydalanuvchi ma'lumotlari yangilandi",
    type: "success",
    data: updatedAccount,
  });
});

module.exports = router;
