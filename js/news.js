let messages = [`It was a normal spring day in The Loud House. Everyone got along! `, 'When I was your age, 100 was considered a big number, well now its ' + format('e1.5e18') + ', Kids these days...', "Did you just disrespect Skibidi Toilet?  Well yes, but you dont understand... Why, why would you do this? He just has L Rizz, He's a sigma, you don't think he's a sigma. Mike- You stopped watching YouTube Shorts, and now you have L Rizz, you aren't even a sigma! I'm an even bigger sigma. Skibidi Toilet is the alpha, he is more sigma than anyone. I'm bigger than me. Cap, skibidi toilet MOGS you. No he dosen't, Aiden Ross and Kai Cenat both ratioed him- Never rizz me ever again.", " new Date().toUTCString();", "You are now manually breathing", "whats 9 + 10?  " + format('ee21.69') + " No it isnt, its " + format("e6.9e694.20")
, "Who did the Minions work for from 1933 to 1945?", "Uhm guys, is this Freddy fazbear? Har har har har har-",  'do you like v0.2?                    Classic or Rewritten?', "Take on me", "That's no moon!", "Nolan's Button Simulator 2025, now with extra microtransactions, and new skins for the buttons! Brought to you by EA", `BREAKING NEWS: Raccoons are on the loose on this site called "YouTube", so watch out!`, "It's the labor day sale!", `The National Weather Service in the Quad Cities has issued a

* Tornado Warning for...

Southwestern Delaware County in northeastern Iowa...

Northern Linn County in east central Iowa...

* Until 945 PM CDT.

* At 855 PM CDT, a severe thunderstorm capable of producing a tornado was located over Paris, or 17 miles north of Cedar Rapids, moving northeast at 30 mph. A second possible tornado was located just north of Center Point moving northeast at 30 mph.

HAZARD...Tornado.

SOURCE...Radar indicated rotation.

IMPACT...Flying debris will be dangerous to those caught without shelter. Mobile homes will be damaged or destroyed. Damage to roofs, windows, and vehicles will occur. Tree damage is likely.

* This dangerous storm will be near...

Central City around 900 PM CDT.

Waubeek around 905 PM CDT.

Coggon around 910 PM CDT.

Prairieburg around 915 PM CDT.

PRECAUTIONARY/PREPAREDNESS ACTIONS...

TAKE COVER NOW! Move to a basement or an interior room on the lowest floor of a sturdy building. Avoid windows. If you are outdoors, in a mobile home, or in a vehicle, move to the closest substantial shelter and protect yourself from flying debris.

This storm has a history of producing tornadoes. For your safety, seek shelter now!

Tornadoes are extremely difficult to see and confirm at night. Do not wait to see or hear the tornado. TAKE COVER NOW!

To report severe weather contact your nearest law enforcement agency. They will send your report to the National Weather Service office in the Quad Cities.

Torrential rainfall is occurring with this storm, and may lead to flash flooding. Do not drive your vehicle through flooded roadways.`];

setInterval(function() {
    messages[1] = 'When I was your age, 100 was considered a big number, well now its ' + format('e1.5e18') + ', Kids these days...';
    messages[3] =  new Date().toUTCString();
}, 50)


let currentIndex = 5;

function updateTicker() {
    const ticker = document.getElementById('ticker');
    const message = messages[currentIndex];
    ticker.textContent = message;

    // Calculate duration based on message length (adjust multiplier for speed)
    let duration = message.length * 0.075;
    if (duration < 5) {
      duration = 5;
    }// 0.15 seconds per character

    // Set the animation duration
    ticker.style.animationDuration = `${duration}s`;

    // Reset the animation
    ticker.style.animation = 'none';
    ticker.offsetHeight; // Trigger reflow
    ticker.style.animation = `ticker ${duration}s linear`;

    // Move to next message
    currentIndex = Math.floor(Math.random() * messages.length);

    // Schedule next update
    setTimeout(updateTicker, duration * 1000);
}

updateTicker(); // Initial update
