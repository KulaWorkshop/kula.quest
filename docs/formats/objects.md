# Object Database

There are many different types of objects in Kula Quest, each with their own set of properties.

| ID (h) | Name                  | Direction                           | Variant             | State               |
| ------ | --------------------- | ----------------------------------- | ------------------- | ------------------- |
| 01     | Fire Patch            | 0                                   | 0                   | 0                   |
| 02     | Ice Patch             | 0                                   | 0                   | 0                   |
| 03     | Invisible Patch       | 0                                   | 0                   | 0                   |
| 04     | Acid Patch            | 0                                   | 0                   | 0                   |
| 05     | Transporter           | [Direction](#direction)             | [Color](#color)     | [Enabled](#enabled) |
| 06     | Unknown               | 0                                   | 0                   | 0                   |
| 07     | Exit                  | 0                                   | [Exit](#exit)       | [Locked](#enabled)  |
| 08     | Timer Pause           | 0                                   | 0                   | 0                   |
| 09     | Button                | 0                                   | [Color](#color)     | [Enabled](#enabled) |
| 0A     | Bouncepad             | 0                                   | 0                   | 1                   |
| 0B     | Moving Spike          | 0                                   | [Sync](#sync)       | 1                   |
| 0C     | Spike                 | 0                                   | 0                   | 1                   |
| 0D-19  | Unknown               | 0                                   | 0                   | 0                   |
| 1A     | Hidden Exit           | 0                                   | 0                   | [Locked](#enabled)  |
| 1B     | Fruit Bowl            | 0                                   | 0                   | 1                   |
| 1C     | Arrow                 | [Direction](#direction)             | 0                   | 1                   |
| 1D     | Player Spawn (Paused) | [Direction](#direction)             | 0                   | 0                   |
| 1E     | Player Spawn          | [Direction](#direction)             | 0                   | 0                   |
| 1F     | Key                   | 0                                   | 0                   | 1                   |
| 20     | Lethargy Pill         | 0                                   | 0                   | 1                   |
| 21     | Bouncy Pill           | 0                                   | 0                   | 1                   |
| 22     | Invincibility Pill    | 0                                   | 0                   | 1                   |
| 23     | Hourglass             | 0                                   | 0                   | 1                   |
| 24     | Gem                   | 0                                   | [Variant](#variant) | 1                   |
| 25     | Coin                  | 0                                   | [Variant](#variant) | 1                   |
| 26     | Sunglasses            | 0                                   | 0                   | 1                   |
| 27     | Purple Present        | 0                                   | 0                   | 1                   |
| 28     | Red Present           | 0                                   | 0                   | 1                   |
| 29     | Yellow Present        | 0                                   | 0                   | 1                   |
| 2A     | Unused Enemy          | 0                                   | 0                   | 1                   |
| 2B     | Apple                 | 0                                   | 0                   | 1                   |
| 2C     | Watermelon            | 0                                   | 0                   | 1                   |
| 2D     | Pumpkin               | 0                                   | 0                   | 1                   |
| 2E     | Banana                | 0                                   | 0                   | 1                   |
| 2F     | Strawberry            | 0                                   | 0                   | 1                   |
| 30     | Blue Present          | 0                                   | 0                   | 1                   |
| 31     | Green Present         | 0                                   | 0                   | 1                   |
| 32     | Slow Star             | [Direction](#direction)             | 0                   | 0                   |
| 33     | Tire                  | [Direction](#direction)             | 0                   | 0                   |
| 34     | Fast Star             | [Direction](#direction)             | 0                   | 0                   |
| 35     | Capture Pod           | [Direction](#capture-pod-direction) | 0                   | 0                   |
| 36-37  | Unknown               | 0                                   | 0                   | 0                   |
| 38     | Captivator            | 0                                   | [Sync](#sync)       | 0                   |

## Variant

Some objects have different variants.

### Collectables

Coins and gems have different types that give different score, and both follow this table respectively:

- `00 00` - Gold (750 pts.)
- `01 00` - Blue (500 pts.)
- `02 00` - Bronze (250 pts.)

---

- `00 00` - Blue (2975 pts.)
- `01 00` - Green (2975 pts.)
- `02 00` - Red (2975 pts.)

### Exit

The level exit only has only 2 variants that are automatically set in memory:

- `00 00` - Green (Unlocked)
- `01 00` - Red (Locked)

**Note:** The hidden exit does not have a variant!

### Color

Some objects allow you to change their color using their **variant property**, specifically transporters and buttons. Lasers have a dedicated property for their color, but it follows the same structure:

- `00 00` - Yellow
- `01 00` - Blue
- `02 00` - Green
- `03 00` - Red
- Any other value causes the model to change to lower-quality versions, and an eventual crash.

For the **first two demos specifically**, they follow a slightly different structure:

- `00 00` - Blue
- `01 00` - Red
- `02 00` - Green
- `03 00` - Yellow

## Sync

Some objects and blocks have an option that allows you to specify when their animation occurs in sync with others. For example, in some levels there are moving spikes that are placed right next to each other that poke out and retract at different times, allowing the player to time their jumps, instead of those animations occuring at the same time. For flashing blocks, they have a dedicated **sync** value to control this, while moving spikes and captivators use the **variant** to specify this value.

The sync value ranges from **0 to 5**, as any value after **5** stays in sync together, so it is effectively pointless. However, it's worth noting that with moving spikes specifically, setting its sync value to **5** causes the spikes to become invisible and may cause other unexpected behavior, so it is recommended to keep the sync value in a range from **0 to 4** for **moving spikes specifically!** For captivators, the sync value is also in range from **0 to 4**, though nothing larger will cause any unexpected behaviors.

## State

Collectable objects use this value in memory to determine whether an object has been collected or not.

### Enabled

Some objects use this field to determine whether it's enabled or disabled.
Transporters and buttons use the following:

- `01 00` - Enabled
- `02 00` - Disabled
- Any other value defaults to disabled, but the state will be set to `01` when pressed again, rather `02`.

Exits use the following as well:

- `01 00` - Locked
- `02 00` - Unlocked
- Any other value defaults to locked.

## Direction

There are many objects that allow you to control what direction they face. For example, enemies allow you to control what direction they start moving in when the level is played based on this value, and other objects as the player spawn allow you to specify what direction the player spawns in.

Depending on the side of the block the object is placed on, you can specify what direction based on this table (**except** for [capture pods](#capture-pod-direction)):

**Note:** Any other value defaults to `1`.
**Note:** The direction for transporters specify what direction the player will face when exited out of that transporter.

**Positive X:**

- `1`: Faces Positive Z
- `2`: Faces Positive Y
- `3`: Faces Negative Z
- `4`: Faces Negative Y

**Negative X:**

- `1`: Faces Positive Z
- `2`: Faces Negative Y
- `3`: Faces Negative Z
- `4`: Faces Positive Y

**Positive Y:**

- `1`: Faces Positive Z
- `2`: Faces Negative X
- `3`: Faces Negative Z
- `4`: Faces Positive X

**Negative Y:**

- `1`: Faces Positive Z
- `2`: Faces Positive X
- `3`: Faces Negative Z
- `4`: Faces Negative X

**Positive Z:**

- `1`: Faces Positive Y
- `2`: Faces Positive X
- `3`: Faces Negative Y
- `4`: Faces Negative X

**Negative Z:**

- `1`: Faces Negative Y
- `2`: Faces Positive X
- `3`: Faces Positive Y
- `4`: Faces Negative X

### Capture Pod Direction

For an unknown reason, **capture pods** use slightly different direction values, and still move in a _random_ direction if multiple in a level are set to the same direction.
For this very reason, it is not recommended to set its direction, and in most levels in the game they are actually set to **0**.
