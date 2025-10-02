Kanboard
========

Kanboard is project management software that focuses on the Kanban methodology.

**This application is in maintenance mode**. What does it mean?

Citing [Wikipedia](https://en.wikipedia.org/wiki/Maintenance_mode):

> In the world of software development, maintenance mode refers to a point in a computer program's life when it has reached all of its goals and is generally considered to be "complete" and bug-free. The term can also refer to the point in a software product's evolution when it is no longer competitive with other products or current with regard to the technology environment it operates within.

- The [author](#credits) of this application is not actively developing any new major features (only small fixes)
- New releases are published regularly depending on the contributions made by the community
- Pull requests for new features and bug fixes are accepted as long as the [guidelines](.github/pull_request_template.md) are followed

Table of Contents
-----------------

- Official website: <https://kanboard.org/>
- [List of features](https://kanboard.org/#features)
- [Change Log](https://github.com/kanboard/kanboard/blob/main/ChangeLog)
- [Forum](https://kanboard.discourse.group/)
- Official documentation: <https://docs.kanboard.org/>
    - [Requirements](https://docs.kanboard.org/v1/admin/requirements/)
    - [Installation instructions](https://docs.kanboard.org/v1/admin/installation/)
    - [Upgrade to a new version](https://docs.kanboard.org/v1/admin/upgrade/)
    - [Use Kanboard with Docker](https://docs.kanboard.org/v1/admin/docker/)

Modern React + MariaDB Implementation
------------------------------------

This repository now includes an alternative stack that recreates the classic Kanboard board workflow using a React front-end and a MariaDB-backed Express API. The source lives under [`modern-app/`](modern-app/) and is split into independent `frontend` and `backend` packages:

- [`modern-app/backend`](modern-app/backend) — Express REST API with MariaDB persistence, mirroring the legacy PHP features for boards, columns, and tasks.
- [`modern-app/frontend`](modern-app/frontend) — Vite + React client that consumes the REST API and offers task creation, inline editing, and deletion in a Kanban-style layout.

Each package contains its own README with setup instructions. Together they deliver the same functionality as the PHP application while providing a modern JavaScript-based stack.

Credits
-------

- Main developer: Frédéric Guillot
- [Contributors](https://github.com/kanboard/kanboard/graphs/contributors)
- Distributed under [MIT License](https://github.com/kanboard/kanboard/blob/main/LICENSE)
