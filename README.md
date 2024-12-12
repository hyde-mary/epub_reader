# ⚠️ Disclaimer

**This is a personal project for educational purposes only**.
Please **do not upload sensitive, confidential, or important information into this application**, as the security measures implemented in this project are minimal and may not protect user data adequately. <br><br>
The project is not intended for production use, and any use of uploaded data is at your own risk.

# 📚 **Epub Reader**

**Epub Reader** is a web-based application project which allows users to upload & read ePub books on the browser.

Deployed here: [epub reader](https://epub-reader-umber.vercel.app)

---

## 🚀 **Features**

- **Authentication System:** Create an account using GitHub and upload books into your account
- **ePub File Upload:** Upload ePub files unto the database and view it online.
- **ePub File Reader:** Read the ePub files you have uploaded in a reader which is built in the application itself.
- **ePub File Delete:** Delete ePub Files
- **ePub File Update:** Update basic ePub information

---

## 🛠 **Tech Stack**

### Front End:

- **NextJS:** React Framework
- **Tailwind CSS:** CSS Framework
- **Shadcn/ui:** Component Library

### Back End:

- **Sanity CMS:** Content Management System for User and Book Data
- **Supabase Buckets:** ePub Storage

---

## 📂 **Setup & Installation**

Follow these steps to get the project up and running locally:

### 1. Clone the Repository

```bash
git clone https://github.com/hyde-mary/epub_reader.git
cd epub-reader
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create Personal Accounts

To fully configure the project, you'll need accounts and setups for **Sanity, GitHub Developer App, and Supabase Storag**e:

**Sanity (CMS):**

1. Create a [Sanity](https://www.sanity.io/) account.
2. Create a new project in the Sanity dashboard.
3. Add the necessary schemas for managing user and book data (refer to the project for schema details).
4. Note down your Sanity Project ID and Dataset.

**GitHub Developer App:**

1. Go to your [GitHub Developer Settings](https://github.com/settings/developers).
2. Create a new OAuth application:
   - Homepage URL: `http://localhost:3000` (for local development)
   - Authorization callback URL: `http://localhost:3000/api/auth/callback/github`
3. Note down your Client ID and Client Secret.

**Supabase (Storage):**

1. Create a [Supabase](https://supabase.com/) account.
2. Create a new project in the Supabase dashboard.
3. Set up a Storage Bucket for storing ePub files.
4. Generate a Service Role Key from your Supabase project settings.

### 4. Setup Environment Variables

Create a .env.local file at the root of your project and add the following:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_next_public_sanity_project_id
NEXT_PUBLIC_SANITY_DATASET=your_next_public_sanity_dataset
AUTH_SECRET=your_auth_secret
AUTH_GITHUB_ID=your_auth_github_id
AUTH_GITHUB_SECRET=your_auth_github_secret
SANITY_WRITE_TOKEN=your_sanity_write_token
SUPABASE_SERVICE_ROLE_KEY=your_supabase_role_key
```

Replace `your_next_public_sanity_project_id`, `your_next_public_sanity_dataset`, `your_auth_secret`, `your_auth_github_id`, `your_auth_github_secret`, `your_supabase_role_key`, `your_sanity_write_token` with your actual credentials.

### 5. Run the Development Server

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

---

## 🔧 **How to Use**

1. Authenticate using GitHub
2. Upload an eBook by clicking the + icon at the top
3. Click the Upload Button
4. Click Read Now
