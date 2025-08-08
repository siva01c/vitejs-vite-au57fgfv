# 🎬 Technical Task: Music & Movie Search with Favourites

**Design Prototype:**  
[Figma Design Prototype](https://www.figma.com/design/OpFVylusHlT3JJk6V1gQWg/SPA-media-platform?node-id=0-1&t=uJUwxqByAICoDhnG-1)

## 📝 Description

Create an application that allows users to search for music and movies, and to add or remove items from a favourites list.

The app consists of **three pages**:

---

## 📄 "My Favourite Stuff" Page

This page should include:

- A **title**
- An **input field** for filtering existing favourited items
- A **list of favourite items**, each with a button to **remove** them from the list
- All information (input value and list of favourites) must persist even if the user leaves and returns to this page

---

## 🎵 "Music Search" Page

This page should include:

- A **title**
- An **input field** for searching music using the MusicBrainz API
  - API documentation: [API](https://musicbrainz.org/doc/MusicBrainz_API/Search)
    - NOTE: endpoint are subject to **rate limits**
    - ASSUMPTION: `artist_credit` is always a **single entry in an array**
  - Use a limit of 20
  - Example query: [https://musicbrainz.org/ws/2/recording?fmt=json&limit=20&query=unforgiven](https://musicbrainz.org/ws/2/recording?fmt=json&limit=20&query=unforgiven)
- A **list of music results**, displayed as:  
  `"[ARTIST] - [SONG_NAME]"`
- Each item should have the option to **add or remove** it from favourites

---

## 🎥 "Movies Search" Page

This page should include:

- A **title**
- An **input field** for searching movies using the Episodate API
  - API documentation: [API](https://www.episodate.com/api)
    - NOTE: endpoint are subject to **rate limits**
  - Example query: [https://www.episodate.com/api/search?q=house](https://www.episodate.com/api/search?q=house)
- A **list of movie results**, displayed as:  
  `"[MOVIE_NAME]"`
- Each item should have the option to **add or remove** it from favourites

---

## 🧠 Assumptions

- Search and filter functionality must work **without any button press**
- You may use **any state management** solution:
  - React hooks
  - Context API
  - External state managers (e.g., Redux, Zustand)
- If you use **external dependencies**, simply **reload the page** after adding them to the `package.json` file. They will be installed automatically — no need to run the terminal install command manually

---
