export const BASE_URL = "http://localhost:8080/"

// Data Upload
export const FORM_FILL = BASE_URL + "v1/data/unstructured" // POST
export const FILE_UPLOAD = BASE_URL + "v1/data/file" // POST

//Data Display
export const INITIATE = BASE_URL + "v1/initiate" // GET
export const GIVERS = BASE_URL + "v1/data/givers/" //POST
    // v1/data/givers/{pageNumber}?city={city}&state={state}&type={type}
export const SEEKERS = BASE_URL + "v1/data/seekers/" //POST
    // v1/data/seekers/{pageNumber}?city={city}&state={state}&type={type}

// Curation
export const CURATION_WORKING = BASE_URL + "v1/data/unstructured/transient/" // POST
export const CURATION_COMPLETED = BASE_URL + "v1/data/unstructured/transient/success/" // POST

// Verification
export const ACTION = BASE_URL + "v1/data/verify/" // POST
// v1/data/verify/{id}/action
export const DISPLAY_ACTIONS = BASE_URL + "v1/data/verify/" // GET
// v1/data/verify/{id}/action