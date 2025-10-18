# SFX Format

A custom binary format for storing sound information.

<div class="tip custom-block" style="padding-top: 8px">

This document contains information about the format structure of SFX files.
If you are interested in using tools to create your own, please visit [here](../tools/mksfx.md).

</div>

## Overview

A custom binary format is used for storing every single sound effect used in the game.
The format is identical across all versions of the game, with each sound consisting of raw **PSX ADPCM** audio data and an associated pitch value that determines playback frequency.

All values are in [**little endian**](https://en.wikipedia.org/wiki/Endianness), and the following data types will be used:

| Encoding | Description             |
| -------- | ----------------------- |
| u32      | Unsigned 32-bit integer |

### Structure

The format is comprised of the following structure:

- Sound count
- Offset and pitch value for each sound
- Sound data

## Header

The first 4 bytes in the file (**note** there is no magic header) specify how many compressed files are inside the archive:

| Offset(h) | Size | Type | Description             |
| --------- | ---- | ---- | ----------------------- |
| 0x00      | 4    | u32  | Number of sound entries |

## Sound Table

Starting at offset 0x04, each sound entry is 8 bytes:

| Offset(h) | Size | Type | Description                                 |
| --------- | ---- | ---- | ------------------------------------------- |
| +0x00     | 4    | u32  | Absolute offset to audio data for the sound |
| +0x04     | 4    | u32  | Pitch value                                 |

## Audio Data

Raw PSX ADPCM compressed audio data begins at the specified offsets.
Each sound's data continues until the next sound's offset (or end of file for the last sound).
Every sound uses **1 channel** (Mono).

## Pitch Value

The 4-byte pitch value encodes musical note information used by the PlayStation SPU (Sound Processing Unit) to determine playback frequency.

```
pitch_value = (note << 8) | fine_tune
```

- Upper 24 bits: Base musical note offset
- Lower 8 bits: Fine pitch adjustment (0-255)
