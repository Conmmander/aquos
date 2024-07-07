const { Pool } = require('pg');

const { settings, getSettingData } = require('./settings');
const { database, guildTable, settingsTable, dbUser, dbPassword } = require('../config');

const pool = new Pool({
    user: dbUser,
    database: database,
    password: dbPassword,
});

const CREATE_GUILD_TABLE = `CREATE TABLE public.${guildTable}\n`
    + `(\n`
    + `    guild_id bigint NOT NULL,\n`
    + `    setup bool NULL,\n`
    + `    setup_date timestamp NULL,\n`
    + `    PRIMARY KEY (guild_id)\n`
    + `);`;
    + `ALTER TABLE public.${guildTable}\n`
    + `    OWNER to ${dbUser};`;

    const CREATE_SETTINGS_TABLE = `CREATE TABLE public.${settingsTable}\n`
    + `(\n`
    + `    guild_id bigint NOT NULL,\n`
    + `    setting_id int NOT NULL,\n`
    + `    data varchar(45) NULL,\n`
    + `    PRIMARY KEY (guild_id)\n`
    + `);`;
    + `ALTER TABLE public.${guildTable}\n`
    + `    OWNER to ${dbUser};`;

pool.on("error", err => {
    console.error("Unexpected error on idle client", err);
    process.exit(-1);
});

async function startUp() {
    console.log(`Using database ${database} and guildTable ${guildTable} and settingsTable ${settingsTable}`);
    const res = await pool.query("SELECT * FROM pg_catalog.pg_tables WHERE schemaname != 'pg_catalog' AND schemaname != 'information_schema';");
    let guildFound = false;
    let settingsFound = false;
    for (const row of res.rows) {
        if (row.tablename === guildTable) {
            guildFound = true;
            break;
        }
    }

    for (const row of res.rows) {
        if (row.tablename === settingsTable) {
            settingsFound = true;
            break;
        }
    }

    if (!guildFound) {
        console.warn(`! Warning ! Table ${guildTable} was not found. Creating one.`);
        await pool.query(CREATE_GUILD_TABLE);
    }

    if (!settingsFound) {
        console.warn(`! Warning ! Table ${settingsTable} was not found. Creating one.`);
        await pool.query(CREATE_SETTINGS_TABLE);
    }

    return true;
}

const ready = startUp();
module.exports = {
    async getSetting (guildID, settingID) {
        await ready;
        const res = await pool.query(`SELECT data FROM ${settingsTable} WHERE guild_id = $1 AND setting_id = $2;`, [guildID, settingID]);
        if (res.rows[0]) {
            return res.rows[0].data;
        };
        return getSettingData(settingID);
    },

    async getGuild (guildID) {
        await ready;
        const res = await pool.query(`SELECT * FROM ${guildTable} WHERE guild_id = $1;`, [guildID]);
        return res.rows[0];
    },

    async addGuild (guildID) {
        await ready;
        const res = await pool.query(`INSERT INTO ${guildTable} (guild_id, setup) VALUES ($1, false);`, [guildID]);
        return res;
    }
}