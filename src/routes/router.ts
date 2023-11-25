import express from 'express'
import { addRole, getRoles, getRoleById, updateRole, deleteRole } from '../controller/roleController'
import { getUsers, getUsersById, userRegister, userLogin, userLogout } from '../controller/userController'
import { registerValidation } from '../middleware/userValidation'
import { authentication } from '../middleware/auth'

const router = express.Router()

/* Role Router */

router.get('/roles', authentication, getRoles)
router.get('/role/:id', getRoleById)
router.post('/role', addRole)
router.put('/role/:id', updateRole)
router.delete('/role/:id', deleteRole)

/* End Role Router */

/* --------------------------------------- */

/* User Router */

router.get('/users', getUsers)
router.get('/user/:id', getUsersById)
router.post('/user/register', registerValidation, userRegister)
router.post('/user/login', userLogin)
router.get('/user/logout/:id', userLogout)

/* End User Router */

export default router
