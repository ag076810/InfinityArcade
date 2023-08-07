const log = require("debug")("ia:services:GenerateGame");
const AI = require("@ag076810/ai.js");
const prompt = require("@ag076810/prompt.js");

async function GenerateGame(prompt_text = null, model = process.env.AI_MODEL, prompt_name = "GenerateGame-v1") {
    log(`generating game (prompt_text=${prompt_text}, model=${model}, prompt_name=${prompt_name})...`);
    console.log(`generating game (prompt_text=${prompt_text}, model=${model}, prompt_name=${prompt_name})...`);

    try {
        console.log(prompt_name);
        const input = prompt.load(prompt_name, { prompt_text });
        const game = await AI(input, {
            model,
            parser: JSON.parse
        });
        console.log("vfsfvfv");
        game.prompt_model = model;
        game.prompt_name = prompt_name;
        if (prompt_text) {
            game.prompt_text = prompt_text;
            console.log("prompt_text");
        }
        console.log("finish");
        return game;
    } catch (e) {
        console.log(`error generating game ${e.message}`);
        log(`error generating game ${e.message}`);
        return null;
    }
}

module.exports = GenerateGame;
