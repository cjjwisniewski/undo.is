---
layout: post
title: Automating your resume
date: 2020-02-11
description: Wherein we try to make updating a resume just a bit easier
image: spongebob_resume.png
---

In the past few weeks I've been faced once again with an issue that had always annoyed me a bit - updating a
resume. My significant other has been on the hunt for new employment, and as we look to make sure it's tailored
to each posting, we are finding that our preferred format gets knocked all out of order every time a line is 
changed. Usually that would be simple enough to fix, but hey, when you have the time and desire to overengineer
something, <i>why not</i>? 

I'd recently had an article pop up in my Google News feed about using CSS grid formatting to organize your resume
content, and had a thought from there that I could combine that with the recently-discovered (well, to me anyway) 
magic of Jekyll to make my dreams come true. No longer would I have to adjust font sizes in whitespace to make 
things line up properly! No longer would I need to curse every time I opened up the document in Google Drive, accidentally
destroying the formatting!

Still somewhat new to this, the exact formatting of some of the Liquid used in the Jekyll template took a bit of trial 
and error to work out, but in the end I was able to replicate - column for column, block for block - the format that I'd
always used in Word. This time, though, it was all done in CSS and HTML. An update to the resume was as simple as an update 
to a text file, and I'd never have to worry about wrecking the formatting ever again. Best of all? It even looks okay in a 
mobile view! 

<div style = "width: 100%; margin-left: auto; margin-right: auto;">
<img src = "https://i.imgur.com/agjE99e.png" style = "max-width: 500px;"/>
</div>

You can check out the source code <a href="https://github.com/cjjwisniewski/html_resume">here</a>, or see it in action on my <a href="https://naiad.io/portfolio/html_resume">Portfolio</a>.