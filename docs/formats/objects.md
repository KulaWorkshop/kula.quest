# Object Database

There are many different types of objects in Kula Quest, each with their own set of properties.

| ID (h) | Name                  | Orientation                             | Variant             | State               |
| ------ | --------------------- | --------------------------------------- | ------------------- | ------------------- |
| 01     | Fire Patch            | 0                                       | 0                   | 0                   |
| 02     | Ice Patch             | 0                                       | 0                   | 0                   |
| 03     | Invisible Patch       | 0                                       | 0                   | 0                   |
| 04     | Acid Patch            | 0                                       | 0                   | 0                   |
| 05     | Transporter           | [Orientation](#orientation)             | [Color](#color)     | [Enabled](#enabled) |
| 06     | Unknown               | 0                                       | 0                   | 0                   |
| 07     | Exit                  | 0                                       | [Exit](#exit)       | [Locked](#enabled)  |
| 08     | Timer Pause           | 0                                       | 0                   | 0                   |
| 09     | Button                | 0                                       | [Color](#color)     | [Enabled](#enabled) |
| 0A     | Bouncepad             | 0                                       | 0                   | 0                   |
| 0B     | Moving Spike          | 0                                       | [Sync](#sync)       | 0                   |
| 0C     | Spike                 | 0                                       | 0                   | 0                   |
| 0D-19  | Unknown               | 0                                       | 0                   | 0                   |
| 1A     | Hidden Exit           | 0                                       | 0                   | [Locked](#enabled)  |
| 1B     | Fruit Bowl            | 0                                       | 0                   | 0                   |
| 1C     | Arrow                 | [Orientation](#orientation)             | 0                   | 0                   |
| 1D     | Player Spawn (Paused) | [Orientation](#orientation)             | 0                   | 0                   |
| 1E     | Player Spawn          | [Orientation](#orientation)             | 0                   | 0                   |
| 1F     | Key                   | 0                                       | 0                   | 0                   |
| 20     | Lethargy Pill         | 0                                       | 0                   | 0                   |
| 21     | Bouncy Pill           | 0                                       | 0                   | 0                   |
| 22     | Invincibility Pill    | 0                                       | 0                   | 0                   |
| 23     | Timer Flip            | 0                                       | 0                   | 0                   |
| 24     | Gem                   | 0                                       | [Variant](#variant) | 0                   |
| 25     | Coin                  | 0                                       | [Variant](#variant) | 0                   |
| 26     | Sunglasses            | 0                                       | 0                   | 0                   |
| 27     | Purple Present        | 0                                       | 0                   | 0                   |
| 28     | Red Present           | 0                                       | 0                   | 0                   |
| 29     | Yellow Present        | 0                                       | 0                   | 0                   |
| 2A     | Unused Enemy          | 0                                       | 0                   | 0                   |
| 2B     | Apple                 | 0                                       | 0                   | 0                   |
| 2C     | Watermelon            | 0                                       | 0                   | 0                   |
| 2D     | Pumpkin               | 0                                       | 0                   | 0                   |
| 2E     | Banana                | 0                                       | 0                   | 0                   |
| 2F     | Strawberry            | 0                                       | 0                   | 0                   |
| 30     | Blue Present          | 0                                       | 0                   | 0                   |
| 31     | Green Present         | 0                                       | 0                   | 0                   |
| 32     | Slow Star             | [Orientation](#orientation)             | 0                   | 0                   |
| 33     | Tire                  | [Orientation](#orientation)             | 0                   | 0                   |
| 34     | Fast Star             | [Orientation](#orientation)             | 0                   | 0                   |
| 35     | Capture Pod           | [Orientation](#capture-pod-orientation) | 0                   | 0                   |
| 36-37  | Unknown               | 0                                       | 0                   | 0                   |
| 38     | Captivator            | 0                                       | [Sync](#sync)       | 0                   |

## Variant

Some objects have different variants.

### Collectables

Coins and gems have different types that give different score, and both follow this table respectively:

-   `00 00` - Gold (750 pts.)
-   `01 00` - Blue (500 pts.)
-   `02 00` - Bronze (250 pts.)

---

-   `00 00` - Blue (2975 pts.)
-   `01 00` - Green (2975 pts.)
-   `02 00` - Red (2975 pts.)

### Exit

The level exit only has only 2 variants that are automatically set in memory:

-   `00 00` - Green (Unlocked)
-   `01 00` - Red (Locked)

**Note:** The hidden exit does not have a variant!

### Color

Some objects allow you to change their color using their **variant property**, specifically transporters and buttons. Lasers have a dedicated property for their color, but it follows the same structure:

-   `00 00` - Yellow
-   `01 00` - Blue
-   `02 00` - Green
-   `03 00` - Red
-   Any other value causes the model to change to lower-quality versions, and an eventual crash.

For the **first two demos specifically**, they follow a slightly different structure:

-   `00 00` - Blue
-   `01 00` - Red
-   `02 00` - Green
-   `03 00` - Yellow

## Sync

Some objects and blocks have an option that allows you to specify when their animation occurs in sync with others. For example, in some levels there are moving spikes that are placed right next to each other that poke out and retract at different times, allowing the player to time their jumps, instead of those animations occuring at the same time. For flashing blocks, they have a dedicated **sync** value to control this, while moving spikes and captivators use the **variant** to specify this value.

The sync value ranges from **0 to 5**, as any value after **5** stays in sync together, so it is effectively pointless. However, it's worth noting that with moving spikes specifically, setting its sync value to **5** causes the spikes to become invisible and may cause other unexpected behavior, so it is recommended to keep the sync value in a range from **0 to 4** for **moving spikes specifically!** For captivators, the sync value is also in range from **0 to 4**, though nothing larger will cause any unexpected behaviors.

## Enabled

Some objects have different **states**, mostly to show whether it's enabled or disabled. For buttons / transporters, and exits, they follow these tables respectively:

-   `01 00` - Enabled
-   `02 00` - Disabled
-   Any other value defaults to disabled, but the state will be set to `01` when pressed again, rather `02`.

---

-   `01 00` - Locked
-   `02 00` - Unlocked
-   Any other value defaults to locked.

## Orientation

There are many objects that allow you to control how they're orientated. For example, enemies allow you to control what direction they start moving in when the level is played based on this value, and other objects as the player spawn allow you to specify what direction the player spawns in.

Depending on the side of the block the object is placed on, you can specify what direction based on this table (**except** for [capture pods](#Capture-Pod-Orientation)):

**Note:** Any other value defaults to `1`.
**Note:** The orientation for transporters specify what direction the player will face when exited out of that transporter.

**Positive X:**

-   `1`: Faces Positive Z
-   `2`: Faces Positive Y
-   `3`: Faces Negative Z
-   `4`: Faces Negative Y

**Negative X:**

-   `1`: Faces Positive Z
-   `2`: Faces Negative Y
-   `3`: Faces Negative Z
-   `4`: Faces Positive Y

**Positive Y:**

-   `1`: Faces Positive Z
-   `2`: Faces Negative X
-   `3`: Faces Negative Z
-   `4`: Faces Positive X

**Negative Y:**

-   `1`: Faces Positive Z
-   `2`: Faces Positive X
-   `3`: Faces Negative Z
-   `4`: Faces Negative X

**Positive Z:**

-   `1`: Faces Positive Y
-   `2`: Faces Positive X
-   `3`: Faces Negative Y
-   `4`: Faces Negative X

**Negative Z:**

-   `1`: Faces Negative Y
-   `2`: Faces Positive X
-   `3`: Faces Positive Y
-   `4`: Faces Negative X

### Capture Pod Orientation

For an unknown reason, **capture pods** uses slightly different orientation values, but the structure is generally the same:

**Positive X:**

-   `1`: Faces Negative Y
-   `2`: Faces Positive Z
-   `3`: Faces Positive Y
-   `4`: Faces Negative Z

**Negative X:**

-   `1`: Faces Positive Z
-   `2`: Faces Negative Y
-   `3`: Faces Negative Z
-   `4`: Faces Positive Y

**Positive Y:**

-   `1`: Faces Positive X
-   `2`: Faces Positive Z
-   `3`: Faces Negative X
-   `4`: Faces Negative Z

**Negative Y:**

-   `1`: Faces Positive Z
-   `2`: Faces Positive X
-   `3`: Faces Negative Z
-   `4`: Faces Negative X

**Positive Z:**

-   `1`: Faces Negative X
-   `2`: Faces Positive Y
-   `3`: Faces Positive X
-   `4`: Faces Negative Y

**Negative Z:**

-   `1`: Faces Negative Y
-   `2`: Faces Positive X
-   `3`: Faces Positive Y
-   `4`: Faces Negative X
