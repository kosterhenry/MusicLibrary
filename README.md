# 🎵 Music Library - MERN Stack Application

This project is a **full MERN stack application** (MongoDB, Express, React, Node.js) with integrated **microservices** that extend functionality. The main web application serves as a **Music Library database** where users can add, update, and manage songs stored in MongoDB.  

The system is enhanced with four microservices that provide additional music-related features such as concerts, lyrics, recommendations, and artist details.

---

## 🚀 Features

### Main Application (Music Library)
- Built with **React frontend** + **Node/Express backend**.
- **REST API** to manage songs (Create, Read, Update, Delete).
- Songs stored in **MongoDB**.
- Interactive UI for adding, deleting, and editing songs in the library.

### Microservices
#### 🅰️ Microservice A: Concert Database
- Functions similar to the Music Library.
- Allows users to track and update concert information.
- Data stored in its own MongoDB collection.

#### 🅱️ Microservice B: Lyrics Service
- Flask-based microservice.
- Retrieves song lyrics for a selected track from the Music Library.
- Communicates with the frontend via API requests.

#### 🅲 Microservice C: Song Recommendation Service
- Generates recommendations based on songs currently in the Music Library.
- Provides suggested tracks to expand the user’s collection.

#### 🅳 Microservice D: Artist Information Service
- Built with **Express**, **Axios**, and **CORS**.
- Retrieves artist information and top 5 songs from **iTunes API**.
- Returns artist biography and song data to enrich the Music Library experience.

---

## 🛠️ Tech Stack

- **Frontend:** React
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **Microservices:** Flask, Express, Axios
- **APIs:** Custom REST API, iTunes API
- **Other Tools:** CORS, Git, GitHub

---

## 📂 Project Structure
