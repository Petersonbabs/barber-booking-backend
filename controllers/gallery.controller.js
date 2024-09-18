import Gallery from "../models/gallery.model.js"


// get gallery
export const getGallery = async (req, res) =>{
    try {
        const gallery = await Gallery.find().populate({path: 'client', select: 'name profilePic'}).populate({path: 'service', select: 'name'})
        if(!gallery){
            res.status(404).json({
                status: 'error',
                message: 'Gallery not found!'
            })
            return
        }
        res.status(200).json({
            status: 'success',
            message: 'Gallery fetched!',
            numOfWorks: gallery.length,
            gallery
        })
    } catch (error) {
        console.log(error)
    }
}

// add work to gallery
export const addWorkToGallery = async (req, res) => {
    try {
        const work = await Gallery.create({...req.body})
        if(!work){
            res.status(404).json({
                status: 'error',
                message: 'Work was not added to gallery.'
            })
            return 
        }

        res.status(201).json({
            status: 'success',
            message: 'Work has been added',
            work
        })
    } catch (error) {
        console.log(error)
    }
}

// get single work
export const getSingleWork = async (req, res) => {
    try {
        const work = await Gallery.findById(req.params.workId).populate({path: 'client', select: 'name profilePic'}).populate({path: 'service', select: 'name'})
        if(!work){
            res.status(404).json({
                status: 'error',
                message: 'Work not found!'
            })
            return
        }
        res.status(200).json({
            status: 'success',
            message: 'Work fetched!',
            work
        })
    } catch (error) {
        console.log(error)
    }
}

// update work
export const updateWork = async (req, res) => {
    try {
        const workExists = await Gallery.findById(req.params.workId)
        if(!workExists){
            res.status(404).json({
                status: 'error',
                message: 'This work does not exists'
            })
            return
        }
        const work = await Gallery.findByIdAndUpdate(req.params.workId, req.body)
        res.status(200).json({
            status: 'success',
            message: 'Work has been updated!',
            work
        })
    } catch (error) {
        console.log(error)
    }
}
