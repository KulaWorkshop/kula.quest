---
description: 'Details regarding the main releases of Kula Quest.'
---

# Main Releases

{{ $frontmatter.description }}

<div class="warning custom-block !pt-2">

This page is still under construction!

</div>

**Table of Contents:**

[[toc]]

## Kula World <Badge type="tip" text="SCES-01000" />

<img src="/images/cover-sces01000.png" alt="Kula World cover" width="400px" />

Kula World was released on **July 10th, 1998** and was published by [Sony Computer Entertainment](https://en.wikipedia.org/wiki/Sony_Interactive_Entertainment).
It remains the most well known version of the game.

The most well known piece of cut content is the **OBJ LEVEL**, a testing level containing every object in the game including unused objects.
This level is present at the end of every theme's main [.PAK](/formats/pak) file:

![Object level](/images/obj-level.png)

## Roll Away <Badge type="tip" text="SLUS-00724" />

<img src="/images/cover-slus00724.jpg" alt="Roll Away cover" width="400px" />

Roll Away was released sometime between **November 27th to December 1st, 1998**.
It remains the only known version to have been released in North America, and was published by [Psygnosis](https://en.wikipedia.org/wiki/Psygnosis).
The changes in this version branch off of the changes from the [Kula World Prototype](/content/releases#kula-world-prototype-europe), as the prototype is slightly newer than Kula World.

The OBJ LEVEL inside Hiro's PAK file was replaced with a new **LESSON** level, slightly modified to show the player most of the objects and blocks, though still inaccessible:

![Lesson level](/images/lesson-level.png)

A more obscure unused level is one embedded inside the game's executable, which was later used in [Kula Quest](#kula-quest) for the Time Trial ending:

![Time Trait ending level](/images/trial-ending-level-1.png)

Unused code for the ending sequence does exist inside the game, and can be activated using a debugger:

<video width="600" controls>
	<source src="/videos/trial-ending-footage.mp4" type="video/mp4" />
	Your browser does not support the video tag.
</video>

Additional changes include:

- The ending FMV was changed to a golden ball bouncing on a block.
- The Hidden 10 exit is correctly placed, with the Hidden 9 exit being placed but in an unreachable location.
- For an unknown reason, the "ACID!" death message is displayed when The Final is completed.
- Several [.TGI](/formats/tgi) files are changed.
  Notably, the dark side in Hiro's theme is a little brighter in this version.

## Kula Quest <Badge type="tip" text="SCPS-10064" />

<img src="/images/cover-scps10064.jpg" alt="Kula Quest cover" width="400px" />

Kula Quest was released on **May 27th, 1999** and was published by [Sony Computer Entertainment](https://en.wikipedia.org/wiki/Sony_Interactive_Entertainment).
With it being the most recent official release, it contains a multitude of new features and adjustments than the previous versions.

The Time Trial ending level was slightly changed:

- Additional blocks are added.
- All of the objects in the center were removed.
- The exit and a single key was moved to the same platform as the player spawn.

![Time Trait ending level](/images/trial-ending-level-2.png)

Additional changes include:

- The The Final completion message is fixed with the same message appearing when the player touches acid.
- The Hidden 9 exit is correctly placed in a different level and the fruit is removed from the hidden level itself.
- Several levels were changed to accommodate for the new level completion percentage feature.

## References

Cover sources:

- [Kula World Cover](https://en.wikipedia.org/wiki/Kula_World#/media/File:Kula_World_Coverart.png), Wikipedia
- [Roll Away Cover](https://www.mobygames.com/game/9070/roll-away/cover/group-26080/cover-67016/), MobyGames
- [Kula Quest Cover](https://archive.org/details/kulaquestjapan), Internet Archive
