import { googleGenAi } from '@google/genai';

const ai = new googleGenAi({});

const interaction = await ai.interactions.create({
    model: "gemini-3.8-flash",
    
})

export default ai;