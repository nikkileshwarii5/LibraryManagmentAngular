export const statsConfig = ({ myLoans, reservations, stats }: any) => [
  {
    id: 1,
    icon: 'bi bi-journal-bookmark',
    value: stats.currentLoans,
    title: 'Current Loans',
    subtitle: "Books you're reading",
    bgColor: 'bg-primary-subtle',
    textColor: 'text-primary'
  },
  {
    id: 2,
    icon: 'bi bi-calendar-check',
    value: stats.activeReservations,
    title: 'Reservations',
    subtitle: 'Books on hold',
    bgColor: 'bg-info-subtle',
    textColor: 'text-info'
  },
  {
    id: 3,
    icon: 'bi bi-clock-history',
    value: stats.booksRead,
    title: 'Books Read',
    subtitle: 'This year',
    bgColor: 'bg-success-subtle',
    textColor: 'text-success'
  },
  {
    id: 4,
    icon: 'bi bi-graph-up-arrow',
    value: stats.readingStreak,
    title: 'Day Streak',
    subtitle: 'Keep it going!',
    bgColor: 'bg-warning-subtle',
    textColor: 'text-warning'
  }
];