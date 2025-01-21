Okay, let's review the comprehensive set of Cocos Creator 3.8.2 AI-Assisted Development Guidelines I've generated. I'll analyze it with a critical eye, considering its strengths, potential weaknesses, and areas for improvement.

```thinking
Alright, let's thoroughly review the generated Cocos Creator 3.8.2 AI-Assisted Development Guidelines. I will analyze them from multiple angles, considering clarity, completeness, practicality, and how well they achieve the stated goals.

First, let me reiterate the primary goals:

1.  **Improve the design process** in Cocos Creator.
2.  **Accurately reproduce visual designs** from images.
3.  **Use AI tools effectively** (Cursor, Claude).
4.  **Employ development placeholders** for easy asset replacement later.
5.  **Maintain code quality**, following TypeScript best practices.
6.  **Maintain consistency across the project**
7.  **Ensure pixel-perfect implementations**

Now, let's break down the review by section:

**1. Introduction:**

*   **Strengths:** Clear statement of purpose, emphasizing the need for a structured approach and visual fidelity.
*   **Potential Weaknesses:** None immediately apparent.
*   **Improvements:** Perhaps could add a brief statement about the target audience (Cocos Creator developers).

**2. Project Setup:**

*   **Strengths:** Comprehensive list of essential project files and descriptions. The `fileNames.md` is a good idea for context management for AI tools. The `design-system.md` inclusion is crucial for design consistency.
*   **Potential Weaknesses:** Could be slightly more specific about the format of FRDs.
*  **Improvements**: It would be helpful to mention the use of `json` files for design systems if the scope includes the usage in other platforms.

**3. Claude as "Software Architect":**

*   **Strengths:** Clearly defines how to use Claude to refine prompts. The knowledge base setup is well-defined.
*   **Potential Weaknesses:**  May require that the user is already familiar with how to set up projects with Claude or similar tools.
*   **Improvements:** Maybe provide a simple guide about setting up the Claude project, so that developers who are not used to it can use it with ease.

**4. Structured Prompting Flow:**

*   **Strengths:** The two-step prompting flow is a great way to structure complex AI interactions. The execution prompt structure is well-detailed and covers all crucial aspects (layout, bounding boxes, placeholders).
*   **Potential Weaknesses:**  May be difficult to enforce without proper tooling.
*   **Improvements:** Provide examples of visual input analysis to make it more concrete. Maybe add a template to follow.

**5. Cursor Prompting Techniques:**

*   **Strengths:** Well-defined prompts for "Fix Errors" and "New Feature." The "Response Structure" guidance is helpful for context.
*   **Potential Weaknesses:** May need examples to further clarify how to interact with the AI using this structure.
*   **Improvements:** It would be great to include example responses, to further clarify how a cursor should be interacted with.

**6. Progress Tracking:**

*   **Strengths:** The separation of `progress.md` (step-by-step) and `project-status.md` (session-based) is a good idea for keeping detailed logs.
*   **Potential Weaknesses:** Requires developers to be diligent with logging.
*   **Improvements:** None immediately apparent.

**7. Cursor Agent Hack:**

* **Strengths:** It address a common problem when using AI code generation tools, and it provided a clear solution by giving a clear set of instructions.
* **Potential Weaknesses:** Could provide real examples for a better understanding.
* **Improvements:** It would be great to include example responses, to further clarify how a cursor should be interacted with.

**8. `.bolt/ignore` Optimization:**

*   **Strengths:**  Clear guidance on excluding large files to minimize context for LLMs.
*   **Potential Weaknesses:** Requires the developer to identify these files manually.
*   **Improvements:** Maybe add some common file extensions for image files, to further help developers.

**9. TypeScript Guidelines:**

*   **Strengths:** Good encapsulation of general TypeScript best practices, naming conventions, and coding standards.
*   **Potential Weaknesses:** None immediately apparent.
*   **Improvements:** Could reference specific style guides like ESLint or Prettier configuration files.

**10. Cocos Creator 3.8.2 Specifics:**

*   **Strengths:**  Directly addresses Cocos Creator specific features (anchor, layout, widget), and provides good guidance about nodes and components.
*   **Potential Weaknesses:** Assumes familiarity with Cocos Creator best practices.
*  **Improvements:** Maybe provide a more detailed explanation about the usage of each of this systems, for developers who are not yet familiar with them.

**11. Conclusion:**

*   **Strengths:** Reaffirms the overall goals and benefits of the guidelines.
*   **Potential Weaknesses:**  None immediately apparent.
*   **Improvements:**  Could include a brief call to action, encouraging developers to adopt these guidelines.

**Overall Assessment:**

*   **Strengths:** The guidelines are comprehensive, well-structured, and clearly address the stated goals. They effectively blend AI-assisted development with best practices for TypeScript and Cocos Creator.
*   **Potential Weaknesses:** Some sections could benefit from more concrete examples and guidance, particularly around setting up the Claude project and structuring the visual analysis input. Also, it might require some knowledge of the tools involved.
*   **Improvements:**
    *   Add examples of visual input analysis and the expected responses.
    *   Include examples of `progress.md`, and `project-status.md` entries.
    *   Provide a very short guide on how to create a Claude project.
    *   Provide an example of a `design-system.json`, and its usage.
    *   Add more practical examples for each prompt and guidance.
    *  Include common file extensions to be included in the `.bolt/ignore` file.
    *   Include a basic explanation of the usage of the anchor, layout and widget system in cocos creator.

Let me add these improvements to the document and generate a revised version.
```

