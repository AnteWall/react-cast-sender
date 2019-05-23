import React, { useState } from 'react';
import './App.css';
// @ts-ignore
import {CastButton, useCast, useCastPlayer, MiniController, CastProvider} from 'react-cast-sender';

const UseCastExample = () => {
  const { initialized, connected, deviceName } = useCast();

  return (
    <div>
      <pre>useCast()</pre>
      <table>
        <thead>
          <td>Key</td>
          <td>Value</td>
        </thead>
        <tbody>
          <tr>
            <td>DeviceName</td>
            <td>{String(deviceName)}</td>
          </tr>
          <tr>
            <td>Inititalized</td>
            <td>{String(initialized)}</td>
          </tr>
          <tr>
            <td>Connected</td>
            <td>{String(connected)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
const UseCastPlayerExample = () => {
  const { connected } = useCast();
  const {
    loadMedia,
    currentTime,
    isPaused,
    duration,
    isMediaLoaded,
    togglePlay,
    seek,
    tracks,
    editTracks,
    title,
    thumbnail
  } = useCastPlayer();
  const [time, setTime] = useState<number>(0);
  return (
    <div>
      <pre>useCastPlayer()</pre>
      <table>
        <thead>
          <td>Key</td>
          <td>Value</td>
        </thead>

        <tr>
          <td>isPaused</td>
          <td>{String(isPaused)}</td>
        </tr>
        <tr>
          <td>isMediaLoaded</td>
          <td>{String(isMediaLoaded)}</td>
        </tr>
        <tr>
          <td>Currenttime</td>
          <td>{String(currentTime)}</td>
        </tr>
        <tr>
          <td>Duration</td>
          <td>{String(duration)}</td>
        </tr>
        <tr>
          <td>Title</td>
          <td>{String(title)}</td>
        </tr>
        <tr>
          <td>Thumbnail</td>
          <td>
            <img src={thumbnail} style={{ width: '120px' }} />
          </td>
        </tr>
      </table>

      <table>
        <thead>
          <td>trackId</td>
          <td>Name</td>
          <td>TrackContentId</td>
          <td>TrackContentType</td>
          <td>Type</td>
          <td>Subtype</td>
          <td>language</td>
          <td>customData</td>
        </thead>
        <tbody>
          {tracks.map((track: any) => {
            return (
              <tr key={track.trackId}>
                <td>{String(track.trackId)}</td>
                <td>{String(track.name)}</td>
                <td>{String(track.trackContentId)}</td>
                <td>{String(track.trackContentType)}</td>
                <td>{String(track.type)}</td>
                <td>{String(track.subtype)}</td>
                <td>{String(track.language)}</td>
                <td>{JSON.stringify(track.customData)}</td>
                <td>
                  <button
                    disabled={!isMediaLoaded}
                    onClick={() => {
                      editTracks([track.trackId]);
                    }}
                  >
                    Set Active Track
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button
        disabled={!connected}
        onClick={() => {
          const mediaInfo = new window.chrome.cast.media.MediaInfo(
            //'https://vod-dash.sfanytime.com/trailers/31500/31980/31980.ism/Manifest.mpd',
            'https://vod-dash.sfanytime.com/trailers/31500/31554/31554.ism/Manifest.mpd',
            'application/dash+xml'
          );
          const metadata = new window.chrome.cast.media.MovieMediaMetadata();
          metadata.title = 'Unga agnes';
          metadata.images = [
            new window.chrome.cast.Image(
              'https://sfanytime-images-prod.secure.footprint.net/COVERM/0ba94c2c-bccb-4c0e-9d6c-a98b010cf567_COVERM_SV.jpg?w=375&fm=pjpg&s=28f193cb6db6a2b5d34ba3838672fb85'
            )
          ];
          mediaInfo.metadata = metadata;
          const request = new window.chrome.cast.media.LoadRequest(mediaInfo);
          loadMedia(request);
        }}
      >
        Load Media
      </button>
      <button
        disabled={!connected || !isMediaLoaded}
        onClick={() => {
          togglePlay();
        }}
      >
        Toggle Play/Pause
      </button>
      <input
        value={time}
        type="number"
        onChange={e => setTime(Number(e.target.value))}
        placeholder="time to seek to"
      />
      <button
        disabled={!connected || !isMediaLoaded}
        onClick={() => {
          seek(time);
        }}
      >
        Seek
      </button>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <div className="App">
      <CastProvider receiverApplicationId="5D7312A7">
        <header className="App-header">
          <div style={{ width: '64px' }}>
            <CastButton />
          </div>
          <UseCastExample />
          <UseCastPlayerExample />
        </header>

        <MiniController />
      </CastProvider>
    </div>
  );
};

export default App;
