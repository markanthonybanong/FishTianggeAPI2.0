const couriersPositions = [];
module.exports = function(io, socket){
    socket.on('watch-courier-location', (courierPosition)=>{
        couriersPositions.unshift(courierPosition)
        io.emit('get-courier-location', couriersPositions);
    });
};