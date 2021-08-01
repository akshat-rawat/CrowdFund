const routes = require('next-routes')()

routes
  .add('/project/new', '/project/new')
  .add('/project/:address', '/project/show')
  .add('/project/:address/requests', '/project/requests/index')
  .add('/project/:address/requests/new', '/project/requests/new')

module.exports = routes
