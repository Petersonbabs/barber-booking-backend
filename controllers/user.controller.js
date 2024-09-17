import Users from "../models/user.model.js"


// GET ALL CLIENTS
export const getAllClients = async (req, res) => {
    try {
        const users = await Users.find()
        if(!users){
            res.status(404).json({
                status: 'error',
                message: 'Unable to fetch all users.'
            })
            return
        }
        res.status(200).json({
            status: 'success',
            message: 'Users successfully fetched!',
            numOfUsers: users.length,
            users
        })
    } catch (error) {
        console.log(error)
    }
}

// GET SINGLE CLIENT 
export const getSingleClient = async (req, res) => {
    try {
        const user = await Users.findById(req.params.id)
        if (!user) {
            res.status(404).json({
                status: 'error',
                message: 'This user does not exist.'
            })
            return
        }

        res.status(200).json({
            message: 'User fetched successfully',
            user
        })
    } catch (error) {
        console.log(error)
    }
}

// update profile
export const updateProfile = async (req, res) => {
    try {
        const user = await Users.findByIdAndUpdate(req.params.id, req.body)
        if (!user) {
            res.status(404).json({
                message: 'unable to update profile.'
            })
            return
        }

        res.status(200).json({
            message: 'Successfully updated',
            user
        })
    } catch (error) {
        console.log(error)
    }
}


export const deleteUser = async (req, res) => {

    try {
        await Users.findByIdAndDelete(req.params.id)
        res.json({ message: 'User has been deleted!' })
    } catch (error) {
        console.log(error)
    }
} 