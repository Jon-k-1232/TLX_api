const contactService = {
  getContactInfo(db, userId) {
    return db.select().from("contact_info").whereIn("userid", [userId]);
  },

  getManagerInfo(db, managerId) {
    return db.select().from("contact_info").whereIn("userid", [managerId]);
  },

  updateContactInfo(db, userId, updatedContact) {
    return db
      .insert()
      .from("contact_info")
      .where("userid", userId)
      .update(updatedContact);
  },

  updateUserPassword(db, userId, updatedPassword) {
    return db
      .insert()
      .from("contact_info")
      .where("userid", userId)
      .update(updatedPassword);
  },
};

module.exports = contactService;
