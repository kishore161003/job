import { generateReactHelpers } from "@uploadthing/react/hooks";

const { OurFileRouter } = require("../app/api/uploadthing/core");

// Destructuring the generated helpers
const { useUploadThing, uploadFiles } = generateReactHelpers(OurFileRouter);

// Exporting the helpers
module.exports = {
  useUploadThing,
  uploadFiles,
};
