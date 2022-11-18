/* TEST */
const testMessage = process.env.TEST_MSG;

/* Check Variables */
if(!testMessage) {
  throw new Error('.env is missing the definition of TEST_MSG environment variable.');
}

/* export */
module.exports = {
  testMessage
}