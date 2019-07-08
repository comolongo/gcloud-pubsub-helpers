import { PubSub } from '@google-cloud/pubsub';

async function main() {
  const pubsub = new PubSub({
    apiEndpoint: 'localhost:8085',
    projectId: 'foobar',
  });
  const topic = await pubsub.topic('testTopic');
  if (await topic.exists()) {
    topic.create();
  }
  // let subscription = topic.subscription('testSubscription');
  // if (!(await subscription.exists())) {
  //   subscription = (await pubsub.createSubscription(topic, 'testSubscription'))[0];
  // }
  const subscription = (await pubsub.createSubscription(topic, 'testSubscription'))[0];
  const publisher = topic.publish(Buffer.from('testBuffer'));
  subscription.addListener('message', (msg) => {
    console.log('listend to: ', msg);
  });
}

main();
