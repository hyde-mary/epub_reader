# ⚠️ Disclaimer

**This is a personal project for educational purposes only**.
Please **do not upload sensitive, confidential, or important information into this application**, as the security measures implemented in this project are minimal and may not protect user data adequately. <br><br>
The project is not intended for production use, and any use of uploaded data is at your own risk.

# 📚 **Epub Reader**

**Epub Reader** is a web-based application project which allows users to upload & read ePub books on the browser.

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

### 3. Setup Environment Variables

Create a .env.local file at the root of your project and add the following:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_next_public_sanity_project_id
NEXT_PUBLIC_SANITY_DATASET=your_next_public_sanity_dataset
AUTH_SECRET=your_auth_secret
AUTH_GITHUB_ID=your_auth_github_id
AUTH_GITHUB_SECRET=your_auth_github_secret
SANITY_WRITE_TOKEN=your_sanity_write_token
```

Replace `your_next_public_sanity_project_id`, `your_next_public_sanity_dataset`, `your_auth_secret`, `your_auth_github_id`, `your_auth_github_secret`, `your_sanity_write_token` with your actual credentials.

### 4. Run the Development Server

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
