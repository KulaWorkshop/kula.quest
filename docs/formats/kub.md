# Kub Format

A custom archive format for storing multiple files with compression in the oldest demo.

<div class="tip custom-block" style="padding-top: 8px">

This document contains information about the format structure of Kub files.
If you are interested in using tools to create your own, please visit [here](../tools/quilt.md).

</div>

## Overview

The first demo of the game uses a custom archive format for storing multiple compressed files into one file.
This format was eventually superseded by the [**.PAK**](./pak) format used in later versions of the game, with the only differences being that the Kub **doesn't** store filenames and uses a different compression algorithm.
It is worth noting that the **.PIC** file is in the exact same format.

All values are in [**little endian**](https://en.wikipedia.org/wiki/Endianness), and the following data types will be used:

| Encoding | Description             |
| -------- | ----------------------- |
| u32      | Unsigned 32-bit integer |

### Structure

The format is comprised of the following structure:

- File count
- Offset and compressed size of each file
- Compressed file data

## Header

The first 4 bytes in the file (**note** there is no magic header) specify how many compressed files are inside the archive:

| Offset(h) | Size | Type Description                   |
| --------- | ---- | ---------------------------------- |
| 0x00      | 4    | u32 Number of files in the archive |

## File Table

Starting at offset 0x04, each file entry is 8 bytes:

| Offset(h) | Size | Type Description                            |
| --------- | ---- | ------------------------------------------- |
| +0x00     | 4    | u32 Absolute offset to compressed file data |
| +0x04     | 4    | u32 Size of compressed file in bytes        |

## File Data

The file data starts immediately after the table, with each buffer starting with a null 4-byte value.
Each file is compressed using [**lzrw3a**](http://www.ross.net/compression/lzrw3a.html), an old and somewhat obscure compression algorithm.
