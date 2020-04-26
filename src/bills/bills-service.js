const billsService = {
  getBillsByUserId(db, userId) {
    return db.select().from("bills").whereIn("tenantId", [userId]);
  },
};

module.exports = billsService;
