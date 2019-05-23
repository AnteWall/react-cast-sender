export function loadScriptAsync(url: string): Promise<any> {
  return new Promise((resolve, reject) => {
    let r = false,
      t = document.getElementsByTagName('script')[0],
      s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = url;
    s.async = true;
    //@ts-ignore
    s.onload = s.onreadystatechange = function() {
      //@ts-ignore
      if (!r && (!this.readyState || this.readyState === 'complete')) {
        r = true;
        resolve(this);
      }
    };
    s.onerror = s.onabort = reject;
    if (t && t.parentNode) {
      t.parentNode.insertBefore(s, t);
    }
  });
}

export const getDisplayTime = (time: number) => {
  const showHour = time >= 3600;
  const h = Math.floor(time / 3600);
  const m = Math.floor((time / 60) % 60);
  let s: any = Math.floor(time % 60);
  if (s < 10) s = `0${s}`;
  let text = `${m}:${s}`;
  if (showHour || h > 0) {
    if (m < 10) {
      text = `0${text}`;
    }
    text = `${h}:${text}`;
  }
  return text;
};

export const getDefaultTrackStyling = () => {
  const style = new window.chrome.cast.media.TextTrackStyle();
  style.backgroundColor = '#00000000';
  style.edgeType = window.chrome.cast.media.TextTrackEdgeType.DROP_SHADOW;
  style.fontGenericFamily =
    window.chrome.cast.media.TextTrackFontGenericFamily.SANS_SERIF;
  style.edgeColor = '#000000';
  style.fontStyle = window.chrome.cast.media.TextTrackFontStyle.BOLD;
  return style;
};
