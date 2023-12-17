import { Router } from 'express'

const router = Router()

//middleware de autenticación del admin
const auth = (req, res, next) => {
    try {
        if (req.session.user.admin) {
            if (req.session.user.admin === true) {
                next()
            } else {
                res.status(403).send({ status: 'ERR', data: 'Usuario no admin', role: 'user' })
            }
        } else {
            res.status(401).send({ status: 'ERR', data: 'Usuario no autorizado' })
        }
    } catch (err) {
        res.status(500).send({ status: 'ERR', data: err.message })
    }
}

//abriendo session directo
/*
router.get('/', async (req, res) => {
    try {
        if (req.session.log) {
            req.session.log++
            res.status(200).send({ status: 'OK', data: `Cantidad de visitas: ${req.session.log}` })
        } else {
            req.session.log = 1
            res.status(200).send({ status: 'OK', data: `¡Bienvenido!` })
        }
    } catch (err) {
        res.status(500).send({ status: 'ERR', data: err.message })
    }
})
*/

router.get('/logout', async (req, res) => {
    try {
        req.session.destroy((err) => {
            if (err) {
                res.status(500).send({ status: 'ERR', data: err.message })
            } else {
                res.status(200).send({ status: 'OK', data: "Sesión finalizada" })
            }
        })
    } catch (err) {
        res.status(500).send({ status: "ERR", data: err.message })
    }
})

//pequeña autenticación del admin, utilizaré un middleware para ésto  
router.get('/admin', auth, async (req, res) => {
    try {
        // if (req.session.user.admin === true) {
        //     res.status(200).send({ status: 'OK', role: 'admin'})
        // } else {
        //     res.status(200).send({ status: 'OK', role: `user` })
        // }
        res.status(200).send({ status: 'OK', data: 'Éstos son los datos privados'})
    } catch (err) {
        res.status(500).send({ status: 'ERR', data: err.message })
    }
})

router.post('/login', async (req, res) => {
    try { 
        const { email, password } = req.body

        if(email === 'adminCoder@coder.com' && password === 'adminCod3r123') {
            req.session.user = { username: email, admin: true }
            res.status(200).send({ status: 'OK', data: `Sesión iniciada` })
        } else {
            res.status(401).send({ status: 'ERR', data: `Datos no válidos` })
        }
    } catch (err) {
        res.status(500).send({ status: 'ERR', data: err.message })
    }
})

export default router
