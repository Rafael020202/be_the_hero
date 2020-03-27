const connection = require('../database/configuration');

module.exports = {
    async create(req, res) {
        const {ong_id} = req.body;
        const ong = await connection('ongs')
            .where('id', ong_id)
            .select('*')
            .first();
            
        if(!ong) return res.status(400).json({error: "ONG not found"});

        return res.json({ong});
        
    }
}