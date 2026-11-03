# IS345 – Web Application Development 2

**Taibah University**  
College of Computer Science and Engineering – Yanbu  
Department of Information Systems



### Express.js MVC with Sequelize and EJS

This example demonstrates a simple student management application using **Node.js, Express.js, SQLite, Sequelize ORM, and EJS as the view engine**.

The application uses a `students` table to perform the following operations:

- **Retrieve Students:** Fetch students' first names (`fname`) and email addresses (`email`) from the database and display them dynamically using an EJS template.
- **Add Student:** Use an HTML form in an EJS view to submit a new student's information through a POST route and insert the record into the database using Sequelize.
- **Delete Student:** Provide a delete link for each student in the EJS view. Clicking the link sends a GET request to an Express route, which uses Sequelize's `destroy()` method to delete the selected student.

The example introduces **Express routing, EJS templating, HTML form handling, Sequelize database operations, and basic MVC concepts**.

**Note:** For simplicity, the Sequelize model is defined directly in the application file rather than in a separate model file. This example demonstrates MVC concepts without implementing a fully separated MVC project structure.


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