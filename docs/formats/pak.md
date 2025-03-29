# Pak Format

A custom archive format for storing multiple files with compression.

<div class="tip custom-block" style="padding-top: 8px">

This document contains information about the format structure of Pak files.
If you are interested in using tools to create your own, please visit [here](https://example.com).

</div>

## Overview

Kula Quest uses a custom archive format for storing multiple compressed files into one file, similar to [**.ZIP**](<https://en.wikipedia.org/wiki/ZIP_(file_format)>) files. This file format is known as **.PAK**, and is primarily used for storing levels in a world. The pak format is also used for storing HUD textures embedded inside the game's executable, and is used to store screenshots seen upon the completion of demos.

-   The pak format uses [**little endian**](https://en.wikipedia.org/wiki/Endianness).
-   Each 4 byte value is read as unsigned integer. `(uint32_t)`

### Structure

The format is comprised of the following structure:

-   File count
-   Offset and compressed size of each file
-   Offset to each filename
-   Filenames
-   Compressed file data

```c
struct PakFile_t {
    u32_t num_files; // file count in archive
    struct Entry_t {
        u32_t offset; // offset to file
        u32_t size;   // compressed size of file
    } file_entries[num_files]; // file entries (8 bytes per entry)

    u32_t filename_offsets[num_files]; // filename offsets
    char filenames[]; // filenames (ex. "LEVEL 1", 0x0A, 0x00, ...)

    char padding[<=4]; // padding/garbage data to 4-byte boundary
    char compressed_file_data[];
};
```

## Header

> The examples below will use **HIRO.PAK** from **Roll Away**.

The first 4 bytes in the pak file (**Note** there is no magic header) specify how many compressed files are inside, ex: `14 00 00 00` - which is **20** in decimal. This means that this specific pak file contains **20** compressed files inside.

## File Entries

The next groups of 8 bytes pertain to each entry in the archive, with the first 4 bytes specifying the offset of the file and the next 4 bytes specifying the compressed size. Let's look at the first 2 entries as an example:

The next 8 bytes are `B0 01 00 00 2B 01 00 00`. The first 4 bytes indicate the offset of the first compressed file as stated above, which is **432** in decimal. The next 4 bytes (`2B 01 00 00`) indicate the compressed file size in bytes, which is **299** in this example. Using this knowledge, if we navigate to offset **432** inside the pak file, we can find the start of the first compressed file and is **299** bytes in length, which is enough information to extract it.

If we look at the next 8 bytes, which are `DB 02 00 00 8E 01 00 00`, this would indicate the offset and size of the second file. The next 8 bytes after that are `69 04 00 00 E1 01 00 00`, which indicate the offset and size of the third file, etc. This pattern continues until offset **0xA4** in this example, which is the start of the filename offsets.

## File Names

The next group of 4 bytes contain the offset of each filename for each entry inside the pak file. So, if we look at the next 4 bytes (`F4 00 00 00`), which is the offset of the filename for the first compressed file, which is **244** in decimal. If we navigate to this offset, we can see our first filename, which is `4C 45 56 45 4C 20 31`, and translates to `LEVEL 1`.

Each string of filenames ends with 2 bytes: `0A 00`, which indicate a new line character and a null terminator, signifying the end of the string. The next filename immediately proceeds after.

## File Data

Each file inside the pak file is compressed with [**zlib**](https://zlib.net/), an old and commonly used compression method. Notice how the start of each compressed file data starts with `78 9C`, which is a common zlib header. Now that we have the required information for the first entry, we can extract it by decompressing the file data at its offset and size, and save the result with its filename.

## Oddities

```
010h   CB 03 00 00 1C 00 00 00 26 00 00 00 46 49 4E 41   ............FINA
020h   4C 20 31 31 0A 00 46 49 4E 41 4C 20 31 32 0A 00   L 11..FINAL 12..
030h   4D 4F 4E 20 78 9C ED DD C9 52 1A 41 1C 07 E0 FF   MON.............
```

> Example from _FIELDFI.PAK_

<br></br>

Some pak files contain garbage data after the filenames. For example, **FIELDFI.PAK**, **HAZEFI.PAK**, etc. contain `4D 4F 4E 20`, which translates to `MON `. Other pak files such as **HILLSFI.PAK**, etc. contain `53 49`, which translates to `SI`. Interestingly enough, these characters seem to stem from the `SIMON 1`, `SIMON 2`, `...` naming conventions seen in the **COPYCAT.PAK** file. They seem to have no effect, as they are presumably just garbage data that align with the 4 byte boundary.
