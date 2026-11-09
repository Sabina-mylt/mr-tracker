# MR Tracker

A small CRM for the Business Development raisers. It replaces filling in the MR sheet by hand.

- **Raisers** open the site on their phone, tap a company and log what they did with one tap (*Called, Messaged, Sent offer, Followed up, They agreed, They refused*). They can add a note and set a next step with a date.
- **The head** writes on the **Comments** page, to one raiser or to the whole team, and can link a comment to a company. Raisers see a "new comments" notice on My work. They can reply and press **Mark done** once they have acted on a comment.
- **Trackers** open the **Team dashboard**. It shows each raiser's last activity, updates in the last 7 days, confirmed partners, and the companies that are overdue or have gone quiet. It also shows the pipeline for each direction (Infopartners, RnR, Coffee-break, EWD).

```
GitHub Pages (index.html)  ──►  Google Apps Script (Code.gs)  ──►  Google Sheet
     the website                   free API, no server               the data:
                                                                     Companies · Log · Team · Comments
```

The Google Sheet stays the single source of truth, so trackers can still open it, filter it and export it as before.

---

## Setup (about 15 minutes, done once)

### 1. Create the Google Sheet (the database)

1. Create a new Google Sheet, for example **"MR Tracker — data"**. Keep it private. The website reaches it through the script, so raisers do not need access to the sheet.
2. **Extensions → Apps Script**. Delete the sample code, paste in all of [`backend/Code.gs`](backend/Code.gs), then press **Save**.
3. Choose the function **`setup`** in the toolbar and press **Run**. Google asks for permission. Approve it. This creates the tabs `Companies`, `Log`, `Team` and `Comments`.
4. **Project Settings (gear icon) → Script properties → Add script property**
   - Property: `ACCESS_CODE`
   - Value: a team code, for example `gox-bd-2026`. Everyone types this code once on their device. Change it whenever someone leaves the team.

### 2. Import the companies from the old MR

1. In the sheet, open the **Companies** tab and click cell **A1**.
2. **File → Import → Upload** and choose `import/companies_import.csv`.
3. Pick **Import location: Replace data at selected cell**, **Separator: Detect automatically**, and untick **Convert text to numbers, dates and formulas**.

That loads all 197 companies from the GoX tabs: RnR 51, Infopartners 42, Coffee-break 51 and EWD 53. The duplicate "Sky wellness" row is merged. The JARYQ tabs and the Speakers tab were empty, so raisers add those companies in the app with **Add company**.

> Nobody is assigned to any company yet. Raisers press **Take** on the companies they work on. You can also type names into the `owner` column of the sheet directly.

### 3. Publish the script as a web app

1. In Apps Script: **Deploy → New deployment → gear icon → Web app**.
2. **Execute as: Me**. **Who has access: Anyone**.
3. Press **Deploy** and copy the **Web app URL**. It ends in `/exec`.

> "Anyone" means anyone who has the URL **and** the team code. The URL is never shown on the website, and without the code the script returns nothing.

### 4. Put the website on GitHub Pages

1. Create a GitHub repository, for example `mr-tracker`.
2. Open `config.js`, paste the URL into `API_URL: '...'` and save.
3. Upload `index.html`, `config.js` and `README.md`. **Do not upload the `import/` folder.** It contains phone numbers and emails, and Pages repositories are public. The `.gitignore` already excludes it if you use git.
4. Repository **Settings → Pages → Build and deployment → Deploy from a branch → `main` / root → Save**.
5. After about a minute the site is live at `https://<your-username>.github.io/mr-tracker/`.

### 5. Hand it to the team

Send the link and the team code to the raisers. The first time they open it:
1. They enter the team code.
2. They pick their name, or add themselves as a **Raiser**.
3. They go to **All companies**, filter by their direction and press **Take** on the companies they will raise.

The head and the trackers add themselves with the role **Head / Tracker**. Only people with that role can write new comments. Everyone can reply.

---

## Daily use

| Who | What they do | Time |
|---|---|---|
| Raiser | Opens **My work**. The top shows what is due today and what is going quiet. Taps a company, taps what they did, optionally adds a note and a next step, then presses **Save**. | ~10 s per update |
| Head | Opens **Comments**, picks a raiser (or Everyone), optionally a company, writes and presses **Send comment**. Picking a company fills in its raiser automatically. Comments can also be written from inside a company's panel. Replies appear under each comment. | ~30 s |
| Tracker | Opens **Team dashboard**. Raisers who have not updated recently are at the top, in red. Clicking a raiser lists their companies. **Activity** shows every update, newest first. | 1–2 min |

**Stages:** New → Contacted → Offer sent → Negotiating → Confirmed / Refused.
They map to the old MR columns: Cold-call or Message = *Contacted*, Commercial offer = *Offer sent*, Follow-up = *Negotiating*. The four totals from the old "Output tool" (in the funnel, in negotiation, confirmed, refused) are the KPI cards on the dashboard.

**Flags:**
- **Due / Overdue**: the next-step date has arrived.
- **Quiet N days**: the company is in progress but has had no update for `STALE_DAYS` days (default 5, set in `config.js`).

## Changing things later

- **Edit `index.html` or `config.js`**: upload the new file to GitHub. Pages updates in about a minute.
- **Edit `Code.gs`**: go to **Deploy → Manage deployments → pencil icon → Version: New version → Deploy**. The URL stays the same.
- **New direction or project**: add it to `DIRECTIONS` or `PROJECTS` in `config.js`.
- **Remove someone from the name list**: in the `Team` tab, set `active` to `no`.
- **Fix data by hand**: edit the `Companies` tab directly. The site picks up the change within a minute. Leave the `Log` tab as it is, because it is the history.

## Try it without setting anything up

Open `index.html` while `API_URL` in `config.js` is empty. The site runs in **demo mode** with sample companies and placeholder raisers. Demo data is saved only in your browser, and **Reset demo data** restores it.
