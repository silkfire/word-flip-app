const request = require('request');

module.exports = {
    getLastSentences: (callback) => request(`${process.env.API_URL}/api/flip/getLastSentences`, callback),
    flip: (payload, callback) => request({ url: `${process.env.API_URL}/api/flip`,
                                           method: 'post',
                                           json: payload
                                         }, callback)
}