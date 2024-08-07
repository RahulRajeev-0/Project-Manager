# Project Manager

Project Manager is a web application designed to manage todos efficiently. It allows users to create and manage projects, handle todos within those projects, and export project summaries as gists on GitHub.

## Overview

This project is a web application with a Django REST Framework backend and a React frontend using Vite. It provides functionalities for managing and interacting with todos.

## Prerequisites
- Python: Version 3.8 or higher
- Node.js

## Installation

### Backend Setup

1. **Clone the repository:**

    ```bash
    git clone https://github.com/RahulRajeev-0/Project-Manager.git
    
    ```

2. **Navigate to the backend directory:**

    ```bash
    cd backend
    ```

3. **Create a virtual environment:**

    ```bash
    python -m venv venv
    ```

4. **Activate the virtual environment:**

    - On Windows:

        ```bash
        venv\Scripts\activate
        ```

    - On macOS/Linux:

        ```bash
        source venv/bin/activate
        ```

5. **Install the required Python packages:**

    ```bash
    pip install -r requirements.txt
    ```

6. **Apply database migrations:**

    ```bash
    python manage.py migrate
    ```

7. **Create a superuser (optional):**

    ```bash
    python manage.py createsuperuser
    ```

8. **Run the Django development server:**

    ```bash
    python manage.py runserver
    ```

### Frontend Setup

1. **Navigate to the frontend directory:**

    ```bash
    cd ../frontend
    ```

2. **Install the required Node.js packages:**

    ```bash
    npm install
    ```

3. **Run the Vite development server:**

    ```bash
    npm run dev
    ```

## Usage

- The backend will be available at `http://localhost:8000/`.
- The frontend will be available at `http://localhost:5173/`.

## Environment Variables

To ensure that the application functions correctly and to enable features such as exporting the project summary as a GitHub gist, you need to configure environment variables. These variables are essential for securely managing sensitive information like API tokens.
checkout this link for creating token https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-fine-grained-personal-access-token
### Setup

1. **Create a `.env` File**

   In the root directory of your frontend project (where `package.json` is located), create a file named `.env`.

2. **Add Environment Variables**

   Open the `.env` file and add the required environment variables. For this project, you must set the following variable:

   ```env
   VITE_API_GIT_TOKEN=your-github-token
