import { useMemo, useCallback, useState, useEffect } from 'react';
import get from 'lodash/get';
import { getDefaultTrackStyling } from '../../utils/utils';
import thumbnailImage from '../../utils/thumbnailImage';
import useCast from '../useCast/useCast';

const useCastPlayer = () => {
  const { connected, player, playerController } = useCast();
  const [tracks, setTracks] = useState<chrome.cast.media.Track[]>([]);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [isMediaLoaded, setIsMediaLoaded] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('No title');
  const [thumbnail, setThumbnail] = useState<string>(thumbnailImage);

  function resetValues() {
    setTracks([]);
    setCurrentTime(0);
    setDuration(0);
    setIsMediaLoaded(false);
    setIsPaused(false);
    setIsMuted(false);
    setThumbnail(thumbnailImage);
    setTitle('No title');
  }

  useEffect(() => {
    if (!connected) {
      resetValues();
    }
  }, [connected]);

  /*
   * CurrentTime Event Listener
   */
  useEffect(() => {
    function onCurrentTimeChange(
      data: cast.framework.RemotePlayerChangedEvent
    ) {
      setCurrentTime(data.value);
    }

    if (playerController) {
      playerController.addEventListener(
        window.cast.framework.RemotePlayerEventType.CURRENT_TIME_CHANGED,
        onCurrentTimeChange
      );
    }
    return () => {
      if (playerController) {
        playerController.removeEventListener(
          window.cast.framework.RemotePlayerEventType.CURRENT_TIME_CHANGED,
          onCurrentTimeChange
        );
      }
    };
  }, [playerController, setCurrentTime]);

  /*
   * Duration Event Listener
   */
  useEffect(() => {
    function onDurationChange(data: cast.framework.RemotePlayerChangedEvent) {
      setDuration(data.value);
    }
    if (playerController) {
      playerController.addEventListener(
        window.cast.framework.RemotePlayerEventType.DURATION_CHANGED,
        onDurationChange
      );
    }
    return () => {
      if (playerController) {
        playerController.removeEventListener(
          window.cast.framework.RemotePlayerEventType.DURATION_CHANGED,
          onDurationChange
        );
      }
    };
  }, [playerController, setDuration]);

  /*
   * IsMediaLoaded Event Listener
   */
  useEffect(() => {
    function onMediaLoadedChange(
      data: cast.framework.RemotePlayerChangedEvent
    ) {
      setIsMediaLoaded(data.value);
    }
    if (playerController) {
      playerController.addEventListener(
        window.cast.framework.RemotePlayerEventType.IS_MEDIA_LOADED_CHANGED,
        onMediaLoadedChange
      );
    }
    return () => {
      if (playerController) {
        playerController.removeEventListener(
          window.cast.framework.RemotePlayerEventType.IS_MEDIA_LOADED_CHANGED,
          onMediaLoadedChange
        );
      }
    };
  }, [playerController, setIsMediaLoaded]);

  /*
   * isPaused Event Listener
   */
  useEffect(() => {
    function onIsPausedChange(data: cast.framework.RemotePlayerChangedEvent) {
      setIsPaused(data.value);
    }
    if (playerController) {
      playerController.addEventListener(
        window.cast.framework.RemotePlayerEventType.IS_PAUSED_CHANGED,
        onIsPausedChange
      );
    }
    return () => {
      if (playerController) {
        playerController.removeEventListener(
          window.cast.framework.RemotePlayerEventType.IS_PAUSED_CHANGED,
          onIsPausedChange
        );
      }
    };
  }, [playerController, setIsPaused]);
  /*
   * isMuted Event Listener
   */
  useEffect(() => {
    function onIsMutedChange(data: cast.framework.RemotePlayerChangedEvent) {
      setIsMuted(data.value);
    }
    if (playerController) {
      playerController.addEventListener(
        window.cast.framework.RemotePlayerEventType.IS_MUTED_CHANGED,
        onIsMutedChange
      );
    }
    return () => {
      if (playerController) {
        playerController.removeEventListener(
          window.cast.framework.RemotePlayerEventType.IS_MUTED_CHANGED,
          onIsMutedChange
        );
      }
    };
  }, [playerController, setIsMuted]);

  useEffect(() => {
    function onMediaInfoChanged(data: cast.framework.RemotePlayerChangedEvent) {
      // We make the check what we update so we dont update on every player changed event since it happens often
      const newTitle = get(data, 'value.metadata.title', 'No title');
      const newThumbnail = get(
        data,
        'value.metadata.images[0].url',
        thumbnailImage
      );
      const newTracks = get(data, 'value.tracks', []);
      if (tracks.length !== newTracks.length) {
        setTracks(newTracks);
      }
      if (title !== newTitle) {
        setTitle(newTitle);
      }
      if (thumbnail !== newThumbnail) {
        setThumbnail(newThumbnail);
      }
    }

    if (playerController) {
      playerController.addEventListener(
        window.cast.framework.RemotePlayerEventType.MEDIA_INFO_CHANGED,
        onMediaInfoChanged
      );
    }
    return () => {
      if (playerController) {
        playerController.removeEventListener(
          window.cast.framework.RemotePlayerEventType.MEDIA_INFO_CHANGED,
          onMediaInfoChanged
        );
      }
    };
  }, [
    playerController,
    setTitle,
    title,
    setTracks,
    tracks,
    thumbnail,
    setThumbnail
  ]);

  const loadMedia = useCallback((request: chrome.cast.media.LoadRequest) => {
    const castSession = window.cast.framework.CastContext.getInstance().getCurrentSession();
    if (castSession) {
      return castSession.loadMedia(request);
    } else {
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

  const value = useMemo(
    () => ({
      loadMedia,
      tracks,
      editTracks,
      currentTime,
      duration,
      toggleMute,
      setVolume,
      togglePlay,
      seek,
      isMediaLoaded,
      isPaused,
      isMuted,
      title,
      thumbnail
    }),
    [
      loadMedia,
      tracks,
      editTracks,
      currentTime,
      duration,
      toggleMute,
      setVolume,
      togglePlay,
      seek,
      isMediaLoaded,
      isPaused,
      isMuted,
      title,
      thumbnail
    ]
  );
  return value;
};
export default useCastPlayer;
