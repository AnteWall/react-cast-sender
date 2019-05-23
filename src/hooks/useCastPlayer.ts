import { useCallback, useState, useEffect, useContext } from 'react';
import get from 'lodash/get';
import CastContext from '../context/CastContext';
import { getDefaultTrackStyling } from '../utils/utils';
import thumbnailImage from '../utils/thumbnailImage';

const useCastPlayer = () => {
  const { player, playerController } = useContext(CastContext);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [isMediaLoaded, setIsMediaLoaded] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [tracks, setTracks] = useState<chrome.cast.media.Track[]>([]);
  const [title, setTitle] = useState<string>('No title');
  const [thumbnail, setThumbnail] = useState<string>(thumbnailImage);

  useEffect(() => {
    const onCurrentTimeChange = (
      data: cast.framework.RemotePlayerChangedEvent
    ) => {
      setCurrentTime(data.value);
    };
    const onDurationChange = (
      data: cast.framework.RemotePlayerChangedEvent
    ) => {
      setDuration(data.value);
    };
    const onIsMediaLoaded = (data: cast.framework.RemotePlayerChangedEvent) => {
      setIsMediaLoaded(data.value);
    };
    const onIsPausedChanged = (
      data: cast.framework.RemotePlayerChangedEvent
    ) => {
      setIsPaused(data.value);
    };
    const onMediaInfoChanged = (
      data: cast.framework.RemotePlayerChangedEvent
    ) => {
      console.log(data);

      setTracks(get(data, 'value.tracks', []));
      setThumbnail(get(data, 'value.metadata.images[0].url', thumbnailImage));
      setTitle(get(data, 'value.metadata.title', 'No title'));
    };

    if (playerController) {
      playerController.addEventListener(
        window.cast.framework.RemotePlayerEventType.CURRENT_TIME_CHANGED,
        onCurrentTimeChange
      );
      playerController.addEventListener(
        window.cast.framework.RemotePlayerEventType.DURATION_CHANGED,
        onDurationChange
      );
      playerController.addEventListener(
        window.cast.framework.RemotePlayerEventType.IS_MEDIA_LOADED_CHANGED,
        onIsMediaLoaded
      );
      playerController.addEventListener(
        window.cast.framework.RemotePlayerEventType.IS_PAUSED_CHANGED,
        onIsPausedChanged
      );
      playerController.addEventListener(
        window.cast.framework.RemotePlayerEventType.MEDIA_INFO_CHANGED,
        onMediaInfoChanged
      );
    }
    return () => {
      if (playerController) {
        playerController.removeEventListener(
          window.cast.framework.RemotePlayerEventType.CURRENT_TIME_CHANGED,
          onCurrentTimeChange
        );
        playerController.removeEventListener(
          window.cast.framework.RemotePlayerEventType.DURATION_CHANGED,
          onDurationChange
        );
        playerController.removeEventListener(
          window.cast.framework.RemotePlayerEventType.IS_MEDIA_LOADED_CHANGED,
          onIsMediaLoaded
        );
        playerController.removeEventListener(
          window.cast.framework.RemotePlayerEventType.IS_PAUSED_CHANGED,
          onIsPausedChanged
        );
        playerController.removeEventListener(
          window.cast.framework.RemotePlayerEventType.MEDIA_INFO_CHANGED,
          onMediaInfoChanged
        );
      }
      setTracks([]);
      setCurrentTime(0);
      setIsMediaLoaded(false);
      setIsPaused(false);
      setThumbnail(thumbnailImage);
      setTitle('No title');
      setDuration(0);
    };
  }, [playerController]);

  const loadMedia = useCallback((request: chrome.cast.media.LoadRequest) => {
    const castSession = window.cast.framework.CastContext.getInstance().getCurrentSession();
    if (castSession) {
      return castSession.loadMedia(request);
    } else {
      console.warn('No CastSession has been created');
      return Promise.reject('No CastSession has been created');
    }
  }, []);

  const togglePlay = useCallback(() => {
    if (playerController) {
      playerController.playOrPause();
    }
  }, [playerController]);

  const toggleMute = useCallback(() => {
    if (playerController) {
      playerController.muteOrUnmute();
    }
  }, [playerController]);

  const seek = useCallback(
    time => {
      if (player && playerController) {
        player.currentTime = time;
        playerController.seek();
      }
    },
    [player, playerController]
  );

  const setVolume = useCallback(
    volume => {
      if (player && playerController) {
        player.volumeLevel = volume;
        playerController.setVolumeLevel();
      }
    },
    [player, playerController]
  );

  const editTracks = useCallback(
    (
      activeTrackIds: number[],
      textTrackStyle?: chrome.cast.media.TextTrackStyle
    ) => {
      const castSession = window.cast.framework.CastContext.getInstance().getCurrentSession();
      if (castSession) {
        const trackStyle = textTrackStyle || getDefaultTrackStyling();
        const tracksInfoRequest = new window.chrome.cast.media.EditTracksInfoRequest(
          activeTrackIds,
          trackStyle
        );
        const media = castSession.getMediaSession();
        console.log(castSession, media);
        if (media) {
          return new Promise((resolve, reject) => {
            media.editTracksInfo(tracksInfoRequest, resolve, reject);
          });
        } else {
          return Promise.reject('No active media');
        }
      }
      return Promise.reject('No active cast session');
    },
    []
  );

  return {
    loadMedia,
    currentTime,
    duration,
    isPaused,
    isMediaLoaded,
    togglePlay,
    seek,
    tracks,
    editTracks,
    thumbnail,
    title,
    setVolume,
    toggleMute
  };
};
export default useCastPlayer;
