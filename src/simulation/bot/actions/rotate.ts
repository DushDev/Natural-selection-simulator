import Bot from "../bot";

export default function rotate(bot: Bot) {
  bot.align += bot.genome[bot.programCounter + 1] % 8;
  bot.align %= 8;
  bot.energy -= 1;
  bot.programCounter += 1;
}
