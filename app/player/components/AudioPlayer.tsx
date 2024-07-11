import Bg from "./Bg";
import Control from "./Control";
import Cover from "./Cover";
import Detail from "./Detail";
import Lyric from "./Lyric";
import Progress from "./Progress";
import StyledContainer from "./StyledContainer";
import StyledStage from "./StyledStage";
import Time from "./Time";
import Volumn from "./Volumn";

const AudioPlayer = () => {
  return (
    <div className="relative flex items-center justify-center w-full h-[100vh] overflow-hidden min-w-[1000px] flex-col flex-shrink-0  md:flex-row">
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
      {/* RightStage */}
      <StyledStage className="min-w-[55%]  h-full absolute z-50 bg-[#00000020] backdrop-blur-[10px] md:h-[80%] md:relative  md:bg-transparent  md:backdrop-blur-[0px]">
        <Lyric />
      </StyledStage>
    </div>
  );
};

export default AudioPlayer;