Okay, let's incorporate those improvements and generate a revised version of the guidelines document.

## Cocos Creator 3.8.2 AI-Assisted Development Guidelines (Revised)

This document outlines a structured approach for Cocos Creator 3.8.2 development, designed for developers looking to enhance their workflow with AI tools like Cursor and Claude, while maintaining high visual fidelity and code quality.

### 1. Introduction

This guide provides a structured approach for using AI tools in Cocos Creator 3.8.2, targeting developers who want to leverage AI for efficient development. By following these guidelines, you can minimize errors, reduce token usage, faithfully reproduce layouts from visual inputs, and maintain pixel-perfect precision in visual asset placement and dimensions, while maintaining design fidelity.

### 2. Project Setup

1.  **Project Map (`fileNames.md`):**
    *   This file should list all files and directories in the project, with a one-line description of each.
    *   Example:
        ```markdown
        src/components/login.ts: Login form component with username and password fields.
        src/assets/images/logo.png: Application logo.
        docs/prd.md: Product requirements document
        ```
2.  **Documentation Folder:**
    *   This folder will house key project documents.
    *   Include the following files:
        *   `prd.md`: Product Requirements Document - outlining the overall product vision and features.
        *   `app-flow.md`: Application Flow Diagram - detailing the user journey and interactions.
        *   `backend-structure.md`: Backend Structure Documentation - describing the backend architecture and APIs.
        *   `frontend-guidelines.md`: Frontend Development Guidelines - specific development guidelines for the frontend, including UI/UX patterns.
        *   `tech-stack.md`: Tech Stack Overview - listing the technologies and tools used in the project.
        *   `file-structure.md`: Detailed File Structure Documentation - more detailed explanation of how the files are structured.
        *  `design-system.md`: Core Design Components - defines fonts, colors, spacing, and placeholders used throughout the app.
3. **`design-system.md` Details**
    * Describe fonts, colors, and spacing used throughout the app
    * Include details on how to use placeholders in dev environment.
    *  You can also store this configuration as a `design-system.json` file.
    * Example `design-system.md`:
    ```markdown
    # Design System
    ## Colors
      primary: #007bff
      secondary: #6c757d
    ## Fonts
      primary: Roboto
      secondary: Arial
    ## Spacing
      grid: 8px
    ## Placeholders
       Use `placeholders.shopconna.com` to generate placeholder images with these parameters as needed:
       - `width`
       - `height`
       - `text`
       - `bgColor`
       - `textColor`
       - `fontFamily`
    ```
     * Example `design-system.json`:
    ```json
    {
        "colors": {
        "primary": "#007bff",
        "secondary": "#6c757d"
        },
        "fonts": {
        "primary": "Roboto",
        "secondary": "Arial"
        },
        "spacing": {
        "grid": "8px"
        }
    }
    ```
