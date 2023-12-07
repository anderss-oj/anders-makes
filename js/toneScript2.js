// TONE
import * as Tone from 'tone';

const playButton = document.getElementsByClassName('play');

const synth = new Tone.PolySynth(Tone.Synth).toDestination();
const now = Tone.now()
// synth.triggerAttack("D4", now);
// synth.triggerAttack("F4", now + 0.5);
// synth.triggerAttack("A4", now + 1);
// synth.triggerAttack("C5", now + 1.5);
// synth.triggerAttack("E5", now + 2);
// synth.triggerRelease(["D4", "F4", "A4", "C5", "E5"], now + 4);

// maybe i can make chords out of this

//attach a click listener to a play button
document.querySelector('button')?.addEventListener('click', async () => {
	if (Tone.context.state != 'running') {
        Tone.start();
    }
    else {
        synth.triggerRelease(["D3", "F3", "A3", "C3", "E3"], now);
    }
    
    // synth.triggerAttack("D4", now);
    // synth.triggerAttack("F4", now);
    // synth.triggerAttack("A4", now);
    // synth.triggerAttack("C5", now);
    // synth.triggerAttack("E5", now);
    // synth.triggerAttackRelease(["D4", "F4", "A4", "C5", "E5"], now + '8n');
    synth.triggerAttackRelease(["D3", "F3", "A3", "C3", "E3", 'G3#'], now + '8n');

	console.log('audio is ready')
})