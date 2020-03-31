const app = require("./app.js");
const { PORT, DATABASE_URL, NODE_ENV } = require("./config.js");
const knex = require("knex");

const db = knex({
    client: "pg",
    connection: DATABASE_URL
});

app.set("db", db);

app.listen(PORT, () => {
    if (NODE_ENV !== "development") {
        console.log(`Server listening at http://localhost:${PORT}`);
    }
});
