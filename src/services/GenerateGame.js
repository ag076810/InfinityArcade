const log = require("debug")("ia:services:GenerateGame");
const AI = require("@themaximalist/ai.js");
const prompt = require("@themaximalist/prompt.js");

async function GenerateGame(prompt_text = null, model = process.env.AI_MODEL, prompt_name = "GenerateGame-v1") {
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