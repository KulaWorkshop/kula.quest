<script setup>
import CardLink from './.vitepress/components/CardLink.vue';
import { VPTeamMembers } from 'vitepress/theme'

const members = [
  {
    avatar: 'https://avatars.githubusercontent.com/u/55664707?v=4',
    name: 'SaturnKai',
    title: 'Creator',
    links: [
      { icon: 'github', link: 'https://github.com/saturnKai/' },
      { icon: 'youtube', link: 'https://youtube.com/@saturnkai' }
    ]
  },
  {
    avatar: 'https://avatars.githubusercontent.com/u/32149826?v=4',
    name: 'Murphy',
    title: 'Creator',
    links: [
      { icon: 'github', link: 'https://github.com/murphy28/' },
      { icon: 'youtube', link: 'https://www.youtube.com/channel/UCXcBRZT1GL92RR9oQGBJgNA' }
    ]
  }
]
</script>

# Introduction

Welcome! This website contains documentation derived from countless hours of reverse engineering and research into the PlayStation 1 game **Kula Quest**.

![wallpaper](/wallpaper.png)

> Source: https://kulaquest.pinkgothic.com/graphics.html

<br/>

Throughout this documentation, the game will be referred to as **Kula Quest** as it was the original name and was [intended](https://kulaquest.pinkgothic.com/storybehind.html) to be known as such all over the world, despite most people knowing it as Kula World. The other titles will be used in cases of version differences as needed.

## Formats

Technical documentation is available for most of Kula Quest's custom binary formats. Tools that have been developed to create or modify said formats are separate from this website and are available [here](https://example.com).

<div class="grid">
    <CardLink title="Pak Format" description="An archive format for storing multiple files." link="/formats/pak" />
    <CardLink title="Kub Format" description="An archive format for storing multiple files in the oldest demo." link="/formats/kub" />
    <CardLink title="TGI Format" description="A custom binary format for storing theme information." link="/formats/tgi" />
    <CardLink title="GGI Format" description="A custom binary format for storing model and sprite information." link="/formats/ggi" />
    <CardLink title="SFX Format" description="A custom binary format for storing sound information." link="/formats/sfx" />
    <CardLink title="Level Format" description="A custom binary format for storing level data." link="/formats/level" />
</div>

<style scoped>
.grid {
    margin-top: 2rem;
    display: grid;
    column-gap: 1rem;
    row-gap: 1rem;
    grid-template-columns: repeat(2, minmax(0, 1fr));
}

@media (max-width: 640px) {
    .grid {
        grid-template-columns: 1fr;
    }
}
</style>

## Credits

This website was created and maintained by the original creators of [Kula Workshop](https://www.kulaworkshop.net/).

<VPTeamMembers size="small" :members="members" />
