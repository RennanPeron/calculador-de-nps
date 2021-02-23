import express from 'express'

const app = express()

app.get("/", (req, res) => {
    return res.json({message: "Ola Mundo - NLW04"})
})

app.post('/', (req, res) => {
    return res.json({message: "Os dados foram salvos."})
})

app.listen(3000, () => {
    console.log("Server is Running!")
})