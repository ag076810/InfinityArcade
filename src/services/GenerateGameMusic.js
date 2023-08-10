// 設定環境變數的值
process.env.OPENAI_API_KEY = "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"; 
process.env.STABILITY_API_KEY = "sk-yBYvKv1p1NYlq6VGffIRVNIsPlUOiCTJiWpSUkjijzuieslG";
process.env.REPLICATE_API_KEY = "r8_KGL3ti6L0XV7I6LYSTj2KeAjWmahhM82y13O9";

// 在程式碼中訪問環境變數的值
const openaiApiKey = process.env.OPENAI_API_KEY;
const stabilityApiKey = process.env.STABILITY_API_KEY;
const replicateApiKey = process.env.REPLICATE_API_KEY;

const log = require("debug")("ia:services:GenerateGameMusic");
const AI = require("@themaximalist/ai.js");
const prompt = require("@themaximalist/prompt.js");
const { shuffle } = require("../utils");

const SEED_IMAGES = ["og_beat", "agile", "marim", "motorway", "vibes"];
function randomSeedImage() {
    return shuffle(SEED_IMAGES)[0];
}

async function GenerateGameMusic(game, model = process.env.AI_MODEL, prompt_name = "GenerateGameMusic-v1") {
    log(`generating game music (game=${game.llm_fields}, model=${model}, prompt_name=${prompt_name})...`);

    try {
        const input = prompt.load(prompt_name, { game: game.llm_fields });
        const keywords = await AI(input, { model: "gpt-4" });

        const music = {
            seed: 1,
            prompt: keywords,
            seedImageId: randomSeedImage(),
        };

        log(`generated music ${JSON.stringify(music)}`);

        return music;
    } catch (e) {
        log(`error generating music ${e.message}`);
        return null;
    }
}

module.exports = GenerateGameMusic;
