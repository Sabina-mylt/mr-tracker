// MR Tracker settings. This is the only file you need to edit after deploying the backend.
window.MR_CONFIG = {
  // Paste the Web app URL from Apps Script (Deploy → Manage deployments). It ends with /exec.
  // Leave empty to run the site in demo mode with sample data.
  API_URL: 'https://script.google.com/macros/s/AKfycbwRkuvyTp_6J8C8VrErs2npZ7wQ0iZMGEvzhDPV3h-o3YEwfJOFepu-pm6C8I58MG3o/exec',

  // Projects and directions shown in filters and in the "Add company" form.
  PROJECTS: ['GoX', 'JARYQ'],
  DIRECTIONS: ['Infopartners', 'RnR', 'Coffee-break', 'EWD', 'Speakers'],

  // A company in work with no update for this many days is flagged as "going quiet".
  STALE_DAYS: 5
};
