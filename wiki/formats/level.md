---
description: 'A custom binary format for storing level information.'
---

# Level Format

{{ $frontmatter.description }}

<div class="tip custom-block !pt-2">

This document contains information about the format structure of level files.
If you are interested in using tools to create your own, please visit [here](https://example.com).

</div>

**Table of Contents:**
[[toc]]

## Overview

Kula Quest uses a custom binary format for storing level data.
This format does not have its own file extension, and is mostly the same across all versions of the games with slight differences.

All values are in [**little endian**](https://en.wikipedia.org/wiki/Endianness), and the following data types will be used:

| Encoding | Description           |
| -------- | --------------------- |
| i16      | Signed 16-bit integer |

### Structure

The format is comprised of the following structure:

- Block identifiers
- The number of blocks and block property count
- Block properties
- Optional level properties

| Offset(h) | Size  | Type             | Description                              |
| --------- | ----- | ---------------- | ---------------------------------------- |
| 0x00      | 78608 | i16[34^3]        | Identifiers for every block in the level |
| 0x13310   | 2     | i16              | Number of blocks in the level            |
| 0x13312   | 2     | i16              | Unused (sometimes -1)                    |
| 0x13314   | 2     | i16              | Number of block properties in the level  |
| 0x13316   | -     | property[]       | Block properties                         |
| -         | 256   | level_properties | Level properties (optional)              |

---

Every level in the game is essentially a **34x34x34** grid of blocks, with some blocks containing extra properties.
The first block starts on the top-left front corner of the level, which is at coordinate **0, 0, 0**.
The last block ends on the bottom-right back corner of the level, which is at coordinate **33, 33, 33**.

![The bounding box for the first level](/images/level-grid.png)

Based on the illustration above:

- Positive X and negative X indicate right and left respectively.
- Positive Y and negative Y indicate down and up respectively.
- Positive Z and negative Z indicate backward and forward respectively.

::: tip Note

Level editors invert the Y axis for simplicity as it is more common for positive Y to indicate up instead of down.

:::

## Position Types

There are 2 types of positioning used in this format — **block coordinates** and **entity coordinates**.
Here's an example of the different coordinates:

- `11 00 10 00 11 00` - Block Coordinate
- `00 22 00 20 9C 20` - Entity Coordinate

The block coordinate system is mainly used for positioning block properties and block positioning in general.
Objects and entities in game that need to use finer position values use the entity coordinate system, such as the ball and the current moving block position.

An entity coordinate value is **double** the amount of a block coordinate value, and the bytes are swapped, with the first byte as fine tune.
In the example above, we have a block with an item using the block coordinate and a ball on top of the same block using the entity coordinate.
The X and Z values are the same, while the Y coordinate is slightly above the block.

Here are the two different structures used throughout this document to define the type of positioning used:

### Block Position

| Offset(h) | Size | Type | Description |
| --------- | ---- | ---- | ----------- |
| +0x00     | 2    | i16  | X position  |
| +0x02     | 2    | i16  | Z position  |
| +0x04     | 2    | i16  | Y position  |

> Also referenced as **Position_block_t** in structures.

### Entity Position

| Offset(h) | Size | Type | Description                 |
| --------- | ---- | ---- | --------------------------- |
| +0x00     | 2    | i16  | X position (more precision) |
| +0x02     | 2    | i16  | Z position (more precision) |
| +0x04     | 2    | i16  | Y position (more precision) |

> Also referenced as **Position_entity_t** in structures.

## Block Identifiers

The first **78608** bytes of the file contain 2 byte values that correspond to each block in the grid.
As referenced above, the first value in this section signifies the first block in the level, which is at the top-left front corner of the level.
The last value in this section signifies the last block in the level, which is at the bottom-right back corner of the level.

Every 2 bytes indicate a single block, each time incrementing the Y position.
This continues until the Y position exceeds 33, where it's reset back to 0 and the Z position is incremented.
Once the Z position exceeds 33, the X position is incremented and Y and Z are reset back to 0.
These blocks are read until the position of the file reaches the end of the **block identifier section**, which is at offset **0x13310** (which as stated previously is the size of this section).

Here is a table defining what the 2 byte identifier represents:

| ID         | Type                                                                                                               |
| ---------- | ------------------------------------------------------------------------------------------------------------------ |
| -1         | An air block — nothing at all is placed here, and is completely ignored.                                           |
| 0          | A block with no special properties at all; i.e. a block that doesn't contain any objects or is of a specific type. |
| 1          | A fire block, which is just a normal block but with fire patches on all sides with no objects or properties.       |
| 2          | Same as above, but as an ice block.                                                                                |
| 3          | Same as above, but as an invisible block.                                                                          |
| 4          | Same as above, but as an acid block.                                                                               |
| 5 or above | A block that contains special properties. See below.                                                               |
| -2         | Reserved for laser segments, in memory usage only.                                                                 |

Any value that is **5** or greater indicates a block with special properties and has corresponding [property data](#property-list), such as a crumbling or laser block, or a block that contains items and/or objects.
The first block of this type must start at **5**, and is incremented for every next special block.

## Block and Property Count

Immediately after the block identifier section begins these 3 values:

| Offset(h) | Size | Type | Description                             |
| --------- | ---- | ---- | --------------------------------------- |
| 0x13310   | 2    | i16  | Number of blocks in the level           |
| 0x13312   | 2    | i16  | Unused (sometimes -1)                   |
| 0x13314   | 2    | i16  | Number of block properties in the level |

The first value does not have to be set as it's not read in game, while the third value must be set properly in order for the properties to work.
For an unknown reason, the unused value is sometimes set to -1 in certain levels, and the first value is sometimes set to a negative number.

## Property List

There are a lot of different types of special blocks used in the game, and each one needs additional information defined below at the end of the file, right after the block and property count section (**0x13316**).
Each property is a chunk of **256 bytes**.

## Object Block <Badge type="info" text="0-4" />

The following structure below applies to blocks that contain **objects**, i.e. anything that is assigned to a specific side of a block like items and traps. [Moving](#moving-block), [crumbling](#crumbling-block), [flashing](#flashing-block), and [laser](#laser-block) blocks follow a different structure, and have dedicated sections respectively below.

| Offset(h) | Size | Type                                         | Description                            |
| --------- | ---- | -------------------------------------------- | -------------------------------------- |
| +0x00     | 2    | i16                                          | Type of block (0-4)                    |
| +0x02     | 32   | <a href="#object-property">object</a>        | Object on the top of the block (-y)    |
| +0x22     | 32   | <a href="#object-property">object</a>        | Object on the right of the block (+x)  |
| +0x42     | 32   | <a href="#object-property">object</a>        | Object on the front of the block (+z)  |
| +0x62     | 32   | <a href="#object-property">object</a>        | Object on the back of the block (-z)   |
| +0x82     | 32   | <a href="#object-property">object</a>        | Object on the left of the block (-x)   |
| +0xA2     | 32   | <a href="#object-property">object</a>        | Object on the bottom of the block (+y) |
| +0xC2     | 56   | -                                            | Padding (set to -1)                    |
| +0xFA     | 6    | <a href="#block-position">position_block</a> | The block's position in the level      |

### Object Property

Each object contains **32 bytes** of information:

| Offset(h) | Size | Type | Description                      |
| --------- | ---- | ---- | -------------------------------- |
| +0x00     | 2    | i16  | Object identifier                |
| +0x02     | 2    | i16  | Object direction                 |
| +0x04     | 2    | i16  | Object variant                   |
| ...       |      |      | _See struct for complete layout_ |

```c
struct BlockObject_t {
    i16_t id;
    i16_t direction;
    i16_t variant;
    i16_t state;
    i16_t collectableIndex;         // automatically set in memory
    i16_t toggleObject1;            // buttons and transporters only
    i16_t toggleObject2;            // buttons and transporters only
    i16_t animationModelIndex = 0;  // memory only (related to vertex buffer index)
    i16_t groundOffset;             // only required in demos
    i16_t rotationType;             // only required in demos
    i16_t animationValue1 = -1;     // memory only
    i16_t animationValue2 = -1;     // memory only
    i16_t animationValue3 = -1;     // memory only
    i16_t rotationSpeed;            // only required in demos
    i16_t animationCounter = -1;    // memory only
    i16_t animationState = -1;      // memory only
};
```

Here is an interactive example of the block that contains the level exit from the first level of HIRO, starting at the file offset `0x13310`:

<HexDump :hexDump="`
013310h 14 00 00 00 00 06 [SECTION:value=00 00;note=Block Type (0 - Normal);color=#da70d6] [SECTION:value=07 00;note=Top Object ID (7 - Exit);color=#fb923c] [SECTION:value=00 00;note=Direction;color=#ef4444] [SECTION:value=00 00;note=Variant;color=#ef4444] [SECTION:value=02 00;note=State (2 - Locked);color=#ef4444]
013320h [SECTION:value=FF FF;note=Collectable Index;color=#ef4444] [SECTION:value=FF FF;note=Toggle Obj. 1;color=#ef4444] [SECTION:value=FF FF;note=Toggle Obj. 2;color=#ef4444] [SECTION:value=00 00;note=Animation Model Index;color=#ef4444] [SECTION:value=F4 01;note=Ground Offset (500);color=#ef4444] [SECTION:value=01 00;note=Rotation Type (1 - Y Axis);color=#ef4444] [SECTION:value=FF FF FF FF;note=Animation Values 1 and 2;color=#ef4444]
013330h [SECTION:value=FF FF;note=Animation Value 3;color=#ef4444] [SECTION:value=1E 00;note=Rotation Speed (30);color=#ef4444] [SECTION:value=FF FF;note=Animation Counter;color=#ef4444] [SECTION:value=FF FF;note=Animation State;color=#ef4444] [SECTION:value=00 00;note=Right Object ID (0 - None);color=#fb923c] [SECTION:value=FF FF FF FF 00 00;note=Right Object (None);color=#aaa]
013340h [SECTION:value=FF FF FF FF FF FF 00 00 FF FF FF FF FF FF FF FF;note=Right Object (None);color=#aaa]
013350h [SECTION:value=FF FF FF FF FF FF FF FF;note=Right Object (None);color=#aaa] [SECTION:value=00 00;note=Front Object ID (0 - None);color=#fb923c] [SECTION:value=FF FF FF FF 00 00;note=Front Object (None);color=#aaa]
013360h [SECTION:value=FF FF FF FF FF FF 00 00 FF FF FF FF FF FF FF FF;note=Front Object (None);color=#aaa]
013370h [SECTION:value=FF FF FF FF FF FF FF FF;note=Front Object (None);color=#aaa] [SECTION:value=00 00;note=Back Object ID (0 - None);color=#fb923c] [SECTION:value=FF FF FF FF 00 00;note=Back Object (None);color=#aaa]
013380h [SECTION:value=FF FF FF FF FF FF 00 00 FF FF FF FF FF FF FF FF;note=Back Object (None);color=#aaa]
013390h [SECTION:value=FF FF FF FF FF FF FF FF;note=Back Object (None);color=#aaa] [SECTION:value=00 00;note=Left Object ID (0 - None);color=#fb923c] [SECTION:value=FF FF FF FF 00 00;note=Left Object (None);color=#aaa]
0133A0h [SECTION:value=FF FF FF FF FF FF 00 00 FF FF FF FF FF FF FF FF;note=Left Object (None);color=#aaa]
0133B0h [SECTION:value=FF FF FF FF FF FF FF FF;note=Left Object (None);color=#aaa] [SECTION:value=00 00;note=Bottom Object ID (0 - None);color=#fb923c] [SECTION:value=FF FF FF FF 00 00;note=Bottom Object (None);color=#aaa]
0133C0h [SECTION:value=FF FF FF FF FF FF 00 00 FF FF FF FF FF FF FF FF;note=Bottom Object (None);color=#aaa]
0133D0h [SECTION:value=FF FF FF FF FF FF FF FF;note=Bottom Object (None);color=#aaa] [SECTION:value=FF FF FF FF FF FF FF FF;note=Padding;color=#666]
0133E0h [SECTION:value=FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF;note=Padding;color=#666]
0133F0h [SECTION:value=FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF;note=Padding;color=#666]
013400h [SECTION:value=11 00;note=Block Position X (17);color=#da70d6] [SECTION:value=0C 00;note=Block Position Z (12);color=#da70d6] [SECTION:value=11 00;note=Block Position Y (17);color=#da70d6] (next property starts after)
`" />

::: tip Note

A table documenting every single object and their properties is available [here](/formats/objects).

:::

Every object has a completely unique **ID** that indicates what item to put there, with some having different **variants** as well.
For example, a coin has the ID of `0x25` with the following variants: **Bronze, Gold, and Blue**.

An object can have several **states** as well, such as a transporter or button being turned on or off.
Most collectables use the state field to determine whether an object has been collected by the player or not, with the state being set to **1** in the file and becoming **0** in memory when obtained.

Finally, the **direction** field is utilized by directional objects, such as arrows for the direction they face.

If a side of a block **does not** contain an object, the object ID and state are set to 0, and all other values are set to -1.

---

The following fields are automatically set in memory and are not required:

- **Collectable index**: Incremented from 0 after every collectable object.
- **Animation values**: Values used to keep track of different aspect of an object's animation.
- **Animation state**: Determines the state of the object's animation.
- **Animation counter**: A value to keep track of a counter for the object's animation.

In the alpha and beta versions of the game, the following values are required to be set, but are not read in later versions:

- **Ground offset**: Determines how far an object is above the block.
- **Rotation type**: Determines the type of rotation an object uses.
- **Rotation speed**: Determines how fast an object rotates.

---

### Toggle Object

Lastly are the two **toggle object** fields, which are only used by transporters and buttons to specify what object(s) to toggle when the object is toggled.
They both act as positions, and follow this principle:

```c
short propertyIndex;
short side;
ushort position = (propertyIndex * 16) + side;
```

For example, the value `D0 01` corresponds to the block with a property at index **29**, as the maximum value for the first byte is `F0` (16), and the second byte is incremented due to 29 exceeding 16, which leaves 13. `0xD0`
Since only the first digit in the byte represents the index, it would be `D0 01`.
Lastly, the second digit in the first byte is 0, which targets the object on top of the block.
This value will target the top side of the block with the 29th property.

Another example is the value `72 01`, which corresponds to index **23**.
Since the target side is 2, the second digit in the first byte is set as such, leaving `72 01` as a result.
This value will target the right side of the block with the 23rd property.

In earlier versions, buttons power themselves when pressed and only contain the first slot.
In all other versions of the games, buttons have two slots and **do not** power themselves when pressed.
This means buttons themselves need power, so often times one of the slots are used to power itself, though only **toggle object 2** can be used to power itself.

When targeting a laser block, ensure the side is set to **6**.

## Moving Block <Badge type="info" text="5" />

| Offset(h) | Size | Type            | Description                 |
| --------- | ---- | --------------- | --------------------------- |
| +0x00     | 2    | i16             | Property Type (5)           |
| +0x02     | 2    | i16             | Direction                   |
| +0x04     | 2    | i16             | Axis                        |
| +0x06     | 2    | i16             | Unknown                     |
| +0x08     | 6    | position_block  | Position 1                  |
| +0x0E     | 6    | position_block  | Position 2                  |
| +0x14     | 12   | -               | Padding                     |
| +0x20     | 2    | i16             | Unknown                     |
| +0x22     | 2    | i16             | Length                      |
| +0x24     | 2    | i16             | Speed                       |
| +0x26     | 2    | i16             | Padding                     |
| +0x28     | 2    | i16             | Block ID                    |
| +0x2A     | 196  | -               | Padding                     |
| +0xEE     | 6    | position_entity | Current Position            |
| +0xF4     | 6    | unknown         | Unknown (00 01 00 01 00 01) |
| +0xFA     | 6    | position_block  | Position                    |

The moving block contains 3 position values:

- **Position 1** - Specifies one of two points that the block will move between during the level. This position must be **before** position 2 along an axis.
- **Position 2** - Specifies the other one of two points that the block will move between, and must be positioned **after** position 1.
- **Starting Position / Current Position** - Specifies what position the moving block will start at when the level is started. This means that the moving block can actually start at a different point along the axis than the two positions specified, though in most cases (and in all cases from the game) this position is usually the same as one of the two points above.

![Moving blocks and their respective axes](/images/moving-block-axes.png)

Based on the example level seen above, position 1 (green) is always first along the axis than position 2 (blue), regardless of what direction the block is set to.

The direction specifies what direction the block will initially move towards on the axis:

- `00 00` indicates Negative Y.
- `01 00` indicates Positive X.
- `02 00` indicates Positive Z.
- `03 00` indicates Negative Z.
- `04 00` indicates Negative X.
- `05 00` indicates Positive Y.
- Any other value causes the moving block to not move at all.

The **axis** of the moving block indicates what axis it is on, and how the texture is wrapped onto the block. If this value is not set correctly, the block's collision will not work properly and will often crash the game.

- `00 00` indicates Y axis.
- `01 00` indicates X axis.
- `02 00` indicates Z axis.
- Any other value defaults to Y axis.

The **speed** indicates how many times the current position is incremented or decremented per frame depending on if it's moving in a positive or negative direction, respectively. Lastly, the **block ID** is set to the block ID that represents this property in the block data section.

---

A single block is placed at the starting position, which is known as the **origin**. Based on the length, that many blocks including the origin will be placed on the **positive** axis, e.g. if the direction is set to Negative X, the additional blocks will still be placed in the Positive X direction.

For example, if the block length is **1**, no other blocks will be placed as the origin block is apart of the length. If the length is **3** and the direction is set to **1**, **2 blocks** will be placed in the **Positive X** direction. The maximum length a moving block can be is **4**, as the texture data the block stores in memory inside its property overwrites other information about the moving block, as well as the next property.

## Crumbling Block <Badge type="info" text="6" />

| Offset(h) | Size | Type            | Description       |
| --------- | ---- | --------------- | ----------------- |
| +0x00     | 2    | i16             | Property Type (6) |
| +0x02     | 2    | i16             | State (1)         |
| +0x04     | 6    | position_entity | Position (entity) |
| +0x0A     | 240  | -               | Padding           |
| +0xFA     | 6    | position_block  | Position (block)  |

Crumbling blocks have the following state values, although they should be set to **1** in file:

- **0** indicates the crumble block is gone.
- **1** indicates the crumble block is active.
- **2** indicates the crumble block is crumbling, but is not used.
- **3** indicates the crumble block is crumbling.
- Any other value causes the crumble block to still be active, but will not make a sound when touched.

The crumble block contains entity positioning, and are set as the exact block coordinate of the crumble block, even though it seems to not have an effect in game when changed to a different value. The **240 bytes** of padding are usually set to **-1**, but strangely enough some crumble blocks have object block data and other weird structures. Although they have no effect, it's still interesting to see that maybe some crumble blocks were intended to contain objects as well.

## Flashing Block <Badge type="info" text="7" />

| Offset(h) | Size | Type           | Description               |
| --------- | ---- | -------------- | ------------------------- |
| +0x00     | 2    | i16            | Property Type (7)         |
| +0x02     | 2    | i16            | Index (-1, memory only)   |
| +0x04     | 2    | i16            | Sync                      |
| +0x06     | 2    | i16            | State (-1, memory only)   |
| +0x08     | 2    | i16            | Counter (-1, memory only) |
| +0x0A     | 240  | -              | Padding                   |
| +0xFA     | 6    | position_block | Position                  |

The **sync** value is used to specify in what order of timing the flashing block will appear, similar to moving spikes.
Occasionally, just like crumble blocks, the **240 bytes** of padding may contain weird structures, but have no affect at all.

## Laser Block <Badge type="info" text="8" />

| Offset(h) | Size | Type           | Description       |
| --------- | ---- | -------------- | ----------------- |
| +0x00     | 2    | i16            | Property Type (8) |
| +0x02     | 2    | i16            | Direction         |
| +0x04     | 2    | i16            | Axis (unused)     |
| +0x06     | 2    | i16            | Enabled           |
| +0x08     | 6    | position_block | Position 1        |
| +0x0E     | 6    | position_block | Position 2        |
| +0x14     | 14   | -              | Padding           |
| +0x22     | 2    | i16            | Unknown (1)       |
| +0x24     | 4    | -              | Padding           |
| +0x28     | 2    | i16            | Block ID          |
| +0x2A     | 2    | -              | Padding           |
| +0x2C     | 2    | i16            | Color             |
| +0x2E     | 2    | i16            | Toggle Object     |
| +0x30     | 202  | -              | Padding           |
| +0xFA     | 6    | position_block | Position          |

Position 1 and 2 specify the two points of the laser, where position 1 must always come before on the axis than position 2, similar to the [moving block](#moving-block).
If one of the positions are set to a block that isn't actually present in the level, the game will automatically create a normal block in its place.

The direction specifies the direction of the laser:

- `00 00` indicates Negative Y.
- `01 00` indicates Positive X.
- `02 00` indicates Positive Z.
- `03 00` indicates Negative Z.
- `04 00` indicates Negative X.
- `05 00` indicates Positive Y.

The **color** property follows the same structure that transporters and buttons do, and can be viewed [here](/formats/objects#variant).
Changing the color actually indexes into the laser's different textures, as each color is its own texture, so setting the value other than 4 changes to textures beyond the boundary, and the game will crash upon turning it on.

**Enabled** specifies whether the laser block is enabled by default when the level is started.
Same as moving blocks, laser's also contain a **block ID** field that should be set to the block ID that represents this property in the block data section.

Lastly, laser blocks contain a **toggle object** field for specifying which block and face to toggle when the laser's power is toggled, similar to transporters and buttons.

## Level Flag Property <Badge type="info" text="9" />

The flag property is optional and if set is always behind the level information property. This property is used for setting flags for the level and does not tie to any block at all:

| Offset(h) | Size | Type | Description                 |
| --------- | ---- | ---- | --------------------------- |
| +0x00     | 2    | i16  | Property Type (9)           |
| +0x02     | 2    | i16  | Hidden Level                |
| +0x04     | 2    | i16  | Farsighted Invisible Blocks |
| +0x06     | 250  | -    | Padding                     |

This property is very simple and only has two flags, which are set to true or false depending if they're set to 1 or 0 respectively.
The first flag specifies if the current level is a **hidden level**, and the second flag specifies if the current level uses **farsighted invisible blocks**.

Similar to crumble and flashing blocks, this property usually contains **a lot** of weird structures in its padding, and sometimes this property is added to a level that doesn't use any of its flags.

```
014010h   11 00 11 00 11 00 09 00 00 00 00 00 00 00 00 00
014020h   00 00 00 00 FF FF 00 00 FF FF FF FF FF FF FF FF
014030h   FF FF FF FF FF FF FF FF 00 00 FF FF FF FF 00 00
014040h   FF FF FF FF FF FF 00 00 FF FF FF FF FF FF FF FF
014050h   FF FF FF FF FF FF FF FF 00 00 FF FF FF FF 00 00
014060h   FF FF FF FF FF FF 00 00 FF FF FF FF FF FF FF FF
014070h   FF FF FF FF FF FF FF FF 00 00 FF FF FF FF 00 00
014080h   FF FF FF FF FF FF 00 00 FF FF FF FF FF FF FF FF
014090h   FF FF FF FF FF FF FF FF 00 00 FF FF FF FF 00 00
0140A0h   FF FF FF FF FF FF 00 00 FF FF FF FF FF FF FF FF
0140B0h   FF FF FF FF FF FF FF FF 0A 00 00 00 00 00 01 00
0140C0h   FF FF FF FF FF FF 00 00 00 01 03 00 FF FF FF FF
0140D0h   FF FF 00 00 FF FF FF FF FF FF FF FF FF FF FF FF
0140E0h   FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF
0140F0h   FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF
014100h   FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF
014110h   11 00 13 00 11 00 ..
```

Take this property from **LEVEL 31** as an example.
We can see that it's definitely a flag property, but doesn't have any of its flags set.
Even stranger however, we can see that it contains data for a bounce pad on the underside of the block, and even has a block position set for it in the next property.
It is unknown why this occurs, but it does not have an affect on the level at all.

## Level Info Property <Badge type="info" text="666" />

At the end of the level binary, there is an extra property that contains basic information about the level itself. Most of these values are unknown and do not seem to have an affect on the level at all.
This property has the type **666**, but is not tied to any block.

| Offset(h) | Size | Type           | Description         |
| --------- | ---- | -------------- | ------------------- |
| +0x00     | 2    | i16            | Property Type (666) |
| +0x02     | 6    | position_block | Last Block Modified |
| +0x08     | 4    | i16[2]         | Unknown             |
| +0x0C     | 2    | i16            | Start Time          |
| +0x0E     | 242  | -              | Padding             |

::: info
Some levels do not contain this property, notably the [first alpha Kula Quest demo](#version-differences).
This property is not required, so the game will default to specific values
if this property is not present.
:::

The only confirmed value in this property is the **start time**, which specifies the amount of time the level starts with in seconds.
The game calculates the amount of time by multiplying this value by **50**, which is the PAL's game framerate.
For reference, the game decrements `currentTime` every frame of unpaused gameplay, and ends the level if it reaches 0.

Based on my research, there is evidence to suggest that the position value is leftover metadata based on the **last modified block** in the original level editor used by the developers:

1. A fruit was accidentally placed in Kula World's FINAL 3 level.
   When this fruit was removed in the next version of the game, the position value just so happened to update to the removed fruit's block position.
2. A change was made for LEVEL 133 on the Kula Quest release to the green gem where it was moved from the fire block to in front of the key.
   The unknown position value also updated to the block that the gem was moved to.
3. In the first level of the game, this position value points to the block that contains the farther right bronze coin, which happened to be moved forward and changed from a gold to a bronze coin from earlier versions of the game.

This is just some examples, but one could reasonably conclude that this position value was likely metadata as it is **never** referenced from within the game's programming.
It's also worth noting that this position value can be set to a block that isn't contained in the level, likely referencing a deleted block.

The two **unknown short** values before the start time value are also ignored in game, but seem to be always in multiples of 5 and sometimes negative.

## Version Differences

The level format remains mostly the same across all versions of the game with slight differences:

- In the alpha release, there is no [level info property](#level-info-property).
- In the beta release, the mere existence of the [level flag property](#level-flag-property) causes the level to be hidden, so no flags are required to be set.

### Level Start Time

In Kula World and Roll Away, the starting level time is calculated by multiplying the field by **50**, which is the framerate of the PAL version:

```c
// SLUS_007.24: 0x35F5C
// currentTime: 0xA573C

// checks if the property type is 666, meaning the level info property exists;
// if so, set currentTime to the property's 6th index (startingTime) * 50.
if (*propertyData == 0x29a) {
    currentTime = propertyData[6] * 0x32;
}

// if the level info property doesn't exist, default to 4950.
else {
    currentTime = 0x1356;
}
```

_Kula World and Roll Away function the same here, so Roll Away is used as an example._

In Kula Quest, the time is calculated by multiplying this value by **60**, which is the framerate of the NTSC version.
An additional check was added if the value is **5940**, which is the maximum time value (99) and is set to **7140** if so to allow additional level time:

```c
// SCPS_100.64: 0x362C4
// currentTime: 0xA12EC

// checks if the block's type is 666, meaning the level info property exists;
// if so, set currentTime to the property's 6th index (startingTime) * 50.
if (*propertyData == 0x29a) {
    currentTime = propertyData[6] * 0x3c;
}

// if the level info property doesn't exist, default to 4950.
else {
    currentTime = 0x1be4;
}

// if the currentTime was set to 5940, default to 7140 to allow more time.
if (currentTime == 0x1734) {
    currentTime = 0x1be4;
}
```

## Oddities

Most levels in the game have the fruit set to a **Banana** (`0x2E`), as the fruit is automatically set based on how many you have collected, **except** for the first alpha release where the order was set manually.
However, some levels in later versions still have other fruit set, perhaps because they were originally early levels or on accident:

| Release                                                                                                                                      | Level             | Fruit      |
| -------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------- |
| Main Releases                                                                                                                                | `INCA/LEVEL 42`   | Watermelon |
| Main Releases                                                                                                                                | `HILLS/LEVEL 18`  | Pumpkin    |
| Main Releases                                                                                                                                | `HILLS/LEVEL 19`  | Strawberry |
| Main Releases                                                                                                                                | `ARCTIC/LEVEL 53` | Pumpkin    |
| Main Releases                                                                                                                                | `FIELD/LEVEL 83`  | Apple      |
| Main Releases                                                                                                                                | `HAZE/LEVEL 116`  | Watermelon |
| Main Releases                                                                                                                                | `MARS/LEVEL 122`  | Watermelon |
| Kula World and Roll Away                                                                                                                     | `MARS/HIDDEN 9`   | Pumpkin    |
| Main Releases                                                                                                                                | `HELL/LEVEL 137`  | Watermelon |
| Main Releases                                                                                                                                | `HELL/LEVEL 146`  | Watermelon |
| Kula World                                                                                                                                   | `HELL/BONUS 30`   | Pumpkin    |
| [Beta (1998-01-30)](/content/releases#beta) and [Inca Variant](/content/releases#beta-inca-variant)                                          | `LEVEL 1`         | Watermelon |
| [Beta (1998-01-30)](/content/releases#beta) and [Inca Variant](/content/releases#beta-inca-variant)                                          | `LEVEL 2`         | Strawberry |
| [Beta (1998-01-30)](/content/releases#beta) and [Inca Variant](/content/releases#beta-inca-variant)                                          | `LEVEL 3`         | Watermelon |
| [Hyper PlayStation Re-mix 1999 No. 9](/content/releases#hyper-playstation-re-mix-1999-no-9-japan-disc-2-sony-computer-entertainment-special) | `LEVEL 2`         | Strawberry |

**LEVEL 125** from Mars is the only level in all releases that contain inaccessible objects hidden by another block, consisting of a couple of fire patches hidden inside a few blocks:

<div class="grid grid-cols-2 gap-2">
    <img src="/images/hidden-object-1.png" alt="Screenshot of the level showing a fire patch hidden in a block." />
    <img src="/images/hidden-object-2.png" alt="Screenshot of the level showing another fire patch hidden in a different block." />
</div>

Some levels contain slow moving stars that face the wrong direction, causing them to initially move in the air when the level loads:

![Screenshot of the level showing a slow moving star set to the wrong direction.](/images/start-oddity-level-67.png)

![Screenshot of the level showing another slow moving star set to the wrong direction.](/images/start-oddity-final-4.png)

In the last bonus level in Kula World, every star is incorrectly set to the **Positive X** direction.
This issue can be observed in the playthrough video _PS1 Kula World 1998 - No Commentary_ by [GameGamer](https://www.youtube.com/@GameGamer), at [2:56:27](https://youtu.be/jBsIFDERgsE?t=10587).

![Screenshot of the bonus level showing all of the slow moving stars set to the wrong direction.](/images/star-oddity-bonus-30.png)

This is also the only level in any release after the alpha that does not contain the [level info property](#level-info-property).

---

In Atlantis, LEVEL 94 is incorrectly spelled "LECEL 94".

For an unknown reason, the captivator and time pause patches have their direction value set to **4** in the **OBJ LEVEL**.
Additionally, no objects have their direction set to 0 except for capture pods, who's direction value [behaves unpredictably](/formats/objects#capture-pod-direction).