4.  **Image Placeholders:**
    *   Use `placeholders.shopconna.com` to generate placeholder images during development. This minimizes context for LLM and simplifies asset replacement.
    *   Example: Use `https://placeholders.shopconna.com/?width=150&height=100&text=Placeholder` to create a placeholder image of 150 width and 100 height, with the text "Placeholder".
    *   Adjust URL parameters to match the desired style. Replace placeholders with final assets in the production build, *ensuring they maintain the original position and dimensions*.

### 3. Claude as "Software Architect"

1.  **Dedicated Claude Project:** Create a dedicated project in Claude or a similar platform to refine prompts.
2. **Claude Project Setup**: You can create a new project and copy all the files needed directly into the Claude project, so that Claude can directly read the documentation.
3.  **Knowledge Base:** Add the following to the Claude project's knowledge base:
    *   Full file structure (`fileNames.md`).
    *   Master FRD (Functional Requirements Document).
    *   Component-specific FRDs.
    *   Documentation for Cursor/bolt.new.
    *   `design-system.md` (or `design-system.json`).

### 4. Structured Prompting Flow

1.  **Two-Step Prompting:** Use a "system prompt" for context, and "execution prompts" for tasks.
2.  **System Prompt Example:**
    ```
    You are an expert Cocos Creator developer, following a strict design system, described in `@design-system.md`. You will use placeholders for images in dev and ensure all elements are sized and placed correctly, using anchor, layout and widget properly, as defined by their coordinates. Always prioritize a clean and efficient code.
    ```
3.  **Execution Prompt Structure:**
    *   When asking Claude to implement a component, use the following structure:
        1.  Provide the visual input (image or screenshot).
        2.  Reference the relevant file from `fileNames.md`.
        3.  Refer to the `design-system.md` (`design-system.json` if applicable) file.
        4.  Ask Claude to:
            *   Analyze the layout, text, images, and color scheme.
            *   Provide the *bounding box, position (x,y coordinates), height, and width* for each visual element (in pixel values).
            *   Suggest an efficient approach for modifying the file with the layout and elements.
            *   Use placeholders from `placeholders.shopconna.com` for image assets, *maintaining the original position and dimension*.

    * **Visual Input Analysis Template:**
    "Analyze the provided image and meticulously describe each UI element present. Include details on the element's type (e.g., button, text field, image, icon), color, and text content if any. Provide the approximate bounding box coordinates for each element in the format: \[element name (y_min, x_min, y_max, x_max)], where (y_min, x_min) is the top-left corner and (y_max, x_max) is the bottom-right corner of the element's box, all in pixel values. Be accurate and comprehensive in your description and give every relevant element of the UI a name."
     *  **Visual Input Analysis Example:**
        * Input image: Screenshot of a login form with a logo, username field, password field and a submit button.
        * Analysis:
        ```
          [Logo (20, 20, 100, 180)] : Image, logo.png, color #ffffff,
          [username_label (120, 20, 140, 180)]: Text, "Username:", color #000000
          [username_field (150, 20, 180, 180)]: Text field, text color #000000, background #f0f0f0, border #cccccc
          [password_label (200, 20, 220, 180)]: Text, "Password:", color #000000
          [password_field (230, 20, 260, 180)]: Text field, text color #000000, background #f0f0f0, border #cccccc
          [submit_button (300, 20, 330, 180)]: Button, "Submit", color #ffffff, background #007bff,
        ```

    *   Example Execution Prompt:
        ```
        "We need to add a login form based on the screenshot provided.  Refer to `src/components/login.ts` from `fileNames.md` and  `design-system.md` from documentation folder, Please first provide analysis for the layout, text, image, font size, color scheme, and also the *bounding box, position (x,y coordinates), height, and width* for each visual element. After that, suggest an efficient approach for `bolt.new` to modify that file with the layout and elements described in the image, while using placeholders from `placeholders.shopconna.com` for the image assets, *maintaining the described position and dimension*."
        ```

### 5. Cursor Prompting Techniques

