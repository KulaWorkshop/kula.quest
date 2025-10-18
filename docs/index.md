<script setup>
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
    title: 'Contributor',
    links: [
      { icon: 'github', link: 'https://github.com/murphy28/' },
      { icon: 'youtube', link: 'https://www.youtube.com/channel/UCXcBRZT1GL92RR9oQGBJgNA' }
    ]
  }
]
</script>

# Introduction

Welcome! This website contains documentation derived from countless hours of reverse engineering and research into the PlayStation 1 game **Kula Quest**.

![](/images/render.png)

Throughout this wiki, the game will be referred to as **Kula Quest** as it was the original name and was intended to be known as such all over the world [^1], despite most people knowing it as Kula World.
The other titles will be used in cases of version differences as needed.

::: warning Warning
This wiki is still under constant development, so expect a lot of changes!
:::

## Gameplay

Kula Quest is a 3D puzzle-platformer video game developed by [Game Design Sweden AB](https://en.wikipedia.org/wiki/Netbabyworld) and released for the original PlayStation in 1998.
Published by [Sony Computer Entertainment](https://en.wikipedia.org/wiki/Sony_Interactive_Entertainment) in Europe (_Kula World_) and Japan (_Kula Quest_), and by [Psygnosis](https://en.wikipedia.org/wiki/Psygnosis) in North America (_Roll Away_), it casts players as a colorful beach ball navigating through a series of suspended structures filled with collectables and hazards.
The game's core mechanic revolves around **direction gravity**, which changes based on the ball's position, challenging players to think spatially.

## Resources

Several resources are available here, including:

- Tutorials for various tools for modding the game.
- Details for [every known release](/content/releases) and version differences.
- Technical documentation for most of Kula Quest's custom binary [formats](/formats).

## Credits

This website was created and maintained by the original creators of [Kula Workshop](https://www.kulaworkshop.net/).

<VPTeamMembers size="small" :members="members" />

[^1]: [Interview with J. Söderqvist](https://kulaquest.pinkgothic.com/storybehind.html#q02), Neike Taika-Tessaro (2003)
