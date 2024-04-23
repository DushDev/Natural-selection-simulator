import Bot from "../bot";

export default function mineralsToEnergy(bot: Bot) {
  bot.energy += bot.minerals * 4;
  bot.energyFromMinerals += bot.minerals * 4;
  bot.minerals = 0;
  bot.programCounter += 1;
  bot.iter = 0;
}
