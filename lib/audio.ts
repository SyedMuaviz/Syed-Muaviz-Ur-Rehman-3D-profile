/**
 * Web Audio procedural synthesizer for subtle cosmic ambience and HUD interactions.
 * Zero external audio files/404s.
 * Off by default to respect user preference and autoplay policies.
 */

class CosmicAudioManager {
  private ctx: AudioContext | null = null;
  private isMuted = true;
  private droneGain: GainNode | null = null;
  private osc1: OscillatorNode | null = null;
  private osc2: OscillatorNode | null = null;
  private filter: BiquadFilterNode | null = null;
  private isInitialized = false;

  public init() {
    if (this.isInitialized || typeof window === "undefined") return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.isInitialized = true;
    } catch {
      // Audio not supported or blocked
    }
  }

  public toggleMute(): boolean {
    this.init();
    if (!this.ctx) return true;

    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }

    this.isMuted = !this.isMuted;

    if (!this.isMuted) {
      this.startDrone();
    } else {
      this.stopDrone();
    }

    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  private startDrone() {
    if (!this.ctx || this.isMuted) return;

    try {
      const t = this.ctx.currentTime;
      this.droneGain = this.ctx.createGain();
      this.droneGain.gain.setValueAtTime(0.001, t);
      this.droneGain.gain.exponentialRampToValueAtTime(0.08, t + 2); // Soft subtle volume

      this.filter = this.ctx.createBiquadFilter();
      this.filter.type = "lowpass";
      this.filter.frequency.setValueAtTime(160, t); // Deep warm cosmic rumble

      // Two detuned sine oscillators for gentle chorus drifting
      this.osc1 = this.ctx.createOscillator();
      this.osc1.type = "sine";
      this.osc1.frequency.setValueAtTime(55, t); // A1 note

      this.osc2 = this.ctx.createOscillator();
      this.osc2.type = "sine";
      this.osc2.frequency.setValueAtTime(82.4, t); // E2 note (fifth interval)

      this.osc1.connect(this.filter);
      this.osc2.connect(this.filter);
      this.filter.connect(this.droneGain);
      this.droneGain.connect(this.ctx.destination);

      this.osc1.start();
      this.osc2.start();
    } catch {
      // Ignore audio start errors
    }
  }

  private stopDrone() {
    if (!this.ctx || !this.droneGain) return;
    try {
      const t = this.ctx.currentTime;
      this.droneGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.6);
      setTimeout(() => {
        try {
          this.osc1?.stop();
          this.osc2?.stop();
          this.osc1?.disconnect();
          this.osc2?.disconnect();
        } catch {
          // Disconnected
        }
      }, 700);
    } catch {
      // Ignore
    }
  }

  public playChirp(type: "hover" | "select" | "whoosh" = "hover") {
    if (this.isMuted || !this.ctx || this.ctx.state !== "running") return;

    try {
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      if (type === "hover") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(440, t);
        osc.frequency.exponentialRampToValueAtTime(880, t + 0.08);
        gain.gain.setValueAtTime(0.03, t);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.08);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t);
        osc.stop(t + 0.09);
      } else if (type === "select") {
        osc.type = "triangle";
        osc.frequency.setValueAtTime(523.25, t); // C5
        osc.frequency.exponentialRampToValueAtTime(1046.5, t + 0.15); // C6
        gain.gain.setValueAtTime(0.06, t);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.2);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t);
        osc.stop(t + 0.21);
      } else if (type === "whoosh") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(180, t);
        osc.frequency.exponentialRampToValueAtTime(70, t + 0.4);
        gain.gain.setValueAtTime(0.05, t);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.4);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t);
        osc.stop(t + 0.42);
      }
    } catch {
      // Audio error fallback
    }
  }
}

export const cosmicAudio = new CosmicAudioManager();
