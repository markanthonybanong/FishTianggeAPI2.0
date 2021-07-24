const watchCourierPosition = require('./watch-courier-location');
module.exports = function(io, socket){
    //short hand for exporting object
    watchCourierPosition(io, socket)
}