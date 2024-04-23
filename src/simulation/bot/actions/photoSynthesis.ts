import Bot from "../bot";

export default function photoSynthesis(bot: Bot) {
  let mineralsPlus = 1 + bot.minerals / 10;
  if (mineralsPlus > 2.5) mineralsPlus = 2.5;
  bot.energy += Math.round(8 * mineralsPlus);
  bot.energyFromPhotosintesis += Math.round(8 * mineralsPlus);
  bot.energy -= 1;
  bot.iter = 0;
  bot.programCounter++;
}
