# Kub Format

A custom archive format for storing multiple files with compression in the oldest demo.

## Overview

The first demo of the game (Kula Quest), uses a custom archive format for storing multiple compressed files into one file, almost exactly like the [**.PAK**](./pak) format used in later versions of the game. The only differences between the kub and the pak format is kub **doesn't store filenames** and uses a different compression method.

-   The kub format uses [**little endian**](https://en.wikipedia.org/wiki/Endianness).
-   Each 4 byte value is read as an unsigned integer. `(uint32_t)`

### Structure

The format is comprised of the following structure:

-   File count
-   Offset and compressed size of each file
-   Compressed file data

```c
struct KubFile_t {
    u32_t num_files; // file count in archive
    typedef struct Entry_t {
        u32_t offset; // offset to file
        u32_t size;   // compressed size of file
    } file_entries[num_files]; // file entries (8 bytes per entry)

    char compressed_file_data[];
};
```

## Header

> The examples below will use **KUB.KUB** from the first **Kula Quest Demo**.

The first 4 bytes in the kub file (**Note** there is no magic header) specify how many compressed files are inside, ex: `04 00 00 00` - which is **4** in decimal. This means that this specific kub file contains **4** compressed files inside.

## File Entries

The next groups of 8 bytes pertain to each entry in the kub file, with the first 4 bytes specifying the offset of the file and the next 4 bytes specifying the compressed size. Let's look at the first 2 entries as an example:

The next 8 bytes are `24 00 00 00 BB 25 00 00`. If we look at the first 4 as stated above (`24 00 00 00`), this value indicates the offset of the first compressed file, which is **36** in decimal. The next 4 bytes (`BB 25 00 00`) indicate the compressed file size in bytes, which is **9659** in this case. Using this knowledge, if we navigate to offset **36** inside the kub file, we can find the start of the first compressed file. We also know that this compressed file has a length of **9659** in bytes, which is enough information to extract it.

If we look at the next 8 bytes, which are `DF 25 00 00 7C 26 00 00`, this would indicate the offset and size of the second file. The next 8 bytes after that are `5B 4C 00 00 54 28 00 00`, which indicate the offset and size of the third file, etc. This pattern continues until offset **0x24** in this case, which is the start of the file data.

## File Data

Each file inside the kub file is compressed with [**lzrw3a**](http://www.ross.net/compression/lzrw3a.html), an old and somewhat obscure compression method. Notice how the start of each compressed file data starts with a **4 byte null value** (`00 00 00 00`). Now that we have the required information for the first entry, we can extract it by decompressing the file data at its offset and size.
