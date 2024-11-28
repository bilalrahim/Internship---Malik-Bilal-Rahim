# BE Internship Challenge

This repository contains the soultion to the challenge for the fall 2025 internship position.

## 1. Prerequisites
Before you can run this application, make sure you have the following installed:

- **[Node.js](https://nodejs.org/)**: This application is built with Node.js. Download and install the latest LTS version from [nodejs.org](https://nodejs.org/).
  
  To verify that Node.js is installed correctly, run the following command in your terminal:
  
  ```bash
  node -v
  ```

- **Install Dependencies**

  Run the following on terminal in the project directory.
  ```bash
    npm i
    ```

## 2. Running the application

  Run the following on terminal in the project directory.

```bash
    npm run dev
  ```


## 3. Using the Postman Collection

The repository contains a Postman collection for testing the API endpoints. To use the collection:

1. Install Postman if you haven't already.
2. Import the Postman collection:
    - Open Postman and click on the **Import** button.
    - Choose the **Link** or **File** option and import the `Internship - Malik Bilal Rahim.postman_collection.json` file found in the root directory of this repository.
3. The collection will be available in your Postman app with pre-configured requests for testing the API.

The collection includes the following API calls:

- `POST /add` to add points.
- `POST /spend` to spend points.
- `GET /balance` to retrieve the points balance for each payer.


