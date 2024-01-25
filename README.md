# About Project

This is a node application that reads text file containing a fintech customers'
id, latitude and langitude, and determine the ones that within 100km distance
from the company. ID of Customers within 100km are published in ascending order
to a rabbitMQ broker using a exchange name of and routing key of
"InvitedCustomers".

## How Run The Application

To start this application, follow the following steps:

- Clone the repository: `git clone repo-url`

- Change to the directory of the application:

  `cd publisher`

- Install the application packages

  `npm install`

- Start the application

  `npm run dev`

### Note

You need to have RabbitMQ server on your machine to be able to publish messages.
For how to install RabbitMQ server, visit the RabbitMQ
[getting started](https://www.rabbitmq.com/#getstarted) page for guide on
installation on various platforms.
