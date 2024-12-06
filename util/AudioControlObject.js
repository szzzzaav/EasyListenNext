let WIDTH = 450;

export class AudioControlObject {
  AudioContext;
  AudioSource;
  AudioBuffer;
  AudioAnalyser;
  AudioGainNode;
  AudioFreqData;
  BufferData;

  startTimeStamp;
  pauseTimeStamp;
  totalpause;
  started;
  state;
  songLength;
  end;

  requestAnimate;
  volumnSet = 0.7;

  eventListener;
  event;

  progressRef;
  progressBgRef;
  timeProgressRef;
  visualStageRef;
  visualStageEls;

  showlryonlrcstage;
  playMode = "loop"; // 'loop' | 'next'

  lyricStageRef;

  constructor(
    ArrayBuffer,
    {
      visualStageRef,
      progressRef,
      progressBgRef,
      volumnRef,
      timeProgressRef,
      lyricStageRef,
    }
  ) {
    this.AudioBuffer = ArrayBuffer;
    this.started = false;
    this.lyricStageRef = lyricStageRef;
    return (async () => {
      await this.init({
        visualStageRef,
        progressRef,
        progressBgRef,
        volumnRef,
        timeProgressRef,
      });
      return this;
    })();
  }

  async init({
    progressRef = null,
    progressBgRef = null,
    timeProgressRef = null,
    visualStageRef = null,
  }) {
    this.setTime();
    if (!this.AudioContext) {
      this.AudioContext =
        new window.AudioContext();
      this.AudioContext.suspend();
    }
    if (!this.BufferData) {
      try {
        this.BufferData =
          await this.AudioContext.decodeAudioData(
            this.AudioBuffer
          );
      } catch (error) {
        alert(error);
      }
    }
    this.songLength =
      this.BufferData.duration;
    this.AudioSource =
      this.AudioContext.createBufferSource();
    this.AudioAnalyser =
      this.AudioContext.createAnalyser();
    this.AudioGainNode =
      this.AudioContext.createGain();

    this.AudioSource.buffer =
      this.BufferData;
    this.AudioSource.connect(
      this.AudioGainNode
    );
    this.AudioSource.connect(
      this.AudioAnalyser
    );

    this.AudioGainNode.connect(
      this.AudioContext.destination
    );

    this.AudioFreqData = [];
    this.AudioSource.loop = true;
    this.started = false;

    if (!this.progressRef) {
      this.progressRef = progressRef;
      this.progressBgRef =
        progressBgRef;
      this.timeProgressRef =
        timeProgressRef;
      this.visualStageRef =
        visualStageRef;
      this.visualStageEls =
        visualStageRef?.current?.childNodes;
    }

    this.setEvent({ e: this.event });

    return this.AudioSource;
  }

  register({ showlryonlrcstage }) {
    this.showlryonlrcstage =
      showlryonlrcstage;
  }

  setTime() {
    this.startTimeStamp = 0;
    this.pauseTimeStamp = 0;
    this.totalpause = 0;
  }

  reset() {
    this.started = false;
    this.AudioSource.disconnect(
      this.AudioGainNode
    );
    this.AudioGainNode.disconnect(
      this.AudioContext.destination
    );
    this.AudioSource.disconnect(
      this.AudioAnalyser
    );
    this.init({});
  }

  resetEls() {
    this.progressRef.current.value = 0;
    this.progressBgRef.current.value = 0;
    this.timeProgressRef.current.textContent =
      "00:00";
    this.visualStageEls.forEach((e) => {
      e.style.height = "0px";
    });
    this.setTime();
  }

  stop() {
    if (
      this.AudioContext.state !==
        "closed" &&
      this.started
    ) {
      this.AudioSource.stop();
    }
    window.cancelAnimationFrame(
      this.requestAnimate
    );
    this.reset();
  }

  pause() {
    if (this.state === "pause") return;
    this.state = "pause";
    this.pauseTimeStamp =
      this.AudioContext.currentTime;
    window.cancelAnimationFrame(
      this.requestAnimate
    );
    this.AudioContext.suspend();
  }

