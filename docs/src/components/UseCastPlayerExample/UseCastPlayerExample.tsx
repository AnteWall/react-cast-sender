import React, { useState } from 'react';
import { useCast, useCastPlayer } from 'react-cast-sender';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PausedArrowIcon from '@material-ui/icons/Pause';
import Volume from '@material-ui/icons/VolumeUp';
import Muted from '@material-ui/icons/VolumeMute';

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
    isMuted,
    tracks,
    toggleMute,
    editTracks,
    title,
    thumbnail
  } = useCastPlayer();

  const [seekTime, setSeekTime] = useState(0);

  return (
    <>
      <Typography gutterBottom style={{ marginTop: '1rem' }} variant="h5">
        useCastPlayer
      </Typography>
      <Grid container spacing={16}>
        <Grid item xs={12} md={6}>
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Key</TableCell>
                  <TableCell align="right">type</TableCell>
                  <TableCell align="right">Current value</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell component="th" scope="row">
                    isPaused
                  </TableCell>
                  <TableCell align="right">
                    <pre>boolean</pre>
                  </TableCell>
                  <TableCell align="right">{String(isPaused)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    isMediaLoaded
                  </TableCell>
                  <TableCell align="right">
                    <pre>boolean</pre>
                  </TableCell>
                  <TableCell align="right">{String(isMediaLoaded)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    isMuted
                  </TableCell>
                  <TableCell align="right">
                    <pre>boolean</pre>
                  </TableCell>
                  <TableCell align="right">{String(isMuted)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    currentTime
                  </TableCell>
                  <TableCell align="right">
                    <pre>number</pre>
                  </TableCell>
                  <TableCell align="right">{currentTime}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    duration
                  </TableCell>
                  <TableCell align="right">
                    <pre>number</pre>
                  </TableCell>
                  <TableCell align="right">{duration}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card style={{ display: 'flex' }}>
            <div
              style={{ display: 'flex', flexDirection: 'column', flex: 'auto' }}
            >
              <CardContent style={{ flex: '1 0 auto' }}>
                <Typography component="h5" variant="h5">
                  {title}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  TODO
                </Typography>
              </CardContent>
              <div>
                <IconButton
                  disabled={!isMediaLoaded}
                  aria-label="Play/pause"
                  onClick={togglePlay}
                >
                  {isPaused ? <PlayArrowIcon /> : <PausedArrowIcon />}
                </IconButton>
                <IconButton
                  disabled={!isMediaLoaded}
                  aria-label="Mute/Unmute"
                  onClick={toggleMute}
                >
                  {isMuted ? <Muted /> : <Volume />}
                </IconButton>
              </div>
            </div>
            <CardMedia
              image={thumbnail}
              style={{ width: '150px' }}
              title="Live from space album cover"
            />
          </Card>

          <Paper>
            <TextField
              id="seekTime"
              label="seekTime"
              value={seekTime}
              type="number"
              onChange={e => {
                setSeekTime(Number(e.target.value));
              }}
              margin="normal"
              helperText="Time (in seconds) to seek to"
            />
            <Button onClick={() => seek(seekTime)}>Seek</Button>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Track Id</TableCell>
                  <TableCell align="right">TrackContent Type</TableCell>
                  <TableCell align="right">Type</TableCell>
                  <TableCell align="right">Subtype</TableCell>
                  <TableCell align="right">Language</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tracks.map(track => {
                  return (
                    <TableRow key={track.trackId}>
                      <TableCell component="th" scope="row">
                        {track.trackId}
                      </TableCell>

                      <TableCell align="right">
                        {track.trackContentType}
                      </TableCell>
                      <TableCell align="right">{track.type}</TableCell>
                      <TableCell align="right">{track.subtype}</TableCell>
                      <TableCell align="right">{track.language}</TableCell>
                      <TableCell align="right">
                        <Button
                          onClick={() => {
                            editTracks([track.trackId]);
                          }}
                        >
                          Choose
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper>
            <Grid container justify="center">
              <Grid item xs={8}>
                <TextField
                  fullWidth
                  disabled
                  id="receiverApplicationId"
                  label="contentId"
                  value={
                    'https://vod-dash.sfanytime.com/trailers/31500/31554/31554.ism/Manifest.mpd'
                  }
                  onChange={e => {}}
                  margin="normal"
                  helperText="Manifest URL to load to cast"
                />
              </Grid>
              <Grid item xs={3} alignContent="center">
                <Button
                  disabled={!connected}
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    const mediaInfo = new window.chrome.cast.media.MediaInfo(
                      'https://vod-dash.sfanytime.com/trailers/31500/31554/31554.ism/Manifest.mpd',
                      'application/dash+xml'
                    );
                    const metadata = new window.chrome.cast.media.MovieMediaMetadata();
                    metadata.title = 'Unga Agnes';
                    metadata.images = [
                      new window.chrome.cast.Image(
                        'https://sfanytime-images-prod.secure.footprint.net/COVERM/0ba94c2c-bccb-4c0e-9d6c-a98b010cf567_COVERM_SV.jpg?w=375&fm=pjpg&s=28f193cb6db6a2b5d34ba3838672fb85'
                      )
                    ];
                    mediaInfo.metadata = metadata;

                    const request = new window.chrome.cast.media.LoadRequest(
                      mediaInfo
                    );
                    loadMedia(request);
                  }}
                >
                  Load Media
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default UseCastPlayerExample;
