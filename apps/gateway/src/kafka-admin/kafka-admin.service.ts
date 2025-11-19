import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Kafka } from 'kafkajs';

@Injectable()
export class KafkaAdminService implements OnModuleInit {
  private admin;
  constructor(
    @Inject('KAFKA_CLIENT') private readonly kafkaClient: ClientKafka,
  ) {
    const kafka = new Kafka({
      clientId: 'admin-client',
      brokers: ['localhost:9092'],
    });
    this.admin = kafka.admin();

    console.log('Connecting to admin...');
  }

  async onModuleInit() {
    this.admin
      .connect()
      .then(() => {
        console.log('Admin connected');
      })
      .catch((error) => {
        console.error('Error connecting admin:', error);
      });

    await this.admin
      .createTopics({
        topics: [
          {
            topic: 'profiles',
            numPartitions: 3,
            replicationFactor: 1,
          },
        ],
      })
      .then(() => {
        console.log('Topics created');
      })
      .catch((error) => {
        console.error('Error creating topics:', error);
      });
  }
}
