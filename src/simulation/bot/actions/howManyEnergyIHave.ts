import Bot from "../bot";

export default function howManyEnergyIHave(bot: Bot) {
  if (bot.energy > bot.genome[bot.programCounter + 1] * 15) {
    bot.programCounter += bot.genome[bot.programCounter + 2];
  } else {
    bot.programCounter += bot.genome[bot.programCounter + 3];
  }
}
