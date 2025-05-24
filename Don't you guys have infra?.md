
Internet is famously a series of tubes. This is of course, depending on the level at which we’re looking either true or false. The Real of the internet as viewed from the perspective of end user device is byzantinely complicated series of changes of voltage on the RJ-45 plug, or more probably equally convoluted series of changes in the radio frequency. There is slim minority of people that are aware of all the intermediate layers, abstractions and technologies that make it possible for computers nowadays to capture those physical phenomena and make a cute cat picture appear on your new ipad. It’s pretty safe bet that there is not a single person on earth today able to ex nihilo produce a device capable of connecting to the internet, yet it all works somehow.

Internet infrastructure today is produced by and for tech giants and it reflects both the technical and economic realities of the medium.

When I want to share abovementioned cute cat video, I can sent it to you, but more probably I’ll share a URL to a site that hosts it. This URL is lingua franca of /the Internet/ today - many massaging apps will seamlessly insert the preview right into the app. 

# Links vs signifiers
Interacting with the internet from the user perspective (if everything goes right) can be divided into three conceptual parts.
There’s the how. Predominantly, that’s your browser, though other programs can also fullful that role. Notably nowadays there’s push towards apps, so that the spying and mindwashing is more effective and easier to measure. 
There’s the what. This is what you want. Sweet sweet content. Your cat videos, your brother in-law post about imigration, your ~~pirated~~ backups of ebooks, the timesheet on a shared drive, a news article, TODO:ETC. Everything else is just a means of getting to that data, because tech isn’t just there yet to neuralink us up right into the fiber.
Finally, there are hyperlinks. The same hyper that make it hypertext. That’s the hypertext from http:// as well as HTML, for those keeping the score at home. That’s one of those obvious in hindsight innovations, that make internet as we know it today. 
Links, by their definition, need to point at something and by the nature of technology, it needs to be defined pretty specifically. I may want to at some point in this article link to Darien’s idea of Library of Alexadria but I cannot, as not something that my browser can access. At best I could link to part of Dave’s seminar when he mentions it, because I know that it resides on a youtube server at particular id. 
Here we’re starting to get at the root of some of the problems (I particularly) have with links. At best, they link to places, which happen to coincide with particular content. Every website you’ve ever visited is a semi stable mirage conjured by a mixture of convention and programmers trying to do the right thing.
What gives? Let’s investigate the link above and by link I’m metonimically sliding into talking about URLs. Given
https://youtube.com/watch?v=W1qEhkr9k8c&t=666
there are two relevant segments. youtube.com makes it so that my computer connects with youtube server(s - one of many, but shush) and then we give the entire thing to it and hope for the best. It’s true that 99.999% we’ll get what we expected, but that’s just a convention.

Most kind of links we use today though, describe how to get the stuff its pointing to, not what it is.
Had I bookmarked my favourite post from the old TU forum, I’d have fuck all in 10 years as orgs change and disappear, site layout gets redesigned, natural and technical disasters happen.

This design is purely a technical artifact of how the Internet operates today. Operating abstraction is a bunch of computers talking to each other, exposing random services.

# Content Addressable Data

Above XXX  would have been absolutely asinine in context of most other media. Imagine saying “my favourite Plato quote is in {funny description}“. How can we communicate that with a computer though? If I say “it’s like the thing from plato with the two horses and a rider” and I have a chance that a human, say Benjamin, will be able to help me out with getting to my point, but it’s probably still bit too imprecise for a computer. How can we make it that hyperlinks point to straight to content, location be damned?

Enter Content Addressible Data. It’s already available, if rarely used, since it requires a bit different way of approaching data than what medium does usually. CID is one of the specifications already available. Simplified, it takes the data, and computes a cryptographic hash of it, optionally attaches some metadata about encoding and viola, you have a string which reliably points references that piece of data. 
Hash function is a one way function, which given arbitrary length data returns a fixed length string of bytes. For our purposes, what’s useful is that it has vanishingly small chance to produce same result for different data.

What can you do with it? If you used library genesis you might have already have as it’s very good at pulling relatively small pieces of specific data from wherever it may came from. How can we know we’re getting what we wanted? Check the data you got by re-generating the CID and if it matches, congrats. You can be sure you got the ebook you wanted.

# Technical implications

# Technical issues

Contrast this with content addressable data. One of the already existing standards is CID. This means that the same quote always has the same e-signifier, regardless where it’s located.

---
Today’s internet is designed for disposable information.

Semi stable mirage we call a website vs data set in stone.
