<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>




<!-- PROJECT SHIELDS -->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <h1 align="center">MASTERS FANTASY GOLF</h1>

  <p align="center">
    This app hosts a a fantasy golf competition for the Master's Golf Tournament held every April.
    <br />
    <a href='https://github.com/azimmerman17/masters-fantasy'><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/azimmerman17/masters-fantasy">Explore App</a>
    ·
    <a href='https://docs.google.com/forms/d/1uQV9O5uHvIFPDLIiv-nTHkvaat4kdOin-ikKIneNxII/viewform?edit_requested=true'>Report Bug or Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
# About The Project

This project (MASTERS FANTASY GOLF) was buit to provide a fantasy golf game in conjunction with the Master's Golf Tournament and provide limited coverage of the Tournament. This app utilizes data from The Masters API to provide player data, statistics, and scoring.  This data assists user decisions on their Fantasy Roster and Lineup, and updates the Users' scores in real-time.  

MASTERS FANTASY GOLF does not intend to be a replacement for the coverage provided by The Master's Golf Tournament and user's are encouraged to ulitize masters.com for complete tournament coverage


<small>MASTERS FANTASY GOLF has no affiliation with the Master's Golf Tournamnet</small>

<p align="right">(<a href="#readme-top">back to top</a>)</p>



## Built With

[![Vite][Vite]][Vite-url]
[![React][React.js]][React-url]
[![React Router][React-Router]][React-Router-url]
[![Bootstrap][Bootstrap.com]][Bootstrap-url]
[![ChartJS][ChartJs.com]][ChartJS-url]
[![Express][Express.js]][Express-url]
[![PostgreSQL][PostgreSQL]][Postgres-url]
[![Sequelize][Sequelize]][Sequelize-url]
[![Vercel][Vercel]][Vercel-url]
<!-- [![Postman][Postman]][Postman-url] -->
<!-- Use Postman for the API later?  -->


<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->
# Getting Started

The branches Main and dev are designed to be kept in sync as much as possible.  The difference in the branches are:

  - Main is setup for deployment and end user usage online
  - Dev is setup for local usage and test

  When developing in dev, be mindful of you database connection, it is a good practice to have a separate database, for your test environment.

## Installation

1. Switch to the development branch
  ```sh
  git checkout dev
  ```

2. Clone the repo
  ```sh
  git clone https://github.com/azimmerman17/masters-fantasy.git
  ```
3. Install NPM packages for the backend
  ```sh
  cd express-backend
  npm install
  ```
4. configure your Backend .env file
  ```sh
  PORT='Enter the your desired port'
  DB_URI='Enter your PostgreSQL database connection string'
  DEFAULT_SALT='Enter a backup salt value for user hashing'
  ENCRYPTION_KEY='Enter your encryption key'
  ALGORITHM='Enter your encrypting algorith'
  IV_LENGTH='Enter the desired IV Length'
  JWT_SECRET='Enter you JSON-Web-Token secert'
  EMAIL_HOST='Enter your Email STMP host'
  EMAIL_PORT='Enter your desired Email port'
  EMAIL_USER='Enter your Email username'
  EMAIL_DFA='Enter your email password or Dual factor authentication code'
  FRONTEND_URL='Route to the Frontend'
  GITHUB_REPO='Location of your Repo of Github'
  SUPPORT_URL='Page where you what users to report issues - I use a google form"
   ```

5. Mirgate the DataBase Table - Utilizing Sequilize

  [Sequilize Documentation][Sequelize-url]

  ```sh
  npx sequelize-cli init
  npx sequelize-cli db:migrate
  ```


6. start your backend server when prompted to install nodemon select yes
  ```sh
  npm run dev
  ```

7. configure your frontend
  ```sh
  cd ../react-frontend
  ```

8.  in vite.config.js - configure your desired port and if you want the app to open on startup, currently this is commented out, but you can make changes if desired

9. configure your .env file - this file must be in the root of the react-frontend directory
  ```js
    VITE_BASE_URL='Backend Server URL'
  ```

10. start your frontend server
  ```sh
  npm run dev
  ```

  

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
# Usage


## Frontend User 

The navbar is divided into 3 setions:
  - Tournament Info: Leaderboard and Player information for the Masters Golf Tournament
  - Fantasy Tournament: Information and data for the fantasy game
  - User: Profile data and roster management

