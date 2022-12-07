# Alphonses-dogparkfinder

Hi and thank you for taking the time to look at this repo! You ought to know
that this repo was created in the context of the Concordia Web Dev bootcamp and
that before this bootcamp, I had absolutely 0 experience in coding.

That being said, the next few lines will elaborate on what the project.

Now, if you're a fellow developper just wandering about, feel free to send me
some notes on my code and maybe some "best practices" that I could apply in it.
I think the most important sections of this read me will be the functionality
one and technical problems encountered.

If you're a recruiter scouting this page to see if my code is worthy of the
company you're representing, I hope you enjoy! Also, feel free to let me know
what you'd like to find in a read me, feed back is my most powerful tool right
now.

In any case, enjoy.

**Important note here: This readMe is a WIP, don't jugde too harshly.**

## The project context

This project was realised as a final project for the concordia WebDev Bootcamp.
I had a total of 12 days to complete this. Prior to those 12 days, I had to
brainstorm about the project: the suject, the functionalities and which APIs I
was going to use

## First time for:

For this project I decided to use 3 API for the first time: Google Map API,
Auth0 and Cloudinary.

Google Map is used to render a map for each park as well as a route to get to
the park using the users address as origin point.

Auth0, obviously, is use to have a secure and fast log in.

Cloudinary is used to store the pictures used accross the website as well as a
widget for the user to upload pictures of his dog and of a park if he wishes so.

## the functionalities

When you get on the app, you can only see the about page and the landing page.
You can then log in or signUp to access the whole thing. Once you've sign up I
recommend that you complete you profile by clicking on the user icon.

Once that's done, you can browse the parks, select the parks you see using the
filters and propose a park on your own. The proposed parks are sent to the data
base for an admin to review. You can also leave, modify and delete comments
(that are yours). If you favorite a park, all the dogs in your profile will be
added to the park as data. The park's data will then change accordingly because
the average height, weight and ratio of neutered dogs are calculated from the
dogs in the park! Same thing for the most popular breed.

In the park details page, you can click on "Get there" to open a map and confirm
to make your way there, on foot.

In the user page, you can add a dog. You can't remove one yet, the back end for
this is done but the wording is missing and its a tacky subjet isn't?

## A few mistakes

I spent 2 long days trying to figure out why my server was crashing and had to
resort to use SetTimeout at a few places (in the backend as well as in the
frontend) to stop the server from crashing.

I believe it comes from the fact that I'm not creating a new client for every
mongo request that I make, but instead I have a client form every CRUD. I will
test it out later.

## Difficulties

As mentionned ealier, having the server not crash with the number of request
made to the server was hard and to this day is still a problem since right now
the website is purposely slow in order to make sure that it is stable!
