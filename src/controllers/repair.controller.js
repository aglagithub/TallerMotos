const Repair = require('../models/repair.model');

//? Find all repairs (✓)
exports.findAllRepair = async (req, res) => {
    try {
        const repairs = await Repair.findAll({
            where: {
                status: "pending",
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

//? Find One repair (✓)

exports.findOneRepair = async (req, res) => {
    try {
        const { id } = req.params;
        const repair = await Repair.findOne({
            where: {
                id,
                status: "pending",
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

//? Create repair (✓)
exports.createRepair = async (req, res) => {
    try {
        const { date, userId } = req.body
        const repair = await Repair.create({ date, userId })
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

//? Update Repair (✓)

exports.updateRepair = async (req, res) => {
    try {
        const { id } = req.params;
    

        const repair = await Repair.findOne({
            where: {
                id,

            }
        })

        if (!repair) {
            return res.status(404).json({
                status: 'error',
                message: `Repair with id ${id} not found`,
            })

        }

        await repair.update({ status : "completed" })

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
                
            }
        })

        if (!repair) {
            return res.status(404).json({
                status: 'error',
                message: `Repair with id ${id} not found`,
            })
        }

        await repair.update({ status: "cancelled" });

        return res.status(200).json({
            status: 'success',
            message: `Repair id=${id} deleted succesfully`,

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