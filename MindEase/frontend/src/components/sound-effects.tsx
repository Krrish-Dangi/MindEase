// Simple sound effects for mental health app
export class SoundEffects {
  private static audioContext: AudioContext | null = null;
  
  private static getAudioContext() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return this.audioContext;
  }

  // Gentle bell chime for UI interactions
  static playClick() {
    try {
      const audioContext = this.getAudioContext();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      // Soft bell-like frequency
      oscillator.frequency.setValueAtTime(1047, audioContext.currentTime); // C6
      oscillator.frequency.exponentialRampToValueAtTime(523, audioContext.currentTime + 0.15); // C5
      
      // Very gentle volume
      gainNode.gain.setValueAtTime(0.03, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.2);
      
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.2);
    } catch (error) {
      // Silently fail if audio is not supported
    }
  }

  // Soft notification chime
  static playNotification() {
    try {
      const audioContext = this.getAudioContext();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      // Gentle two-tone chime
      oscillator.frequency.setValueAtTime(659, audioContext.currentTime); // E5
      oscillator.frequency.setValueAtTime(523, audioContext.currentTime + 0.15); // C5
      
      gainNode.gain.setValueAtTime(0.04, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.3);
      
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.3);
    } catch (error) {
      // Silently fail if audio is not supported
    }
  }

  // Gentle success chime
  static playSuccess() {
    try {
      const audioContext = this.getAudioContext();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      // Soft ascending chime
      oscillator.frequency.setValueAtTime(523, audioContext.currentTime); // C5
      oscillator.frequency.setValueAtTime(659, audioContext.currentTime + 0.08); // E5
      oscillator.frequency.setValueAtTime(784, audioContext.currentTime + 0.16); // G5
      
      gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.4);
      
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.4);
    } catch (error) {
      // Silently fail if audio is not supported
    }
  }

  // Breathing/meditation sound
  static playBreathing() {
    try {
      const audioContext = this.getAudioContext();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(220, audioContext.currentTime); // A3
      
      // Breathing pattern: in for 4 seconds, out for 4 seconds
      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.05, audioContext.currentTime + 4);
      gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 8);
      
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 8);
    } catch (error) {
      // Silently fail if audio is not supported
    }
  }
}