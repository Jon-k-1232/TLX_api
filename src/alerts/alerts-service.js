const alertsService = {
  insertAlert(db, newAlert) {
    return db.insert(newAlert).returning("*").into("alerts");
  },

  deleteCurrent(db, groupId) {
    return db
      .select()
      .from("alerts")
      .where({ groupId: groupId, current: true })
      .del();
  },

  getCurrentAlert(db, groupId) {
    return db
      .select()
      .from("alerts")
      .where({ groupId: groupId, current: true });
  },

  landlordCheck(db, userId) {
    return db.select().from("contact_info").whereIn("userid", [userId]);
  },
};

module.exports = alertsService;
