# GitLogger

GitLogger is designed to enhance your coding workflow by automating the git commit process as well as providing detailed tracking and logging of code changes. With GitLogger, you can monitor your Git commits, capture relevant metadata, and organize this information in a structured manner. Whether you're a solo developer or part of a team, GitLogger ensures that you stay productive, organized, and well-informed about your project's history.

## Features

<img src="/gitlogger/src/assets/features.mp4">

* **Detailed Commit Logs**
  * Track commit messages, authors, timestamps, and associated file changes.
  * Fetch metadata directly from your Git repository to maintain an up-to-date history.
* **Task Log Management**
  * Create and manage task logs to document your coding tasks and progress.
  * Ensure your development process is well-documented and easy to reference.
<img src="/gitlogger/src/assets/repository_view.mp4">
* **Repository Insights**
  * Access detailed file change information, including file names, paths, and commit IDs.
  * Automatically link commit details to the corresponding remote repository.
* **Streamlined Workflow**
  * Enhance productivity with features tailored to make code tracking effortless.
  * Keep a comprehensive overview of your development timeline.
* **Automated Commit Tracking**
  * Runs by default every 15 minutes, capturing your code changes as commits.
  * Customize the commit interval using the "Change Commit Interval" command.
<img src="/gitlogger/src/assets/change_commit_interval.mp4">

##
## Data Collected and Usage

GitLogger requires access to specific data to function effectively:

* **Git Token:** Used to create and update a single repository for commit tracking purposes.
* **GitHub Username:** Used to identify the user and associate commits with their GitHub profile.
* **Remote Repository and Files:** Accessed to fetch commit metadata and file change details.
* **Local Repository:** Analyzed to retrieve commit logs and changes in the current working folder.

**What GitLogger Does with This Data:**

* **Commit Tracking:**
  * Executes Git commits with user-provided messages.
  * Retrieves commit logs from the local repository.
* **Repository Management:**
  * Creates a dedicated repository to store commit history.
  * Updates the repository with structured commit data, including:
    * File names and paths.
    * Links to the remote repository's commit history.
    * Commit metadata such as timestamps and authors.
    * If the changed files exist in the remote repository, the updated repository includes the links to the files inside the remote repository

**Data Stored in the Dedicated Repository:**

* Names of files changed in each commit.
* URLs linking to the files in the remote repository.
* Commit IDs and their corresponding remote repository links.

##
## Installation

1. Open the Extensions view in Visual Studio Code (Ctrl+Shift+X).
2. Search for "GitLogger".
3. Click "Install".

##
## Getting Started

1. Open a project folder in Visual Studio Code.
2. Initalize a local git repository.
3. Connect your local repository with a remote repository .
4. Use GitLogger commands from the Command Palette (Ctrl+Shift+P).
5. Follow the prompts to configure your GitHub token and repository.


##
## Limitations

* GitLogger will only create and update one dedicated repository for commit tracking.
* It requires a GitHub token to push data to the repository.
* Local repository access is necessary to retrieve commit and file change information.

##
## Privacy and Security

GitLogger is designed with privacy and security in mind:

* **Minimal Data Usage:** Only collects data necessary for commit tracking.
* **Dedicated Repository:** All collected data is stored in a single repository created by the extension.
* **Secure Access:** Uses your GitHub token to securely create and update repositories.
##
## Support and Feedback

If you encounter any issues or have suggestions for improvement, please visit our GitHub Issues page.


##
## License

This extension is licensed under the MIT License.
##
## Release Notes

### v1.0.0
Initial release with core features including commit tracking, repository creation, and task log management.
