export default async () => {
  
}
// export default async (ctx) => {
//   // https://hackernoon.com/implementing-a-websocket-server-with-node-js-d9b78ec5ffa8
//   console.log(Object.keys(ctx))
//   // const home = await models.Page.select({
//   //   where: [
//   //     {
//   //       innerConditon: 'and',
//   //       values: {
//   //         name: 'home'
//   //       }
//   //     },
//   //     {
//   //       innerConditon: 'and',
//   //       outerConditon: 'and',
//   //       values: {
//   //         name: 'home'
//   //       }
//   //     }
//   //   ]
//   // })
//   // const { request = {} } = ctx
//   // const { charset, path, querystring, method, type } = request

//   // // const routes = {
//   // //   '/pages': {
//   // //     'GET': () => {},
//   // //     'POST': () => {},
//   // //     'OPTIONS': () => {},
//   // //     'DELETE': () => {},
//   // //     'PUT': () => {},
//   // //   }
//   // // }

//   // // if(charset !== undefined && charset !== 'utf-8') {
//   // //   throw new Error('Invalid charset')
//   // // }

//   // // routes.request(path)[method](querystring)

//   // // console.log(path)

//   // console.log('charset', charset)
//   // console.log('path', path)
//   // console.log('querystring', querystring)
//   // console.log('method', method)
//   // console.log('type', type)
//   // console.log(request.req.method)
//   // console.log(Object.keys(request.req))
//   // console.log(Object.keys(request.req.socket.on))
//   // console.log('------')
//   // console.log('------')

//   // if (request.req.socket.on) {
//   //   let body = ''
//   //   request.req.socket.on('data', chunk => {
//   //     body += chunk.toString() // convert Buffer to string
//   //   })
//   //   request.req.socket.on('end', () => {
//   //     console.log(body)
//   //     // request.end('ok')
//   //   })
//   // }

//   // ctx.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
//   // ctx.set('Access-Control-Allow-Origin', 'http://localhost:3000')
//   // ctx.body = {
//   //   test: `Hello Koa`
//   // }
// }
