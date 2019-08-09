# React Cast Sender

[![Coverage Status](https://coveralls.io/repos/github/AnteWall/react-cast-sender/badge.svg?branch=master)](https://coveralls.io/github/AnteWall/react-cast-sender?branch=master) [![Build Status](https://travis-ci.org/AnteWall/react-cast-sender.svg?branch=master)](https://travis-ci.org/AnteWall/react-cast-sender) [![Greenkeeper badge](https://badges.greenkeeper.io/AnteWall/react-cast-sender.svg)](https://greenkeeper.io/)

Package for easy setup and use of Chromecast (CAF) with React. Will automaticly include and load Cast SDK and initialize player.

## Todo

- Add MiniController
- Add FullController
- Expose QUEUE Api

## Installation

`yarn add react-cast-sender`

Make sure to install peerDependencies

`yarn add react react-dom styled-components`

## Documentation

#### Context

`CastProvider`

Context to serve Cast. Should be wrapped around your application

| PropType              | type    | required | default       |
| --------------------- | ------- | -------- | ------------- |
| receiverApplicationId | string  | yes      | null          |
| autoJoinPolicy        | string  | no       | ORIGIN_SCOPED |
| language              | string  | no       | null          |
| resumeSavedSession    | boolean | no       | ?             |

Example:

```javascript
import { CastProvider } from 'react-cast-sender';

const App = ({ children }) => {
  return (
    <CastProvider receiverApplicationId='my-cast-id'>{children}</CastProvider>
  );
};
```

#### Components

`CastButton`

Will render a CastButton if there are chromecast available to cast to

Example:

```javascript
import { CastButton } from 'react-cast-sender';

const App = ({ children }) => {
  return <CastButton />;
};
```

#### Hooks

`useCast`

Example:

```javascript
import { useCast } from 'react-cast-sender';

const App = ({ children }) => {
    const {initialized, connected, deviceName} = useCast();

    return (
      ...
    );
};
```

`useCastPlayer`

Example:

```javascript
import { useCastPlayer } from 'react-cast-sender';

const App = ({ children }) => {
    const {
        loadMedia,
        currentTime,
        duration,
        isPaused,
        isMediaLoaded,
        togglePlay,
        seek,
        isMuted,
        tracks,
        editTracks,
        thumbnail,
        title,
        setVolume,
        toggleMute
    } = useCastPlayer();

    return (
      ...
    );
};
```
