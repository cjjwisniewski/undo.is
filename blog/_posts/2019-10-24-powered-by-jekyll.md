---
layout: post
title: Powered by Jekyll!
date: 2019-10-24
description: Who knew making a website could be so easy?
image: jekyll.jpeg
---


Some time after I finished putting my homelab together (more on that in another post)
I decided that I should probably put together some kind of website while I was at it.
I wasn't necessarily hellbent on hosting it on my own hardware, but if I ever wanted 
to host any of it myself I at least now had that capacity. I went into making this site
with a few requirements in mind:


<li>The site had to be easy to maintain</li>
<li>The site had to be at least partially cloud hosted to prevent downtime</li>
<li>I wanted to be able to make the site and have to look good enough to serve as my personal portfolio</li>

I'll leave the decision on whether or not I achieved that third one to you. 

I bounced around on the cloud hosting point for a bit after experimenting with a few
options. I knew that, as I was looking toward learning more about enterprise level cloud
offerings, I probably wanted to focus in on the big three rather than use some web hosting
service. I have a self-admitted love of all things Google, and host another domain for
personal stuff on GCP, so I already had some experience there. Azure was my next stop; we
leverage Azure pretty heavily at work, and learning more about other ways to utilize it
was really appealing to me. Blob storage integration with VS Code made upkeep and
minor changes a breeze, and everything worked mostly as I expected it to. What was NOT
appealing, though, was the lack of a free/low cost tier on which I could use my own domain,
and that ultimately killed it for me at the end of the day as a solution to this particular
issue. 

I started looking into hosting on AWS, but before I got very far into that, I stumbled upon
the thing I eventually ended up using: Github pages. This gave me Github's awesome version 
control and doubled as an excuse to actually start using Github as a repo for some of my 
scripts and projects (something that I've been putting off for ages for some reason). That
will be a work in progress for some time, but as far as the personal site went I had liftoff.

That brought me to the final requirement, ease of upkeep. I wanted to get some semblance
of a blog running, I wanted a portfolio, I wanted a profile page, and I wanted to 
be able to maintain it all without having to touch every single page every time I did 
anything. Enter: <a href="https://jekyllrb.com/">Jekyll</a>. I'm not going to go into a 
tutorial on exactly how it works (there's plenty of that online already), but it was a perfect
solution for my needs. Layouts allowed me to reuse page templates time and time again,
spinning up new pages in a matter of minutes and adding blog posts as quickly as I could 
write them. Any time I would make a change that needed to happen on every page on the site, 
I'd only have to do it once in the default layout! This thing is magical, and I'd wholeheartedly
recommend it to anyone that wanted to easily build their own site without relying heavily
on Wordpress or something similar. 

Honestly, I'm not sure what the future for this project will look like, but for the time being
the combination of Jekyll & Github Pages gives me everything that I'm looking for: a simple,
static site where the only bounds are my creativity.
