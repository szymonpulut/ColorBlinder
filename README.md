# ColorBlinder

## Description

My first React Native app. Uses Expo with managed workflow. I created it along with an online tutorial [A Definitive React-Native Guide for React Developers: Getting Started](https://blog.risingstack.com/a-definitive-react-native-guide-for-react-developers/) (RisingStack.com, Daniel Gergely). The tutorial and code was severely outdated and bugged so I needed to do most of development on my own - mostly I just took the ideas and assets. I also did modifications on my own - e. g. absolute imports, switch to functional components and hooks, clearer code responsibility separation. Original source code made by RisingStack is available [here](https://github.com/RisingStack/colorblinder) for comparison. I developed features on my own - sound toggle, high score on the home (main) page. Leaderboard functionality is still missing. Web version deployed on Netlify (in some browsers autoplay of background sound is disabled). Android built using Expo Turtle. Unfortunately there is no iOS version due to lack of Apple devices to test it on.

## Quick overview

Web demo: [https://colorblinder.szymonpulut.com/](https://colorblinder.szymonpulut.com/)

In some browsers autoplay of background sound is disabled.

User can play game by clicking play button. There are multiple tiles of the same color, and one with similiar but different. Player has to click the different one in order to gain points. There is a 15s timer - for every wrong tile clicked 3s gets subtracted from timer, for every right tile clicked 2s gets added to timer. User can pause game and turn silent mode on. High score is stored offline.

## Technologies used & features

React Native, Expo, React Navigation, TypeScript, Redux, TypeScript.

## TODO

-   fix the audio bugs on iOS devices
-   performance improvements
-   create leaderboard
-   deploy a version for iOS

## Running

```
npm install
```

`npm run web` starts web development server

`npm run android` starts Android debugging using ADB

`expo build:web` creates production ready package for web