**User documentation still in development**

<!-- _For more examples, please refer to the [Documentation](https://example.com)_ -->

## Backend

### Tables

#### Users

Table to store a user's indentity 

| Column | Type | Allow Null | Unique | Default Value | Description |
| --- | --- | --- | --- | --- |  --- |
| user_id | Integer | False | True | N/A | Generated id number for the user |
| user_name | String | False | True | N/A | Username created by the user |
| first_name | String | True | False | N/A | User's first name |
| last_name | String | True | False | N/A | User's last name |
| email | String | False | True | N/A | User's email |
| salt | String | False | False | N/A | Generated Salt Value for Password Hashing |
| password_hash | String | False | False | N/A | User's hased password |
| role | Enum | False | False | basic | 'basic', 'vip', 'admin' - No current useage, for later development |
| guid_token | String | True | False | N/A | token to validate a reset password request |
| guid_expire | Date | True | False | N/A |  Timestamp to the guid token to xpire |
| created_at | Date | False | False | NOW() | Timestamp of record's creation |
| updated_at | Date | False | False | NOW() | Timestamp of record's last update |

### User_Data 

Table to store the user's data

| Column | Type | Allow Null | Unique | Default Value | Description |
| --- | --- | --- | --- |--- | --- |
| user_id | Integer | False | True | N/A | User id generated from the Users table |
| appearances | Integer | False | False | 0 | Number of times the user participated in the Fantasy Game |
| wins | Integer | False | False | 0 | Number of years the User won the Fantasy Game |
| best_finish | String | True | False | N/A | User best finish in any Fantasy Game |
| low_score | Integer | False | False | N/A | User's Best score in any Fantasy Game 
| created_at | Date | False | False | NOW() | Timestamp of record's creation |
| updated_at | Date | False | False | NOW() | Timestamp of record's last update |

### User_Roster

Table that stores the User's selected roster - this record is built on a user's first roster selection, each User can only have 1 record per year.  For small databases, you can delete prevouis years data

| Column | Type | Allow Null | Unique | Default Value | Description |
| --- | --- | --- | --- |--- | --- |
| id | Integer | False | True | N/A | Roster id generated upon creation |
| user_id | Integer | False | True | N/A | User id generated from the Users table |
| year | Integer | False | False | Current Year | Year that the roster is used |
| past_champ | Integer | True | False | N/A | player_id for the user's selected past champion |
| usa | Integer | True | False | N/A | player_id for the user's selected USA player |
| intl | Integer | True | False | N/A | player_id for the user's selected international player |
| wild_card1 | Integer | True | False | N/A | player_id for the user's selected first wild Card |
| wild_card2 | Integer | True | False | N/A | player_id for the user's selected second wild Card |
| wild_card3 | Integer | True | False | N/A | player_id for the user's selected third wild Card |
| created_at | Date | False | False | NOW() | Timestamp of record's creation |
| updated_at | Date | False | False | NOW() | Timestamp of record's last update |

### User_Lineups

Table that stores the User's selected lineups - these record is built when a user has all 6 roster spots filled, each User can only have 1 record per round per year.  For small databases, you can delete prevouis years data

| Column | Type | Allow Null | Unique | Default Value | Description |
| --- | --- | --- | --- |--- | ---|
| id | Integer | False | True | N/A | Lineup id generated upon creation |
| user_id | Integer | False | True | N/A | User id generated from the Users table |
| roster_id | Integer | False | False | N/A | Roster id generated from the User_Rosters table |
| year | Integer | False | False | Current Year | Year that the roster is used |
| player1 | Integer | True | False | N/A | player_id for the user's selected player |
| player2 | Integer | True | False | N/A | player_id for the user's selected player |
| player3 | Integer | True | False | N/A | player_id for the user's selected player |
| created_at | Date | False | False | NOW() | Timestamp of record's creation |
| updated_at | Date | False | False | NOW() | Timestamp of record's last update |

### Fantasy_Scoring 

Table that stores the scores for each user in the Fantasy Game - these record is built when a user has all 6 roster spots filled, each user can only have 1 record per year.  For small databases, you can delete prevouis years data

| Column | Type | Allow Null | Unique | Default Value | Description |
| --- | --- | --- | --- |--- | ---|
| id | Integer | False | True | N/A | record id generated upon creation |
| user_id | Integer | False | True | N/A | User id generated from the Users table |
| year | Integer | False | False | Current Year | Year that the roster is used |
| holes_completed | Integer | False | False | 0 | number of holes for the entire tournament a user has scores |
| round1 | Integer | True | False | 0 | user's score vs par for round 1 |
| round2 | Integer | True | False | 0 | user's score vs par for round 2 |
| round3 | Integer | True | False | 0 | user's score vs par for round 3 |
| round4 | Integer | True | False | 0 | user's score vs par for round 4 |
| round1_aggr | Integer | True | False | 0 | user's aggregate score for round 1 |
| round2_aggr | Integer | True | False | 0 | user's aggregate score for round 2 |
| round3_aggr | Integer | True | False | 0 | user's aggregate score for round 3 |
| round4_aggr | Integer | True | False | 0 | users aggregate score for round 4 |
| created_at | Date | False | False | NOW() | Timestamp of record's creation |
| updated_at | Date | False | False | NOW() | Timestamp of record's last update |

### EndPoints

API documentation to come


<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->
## Roadmap

- [ ] Use the 2024 Master's Tournament for beta testing
- [ ] Link Players in the Roster Tools back to their Profiles
- [ ] Build Administrative Pages
- [ ] Add Stats to the Lineup Components
- [ ] Rework the Fantasy Leaderboard
- [ ] Add Stats to the Fantasy Lineups
- [ ] Build endpoint(s) to close out the year
  - [ ] Functionality to update the User Data
  - [ ] Functionality to allow Admin role to remove data from past years

See the [open issues](https://github.com/azimmerman17/masters-fantasy/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


Additionally you can utilize the [Support Form][Support-url] to report any bugs or offer suggestions and feedback

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->
## Contact

Andrew Zimmerman - azimmerman@pga.com

Project Link: [https://github.com/azimmerman17/masters-fantasy](https://github.com/azimmerman17/masters-fantasy)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

<!-- * []()
* []()
* []() -->

The app utilizes data from www.masters.com, for player profiles, scoring, and stats.  The appication has no intention to deliver any additional Master's information, including, but not limited to news, highlights, live tracking, and live broadcasts.  Please utilize [www.masters.com](www.masters.com) for complete coverage.

Master's Fantasy Golf has no affiliation with the Master's Golf Tournament.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
<!-- BADGES -->
[contributors-shield]: https://img.shields.io/github/contributors/azimmerman17/masters-fantasy.svg?style=for-the-badge
[contributors-url]: https://github.com/azimmerman17/masters-fantasy/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/azimmerman17/masters-fantasy.svg?style=for-the-badge
[forks-url]: https://github.com/azimmerman17/masters-fantasy/network/members
[stars-shield]: https://img.shields.io/github/stars/azimmerman17/masters-fantasy.svg?style=for-the-badge
[stars-url]: https://github.com/azimmerman17/masters-fantasy/stargazers
[issues-shield]: https://img.shields.io/github/issues/azimmerman17/masters-fantasy.svg?style=for-the-badge
[issues-url]: https://github.com/azimmerman17/masters-fantasy/issues
[license-shield]: https://img.shields.io/github/license/azimmerman17/masters-fantasy.svg?style=for-the-badge
[license-url]: https://github.com/azimmerman17/masters-fantasy/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/azimmerman17

<!-- PACKAGES -->
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[ChartJs.com]: https://img.shields.io/badge/chart.js-F5788D.svg?style=for-the-badge&logo=chart.js&logoColor=white
[ChartJS-url]: https://www.chartjs.org/
[Express.js]: https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB
[Express-url]: https://expressjs.com/
[React-Router]: https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white
[React-Router-url]: https://reactrouter.com/en/main
[Vite]: https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white
[Vite-url]: https://vitejs.dev/
[PostgreSQL]: https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white
[Postgres-url]: https://www.postgresql.org/
[Vercel]: https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white
[Vercel-url]: https://vercel.com/
[Sequelize]: https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white
[Sequelize-url]: https://sequelize.org/
[Postman]:https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white
[Postman-url]: https://www.postman.com/
[Support-url]: https://docs.google.com/forms/d/e/1FAIpQLSd2kXklBMo1EF6e2o9oqSZwB2QXminWNEQEXmvvfZsvxMKKnQ/viewform