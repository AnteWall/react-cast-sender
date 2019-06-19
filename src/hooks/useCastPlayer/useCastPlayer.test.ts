import { renderHook, act } from 'react-hooks-testing-library';
import useCastPlayer from './useCastPlayer';
import * as useCast from '../useCast/useCast';
import thumbnailImage from '../../utils/thumbnailImage';

declare global {
  namespace NodeJS {
    interface Global {
      cast: any;
      chrome: any;
    }
  }
}

describe('useCast', () => {
  beforeEach(() => {
    global.chrome = {
      cast: {
        media: {
          TextTrackEdgeType: {
            DROP_SHADOW: 'DROP_SHADOW'
          },
          TextTrackFontGenericFamily: {
            SANS_SERIF: 'SANS_SERIF'
          },
          TextTrackFontStyle: {
            BOLD: 'BOLD'
          },
          TextTrackStyle: () => {},
          EditTracksInfoRequest: () => {}
        }
      }
    };
    global.cast = {
      framework: {
        RemotePlayerEventType: {
          CURRENT_TIME_CHANGED: 'CURRENT_TIME_CHANGED',
          DURATION_CHANGED: 'DURATION_CHANGED',
          IS_MEDIA_LOADED_CHANGED: 'IS_MEDIA_LOADED_CHANGED',
          IS_PAUSED_CHANGED: 'IS_PAUSED_CHANGED',
          IS_MUTED_CHANGED: 'IS_MUTED_CHANGED',
          MEDIA_INFO_CHANGED: 'MEDIA_INFO_CHANGED'
        }
      }
    };
  });

  it('changes currentime on CURRENT_TIME_CHANGED event', () => {
    const eventMap: any = {};
    // @ts-ignore
    jest.spyOn(useCast, 'default').mockImplementationOnce(() => ({
      playerController: {
        addEventListener: (event, callback) => {
          eventMap[event] = callback;
        },
        removeEventListener: (event, _callback) => {
          delete eventMap[event];
        }
      }
    }));
    const { result } = renderHook(() => useCastPlayer());
    expect(result.current.currentTime).toBe(0);
    act(() => {
      eventMap[
        global.cast.framework.RemotePlayerEventType.CURRENT_TIME_CHANGED
      ]({ value: 100 });
    });
    expect(result.current.currentTime).toBe(100);
  });

  it('changes duration on DURATION_CHANGED event', () => {
    const eventMap: any = {};
    // @ts-ignore
    jest.spyOn(useCast, 'default').mockImplementationOnce(() => ({
      playerController: {
        addEventListener: (event, callback) => {
          eventMap[event] = callback;
        },
        removeEventListener: (event, _callback) => {
          delete eventMap[event];
        }
      }
    }));
    const { result } = renderHook(() => useCastPlayer());
    expect(result.current.duration).toBe(0);
    act(() => {
      eventMap[global.cast.framework.RemotePlayerEventType.DURATION_CHANGED]({
        value: 200
      });
    });
    expect(result.current.duration).toBe(200);
  });

  it('changes isMediaLoaded on IS_MEDIA_LOADED_CHANGED event', () => {
    const eventMap: any = {};
    // @ts-ignore
    jest.spyOn(useCast, 'default').mockImplementationOnce(() => ({
      playerController: {
        addEventListener: (event, callback) => {
          eventMap[event] = callback;
        },
        removeEventListener: (event, _callback) => {
          delete eventMap[event];
        }
      }
    }));
    const { result } = renderHook(() => useCastPlayer());
    expect(result.current.isMediaLoaded).toBe(false);
    act(() => {
      eventMap[
        global.cast.framework.RemotePlayerEventType.IS_MEDIA_LOADED_CHANGED
      ]({
        value: true
      });
    });
    expect(result.current.isMediaLoaded).toBe(true);
  });

  it('changes isPaused on IS_PAUSED_CHANGED event', () => {
    const eventMap: any = {};
    // @ts-ignore
    jest.spyOn(useCast, 'default').mockImplementationOnce(() => ({
      playerController: {
        addEventListener: (event, callback) => {
          eventMap[event] = callback;
        },
        removeEventListener: (event, _callback) => {
          delete eventMap[event];
        }
      }
    }));
    const { result } = renderHook(() => useCastPlayer());
    expect(result.current.isPaused).toBe(false);
    act(() => {
      eventMap[global.cast.framework.RemotePlayerEventType.IS_PAUSED_CHANGED]({
        value: true
      });
    });
    expect(result.current.isPaused).toBe(true);
  });

  it('changes isMuted on IS_MUTED_CHANGED event', () => {
    const eventMap: any = {};
    // @ts-ignore
    jest.spyOn(useCast, 'default').mockImplementationOnce(() => ({
      playerController: {
        addEventListener: (event, callback) => {
          eventMap[event] = callback;
        },
        removeEventListener: (event, _callback) => {
          delete eventMap[event];
        }
      }
    }));
    const { result } = renderHook(() => useCastPlayer());
    expect(result.current.isMuted).toBe(false);
    act(() => {
      eventMap[global.cast.framework.RemotePlayerEventType.IS_MUTED_CHANGED]({
        value: true
      });
    });
    expect(result.current.isMuted).toBe(true);
  });

  it('changes tracks on MEDIA_INFO_CHANGED event', () => {
    const eventMap: any = {};
    const tracks = [
      {
        trackId: 1,
        trackType: 'TEXT'
      },
      {
        trackId: 2,
        trackType: 'AUDIO'
      }
    ];
    // @ts-ignore
    jest.spyOn(useCast, 'default').mockImplementationOnce(() => ({
      playerController: {
        addEventListener: (event, callback) => {
          eventMap[event] = callback;
        },
        removeEventListener: (event, _callback) => {
          delete eventMap[event];
        }
      }
    }));
    const { result } = renderHook(() => useCastPlayer());
    expect(result.current.tracks).toEqual([]);
    act(() => {
      eventMap[global.cast.framework.RemotePlayerEventType.MEDIA_INFO_CHANGED]({
        value: {
          tracks
        }
      });
    });
    expect(result.current.tracks).toEqual(tracks);
  });

  it('changes title on MEDIA_INFO_CHANGED event', () => {
    const eventMap: any = {};
    // @ts-ignore
    jest.spyOn(useCast, 'default').mockImplementationOnce(() => ({
      playerController: {
        addEventListener: (event, callback) => {
          eventMap[event] = callback;
        },
        removeEventListener: (event, _callback) => {
          delete eventMap[event];
        }
      }
    }));
    const { result } = renderHook(() => useCastPlayer());
    expect(result.current.title).toEqual('No title');
    act(() => {
      eventMap[global.cast.framework.RemotePlayerEventType.MEDIA_INFO_CHANGED]({
        value: {
          metadata: { title: 'Hello' }
        }
      });
    });
    expect(result.current.title).toEqual('Hello');
  });

  it('changes thumnail on MEDIA_INFO_CHANGED event', () => {
    const eventMap: any = {};
    jest.spyOn(useCast, 'default').mockImplementationOnce(() => ({
      // @ts-ignore
      playerController: {
        addEventListener: (event, callback) => {
          eventMap[event] = callback;
        },
        removeEventListener: (event, _callback) => {
          delete eventMap[event];
        }
      }
    }));
    const { result } = renderHook(() => useCastPlayer());
    expect(result.current.thumbnail).toEqual(thumbnailImage);
    act(() => {
      eventMap[global.cast.framework.RemotePlayerEventType.MEDIA_INFO_CHANGED]({
        value: {
          metadata: { images: [{ url: 'imagesrc' }] }
        }
      });
    });
    expect(result.current.thumbnail).toEqual('imagesrc');
  });

  it('togglePlay calls correct Api', () => {
    const mockedPlay = jest.fn();
    jest.spyOn(useCast, 'default').mockImplementationOnce(() => ({
      // @ts-ignore
      playerController: {
        playOrPause: mockedPlay,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn()
      }
    }));
    const { result } = renderHook(() => useCastPlayer());
    result.current.togglePlay();
    expect(mockedPlay.mock.calls.length).toBe(1);
  });

  it('toggleMute calls correct Api', () => {
    const mockedMute = jest.fn();
    jest.spyOn(useCast, 'default').mockImplementationOnce(() => ({
      // @ts-ignore
      playerController: {
        muteOrUnmute: mockedMute,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn()
      }
    }));
    const { result } = renderHook(() => useCastPlayer());
    result.current.toggleMute();
    expect(mockedMute.mock.calls.length).toBe(1);
  });

  it('seek calls correct Api', () => {
    const mockedSeekCall = jest.fn();
    jest.spyOn(useCast, 'default').mockImplementationOnce(() => ({
      // @ts-ignore
      playerController: {
        seek: mockedSeekCall,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn()
      },
      // @ts-ignore
      player: {
        currentTime: 0
      }
    }));
    const { result } = renderHook(() => useCastPlayer());
    result.current.seek(100);
    expect(mockedSeekCall.mock.calls.length).toBe(1);
  });

  it('setVolume calls correct Api', () => {
    const mockedVolume = jest.fn();
    jest.spyOn(useCast, 'default').mockImplementationOnce(() => ({
      // @ts-ignore
      playerController: {
        setVolumeLevel: mockedVolume,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn()
      },
      // @ts-ignore
      player: {
        volumeLevel: 0
      }
    }));
    const { result } = renderHook(() => useCastPlayer());
    result.current.setVolume(0.5);
    expect(mockedVolume.mock.calls.length).toBe(1);
  });

  it('loadmedia throws on no CastSession', () => {
    window.cast.framework.CastContext = {
      // @ts-ignore
      getInstance: () => ({ getCurrentSession: () => false })
    };

    jest.spyOn(useCast, 'default').mockImplementationOnce(() => ({
      // @ts-ignore
      playerController: {
        addEventListener: jest.fn(),
        removeEventListener: jest.fn()
      },
      // @ts-ignore
      player: {
        volumeLevel: 0
      }
    }));
    const { result } = renderHook(() => useCastPlayer());
    expect(
      result.current.loadMedia({
        activeTrackIds: [2],
        autoplay: false,
        currentTime: 0,
        customData: {},
        media: undefined
      })
    ).rejects.toBe(true);
  });

  it('loadmedia calls correct Api', () => {
    const mockedCall = jest.fn();

    window.cast.framework.CastContext = {
      // @ts-ignore
      getInstance: () => ({
        // @ts-ignore
        getCurrentSession: () => ({ loadMedia: mockedCall })
      })
    };

    jest.spyOn(useCast, 'default').mockImplementationOnce(() => ({
      // @ts-ignore
      playerController: {
        addEventListener: jest.fn(),
        removeEventListener: jest.fn()
      },
      // @ts-ignore
      player: {
        volumeLevel: 0
      }
    }));
    const { result } = renderHook(() => useCastPlayer());
    result.current.loadMedia({
      activeTrackIds: [2],
      autoplay: false,
      currentTime: 0,
      customData: {},
      media: undefined
    });
    expect(mockedCall.mock.calls.length).toBe(1);
  });

  it('editTracks throws on no CastSession', () => {
    window.cast.framework.CastContext = {
      // @ts-ignore
      getInstance: () => ({ getCurrentSession: () => false })
    };

    jest.spyOn(useCast, 'default').mockImplementationOnce(() => ({
      // @ts-ignore
      playerController: {
        addEventListener: jest.fn(),
        removeEventListener: jest.fn()
      },
      // @ts-ignore
      player: {
        volumeLevel: 0
      }
    }));
    const { result } = renderHook(() => useCastPlayer());
    expect(result.current.editTracks([2])).rejects.toBe(true);
  });
  it('editTracks throws on no Media active', () => {
    window.cast.framework.CastContext = {
      // @ts-ignore
      getInstance: () => ({
        getCurrentSession: () => ({ getMediaSession: () => false })
      })
    };

    jest.spyOn(useCast, 'default').mockImplementationOnce(() => ({
      // @ts-ignore
      playerController: {
        addEventListener: jest.fn(),
        removeEventListener: jest.fn()
      },
      // @ts-ignore
      player: {
        volumeLevel: 0
      }
    }));
    const { result } = renderHook(() => useCastPlayer());
    expect(result.current.editTracks([2])).rejects.toBe(true);
  });

  it('editTracks calls api', () => {
    const mockedCall = jest.fn();

    window.cast.framework.CastContext = {
      // @ts-ignore
      getInstance: () => ({
        getCurrentSession: () => ({
          getMediaSession: () => ({ editTracksInfo: mockedCall })
        })
      })
    };

    jest.spyOn(useCast, 'default').mockImplementationOnce(() => ({
      // @ts-ignore
      playerController: {
        addEventListener: jest.fn(),
        removeEventListener: jest.fn()
      },
      // @ts-ignore
      player: {
        volumeLevel: 0
      }
    }));
    const { result } = renderHook(() => useCastPlayer());
    result.current.editTracks([1]);
    expect(mockedCall.mock.calls.length).toBe(1);
  });
});
