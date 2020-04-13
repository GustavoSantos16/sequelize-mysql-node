const { Op } = require('sequelize');
const User = require('../models/User');


module.exports = {

    async show(req, res) {
        //Encotrar todos usuários que tem email que termina com @rocktseat.com.br
        //desses usuários eu quero buscar todos que moram na rua "Rua Guilherme Gembala"
        //Desses usuários eu quero buscar as tecnologias que começam com React

        const users = await User.findAll({
            attributes: ['name', 'email'],
            where: {
                email: {
                    [Op.like]: '%@rocketseat.com.br'
                }
            },
            include: [
                { association: 'addresses', where: { street: 'Rua Guilherme Gembala' } },
                {
                    association: 'techs',
                    required: false,
                    where: {
                        name: {
                            [Op.like]: 'React%'
                        }
                    }
                },
            ]

        })

        return res.json(users);
    }
};