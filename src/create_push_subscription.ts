import { PubSub } from '@google-cloud/pubsub';

// How to start Pubsub Emulator: https://cloud.google.com/pubsub/docs/emulator
// In commandline, type: gcloud beta emulators pubsub start

// How to run this script:
// npm run create_push_sub

// Edit these two variables
const PUSH_ENDPOINT = 'https://hookb.in/3OmmLJL3blfKeKj2M37k';
const TOPIC = 'crawl-page';

async function main() {
  const pubsub = new PubSub({
    apiEndpoint: 'localhost:8085',
    projectId: 're-analyst',
  });
  const topic = await pubsub.topic(TOPIC);
  console.log('pubsub.topic');
  const [topicExists] = await topic.exists();
  if (!topicExists) {
    console.log('creating new topic');
    await topic.create();
  }
  console.log('before topic.createSubscription');
  console.log('topicExists: ', topicExists);
  const createSubscriptionResponse = await topic.createSubscription('crawl-list_subscription', {
    pushEndpoint: PUSH_ENDPOINT,
  });
  console.log('createSubscriptionResponse: ', createSubscriptionResponse);
  console.log('after topic.createSubscription');
}

main();