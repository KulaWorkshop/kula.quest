# TGI Format

A custom binary format for storing theme information.

<div class="warning custom-block !pt-2">

This format is still under heavy research!

</div>

## Overview

| Offset(h) | Size(h) | Type  | Description            |
| --------- | ------- | ----- | ---------------------- |
| 0x00000   | 0x00190 | u32[] | Header                 |
| 0x00190   | 0x037B0 | u32[] | Mipmap CLUT index list |

## Header

| Offset(h) | Size(h) | Type             | Description                              |
| --------- | ------- | ---------------- | ---------------------------------------- |
| 0x00      | 0x1C    | u32[7]           | Unknown                                  |
| 0x1C      | 0x0C    | channel_modifier | Channel modifier for **neutral** models  |
| 0x28      | 0x0C    | channel_modifier | Channel modifier for **light** models    |
| 0x34      | 0x0C    | channel_modifier | Channel modifier for **dark** models     |
| 0x40      | 0x0C    | channel_modifier | Channel modifier on **left** of blocks   |
| 0x4C      | 0x0C    | channel_modifier | Channel modifier on **right** of blocks  |
| 0x58      | 0x0C    | channel_modifier | Channel modifier on **front** of blocks  |
| 0x64      | 0x0C    | channel_modifier | Channel modifier on **back** of blocks   |
| 0x70      | 0x0C    | channel_modifier | Channel modifier on **top** of blocks    |
| 0x7C      | 0x0C    | channel_modifier | Channel modifier on **bottom** of blocks |
| 0x88      | 0x20    | u32[8]           | Unknown                                  |
| 0xA8      | 0x04    | u32              | Light index on **top** of blocks         |
| 0xAC      | 0x04    | u32              | Light index on **right** of blocks       |
| 0xB0      | 0x04    | u32              | Light index on **front** of blocks       |
| 0xB4      | 0x04    | u32              | Light index on **back** of blocks        |
| 0xB8      | 0x04    | u32              | Light index on **left** of blocks        |
| 0xBC      | 0x04    | u32              | Light index on **bottom** of blocks      |
| ...       | ...     | ...              | ...                                      |
| 0xE4      | 0x04    | u32              | Offset to palette indices                |
| 0xE8      | 0x04    | u32              | Offset to model fog                      |
| 0xE8      | 0x04    | u32              | Offset to block fog                      |
| 0xE8      | 0x04    | u32              | Offset to tileset constants 1            |
| 0xE8      | 0x04    | u32              | Offset to tileset constants 2            |
| 0xE8      | 0x04    | u32              | Offset to 8-bit CLUT data                |
| 0xE8      | 0x04    | u32              | Offset to VRAM constants                 |
| 0xE8      | 0x04    | u32              | Total size of file                       |

### Channel Modifier

Channel modifiers are used for object models so that objects that face away, towards, or are neutral to the sun are dark, neutral, and lightened respectively.
They can also be set for each side of a block as well.

| Offset(h) | Size(h) | Type | Description   |
| --------- | ------- | ---- | ------------- |
| +0x00     | 0x04    | u32  | Red channel   |
| +0x04     | 0x04    | u32  | Green channel |
| +0x08     | 0x04    | u32  | Blue channel  |

### Light Index

The light index specify which sides of the block should be neutral, light, or dark, based on what sides face towards or away from the sun:

- `0`: Neutral
- `1`: Light
- `2`: Dark
