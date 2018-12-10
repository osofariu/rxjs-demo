const { DocumentStore } = require('ravendb');
const SUBSCRIPTION_NAME = 'node-listener';
const DATABASE_NAME = 'rxjs-demo';
let store;

async function addDocument(count) {
  const document = {
    firstName: `first ${count}`,
    lastName: `last ${count}`,
    '@metadata': {
      '@collection': 'people'
    }
  };
  const session = getStore().openSession(DATABASE_NAME);
  await session.store(document, 'people/', 'people');
  await session.saveChanges();
}

function getStore() {
  if (store) {
    return store;
  }
  store = new DocumentStore(
    'http://localhost:8080',
    DATABASE_NAME
  ).initialize();
  return store;
}

async function createSubscription() {
  await getStore().subscriptions.create({
    name: SUBSCRIPTION_NAME,
    query: 'from people',
    documentType: 'people'
  });
}

async function getSubscription() {
  try {
    return await getStore().subscriptions.getSubscriptionState(
      SUBSCRIPTION_NAME
    );
  } catch (e) {
    return null;
  }
}

function startSubscription(io) {
  const subscription = getStore().subscriptions.getSubscriptionWorker({
    subscriptionName: SUBSCRIPTION_NAME
  });

  subscription.on('batch', (batch, done) => {
    io.emit('raven', batch.items);
    done();
  });
}

async function listenForChanges(io) {
  const subscription = await getSubscription();
  if (!subscription) {
    await createSubscription();
  }
  startSubscription(io);
}

module.exports = { addDocument, listenForChanges };
