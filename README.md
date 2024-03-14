This is the commune ai project.

**This project has three roles: user, owner, and friend like social network**

# 1. Frontend Running

This is based on Next.js.

## Getting Started

To get started with this project, follow the steps below:

1. Clone the repository:

```
git clone https://github.com/commune-ai/frontend.git
```

2. Go to frontend main directory

```
cd frontend
```

3. Install the dependencies:

```
yarn
```
Preferred Node version is 20.6.0.

If yarn is not installed yet, you can install by running :

```
npm i -g yarn
```

4. Run the development server:

```
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application running.

## Available Scripts

In the project directory, you can run the following scripts:

### `yarn dev`

Runs the app in development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `.next` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

### `yarn start`

Starts the app in production mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn lint`

Look for programming errors, bugs, stylistic errors.

## Learn More

To learn more about Next.js, check out the [Next.js documentation](https://nextjs.org/docs).

# 2. Backend Running

This is based on Django.

## Getting Started

To get started with this project, follow the steps below:

1. Go to backend main directory

```
cd backend
```

2. Install the dependencies:

```
pip install -r requirements.txt
```
Preferred Python version is 3.11.4.

3. Run the development server:

```
python manage.py runserver
```

Open [http://localhost:8000](http://localhost:8000) in your browser to see the application running.

## Available Commands

In the project directory, you can run the following commands:

### `python manage.py runserver`

Runs the development server.<br />
Open [http://localhost:8000](http://localhost:8000) to view it in the browser.

The server will automatically reload if you make changes to the code.

### `python manage.py migrate`

Applies any database migrations needed for the project.

### `python manage.py createsuperuser`

Creates a superuser for the admin interface.

### `ruff check`

Look for programming errors, bugs, stylistic errors.

## Learn More

To learn more about Django, check out the [Django documentation](https://docs.djangoproject.com/).

# Prerequisites

Before you create a pull request, please make sure that you have run lint on your code changes. This will help ensure that your code meets our style guidelines and is easy to review.

# License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
