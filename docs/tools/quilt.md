# Quilt

A command-line utility for modifying archive files and compression used in Kula Quest.

## Overview

Kula Quest uses custom archive formats for storing multiple compressed files into one file, similar to [**.ZIP**](<https://en.wikipedia.org/wiki/ZIP_(file_format)>) files.
The most common of these formats are [**.PAK**](/formats/pak) files, and are primarily used for **storing levels** associated with a world, though they are used for other purposes such as storing HUD textures and demo completion screenshots.
In the first demo release of the game, a slightly different [**.KUB**](/formats/kub) format is used instead of Pak files, which does not preserve filenames and uses a different compression algorithm.

It is **important** that when dealing with level archives, that you take note of how they're structured depending on what version of the game you're targeting.
For example, the following structure is used in the 3 primary releases of the game:

- The first 15 regular levels
- The 3 bonus levels
- The hidden level
- An unused object level

If you would like to create a custom Pak file for the main releases, and you would like bonus and hidden levels to work properly, then you **must** create a Pak file with the levels in the order seen above.
The same applies for creating Pak files from demo releases of the game.

## Installation

The latest pre-compiled binaries are available for download on [GitHub](https://github.com/KulaWorkshop/Quilt/releases/).

## Archives

To extract an archive file, use the **unpack** command followed by the path to the file and an output folder for its contents.
The following example command will extract the files inside of `HIRO.PAK` into a folder called `levels`:

```bash
$ quilt unpack "HIRO.PAK" "levels"
```

To create an archive, use the **pack** command followed by the path to create it and a list of files to use:

```bash
$ quilt pack "LEVELS.PAK" "LEVEL_1" "LEVEL_2" "LEVEL_3"
```

By default, Quilt will create a **.PAK** file.
Use the `-k` flag to set the creation type to **.KUB**:

```bash
$ quilt pack -k "LEVELS.KUB" "LEVEL_1" "LEVEL_2" "LEVEL_3"
```

### Using Text Files

When dealing with archives that contain many files, or for quick rebuilding of an archive after making adjustments to its contents, you can use a text file containing the files that you would like to use and their order.
You can generate this text file automatically when unpacking an archive, using the `-s` flag:

```bash
$ quilt unpack -s "HIRO.PAK" "levels"
```

This example command will unpack the contents of `HIRO.PAK`, and will additionally save a text file inside of the `levels` folder named `HIRO.PAK.txt`:

::: code-group

```:line-numbers [HIRO.PAK.txt]
LEVEL 1
LEVEL 2
LEVEL 3
LEVEL 4
LEVEL 5
LEVEL 6
LEVEL 7
LEVEL 8
LEVEL 9
LEVEL 10
LEVEL 11
LEVEL 12
LEVEL 13
LEVEL 14
LEVEL 15
BONUS 1
BONUS 2
BONUS 3
HIDDEN 1
LESSON
```

:::

The text file format is simple — one filename per line, in the order they should appear in the archive.
Instead of having to specify all of these files to build an archive, you can use the **@** parameter following the path of the text file:

```bash
$ quilt pack "HIRO.PAK" "@levels/HIRO.PAK.txt"
```

::: tip Important

Make sure that your files are inside the same folder as the text file.

:::

## Alpha Compression

In the first demo of the game, the [.TGI](../formats/tgi.md) and [.GGI](../formats/ggi.md) files are both fully compressed using the [**lzrw3a**](http://www.ross.net/compression/lzrw3a.html) algorithm.
Quilt allows you to decompress and recompress these files using the following examples below.

For decompression, the following commands can be used:

```bash
$ quilt decompress "KULA.TGI" "KULA.decompressed.TGI"
$ quilt decompress "KULA.GGI" "KULA.decompressed.GGI"
```

If you would like to recompress the file to put it back into the game, the following commands can be used:

```bash
$ quilt compress "KULA.decompressed.TGI" "KULA.TGI"
$ quilt compress "KULA.decompressed.GGI" "KULA.GGI"
```
