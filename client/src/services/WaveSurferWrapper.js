import WaveSurfer from "wavesurfer.js";

class WaveSurferWrapper {
  constructor(setCurrentPlaying) {
    this.setCurrentPlaying = setCurrentPlaying;
  }

  createPlayer = (music, index) => {
    this.wavesurfer = WaveSurfer.create({
      container: `#wavesurfer-container--${index}`,
      waveColor: "gray",
      progressColor: "black",
      barHeight: "1",
      height: "35"
    });

    this.wavesurfer.load(music);

    this.wavesurfer.on("ready", () => {
      this.wavesurfer.play();
    });

    this.wavesurfer.on("finish", () => {
      this.setCurrentPlaying(undefined);
    });
  };

  musicPlayer = (music, index) => {
    if (index !== this.index) {
      if (this.wavesurfer !== undefined) this.wavesurfer.destroy();
      this.createPlayer(music, index);
    } else {
      this.wavesurfer.playPause();
    }
    this.index = index;
  };

  isPlaying = index => {
    if (index !== this.index) return true;
    return !this.wavesurfer.isPlaying();
  };
}

export default WaveSurferWrapper;
