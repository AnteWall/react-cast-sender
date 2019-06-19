import { renderHook, act } from 'react-hooks-testing-library';
import useCast from './useCast';

describe('useCast', () => {
  it('exposes context variables', () => {
    const { result } = renderHook(() => useCast());

    expect(result.current.connected).toBe(false);
    expect(result.current.deviceName).toBe('');
    expect(result.current.initialized).toBe(false);
    expect(result.current.player).toBe(null);
    expect(result.current.playerController).toBe(null);
  });
});
