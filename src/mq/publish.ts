import { connect, Connection, Channel } from "amqplib";
import config from "./config";
import { PublishMessage } from "../types";

export default class Producer {
  private exchangeType = "direct";
  private channel!: Channel;

  async createChannel() {
    // step 1: Connect to the amqplib server
    const connection: Connection = await connect(config.rabbitMQ.url);
    // step 2: Create new channel on the connection
    this.channel = await connection.createChannel();
  }

  async publishMessage(routingKey: string, message: PublishMessage) {
    if (!this.channel) {
      await this.createChannel();
    }

    // step 3: Create exchange
    const exhangeName = config.rabbitMQ.exhangeName;
    await this.channel.assertExchange(exhangeName, this.exchangeType);

    // Publish the message to the exhange with with a routing key
    const data = {
      message: message,
      dateTime: new Date(),
    };

    this.channel.publish(
      exhangeName,
      routingKey,
      Buffer.from(JSON.stringify(data))
    );
    console.log("-".repeat(50));
    console.log(`Published invited customers' IDs`);
    console.log("-".repeat(50));
  }
}
