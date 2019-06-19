import {
  getDefaultTrackStyling,
  getDisplayTime,
  loadScriptAsync
} from './utils';

describe('Utils', () => {
  describe('#getDefaultTrackStyling', () => {
    beforeEach(() => {
      window.chrome = {
        cast: {
          media: {}
        }
      };
    });

    afterEach(() => {
      window.chrome = null;
    });

    it('sets correct styling', () => {
      window.chrome.cast.media.TextTrackStyle = () => ({});
      window.chrome.cast.media.TextTrackEdgeType = {
        DROP_SHADOW: 'DROP_SHADOW'
      };
      window.chrome.cast.media.TextTrackFontGenericFamily = {
        SANS_SERIF: 'SANS_SERIF'
      };
      window.chrome.cast.media.TextTrackFontStyle = { BOLD: 'BOLD' };

      expect(getDefaultTrackStyling()).toEqual({
        backgroundColor: '#00000000',
        edgeColor: '#000000',
        edgeType: 'DROP_SHADOW',
        fontGenericFamily: 'SANS_SERIF',
        fontStyle: 'BOLD'
      });
    });
  });

  describe('#getDisplayTime', () => {
    it('shows correct time for minutes', () => {
      expect(getDisplayTime(400)).toBe('6:40');
      expect(getDisplayTime(600)).toBe('10:00');
      expect(getDisplayTime(1200)).toBe('20:00');
      expect(getDisplayTime(2205)).toBe('36:45');
    });

    it('adds hours if time is larger then 60 min', () => {
      expect(getDisplayTime(5000)).toBe('1:23:20');
      expect(getDisplayTime(11000)).toBe('3:03:20');
      expect(getDisplayTime(12000)).toBe('3:20:00');
      expect(getDisplayTime(64000)).toBe('17:46:40');
    });
  });

  describe('loadScriptAsync', () => {
    it('creates a promise', () => {
      const script = loadScriptAsync('url.com');
      expect(script).resolves.toBeDefined();
    });
  });
});
