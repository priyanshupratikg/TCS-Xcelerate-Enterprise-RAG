# TCS Xcelerate Enterprise RAG

## Overview

The Enterprise RAG (Retrieval-Augmented Generation) project is an AI-powered chatbot that enables users to retrieve information from uploaded institutional documents using Large Language Models (LLMs).

This repository contains both the backend and frontend of the application.

---

## Frontend Overview

The frontend is developed using **React** and **Vite**. It provides an intuitive user interface where users can upload documents, interact with the chatbot, and receive AI-generated responses.

---

## Features

- Modern React-based UI
- Responsive design
- Chat interface
- Document upload
- API integration with backend
- Component-based architecture
- Fast development using Vite

---

## Technologies Used

- React
- Vite
- JavaScript (ES6+)
- CSS
- REST API

---

## Project Structure

frontend/
```
src/
├── assets/
├── components/
│ ├── ChatBubble.jsx
│ ├── FileUploader.jsx
│ ├── Footer.jsx
│ └── Sidebar.jsx
├── pages/
│ ├── ChatPage.jsx
│ └── UploadPage.jsx
├── services/
│ └── api.js
├── App.jsx
├── main.jsx
└── index.css

public/
package.json
vite.config.js
