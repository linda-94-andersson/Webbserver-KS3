# Kunskapskontroll 3: Realtime-chatt

## Deployment 
-

## För att uppnå Godkänt är kraven att:

* Backenden ska byggas med hjälp av Node och Socket.io (X)
* Den ska ha en tillhörande frontend (X)
* Den ska spara meddelande och rum långsiktigt, i en databas (X)
* Den ska ha stöd för flera chatt-rum (X)
* Man ska kunna skapa och ta bort chattrum (X)
* När man tar bort ett chattrum ska även dess meddelande tas bort ()
* Chattrum som skapas ska ha unika namn (X)
* Varje meddelande ska ha info om vem som skrev det och när (X)
* Den ska innehålla en middleware som sparar loggar med relevant info i en eller enskilda filer (tidsstämpel, vem som skrev det, i vilken kanal) (X)
* Den ska validera meddelande på backenden så att en användare inte kan skicka ett tomt meddelande (X)

## För att uppnå Väl Godkänt är kraven att behöver du implementera minst 3 av följande kriterier:

* Klienten ska visa alla användare som är aktiva i chatten/rummet (X)
* När någon skriver ska det finnas någon form av indikator att någon håller på att skriva ett meddelande (ex. “... skriver just nu”) ()
* Det ska finnas stöd för att skapa ett låst rum som kräver lösenord ()
* Man ska inte kunna ta bort ett lösenordsskyddat rum utan lösenordet ()
* Det ska finnas stöd för att skicka direktmeddelande till andra användare ()
* Det ska finnas stöd för att skicka emojis i meddelanden ()
