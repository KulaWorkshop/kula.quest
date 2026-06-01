<script setup>
import { VPTeamMembers } from 'vitepress/theme'

const members = [
  {
    avatar: 'https://avatars.githubusercontent.com/u/55664707?v=4',
    name: 'Brandon',
    title: 'Creator',
    links: [
      { icon: 'github', link: 'https://github.com/saturnkai/' },
      { icon: 'youtube', link: 'https://youtube.com/@saturnkai' },
      { icon: {
        svg: '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Email</title><path fill="currentColor" d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>'
      }, link: 'mailto:bgardenhire8146@gmail.com' }
    ]
  },
  {
    avatar: 'https://avatars.githubusercontent.com/u/32149826?v=4',
    name: 'Murphy',
    title: 'Support',
    links: [
      { icon: 'github', link: 'https://github.com/murphy28/' },
      { icon: 'youtube', link: 'https://www.youtube.com/channel/UCXcBRZT1GL92RR9oQGBJgNA' },
    ]
  }
]
</script>

# Introduction

Welcome to the **KulaQuest Wiki**, a comprehensive technical reference derived from years of reverse engineering and research into the PlayStation 1 game **KulaQuest**!

![A render of the game's first level](/images/home.webp)

::: warning Warning
This wiki is still under constant development, so expect a lot of changes!
:::

## About the Game

KulaQuest is a 3D puzzle-platformer video game developed by [Game Design Sweden AB](https://en.wikipedia.org/wiki/Netbabyworld) and released for the original PlayStation in 1998.
Published by [Sony Computer Entertainment](https://en.wikipedia.org/wiki/Sony_Interactive_Entertainment) in Europe (_Kula World_) and Japan (_KulaQuest_), and by [Psygnosis](https://en.wikipedia.org/wiki/Psygnosis) in North America (_Roll Away_), it casts players as a colorful beach ball navigating through a series of suspended structures filled with collectables and hazards.
The game's core mechanic revolves around **directional gravity**, which changes based on the ball's position, challenging players to think spatially.

Throughout this wiki, the game will be referred to as **KulaQuest** as it was the original name and was intended to be known as such all over the world [^1], despite most people knowing it as Kula World.
If something relates specifically to the Japanese release of the game, it will be **explicitly** stated.
The other titles will be used in cases of version differences as needed.

### Game Design Sweden AB

KulaQuest was created by **Game Design Sweden AB**, a small team from Sweden. [^2]
None of what you see here would have existed without their work:

| Role                           | Names                                                                                                |
| ------------------------------ | ---------------------------------------------------------------------------------------------------- |
| **Original Concept, Graphics** | Johannes Söderqvist                                                                                  |
| **Programming**                | Stefan Persson, Jens Rudberg, Jesper Rudberg                                                         |
| **Game Design**                | Stefan Persson, Jens Rudberg, Jesper Rudberg, Johannes Söderqvist                                    |
| **Level Design**               | Jesper Rudberg                                                                                       |
| **Additional Level Design**    | Mattias Karlgren, Stefan Persson, Jens Rudberg, Martin Stigels, Richard Stigels, Johannes Söderqvist |
| **Music & Sound Effects**      | [Twice a Man](<https://en.wikipedia.org/wiki/Twice_a_Man_(musical_group)>)                           |

---

The original sketch that started it all, drawn by **Johannes Söderqvist** after his dream[^3]:

<img src="/images/sketch.webp" alt="A sketch of the original concept" width="400px" />

A picture of the programming team[^4] — Stefan Persson, 24 (left), Jens Rudberg, 25 (middle), and Jesper Rudberg, 26 (right):

![A picture of the programming team](/images/programming-team.webp)

## Resources

Several resources are available here, including:

- Tutorials for various modding tools built alongside this research.
- Version history and differences covering [every known release](/content/releases) of the game, including prototypes and regional demos.
- Technical documentation for all of KulaQuest's custom [binary file formats](/formats/).

## Credits

This wiki was created and is maintained by [**Brandon Gardenhire**](https://github.com/saturnkai/) (aka _**SaturnKai**, **pankaio**_).
The research here represents years of work and dedication to preserving the game's legacy.

Special thanks to [Murphy](https://github.com/murphy28/), who contributed to the research, early tool development, and website design of Kula Workshop.

<VPTeamMembers size="small" :members="members" />

[^1]: [Interview with J. Söderqvist](https://kulaquest.pinkgothic.com/storybehind.html#q02), Neike Taika-Tessaro (2003)

[^2]: [Roll Away Credits](https://www.mobygames.com/game/9070/roll-away/credits/playstation/), MobyGames

[^3]: [Super Power 1998.07 Magazine](https://archive.org/details/super-power-1998.07-finnish/page/28/mode/2up), p. 28. Super Power (1998)

[^4]: [Super Power 1998.07 Magazine](https://archive.org/details/super-power-1998.07-finnish/page/26/mode/2up), p. 26. Super Power (1998)
