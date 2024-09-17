import Services from "../models/services.model.js";

// Get all services
export const getAllServices = async (req, res) => {
    try {
        const services = await Services.find()
        if (!services) {
            res.status(404).json({
                status: 'error',
                message: 'Unable to fetch all services!'
            })
            return
        }
        res.status(200).json({
            status: 'success',
            numOfServices: services.length,
            services
        })
    } catch (error) {
        console.log(error)
    }
}

// add a service
export const addService = async (req, res) => {
    try {
        const service = await Services.create(req.body);
        if (!service) {
            res.status(404).json({
                status: 'error',
                message: 'Unable to add service.',
            })
            return
        }

        res.status(201).json({
            status: 'success',
            message: 'Service added!',
            service
        })
    } catch (error) {
        console.log(error)
    }
}

// get a single service
export const getSingleService = async (req, res) => {
    try {
        const service = await Services.findById(req.params.serviceId)
        if (!service) {
            res.status(404).json({
                status: 'error',
                message: 'Unable to find service!',
            })
            return
        }
        res.status(200).json({
            status: 'success',
            message: 'Service fetched!',
            service
        })
    } catch (error) {
        console.log(error)
    }
}

// Update single service
export const updateSingleService = async (req, res) => {
    try {
        const serviceExists = await Services.findById(req.params.serviceId);
        if (!serviceExists) {
            res.status(404).json({
                status: 'error',
                message: 'Service does not exist',
            })
            return
        }
        const service = await Services.findByIdAndUpdate(req.params.serviceId, req.body)
        if (!service) {
            res.status(404).json({
                status: 'error',
                message: 'Unable to update service. Try again.'
            })
            return
        }
        res.status(200).json({
            status: 'success',
            message: 'Service updated',
            service
        })
    } catch (error) {
        console.log(error)
    }
}

// delete single service
export const deleteSingleService = async (req, res) => {
    try {
        const serviceExists = await Services.findById(req.params.serviceId);
        if (!serviceExists) {
            res.status(404).json({
                status: 'error',
                message: 'Service does not exist',
            })
            return
        }
        await Services.findByIdAndDelete(req.params.serviceId)

        res.status(200).json({
            status: 'success',
            message: 'Service Deleted!',
        })
    } catch (error) {
        console.log(error)
    }
}