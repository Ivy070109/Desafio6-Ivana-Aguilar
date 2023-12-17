import { Router } from 'express'

const router = Router()

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

router.post('/login', async (req, res) => {
    try { 
        const { user, pass } = req.body
        //reemplazar user por email. admin: true, sino user
        if(user === 'cperren' && pass === 'abc123') {
            req.session.user = { username: user, admin: true }
            res.status(200).send({ status: 'OK', data: `Sesión iniciada` })
        } else {
            res.status(401).send({ status: 'ERR', data: `Datos no válidos` })
        }
    } catch (err) {
        res.status(500).send({ status: 'ERR', data: err.message })
    }
})

export default router
