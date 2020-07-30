/* global chrome */

import React, {
  ReactNode,
  ReactNodeArray,
  useEffect,
  useState,
  useMemo,
  useCallback
} from 'react';
import get from 'lodash/get';
import CastContext from './CastContext';
import { CastLoader } from '../utils/CastLoader';

interface CastProviderProps extends Partial<cast.framework.CastOptions> {
  children?: ReactNode | ReactNodeArray;
  autoJoinPolicy?: chrome.cast.AutoJoinPolicy;
}

const CastProvider = ({
  children,
  receiverApplicationId,
  autoJoinPolicy = get(
    window.chrome,
    'cast.AutoJoinPolicy.ORIGIN_SCOPED',
    'origin_scoped'
  ),
  language,
  resumeSavedSession
}: CastProviderProps) => {
  const [connected, setConnected] = useState<boolean>(false);
  const [deviceName, setDeviceName] = useState<string>('');
  const [castInitialized, setCastInititalized] = useState<boolean>(false);
  const [player, setPlayer] = useState<cast.framework.RemotePlayer | null>(
    null
  );
  const [
    playerController,
    setPlayerController
  ] = useState<cast.framework.RemotePlayerController | null>(null);

  useEffect(() => {
    CastLoader.load().then(() => {
      setCastInititalized(true);
    });
  }, []);

  const resetCast = useCallback(() => {
    setConnected(false);
    setDeviceName('');
    setPlayer(null);
    setPlayerController(null);
  }, []);

  /* onCast Initalized */
  useEffect(() => {
    const onSessionStateChange = (
      data: cast.framework.SessionStateEventData
    ) => {
      if (
        data.sessionState ===
          window.cast.framework.SessionState.SESSION_RESUMED ||
        data.sessionState === window.cast.framework.SessionState.SESSION_STARTED
      ) {
        setConnected(true);
      }
      if (
        data.sessionState === window.cast.framework.SessionState.SESSION_ENDED
      ) {
        resetCast();
        setConnected(false);
      }
    };

    if (chrome.cast && window.cast) {
      window.cast.framework.CastContext.getInstance().setOptions({
        receiverApplicationId,
        resumeSavedSession,
        autoJoinPolicy,
        language
      });
      const player = new window.cast.framework.RemotePlayer();
      setPlayer(player);
      setPlayerController(
        new window.cast.framework.RemotePlayerController(player)
      );

      window.cast.framework.CastContext.getInstance().addEventListener(
        window.cast.framework.CastContextEventType.SESSION_STATE_CHANGED,
        onSessionStateChange
      );
    }
  }, [
    autoJoinPolicy,
    castInitialized,
    language,
    receiverApplicationId,
    resetCast,
    resumeSavedSession
  ]);

  useEffect(() => {
    const onConnectedChange = (
      _data: cast.framework.RemotePlayerChangedEvent
    ) => {
      setConnected(true);
      const session = window.cast.framework.CastContext.getInstance().getCurrentSession();
      if (session) {
        setDeviceName(session.getSessionObj().receiver.friendlyName);
      }
    };
    if (playerController) {
      playerController.addEventListener(
        window.cast.framework.RemotePlayerEventType.IS_CONNECTED_CHANGED,
        onConnectedChange
      );
    }
    return () => {
      if (playerController) {
        playerController.removeEventListener(
          window.cast.framework.RemotePlayerEventType.IS_CONNECTED_CHANGED,
          onConnectedChange
        );
      }
    };
  }, [playerController]);

  const value = useMemo(() => {
    const value = {
      connected,
      initialized: castInitialized,
      deviceName,
      player,
      playerController
    };
    return value;
  }, [castInitialized, connected, deviceName, player, playerController]);

  return <CastContext.Provider value={value}>{children}</CastContext.Provider>;
};

export default CastProvider;