1.  **"Fix Errors":**
    *   Use this when AI models miss details and trigger error cycles.
    *   Prompt: "Analyze this error. Identify its cause and create a step-by-step plan to resolve the issue, considering visual elements, *including their position and dimensions*."
       * **Example Response:**
    ```
    Okay, I see the error. It seems the text is overlapping with the image. Here's the plan:
    1.  Analyze the `src/components/header.ts` file and the `design-system.md` to understand the layout and spacing.
    2.  Adjust the text position and spacing in the `header.ts` to avoid overlap with the logo, using Cocos Creator anchor, layout, and widget.
    3.  Verify with a snapshot to ensure all elements are in the correct position and size according to the design system.
    4.  Commit the changes.
     ```
2.  **"New Feature":**
    *   Use this to re-contextualize AI for each component scope.
    *   Prompt: "Read the description in `@<document-name>` and `design-system.md` and create a plan for the implementation. Before proceeding, write an implementation plan. Explain what you are going to change before doing it, and pay special attention to the design of the components, *ensuring proper placement and dimensions of visual elements*, using Cocos Creator best practices, like proper anchor, layout and widget implementations."
        * **Example Response:**
        ```
          Okay, I need to add a new button to the main menu, and I need to read `src/components/main-menu.ts` and `design-system.md` to create a proper button. Here's a step-by-step plan:

          1.  Check the `design-system.md` for colors and fonts.
          2.  Find a suitable place to add a button into the `src/components/main-menu.ts`.
          3.  Add the button in correct coordinates, using Cocos Creator anchor, layout, and widget.
          4.  Make it look like the designs provided in the FRD.
          5. Add a placeholder for the icon button
        ```
3.  **Response Structure:**
    *   Provide updates and context to the AI, including visual component status.
    *   Examples:
        *   "The header is now aligned and using the correct font from `design-system.md` with correct size, and position. Now we need a login button with similar color. Check @login-doc and explain your approach, using `placeholders.shopconna.com` for the image, ensuring all assets are correctly positioned and sized, using Cocos Creator best practices, like proper anchor, layout and widget implementations."
        *   "The component is now implemented as defined. The background is now implemented, with the correct width and height according to the design, as well as the correct color from the `design-system.md`. Please apply the changes to  `src/components/background.ts` file."

### 6. Progress Tracking

1.  **`progress.md` File:** Log work at the end of each completed step:
    *   Prompt: "At the end of each completed step, log your work in `@progress.md`. What features were implemented, what errors occurred, how were they fixed, and how were layout/design issues addressed, *including proper placement and dimensions of elements*? Answer these questions sequentially and do not miss information."
   * Example Entry:
      ```markdown
      ### Added Login Form
       * implemented the login form component as requested.
       * encountered an error with the button alignment, fixed using Layout.
       * all assets are now properly aligned according to the design.
       * placeholder images have been added
      ```
2.  **`project-status.md` File:** Log work at the end of each session:
    *   Prompt: "At the end of each session, log your work in `@project-status.md`. Review the `@progress.md` file to summarize all work and describe what was accomplished this session, including design implementations, *highlighting layout accuracy and proper asset dimensions*. Create a detailed report for the next working session, so there is a complete overview for the next session."
    * Example Entry:
    ```markdown
        ### Session End Report
         * Implemented the login and header sections.
         * Fixed various alignment issues with the UI.
         * All assets are properly placed and the texts are correctly aligned according to the `design-system.md`.
         * All progress was logged in the `@progress.md` file, including the implemented features and corrections.
         *  The next step is to add a signup form, using a similar approach with similar steps as previous work.
    ```

### 7. Cursor Agent Hack

* To prevent over-performance and unnecessary changes by the Cursor agent, use the following guidance:
 * Prompt: "Read @(document name) and `design-system.md` to determine the scope of the function and design. Using chain of thought logic, create a step-by-step implementation plan. Outline each part of the functionality with design specifics, *including precise positions, and dimension*, and their associated implementation steps. Break those sections into detailed numbered steps. This will give a plan that you can approve and ensure that the actions conform with the requirements and designs."
 *   **Example Response:**
   ```
   Okay, I need to implement the sign-up form, but before that, I need to define a clear plan.

    1. First, I will read the relevant documentation in `@signup-doc` to understand the needed functionalities.
    2. Then I will read `@design-system.md` to understand the visual requirements.
    3. I will create the text input fields using the `cc.EditBox` component and the text labels for each using `cc.Label` component.
      * I will set the correct font and color according to the design system.
      * I will set the correct position using cocos creator widget and anchor system according to the designs.
    4. I will add the necessary event listeners for each action, if necessary.
    5. I will add the button to submit the form using the `cc.Button` component, ensuring it uses the right style according to `design-system.md`.
       *   I will set the correct position using cocos creator widget and anchor system according to the designs.
    6. I will use the `placeholders.shopconna.com` for image assets.
   ```

