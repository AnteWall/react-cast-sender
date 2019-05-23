import React from 'react';
import styled from 'styled-components';
import useCastPlayer from '../../hooks/useCastPlayer';
import CastButton from '../CastButton';
import { getDisplayTime } from '../../utils/utils';
import useCast from '../../hooks/useCast';

const MiniControllerWrapper = styled.div`
  position: fixed;
  bottom: 0;
  background: lightblue;

  left: 20vw;
`;

const Controls = styled.div`
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 320px;
`;
const Time = styled.div``;
const Seekbar = styled.div`
  width: 100%;
  height: 0.5rem;
  background: red;
`;
const Volume = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
      <path d="M0 0h24v24H0z" fill="none" />
    </svg>
  );
};
const PlayList = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path fill="none" d="M0 0h24v24H0V0z" />
      <path d="M4 10h12v2H4zm0-4h12v2H4zm0 8h8v2H4zm10 0v6l5-3z" />
    </svg>
  );
};
const Buttons = styled.div`
  display: flex;
  align-items: center;

  svg {
    margin-right: 1rem;
  }
`;
const CastButtonWrapper = styled.div`
  width: 24px;
  height: 24px;
`;

const Image = styled.img`
  width: auto;
  height: auto;
  max-width: 120px;
  max-height: 80px;
`;

const MediaData = styled.div`
  padding: 0 1rem 1rem 1rem;
  display: flex;
`;
const MediaInfoWrapper = styled.div`
  padding-left: 1rem;
  text-align: left;
`;
const MediaTitle = styled.div`
  padding-bottom: 0.5rem;
`;
const CastInfo = styled.div`
  font-size: 0.8rem;
`;

const MiniController = () => {
  const { deviceName } = useCast();
  const { currentTime, duration, thumbnail, title } = useCastPlayer();
  return (
    <MiniControllerWrapper>
      <Seekbar />
      <Controls>
        <Time>
          {getDisplayTime(currentTime)}/{getDisplayTime(duration)}
        </Time>
        <Buttons>
          <PlayList />
          <Volume />
          <CastButtonWrapper>
            <CastButton />
          </CastButtonWrapper>
        </Buttons>
      </Controls>
      <MediaData>
        <Image src={thumbnail} />
        <MediaInfoWrapper>
          <MediaTitle>{title}</MediaTitle>
          <CastInfo>Now Casting on {deviceName}</CastInfo>
        </MediaInfoWrapper>
      </MediaData>
    </MiniControllerWrapper>
  );
};

MiniController.propTypes = {};

export default MiniController;
