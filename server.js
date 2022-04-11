

app.post('results', (req, res) => {
    // append result to a file
    FileSystem.appendFile('filename.csv', req.body)
})