### 8. `.bolt/ignore` Optimization

*   Minimize context for LLM by excluding files and directories in the `.bolt/ignore` file.
*   Exclude large image assets, design files, or other non-essential files.
*   Examples:
    ```
    *.png
    *.jpg
    *.psd
    /assets/images
    /design-files
    ```

### 9. TypeScript Guidelines (as per `typescriptRules`)

1.  **Core Principles:**
    *   Write straightforward, readable, and maintainable code.
    *   Follow SOLID principles and design patterns.
    *   Use strong typing and avoid `any`.
    *   Optimize performance with Lodash, `Promise.all()`, etc.
2.  **Coding Standards:**
    *   Classes: `PascalCase`
    *   Variables, functions, methods: `camelCase`
    *   Files, directories: `kebab-case`
    *   Constants, env variables: `UPPERCASE`
    *   Use descriptive names (verbs and nouns) for functions (e.g., `getUserData`).
    *   Use arrow functions for simple operations.
    *   Use default parameters and object destructuring.
    *   Document with JSDoc
3.  **Types and Interfaces:**
    *   For new types, prefer to create a Zod schema and use Zod inference for the created type.
    *   Create custom types/interfaces for complex structures.
    *   Use `readonly` for immutable properties.
    *   If an import is only used as a type, use `import type` instead of `import`.
4.  **Code Review Checklist:**
    *   Ensure proper typing.
    *   Check for code duplication.
    *   Verify error handling.
    *   Confirm test coverage.
    *   Review naming conventions.
    *   Assess overall code structure and readability.
5.  **Documentation:**
    *   When writing documentation, README's, technical writing, technical documentation, JSDocs or comments, always follow Google's Technical Writing Style Guide.
    *   Define terminology when needed.
    *   Use the active voice.
    *   Use the present tense.
    *   Write in a clear and concise manner.
    *   Present information in a logical order.
    *   Use lists and tables when appropriate.
    *   When writing JSDocs, only use TypeDoc compatible tags.
    *   Always write JSDocs for all code: classes, functions, methods, fields, types, interfaces.
6.  **Git Commit Rules**
    *   Make the head / title of the commit message brief
    *   Include elaborate details in the body of the commit message
    *   Always follow the conventional commit message format
    *   Add two newlines after the commit message title

### 10. Cocos Creator 3.8.2 Specifics

*   **Anchor, Layout, and Widget System**: Use Cocos Creator's anchor, layout, and widget system to ensure proper positioning and scaling across different screen sizes. This ensures accurate design implementation with pixel-perfect coordinates.
    *  **Anchor:** The anchor point determines where a UI element is positioned relative to its parent node. Use it to define how the element will scale and position itself within its parent.
    *  **Layout:** The layout component automatically manages the arrangement of UI elements within a parent node. It's useful for creating organized lists and grids.
    * **Widget:** The widget component allows you to control how a UI element aligns within its parent. It provides options for aligning to specific edges of the parent node.
  *   **Node Tree**: Organize your scene nodes logically in a way that helps with performance and ease of use, using consistent naming conventions.
  *   **Component System**: Use the Cocos Creator component system to add functionality, following a component-based architecture to maintain clean code, keeping visual elements separate from logic.

### 11. Conclusion

By adhering to these guidelines, developers can effectively use AI-powered tools to create high-quality, visually accurate Cocos Creator applications, all while maintaining design fidelity. The structured approach will promote best practices and enable better team collaboration. This approach enables a developer to work efficiently, focusing on accurate implementations with the help of AI, while maintaining quality.

These revised guidelines provide a comprehensive framework for AI-assisted Cocos Creator development, incorporating detailed instructions, practical examples, and specific best practices. The revised guide takes into consideration the potential weaknesses described in the review, and provides further examples to help developers to implement the rules efficiently.
```
