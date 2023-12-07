// making the tone sound

import * as Tone from 'tone';

class Ping {
    constructor(){
        // const autoPanner = new Tone.AutoPanner(0.5).toDestination().start();
        // const fatOsc = new Tone.FatOscillator("Cb1", "sine3", 10).connect(autoPanner).start();

        // const autoFilter = new Tone.AutoFilter({ frequency: 0.05, baseFrequency: 220, octaves: 2 }).toDestination().start();
        // const noise = new Tone.Noise({ type: "brown", volume: -20 }).connect(autoFilter).start();
        
        
        const synth = new Tone.PolySynth(Tone.Synth).toDestination();
        const now = Tone.now();
        synth.triggerAttackRelease(["D5"], '16n');
    }

    // add method for changing the note when off the intersect

}

export {Ping}