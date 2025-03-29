# GGI Format

A custom binary format for storing model and sprite data.

<div class="warning custom-block" style="padding-top: 8px">

This format is still under heavy research!

</div>

## Overview

```c
struct GGIData_t {
    GGIHeader_t header;
    ModelTable_t model_table;
};
```

## Header

```c
struct GGIHeader_t {
    int32_t sprite_group_index_1;
    int32_t sprite_group_index_2_enc;
    int32_t sprite_group_index_3_enc; // fancy numbers / text
    int32_t sprite_group_index_4_enc; // hidden level particles (do not seem affected though)
    int32_t sprite_group_index_5_enc; // bonus meter
    int32_t sprite_group_index_6_enc; // hourglass sprite to the end

    int32_t hourglass_anim_offset_enc; // hourglass spin animation
    int32_t unk_offset1_enc; // block lighting related
    int32_t unk_offset2_enc; // possibly ignored in game, doesn't seem to be read anywhere
    int32_t dummy_offset_enc; // offset to "dummy!!!" text
    int32_t ball_anim_enc; // ball bounce animation
    int32_t sprites_offset_enc;
    int32_t file_size_enc;
    int32_t entity_table_offset_enc;
    int32_t object_table_offset_enc;
};
```

The first part of the header contain indexes to different groups of sprites:

1. Sprites relating to object collection and teleportation affects.
2. Sprites relating to the sun glare and scores / loading screen blue background boxes.
3. Sprites relating to menu text elements.
4. Sprites relating to the hidden level sky particles, although **does not seem to affect them**.
5. Sprites relating to the bonus level HUD.
6. Sprites relating to the hourglass hud and various other text elements; the rest of the sprites.

```c
// decoding the sprite indexes
sprite_group_index_1 = sprite_group_index_1;
sprite_group_index_2 = sprite_group_index_1 + sprite_group_index_2_enc;
sprite_group_index_3 = sprite_group_index_2 + sprite_group_index_3_enc;
sprite_group_index_4 = sprite_group_index_3 + sprite_group_index_4_enc;
sprite_group_index_5 = sprite_group_index_4 + sprite_group_index_5_enc;
sprite_group_index_6 = sprite_group_index_5 + sprite_group_index_6_enc;
```

Every offset contained in the header is encoded in the following manner for an unknown reason:

```c
// decoding the first six offsets
hourglass_anim_offset = hourglass_anim_offset_enc * 2 + 0x34;
unk_offset1    = unk_offset1_enc    * 2 + hourglass_anim_offset;
unk_offset2    = unk_offset2_enc    * 2 + unk_offset1;
dummy_offset   = dummy_offset_enc   * 2 + unk_offset2;
ball_anim      = ball_anim_enc      * 2 + dummy_offset;
sprites_offset = sprites_offset_enc * 2 + ball_anim;
file_size      = file_size_enc      * 2 + sprites_offset;

// decoding the two table offsets
entity_table_offset = ((entity_table_offset_enc >> 2) + 0xD) * 4;
object_table_offset = ((object_table_offset_enc >> 2) + 0xD) * 4;
```

## Model Table

```c
struct ModelTable_t {
    // entities
    ModelEntry_Entity_t world_balls[10];
    ModelEntry_Entity_t bonus_balls[3];
    ModelEntry_Entity_t hidden_ball;
    ModelEntry_Entity_t padding[6];
    ModelEntry_Entity_t slow_star;
    ModelEntry_Entity_t tire;
    ModelEntry_Entity_t fast;
    ModelEntry_Entity_t capture_pod;
    ModelEntry_Entity_t captivator;

    // objects
    ModelEntry_Variants_t padding[5];
    ModelEntry_Variants_t transporters;
    ModelEntry_Variants_t padding;
    ModelEntry_Variants_t exits;
    ModelEntry_Variants_t padding[2];
    ModelEntry_Variants_t buttons;
    ModelEntry_Variants_t bounce_pad;
    ModelEntry_Variants_t moving_spike;
    ModelEntry_Variants_t spike;
    ModelEntry_Variants_t padding[13];
    ModelEntry_Variants_t hidden_exit;
    ModelEntry_Variants_t fruit_bowl;
    ModelEntry_Variants_t arrow;
    ModelEntry_Variants_t padding[2];
    ModelEntry_Variants_t key;
    ModelEntry_Variants_t lethargy_pill;
    ModelEntry_Variants_t bounce_pill;
    ModelEntry_Variants_t invincibility_pill;
    ModelEntry_Variants_t hourglass;
    ModelEntry_Variants_t gems;
    ModelEntry_Variants_t coins;
    ModelEntry_Variants_t sunglasses;
    ModelEntry_Variants_t present_1;
    ModelEntry_Variants_t present_2;
    ModelEntry_Variants_t present_3;
    ModelEntry_Variants_t hedgehog;
    ModelEntry_Variants_t apple;
    ModelEntry_Variants_t watermelon;
    ModelEntry_Variants_t pumpkin;
    ModelEntry_Variants_t banana;
    ModelEntry_Variants_t strawberry;
    ModelEntry_Variants_t unknown;
    ModelEntry_Variants_t unknown;
};

struct ModelEntry_Entity_t {
    int32_t lod_offset_1;
    int32_t lod_offset_2;
    int32_t lod_offset_3;
    int32_t padding; // a 4th LOD offset is available in demos
}; // 0x10 bytes

struct ModelEntry_Variants_t {
    typedef struct {
        int32_t variant1_Loffset;
        int32_t variant2_Loffset;
        int32_t variant3_Loffset;
        int32_t variant4_Loffset;
    } Variant_LOD_offset_t;

    Variant_LOD_offset_t L1;
    Variant_LOD_offset_t L2;
    Variant_LOD_offset_t L3;
    int32_t padding[4];
}; // 0x40 bytes
```

