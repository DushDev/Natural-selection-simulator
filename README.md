# Game developed with vanila js

That simulation of natural selection in worlds with different rules. You can change this rules in settings.js.

Every bot (pixel) in game have his own genome that consists of 64 numbers from 0 to 63. Every number in genome mean command or if number dont have command, program just jump to count of indexes that specified in current cage. Mecthanic isnt so hard, but it is hard to explanation.

In rules i was inspired by [foo52ru](https://www.youtube.com/@foo52ru) and his cyber biology. In his channel you can get more information about this project and how it works.

## Details

In normal mode of view you can see 3 colors of bot: Red, Green and Blue. What this colors mean? Bot get green color when get energy from photosynthesis, blue when get energy from minerals that is in bottom side of world, and Red - when bot eat organics (died bots) or other bots.

Bots can distinguish familiar bots (same genome). You can see clans of bots in "colors" mode of view.

Every bot have energy from 0 to 1000. If bot have 0 energy he die, if have 950 energy he create his clone, mutation may occur during cloning (you can change percent of mutation using range). On mutation one random number in genome changes to another random number.

Mutations provides natural selection. When mutation is lucky new sort of bot divides and population grow. But if mutation isnt lucky new sort die.

### The game will be updated in the future
