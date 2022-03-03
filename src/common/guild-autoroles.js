const db = require('../../models/index.js');

module.exports = {
    async getAutoRoles(guild) {
        const found = await db.AutoRole.findAll({
            attributes: ['role'],
            where: { guild: guild.id },
        });

        const roles = [];
        const errored = [];
        for (const key in found) {
            try {
                const role = await guild.roles.fetch(found[key].role);

                if (role != null) {
                    roles.push(role);
                }
                else {
                    errored.push(found[key].role);
                }

            }
            catch (e) {
                errored.push(found[key].role);
            }
        }

        return {
            roles,
            errored,
        };
    },
};
