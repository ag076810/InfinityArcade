// 設定環境變數的值
process.env.OPENAI_API_KEY = "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"; 
process.env.STABILITY_API_KEY = "sk-yBYvKv1p1NYlq6VGffIRVNIsPlUOiCTJiWpSUkjijzuieslG";
process.env.REPLICATE_API_KEY = "r8_KGL3ti6L0XV7I6LYSTj2KeAjWmahhM82y13O9";

// 在程式碼中訪問環境變數的值
const openaiApiKey = process.env.OPENAI_API_KEY;
const stabilityApiKey = process.env.STABILITY_API_KEY;
const replicateApiKey = process.env.REPLICATE_API_KEY;

const log = require("debug")("ia:services:GenerateGame");
const AI = require("@themaximalist/ai.js");
const prompt = require("@themaximalist/prompt.js");

async function GenerateGame(prompt_text = null, model = "gpt-4", prompt_name = "GenerateGame-v1") {
    log(`generating game (prompt_text=${prompt_text}, model=${model}, prompt_name=${prompt_name})...`);
    console.log(`generating game (prompt_text=${prompt_text}, model=${model}, prompt_name=${prompt_name})...`);

    try {
        const input = prompt.load(prompt_name, { prompt_text });
        const game = await AI(input, {
            model,
            parser: JSON.parse
        });

        game.prompt_model = model;
        game.prompt_name = prompt_name;
        if (prompt_text) {
            game.prompt_text = prompt_text;
        }

        return game;
    } catch (e) {
        log(`error generating game ${e.message}`);
        return null;
    }
}

module.exports = GenerateGame;
