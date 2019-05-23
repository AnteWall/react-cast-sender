import { createContext } from 'react';

const CastContext = createContext<{
  initialized: boolean;
  connected: boolean;
  deviceName: string;
  player: cast.framework.RemotePlayer | null;
  playerController: cast.framework.RemotePlayerController | null;
}>({
  initialized: false,
  connected: false,
  deviceName: '',
  player: null,
  playerController: null
});
export default CastContext;
