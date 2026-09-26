# FitLog — Train With Intent
**FitLog** is a dark, no-nonsense gym companion app built to help you track your lifts efficiently. Browse a library of exercises covering every major muscle group, pick a lift, lock it into today's plan, and watch the week's work add up.

##  Technologies Used

- **Framework:** [Next.js (App Router)](https://nextjs.org/)
- **Language:** TypeScript
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **State Management:** React Context API + LocalStorage
- **Icons:** [Lucide React](https://lucide.dev/)
- **Notifications:** [React Hot Toast](https://react-hot-toast.com/)
- **Data Fetching:** Fetch API (Custom Fitlog API)

##  Key Features

1. ** Comprehensive Workout Library:** Browse a responsive grid of exercises complete with dynamic metadata (duration, calories burned, and user rating) fetched directly from an external API.
2. ** Custom Daily Plan:** Add up to 5 specific exercises to "Today's Plan", complete with live metric calculations for total workout duration and calories.
3. ** Save For Later & Persistence:** Bookmark exercises for future sessions. All saved workouts and daily plans are synced to `localStorage`, so your data survives page reloads.
4. ** Dynamic Sorting & Management:** Effortlessly sort your planned or saved lists by Duration, Calories, or Rating. Mark workouts as done or remove them from your list with one click.
5. ** Interactive Notifications:** Receive instant feedback through sleek, custom-styled toast notifications when you add, save, complete, or remove a workout.
6. ** Fully Responsive Design:** A meticulously crafted UI that seamlessly scales from mobile devices to desktop monitors, complete with a custom mobile navigation menu.
