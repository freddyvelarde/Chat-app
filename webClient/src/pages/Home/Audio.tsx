// 1. Using the Audio API

// 2. Using Web Audio API for more advanced features
export class AdvancedAudioPlayer {
  private context: AudioContext;
  private source?: AudioBufferSourceNode;
  private gainNode: GainNode;
  private buffer?: AudioBuffer;

  constructor() {
    this.context = new AudioContext();
    this.gainNode = this.context.createGain();
    this.gainNode.connect(this.context.destination);
  }

  async loadAudio(url: string): Promise<void> {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    this.buffer = await this.context.decodeAudioData(arrayBuffer);
  }

  play(): void {
    if (!this.buffer) return;

    // Create new source for each playback
    this.source = this.context.createBufferSource();
    this.source.buffer = this.buffer;
    this.source.connect(this.gainNode);

    this.source.start();
  }

  stop(): void {
    if (this.source) {
      this.source.stop();
    }
  }

  setVolume(volume: number): void {
    this.gainNode.gain.value = Math.max(0, Math.min(1, volume));
  }
}
