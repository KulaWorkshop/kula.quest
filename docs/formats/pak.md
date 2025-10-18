# Pak Format

A custom archive format for storing multiple files with compression.

<div class="tip custom-block !pt-2">

This document contains information about the format structure of Pak files.
If you are interested in using tools to create your own, please visit [here](../tools/quilt.md).

</div>

## Overview

Kula Quest uses a custom archive format for storing multiple compressed files into one file, similar to [**.ZIP**](<https://en.wikipedia.org/wiki/ZIP_(file_format)>) files.
This file format is known as **.PAK**, and is primarily used for storing levels in a world, though it is used for other purposes such as storing HUD textures and demo completion screenshots.

All values are in [**little endian**](https://en.wikipedia.org/wiki/Endianness), and the following data types will be used:

| Encoding | Description             |
| -------- | ----------------------- |
| u32      | Unsigned 32-bit integer |

### Structure

The format is comprised of the following structure:

- File count
- Offset and compressed size of each file
- Offset to each filename
- Filenames
- Compressed file data

## Header

The first 4 bytes in the file (**note** there is no magic header) specify how many compressed files are inside the archive:

| Offset(h) | Size | Type | Field      | Field      | Description                    |
| --------- | ---- | ---- | ---------- | ---------- | ------------------------------ |
| 0x00      | 4    | u32  | file_count | file_count | Number of files in the archive |

## File Table

Starting at offset 0x04, each file entry is 8 bytes:

| Offset(h) | Size | Type | Description                             |
| --------- | ---- | ---- | --------------------------------------- |
| +0x00     | 4    | u32  | Absolute offset to compressed file data |
| +0x04     | 4    | u32  | Size of compressed file in bytes        |

## File Names

Offsets for each filename immediately follow after the file table:

| Offset(h)                | Size            | Type  | Description                                   |
| ------------------------ | --------------- | ----- | --------------------------------------------- |
| 0x04 + (file_count \* 8) | 4 \* file_count | u32[] | Array of absolute offsets to filename strings |

Each filename is a null-terminated string with a newline character:

| Component       | Size | Description                      |
| --------------- | ---- | -------------------------------- |
| Filename        | -    | ASCII filename (e.g., "LEVEL 1") |
| Line Feed       | 1    | 0x0A (newline character)         |
| Null Terminator | 1    | 0x00 (end of string)             |

## File Data

The files are compressed with [**zlib**](https://zlib.net/), an old and commonly used compression algorithm.
Each buffer starts with the zlib header `78 9C`.

## Oddities

Some Pak files contain residual data after the filenames:

| File                    | Garbage Data | ASCII  |
| ----------------------- | ------------ | ------ |
| FIELDFI.PAK, HAZEFI.PAK | 4D 4F 4E 20  | "MON " |
| HILLSFI.PAK             | 53 49        | "SI"   |

These fragments appear to be remnants from the **SIMON** naming convention found in `COPYCAT.PAK`.
They serve no functional purpose and appear to be padding artifacts that align data to 4-byte boundaries.
