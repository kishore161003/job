const { createNextRouteHandler } = require("uploadthing/next");

const { ourFileRouter } = require("./core");

// Export routes for Next App Router
const { GET, POST } = createNextRouteHandler({
  router: ourFileRouter,
});

module.exports = {
  GET,
  POST,
};
