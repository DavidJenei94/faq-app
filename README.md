# FAQ App

This project is a simple FAQ application that is created with React (with Typescript).

## Starting the project

To start the project you simply need to download the folder from which you should run the command "npm start" with powershell or any other suitable CLI.

## Functionalities
- List questions on main page: only 12 questions are displayed on a single page so a paging system is implemented with previous and next buttons. Clicking on a question navigates to the question's own page.
- Search for keywords to find relevant questions: a simple search functionality is implemented where you can search for keywords included in a question.
- Ask new questions: On the home page you can ask question by clicking the plus button. You need to provide additional details for a question for clarification.
- Check and provide answers for questions: you can add answers on a question's page.
- Upvote/downvote/edit/delete questions and answers on a question's page.

## Documentation

The app starts from faq-app\src\index.tsx which handles the store functionalities. Without database the **questions and answers are stored in localstorage**, but all related functions like adding/deleting them are **handled with Redux**. On specific actions like adding, editing or deleting a **feedback bar** is popping up at the bottom of the page. It is **implemented with React context**. The store implementations are in faq-app\src\store folder.

The faq-app\src\App.tsx handles the **routing with react-router-dom** package and showing the feedback bar if necessary.

The design is done with SCSS. The **basic page formattings** can be found in faq-app\src\index.scss and in faq-app\src\App.module.scss. Also the basic design variables can be found in faq-app\src\utils\_styles.variables.scss.

The basic **layout** files can be found in the faq-app\src\components\Layout folder which includes the Menubar and the main page container with background.

The **question** related pages like the main page (the question listing page), the question creation page and the single question page can be found in the faq-app\src\components\Question folder. The **answer** related pages in the faq-app\src\components\Answer folder like listing the answers for a question and for creating new answers. For **voting and modifying** actions there is a separate folder faq-app\src\components\Actions, as these functionalities apply both the questions and answers. (The **models** for them can be found in the faq-app\src\models folder)

The **UI elemnts** like Button and Input which are reused in more places are in faq-app\src\components\UI folder.

Some **useful hooks** can be found in faq-app\src\hooks folder like useDimensions to calculate width and height of window or useDelayLoading which prevents loading text to appear for a short time so the short blinking is disappear and enhance user experience.

## Missing functionalities and future improvements

- create unit and integration tests
- user handling (now the user can edit/delete all questions and answers and can vote any time)
- backend and database for the data handling
- improve search functionality to include question detail as well
