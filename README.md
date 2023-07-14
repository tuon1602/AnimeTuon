# AnimeTuon 👋

Welcome to my AnimeTuon project, :3 just watch animeeeee

## API
- This project using Consumet API (GogoAnime), you can checkout link here: https://docs.consumet.org/rest-api/Anime/gogoanime/search

## Features

- Watch anime
- Search anime
- Login using crendentials
- Login using Oauth
- Register
- Anime list

## Might update
- Comment and Likes for each animes
- Save liked animes
- Responsive
- Dark/Light mode
- Pagination or infinte scroll
- Animation

## Technologies Used

- Nextjs 13 ( App Dir )
- Shadcn with Talwindcss
- NextAuth
- Prisma
- Mongodb

## Getting Started

### Prerequisites

- You would need to have add .env file and create MongoDB cluster
- Create Github and Google Oauth application

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/tuon1602/AnimeTuon.git

2. Add .env.local
   ```bash
   NEXT_API_ANIME_API = https://api.consumet.org/anime/gogoanime
   ANIME_API = https://api.consumet.org/anime/gogoanime

   GITHUB_ID = Your ID
   GITHUB_SECRET = your Secret

   GOOGLE_ID = your ID
   GOOGLE_SECRET = your secret

   DATABASE_URL = MongoDB Url
   
3. Install dependancy
   ```bash
   npm install
4. install prisma
   ```bash
   npx prisma init
   npx prisma generate
   npx prisma db push
5. Update later ....
