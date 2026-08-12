const OpenAI = require('openai')
const { GoogleGenAI } = require('@google/genai')

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
})

const gemini = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
})

const getJsonFromText = (text) => {
    try {
        return JSON.parse(text)
    } catch (error) {
        const jsonMatch = text.match(/\{[\s\S]*\}/)

        if (!jsonMatch) {
            throw error
        }

        return JSON.parse(jsonMatch[0])
    }
}

const generateWithOpenAI = async ({ prompt, schemaName, schema }) => {
    const response = await openai.responses.create({
        model: process.env.OPENAI_MODEL || 'gpt-5-mini',
        input: prompt,
        text: {
            format: {
                type: 'json_schema',
                name: schemaName,
                strict: true,
                schema
            }
        }
    })

    return JSON.parse(response.output_text)
}

const generateWithGemini = async ({ prompt }) => {
    const response = await gemini.models.generateContent({
        model: process.env.GEMINI_MODEL || 'gemini-2.5-flash-lite',
        contents: prompt,
        config: {
            responseMimeType: 'application/json',
            temperature: 0.2
        }
    })

    return getJsonFromText(response.text)
}

const generateJson = async ({ prompt, schemaName, schema }) => {
    if (process.env.AI_PROVIDER === 'gemini') {
        return await generateWithGemini({ prompt })
    }

    return await generateWithOpenAI({
        prompt,
        schemaName,
        schema
    })
}

module.exports = {
    generateJson
}