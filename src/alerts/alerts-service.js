const alertsService = {
    insertAlert(db, newAlert) {
        return db.insert(newAlert).returning("*").into("alerts");
    },

    getCurrentAlert(db, groupId) {
        return db.select().from("alerts").whereIn("groupId", [groupId]);
    }

};

module.exports = alertsService;