  getprocesstime() {
    let time =
      this.state === "play"
        ? this.AudioContext
            .currentTime -
          this.startTimeStamp -
          this.totalpause
        : this.pauseTimeStamp -
          this.totalpause -
          this.startTimeStamp;
    return time % this.songLength;
  }

  volumn(deg) {
    if (deg >= 0 && deg <= 1) {
      this.volumnSet = deg;
      try {
        this.AudioGainNode.gain.value =
          deg;
      } catch (err) {
        alert(err);
      }
    }
  }

  songtimeFormat(time) {
    let second = Math.floor(time % 60);
    let min = Math.floor(time / 60);
    second = `${second}`.padStart(
      2,
      "0"
    );
    min = `${min}`.padStart(2, "0");
    return `${min}:${second}`;
  }

  getduration() {
    return this.songLength;
  }

  getFormatDuration() {
    return this.songtimeFormat(
      this.getduration()
    );
  }

  continueplay() {
    this.state = "play";
    this.totalpause +=
      this.AudioContext.currentTime -
      this.pauseTimeStamp;
    this.AudioContext.resume();
    this.draw();
  }

  async jump(time, flag) {
    this.AudioContext.resume();
    if (this.lyricStageRef?.current) {
      this.lyricStageRef.current.style.transform =
        "translateY(0px)";
    }
    if (!flag) {
      this.AudioSource.start(0, time);
      this.startTimeStamp =
        this.AudioContext.currentTime -
        time;
      this.draw = this.draw.bind(this);
      this.draw();
      this.state = "play";
    } else {
      this.AudioSource.stop();
      window.cancelAnimationFrame(
        this.requestAnimate
      );
      this.reset();
      this.volumn(this.volumnSet);
      this.AudioSource.start(0, time);
      this.AudioContext.resume();
      this.draw = this.draw.bind(this);
      this.draw();
      this.totalpause =
        this.AudioContext.currentTime -
        time -
        this.startTimeStamp;
    }
    this.started = true;
  }

  draw() {
    this.requestAnimate =
      requestAnimationFrame(this.draw);
    this.AudioFreqData = new Uint8Array(
      this.AudioAnalyser.frequencyBinCount
    );
    this.AudioAnalyser.getByteFrequencyData(
      this.AudioFreqData
    );
    let time = this.getprocesstime();
    let timestr =
      this.songtimeFormat(time);
    const T =
      Math.floor(
        this.AudioFreqData.length /
          this.visualStageEls.length
      ) - 8;
    for (
      let i = 0;
      i < this.visualStageEls.length;
      i++
    ) {
      let h = 0;
      for (let j = 1; j <= T; j++) {
        h += Number(
          this.AudioFreqData[i * T + j]
        );
      }
      h /= T;
      this.visualStageEls[
        i
      ].style.height = `${h / 9}px`;
    }
    if (time >= this.songLength - 0.1) {
      this.end = true;
      this.handlePlayEnd();
      return;
    }
    const curl =
      (100 * Number(time)) /
      this.songLength;
    this.showlryonlrcstage?.(
      time,
      "active",
      time > 1
    );
    this.timeProgressRef.current.textContent =
      timestr;
    this.progressRef.current.value =
      curl;
    this.progressBgRef.current.style.width = `${curl}%`;
  }

  handlePlayEnd() {
    window.cancelAnimationFrame(
      this.requestAnimate
    );
    this.AudioSource.stop();
    if (this.lyricStageRef?.current) {
      this.lyricStageRef.current.style.transform =
        "translateY(0px)";
    }
    if (this.playMode === "loop") {
      this.reset();
      this.volumn(this.volumnSet);
      this.jump(0, false);
    } else {
      if (this.event) {
        this.event();
      }
    }
    this.end = false;
  }

  setEvent({ e = null }) {
    this.event = e;
    this.playMode = e ? "next" : "loop";

    this.AudioSource.removeEventListener(
      "ended",
      this.eventListener
    );
    this.eventListener = () => {
      if (!this.end) return;
      this.handlePlayEnd();
    };
    this.AudioSource.addEventListener(
      "ended",
      this.eventListener
    );
  }
}
