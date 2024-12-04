"use client";

import Bg from "./Bg";
import Control from "./Control";
import Cover from "./Cover";
import Detail from "./Detail";
import Progress from "./Progress";
import RightStage from "./RightStage";
import StyledContainer from "./StyledContainer";
import StyledStage from "./StyledStage";
import Time from "./Time";
import Volumn from "./Volumn";

interface AudioPlayerProps {
  isHidden: boolean;
}

const AudioPlayer: React.FC<
  AudioPlayerProps
> = ({ isHidden }) => {
  return (
    <div
      className="relative flex items-center justify-center w-full h-[100vh] overflow-hidden min-w-[1000px] flex-col flex-shrink-0  md:flex-row transition-all"
      style={{
        cursor: isHidden
          ? "none"
          : "auto",
      }}
    >
      <Bg />
      {/* LeftStage */}
      <StyledStage className="min-w-[45%] h-[100vh] justify-center flex-shrink-0">
        <Cover />
        <StyledContainer>
          <Detail />
        </StyledContainer>
        <StyledContainer>
          <Volumn />
        </StyledContainer>
        <StyledContainer>
          <Control />
        </StyledContainer>
        <StyledContainer>
          <Progress />
        </StyledContainer>

        <Time />
      </StyledStage>
      <RightStage />
    </div>
  );
};

export default AudioPlayer;
