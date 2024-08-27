const { successHandler, errorHandler } = require('../server/handle');
const handleErrorAsync = require("../server/handleErrorAsync")
const Guest = require("../models/guest.model")
const appError = require("../server/appError")

router.post('/', (req, res) => {
  console.log(req,res)
});

module.exports = router;