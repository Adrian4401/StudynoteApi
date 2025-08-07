// const Note = require('../models/Note')



const getAllNotes = async (req, res) => {
    try 
    {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts')
        const data = await response.json()

        if(!data || data.length === 0) {
            return res.status(200).json([])
        }

        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({ message: '[ERROR]', error: error.message })
    }
}

const getNote = async (req, res) => {
    const { id } = req.params

    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
        const data = await response.json()

        if(!data.id) {
            return res.status(404).json({ message: 'Note not found' })
        }

        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({ message: '[ERROR]', error: error.message })
    }
}

module.exports = { getAllNotes, getNote }