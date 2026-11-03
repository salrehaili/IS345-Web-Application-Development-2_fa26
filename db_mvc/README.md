# IS345 – Web Application Development 2

**Taibah University**  
College of Computer Science and Engineering – Yanbu  
Department of Information Systems

### Example 02: Express.js MVC with Sequelize and EJS (Separate Model File)

This example builds on the first student management application using **Node.js, Express.js, SQLite, Sequelize ORM, and EJS**.

The main difference is that the **Student model is defined in a separate JavaScript file** and imported into the main application. This demonstrates better code organization and separation of concerns.

The application supports the following operations:

- **Retrieve Students:** Fetch students' first names (`fname`) and email addresses (`email`) from the database and display them using EJS.
- **Add Student:** Submit student information through an HTML form using a POST route and save it using Sequelize.
- **Delete Student:** Click a delete link that sends a GET request to an Express route, which uses Sequelize's `destroy()` method to remove the selected student.

**Learning Objective:** Understand how to separate a Sequelize model into its own file while keeping the application functionality unchanged, as an introduction to a more organized MVC architecture.

## Requirements

Before running the examples, make sure you have installed:

- Node.js
- npm
- Visual Studio Code (recommended)

## Getting Started

**1. Clone the repository**

```bash
git clone https://github.com/YOUR-USERNAME/IS345-Web-Application-Development-2.git
```

**2. Navigate to an example**

```bash
cd IS345-Web-Application-Development-2/examples/01-express-mvc-sqlite3
```

**3. Install dependencies**

```bash
npm install
```

**4. Run the application**

```bash
node index.js
```

*Note: The startup command and application port may differ between examples. Refer to the README inside each example folder.*

**Course:** IS345 – Web Application Development 2  
**Instructor:** Dr. Sameer M. Alrehaili  
**Institution:** Taibah University – Yanbu