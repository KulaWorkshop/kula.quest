# Object Table

A database containing every known object and their properties.

## Overview

There are many different types of objects in Kula Quest, each with their own set of properties.
Here is a complete table of every known object to exist:

| ID(h) | Name                  | Direction                           | Variant                | State                 | Appearance   |
| ----- | --------------------- | ----------------------------------- | ---------------------- | --------------------- | ------------ |
| 01    | Fire Patch            | 0                                   | 0                      | 0                     | -            |
| 02    | Ice Patch             | 0                                   | 0                      | 0                     | -            |
| 03    | Invisible Patch       | 0                                   | 0                      | 0                     | -            |
| 04    | Acid Patch            | 0                                   | 0                      | 0                     | -            |
| 05    | Transporter           | [Direction](#direction)             | [Color](#variant)      | [Enabled](#state)     | 256, 1, 30   |
| 06    | Unknown               | -                                   | -                      | -                     | -            |
| 07    | Exit                  | 0                                   | [Exit Color](#variant) | [Locked](#state)      | 500, 1, 30   |
| 08    | Timer Pause           | 0                                   | 0                      | 0                     | -            |
| 09    | Button                | 0                                   | [Color](#variant)      | [Enabled](#state)     | 256, 0, 0    |
| 0A    | Bouncepad             | 0                                   | 0                      | [Collectable](#state) | 256, 3, 0    |
| 0B    | Moving Spike          | 0                                   | [Sync](#sync)          | [Collectable](#state) | 256, 0, 0    |
| 0C    | Spike                 | 0                                   | 0                      | [Collectable](#state) | 256, 0, 0    |
| 0D-19 | Unknown               | -                                   | -                      | -                     | -            |
| 1A    | Hidden Exit           | 0                                   | 0                      | [Locked](#state)      | 500, 1, 30   |
| 1B    | Fruit Bowl            | 0                                   | 0                      | [Collectable](#state) | -            |
| 1C    | Arrow                 | [Direction](#direction)             | 0                      | [Collectable](#state) | 256, 0, 0    |
| 1D    | Player Spawn (Paused) | [Direction](#direction)             | 0                      | 0                     | 256, 0, 0    |
| 1E    | Player Spawn          | [Direction](#direction)             | 0                      | 0                     | 256, 0, 0    |
| 1F    | Key                   | 0                                   | 0                      | [Collectable](#state) | 386, 1, -100 |
| 20    | Lethargy Pill         | 0                                   | 0                      | [Collectable](#state) | 386, 2, 100  |
| 21    | Bouncy Pill           | 0                                   | 0                      | [Collectable](#state) | 386, 2, 100  |
| 22    | Invincibility Pill    | 0                                   | 0                      | [Collectable](#state) | 386, 2, 100  |
| 23    | Hourglass             | 0                                   | 0                      | [Collectable](#state) | 386, 2, 100  |
| 24    | Gem                   | 0                                   | [Variant](#variant)    | [Collectable](#state) | 386, 1, -17  |
| 25    | Coin                  | 0                                   | [Variant](#variant)    | [Collectable](#state) | 386, 1, -100 |
| 26    | Sunglasses            | 0                                   | 0                      | [Collectable](#state) | 386, 1, -100 |
| 27    | Purple Present        | 0                                   | 0                      | [Collectable](#state) | -            |
| 28    | Red Present           | 0                                   | 0                      | [Collectable](#state) | -            |
| 29    | Yellow Present        | 0                                   | 0                      | [Collectable](#state) | -            |
| 2A    | Unused Enemy          | 0                                   | 0                      | [Collectable](#state) | 416, 0, 100  |
| 2B    | Apple                 | 0                                   | 0                      | [Collectable](#state) | 386, 1, 100  |
| 2C    | Watermelon            | 0                                   | 0                      | [Collectable](#state) | 386, 1, 100  |
| 2D    | Pumpkin               | 0                                   | 0                      | [Collectable](#state) | 386, 1, 100  |
| 2E    | Banana                | 0                                   | 0                      | [Collectable](#state) | 386, 1, 100  |
| 2F    | Strawberry            | 0                                   | 0                      | [Collectable](#state) | 386, 1, 100  |
| 30    | Blue Present          | 0                                   | 0                      | [Collectable](#state) | -            |
| 31    | Green Present         | 0                                   | 0                      | [Collectable](#state) | -            |
| 32    | Slow Star             | [Direction](#direction)             | 0                      | 0                     | -            |
| 33    | Tire                  | [Direction](#direction)             | 0                      | 0                     | -            |
| 34    | Fast Star             | [Direction](#direction)             | 0                      | 0                     | -            |
| 35    | Capture Pod           | [Direction](#capture-pod-direction) | 0                      | 0                     | -            |
| 36-37 | Unknown               | -                                   | -                      | -                     | -            |
| 38    | Captivator            | 0                                   | [Sync](#sync)          | 0                     | -            |

## Variant

Several variants for different objects exist, and are actually used under the hood for indexing into a different sub-model for a given object.
Transporters and buttons allow you to change their color using the this field.
Lasers have a dedicated property for their color, but it follows the same structure.

| Object       | Value 0          | Value 1           | Value 2           | Value 3 |
| ------------ | ---------------- | ----------------- | ----------------- | ------- |
| Coin         | Gold (750 pts.)  | Silver (500 pts.) | Bronze (250 pts.) | -       |
| Gem          | Blue (2975 pts.) | Green (2975 pts.) | Red (2975 pts.)   | -       |
| Exit         | Green (Unlocked) | Red (Locked)      | -                 | -       |
| Colors       | Yellow           | Blue              | Green             | Red     |
| Colors (old) | Blue             | Red               | Green             | Yellow  |

For the **first two demos specifically**, they follow a slightly different color structure on the bottom.

### Sync

Some objects and blocks have an option that allows you to specify when their animation occurs in sync with others.
For example, in some levels there are moving spikes that are placed right next to each other that poke out and retract at different times, allowing the player to time their jumps, instead of those animations occurring at the same time.
For flashing blocks, they have a dedicated **sync** value to control this, while moving spikes and captivators use the **variant** field to specify this value.

The sync value ranges from **0 to 5**, as any value after **5** stays in sync together, so it is effectively pointless. However, it's worth noting that with moving spikes specifically, setting its sync value to **5** causes the spikes to become invisible and may cause other unexpected behavior, so it is recommended to keep the sync value in a range from **0 to 4** for **moving spikes specifically!** For captivators, the sync value is also in range from **0 to 4**, though nothing larger will cause any unexpected behaviors.

## State

Most objects use this value in memory to determine whether it has been collected or not if it's a collectable object:

| Object                   | Value 0   | Value 1                   | Value 2              |
| ------------------------ | --------- | ------------------------- | -------------------- |
| Transporters and Buttons | -         | Enabled                   | Disabled             |
| Exits                    | -         | Unlocked                  | Locked (set in file) |
| Collectables             | Collected | Uncollected (set in file) | -                    |

::: tip Important
Exits and collectables must have their states set to 2 and 1 in the file respectively as shown in the table for them to work properly.
:::

Transporters and buttons use this value to determine whether they're enabled. Any other value defaults to disabled, but the state will be set to 1 when pressed again.
For exits, any other value defaults to locked.

## Direction

Many objects that allow you to control what direction they face.
For example, enemies allow you to control what direction they start moving in when the level is played based on this value, and other objects as the player spawn allow you to specify what direction the player spawns in.

Depending on the side of the block the object is placed on, you can specify the direction based on this table:

| Block Face     | Value 1    | Value 2    | Value 3    | Value 4    |
| -------------- | ---------- | ---------- | ---------- | ---------- |
| **Positive X** | Positive Z | Positive Y | Negative Z | Negative Y |
| **Negative X** | Positive Z | Negative Y | Negative Z | Positive Y |
| **Positive Y** | Positive Z | Negative X | Negative Z | Positive X |
| **Negative Y** | Positive Z | Positive X | Negative Z | Negative X |
| **Positive Z** | Positive Y | Positive X | Negative Y | Negative X |
| **Negative Z** | Negative Y | Positive X | Positive Y | Negative X |

::: info
Any other value defaults to the value **1**, and the direction for transporters specify what direction the player will face when exited out of that transporter.
:::

### Capture Pod Direction

For an unknown reason, **capture pods** still move in a _random_ direction even if multiple in a level are set to the same direction.
It is not recommended to set its direction, and in every level they are actually set to either **0** or **4** in all releases.

## Appearance

In the alpha and beta demos for the game, objects contain 3 additional values used for setting how the object spins and how far it is off the ground.
Here is what the 3 values refer to under the **Appearance** column:

- Ground offset
- Rotation type
  - `0`: None
  - `1`: Relative Y axis
  - `2`: Relative Z axis
  - `3`: Relative X axis
- Rotation speed
  - The direction it spins on the axis depends on whether the value is positive or negative.
