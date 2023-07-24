const Repair = require('../models/repair.model');

//? Find all repairs ()
exports.findAllRepair = async (req, res) => {
    try {
        const repairs = await Repair.findAll({
            where: {
                status: true,
            }
        });
        return res.status(200).json({
            status: 'success',
            repairs,
        })

    }

    catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 'fail',
            message: 'Internal server error',
            error,
        })
    }
}

//? Find One repair ()

exports.findOneRepair = async (req, res) => {
    try {
        const { id } = req.params;
        const repair = await Repair.findOne({
            where: {
                id,
                status: true,
            },
        });

        if (!repair) {
            return res.status(404).json({
                status: 'error',
                message: `Repair with id ${id} not found`,
            })
        } else {
            return res.status(200).json({
                status: 'success',
                repair,
            })
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 'fail',
            message: 'Internal server error',
            error,
        })
    }
}

//? Create repair ()
exports.createRepair = async (req, res) => {
    try {
        const { fullname, email, password } = req.body
        const repair = await Repair.create({ fullname, email, password })
        return res.status(201).json({
            status: 'success',
            repair,
        })

    }
    catch (error) {
        console.log(error)
        return res.status(500).json({
            status: 'fail',
            message: 'Internal error',
            error,
        })
    }

}

//? Update Repair ()

exports.updateRepair = async (req, res) => {
    try {
        const { id } = req.params;
        const { fullname } = req.body;

        const repair = await Repair.findOne({
            where: {
                id,
                status: true,
            }
        })

        if (!repair) {
            return res.status(404).json({
                status: 'error',
                message: `Repair with id ${id} not found`,
            })

        }

        await repair.update({ fullname })

        return res.status(200).json({
            status: 'success',
            message: 'Repair updated succesfully',

        })

    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 'fail',
            message: 'Internal server error',
            error,
        })
    }
}

//? Delete repair ()

exports.deleteRepair = async (req, res) => {
    try {
        const { id } = req.params;

        const repair = await Repair.findOne({
            where: {
                id,
                status: true,
            }
        })

        if (!repair) {
            return res.status(404).json({
                status: 'error',
                message: `Repair with id ${id} not found`,
            })
        }

        await repair.update({ status: false });

        return res.status(200).json({
            status: 'success',
            message: 'Repair deleted succesfully',

        })

    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 'fail',
            message: 'Internal server error',
            error,
        })
    }
}