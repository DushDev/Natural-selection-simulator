import Bot from "../bot";
export default function whatMyLevel(bot: Bot) {
  if (bot.y > bot.genome[bot.programCounter + 1] * 2.2) {
    bot.programCounter += bot.genome[bot.programCounter + 2];
  } else {
    bot.programCounter += bot.genome[bot.programCounter + 3];
  }
}
