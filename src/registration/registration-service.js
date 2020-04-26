const registrationService = {
  getManagers(db, manager) {
    return db.select().from("contact_info").whereIn("role", [manager]);
  },

  insertNewUser(db, newUser) {
    return db.insert(newUser).returning("*").into("contact_info");
  },

  getCompanyName(db, company) {
    return db.select().from("contact_info").whereIn("company", [company]);
  },

  insertManagerIndicator(db, company) {
    return db
      .insert()
      .from("contact_info")
      .where("company", company)
      .update(updtdData);
  },
};

module.exports = registrationService;
