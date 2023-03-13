import { Router } from 'express'
import tester from '../controllers/testController.js'

const routerTest = Router()

routerTest.get('/', tester.testear)

routerTest.get('/info', tester.info)

routerTest.get('/info-gzip', tester.infogzip)

export default routerTest