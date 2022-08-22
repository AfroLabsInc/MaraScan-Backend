/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.any('/queue', async ({ request }) => {
  console.log(request.all())

  return { hello: 'world' }
})

Route.any('/result', async ({ request }) => {
  const { Result } = request.all()
  console.log(request.all())

  console.log(Result?.ResultParameters.ResultParameter)
  return { hello: 'world' }
})
