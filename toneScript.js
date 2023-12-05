// TONE
import * as Tone from 'tone';
console.log('Tone:', Tone);

const synth = new Tone.Synth().toDestination();
const now = Tone.now()
// trigger the attack immediately
synth.triggerAttack("C4", now)
// wait one second before triggering the release
synth.triggerRelease(now + 1)

//attach a click listener to a play button
document.querySelector('button')?.addEventListener('click', async () => {
	await Tone.start()
	console.log('audio is ready')
})