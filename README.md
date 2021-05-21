# Magikarp

Magikarp, a very useless & very bad project named after a very useless & very bad Pokemon.

## Installation & Setup

**Prerequisites:**

- Node 15+
- npm
- PostgreSQL

**Setup:**

1. Ensure you have all above prerequisites installed
2. Clone the repository from this GitHub repository
3. Install all npm packages with `npm install`
4. Configure PostgreSQL within the `.env` file
   - Database name **must** be included within the URI
5. Run `prisma migrate dev --name init`
6. Run `npm run dev` to start the development server
7. View the page at `localhost:3000`

## Technologies Used

| Name                                                       | Usage                          | Notes                                                                   |
| ---------------------------------------------------------- | ------------------------------ | ----------------------------------------------------------------------- |
| [Typescript](https://www.typescriptlang.org/)              | Programming Language           |                                                                         |
| [React](https://reactjs.org/)                              | Frontend UI                    |                                                                         |
| [Next.js](https://nextjs.org/)                             | Server Side Rendering/Routing  |                                                                         |
| [NextAuth.js](https://next-auth.js.org/)                   | Authentication for Next.js     | Extremely overkill — bundled with 45 auth providers, we only use Google |
| [PostgreSQL](https://www.postgresql.org/)                  | Database                       | Prisma also supports MySQL & SQLite — We enforce PostgreSQL             |
| [Prisma](https://www.prisma.io/)                           | Object Relational Mapping      |                                                                         |
| [zustand](https://zustand.surge.sh/)                       | State Management               |                                                                         |
| [Sass](https://sass-lang.com/)                             | Stylesheets                    |                                                                         |
| [Tailwind CSS](https://tailwindcss.com/)                   | CSS Utility Classes            |                                                                         |
| [Day.js](https://day.js.org/)                              | Date/Time JS Utilities         |                                                                         |
| [joi](https://joi.dev/)                                    | Schema Validation              |                                                                         |
| [Prettier](https://prettier.io/)                           | Code Formatter                 |                                                                         |
| [ESLint](https://eslint.org/)                              | Static Code Analysis           |                                                                         |
| [Autoprefixer](https://www.npmjs.com/package/autoprefixer) | Applies vendor prefixes to CSS |                                                                         |
