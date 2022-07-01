function handle(promise) {
    return promise.then((data) => (data))
    .catch((err) => ({err: true, data: err.data}))
}
module.exports = handle