The model offset table begins at offset **$3C** in the file and is where the game references each object's model. Every model has **three** different levels of detail (LOD), with the first being the **highest quality** when the player is closest to the model, and the third being the **lowest quality** when the player is further from the model. Every entry in the table contains offsets to these different quality models, with each offset being denoted with an "L" in the structure above.

Padding between entries in the table are always set to **-1**.

The last two entries in the table most likely refer to the last two unused presents in the demo.

Each offset is **relative** to a specific offset:

-   Entity offsets are relative from **0x3C**.
-   Object offsets are relative from **0x1CC**.

## Model Data

```c
struct ModelData_t {
    short unknown;
    short unknown;
    short unknown;
    short unknown;
    short stp_blend_operator;
    short unknown;
    int32_t unknown; // set to 24 for objects, 28 for balls
    IndexBuffer_t index_buffer;
    VertexBuffer_t vertex_buffer;
};

struct IndexBuffer_t {
    int32_t size;
    int32_t unknown;
    char indices[size - 32];
    int32_t unknown = 1;
    int32_t unknown = 0;
};

typedef struct {
    int32_t vertexBufferCount = 1; // vertex buffer count (32 for moving spike)
    int32_t size; // size of vertices section
    struct IndexBuffer_t {
        short x1;
        short y1;
        short x2;
        short y2;
        short x3;
        short y3;
        short z1;
        short z2;
        short z3;
        short padding = 0;
    } vertices[][];
} VertexBuffer_t;

typedef struct {
    int32_t unknown = 1;
    int32_t size; // size of vertex colors section
    struct VertexColor_t {
        char r;
        char g;
        char b;
        char vFlags;
    } vertex_colors[size / 4]; // 4 bytes
} VertexColors_t;
```

Not every model in the game has a vertex count in multiples of three. Since the vertex position buffer of a model is grouped into **threes**, the leftover vertex positions are set to **0**. For example, the _arrow model_.

### Vertex Flags

Each vertex color attribute contains an extra byte with flags that specifies additional information about the vertex (vFlags):

| Bit | Type               |
| --- | ------------------ |
| 1   | Unused (0)         |
| 2   | Unused (0)         |
| 3   | Unused (1)         |
| 4   | Unknown            |
| 5   | Tri (0) / Quad (1) |
| 6   | Unused (0)         |
| 7   | Transparent        |
| 8   | Unused (0)         |

## Hourglass Sprite Animation

There is a section dedicated to the hourglass flip animation that is **1920** bytes in size. This animation data is the exact same across all known GGI files.

## Unknown Section 1

This section is currently unknown, and seems to affect block lighting. It is **8192** bytes in size, and is also the exact same across all known GGI files.

## Unknown Section 2

This section is also unknown, and does not seem to be referenced in later releases of the game. It is also **8192** bytes in size, and is also the exact same across all known GGI files.

## Dummy Section

This section contains the text "dummy!!!\r\n\r\n".

## Ball Animation Section

```c
struct RelativePositionOffset_t {
    short x;
    short y;
    short z;
};

struct BallAnim_t {
    short anim_frames;
    short padding[3];
    short y_start;
    short z_start;
    RelativePositionOffset_t position_offsets[anim_frames - 1];
};

struct BallAnim_t {
    short anim_frames;
    short padding[3];
    short y_start;
    short z_start;
    RelativePositionOffset_t position_offsets[];
    short x_end;
};
```

This section contains data relating to the ball jumping, including jumping forward. Each short position value offsets the ball in that relative direction. Here's an example of the first and last 4 frames of animation from Kula World:

```
0 0 0 (y_start and z_start)
-48 61 0
-96 117 0
-142 168 0
...
-941 158 0
-969 110 0
-997 56 0
-1024 0 0
```

The Y and Z position start of at 0, and each frame the relative X position is decremented when jumping forward and the Y is incremented for height. At the end of the animation, the Y starts decrementing again until it reaches 0, back to its original position and thus landing the ball.

This section was updated for the Roll Away release, with the animation lasting longer and going slightly into the floor upon landing. This is what causes the [floor clip glitch](https://youtu.be/G6RH7ERGCtI?t=105) in Roll Away.

## Sprites

The first value in the sprite section is the amount of sprites (int32_t). Immediately following this value are all the sprites, which use the following structures:

```c
struct Sprite_t {
    short bpp;
    short blend_op;
    CLUT_t clut;
    Texture_t texture;
};

struct CLUT_t {
    short vram_x;
    short vram_y;
    short use_prev;
    short padding = 0;
    if (bpp != 16) {
        short data[bpp == 8 ? 256 : 16];
    }
};

struct Texture_t {
    short vram_x;
    short vram_y;
    short width; // actual width, not in framebuffer pixels
    short height;
    if (bpp != 16) {
        char data[bpp == 8 ? (width * height) : (width * height) / 2];
    } else {
        short data[width * height];
    }
};
```

After each sprite's texture, there **may** be extra bytes (which some contain garbage data) to align to the 4 byte boundary.

When a sprite uses **16 bits per pixel**, each pixel is represented directly using 16 bit color instead of a color lookup table (CLUT), and therefore the values for the associated CLUT are set to **-1** in this bit depth (different in the first demo, see below). The only sprite that uses this bit depth is a 2x1 completely white sprite, and its current use in game is **unknown**.

Unique to only the first demo of the game (Kula Quest beta), the 4 CLUT values for a 16 bit sprite are not included, thus after the **bpp and blend operator** values starts the **Texture_t** structure.
