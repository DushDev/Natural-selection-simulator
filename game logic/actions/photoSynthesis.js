import settings from "../../settings.js";

export default function photoSynthesis(bacteria) {
  let mineralsPlus = 1 + bacteria.minerals / 10;
  if (mineralsPlus > 2.5) mineralsPlus = 2.5;
  bacteria.energy += Math.round(
    settings.energyLevels[Math.floor(bacteria.y / 8) * 8] * mineralsPlus
  );
  bacteria.energyFromPhotosintesis += Math.round(
    settings.energyLevels[Math.floor(bacteria.y / 8) * 8] * mineralsPlus
  );
  bacteria.energy -= settings.actionsPrice.photosynthesis;
  bacteria.iter = 0;
  bacteria.programCounter++;
}
