const messagesService = {
  insertMessage(db, newMessage) {
    return db.insert(newMessage).returning("*").into("messages");
  },

  getInboxUserMessage(db, userId) {
    return db.select().from("messages").whereIn("toUserId", [userId]);
  },

  getFromUserMessage(db, userId) {
    return db.select().from("messages").whereIn("fromUserId", [userId]);
  },
};

module.exports = messagesService;
